import { useState, useEffect } from "react";
import { useAuth } from "@clerk/react";

const API_BASE = import.meta.env.VITE_API_URL || "";

async function getVapidPublicKey(): Promise<string> {
  const res = await fetch(`${API_BASE}/api/notifications/vapid-public-key`);
  const data = await res.json();
  return data.publicKey;
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export type NotificationState =
  | "unsupported"
  | "prompt"
  | "granted"
  | "denied"
  | "loading"
  | "ios-hint";

export function useNotifications() {
  const { getToken } = useAuth();
  const [state, setState] = useState<NotificationState>("prompt");
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches
    || (navigator as any).standalone === true;

  useEffect(() => {
    // Not supported
    if (!("Notification" in window) || !("serviceWorker" in navigator) || !("PushManager" in window)) {
      // iOS in browser (not installed) — show install hint
      if (isIOS && !isStandalone) {
        setState("ios-hint");
        return;
      }
      setState("unsupported");
      return;
    }

    const permission = Notification.permission;
    if (permission === "granted") {
      setState("granted");
    } else if (permission === "denied") {
      setState("denied");
    } else {
      // iOS installed PWA can get notifications; non-installed iOS can't
      if (isIOS && !isStandalone) {
        setState("ios-hint");
      } else {
        setState("prompt");
      }
    }
  }, [isIOS, isStandalone]);

  const requestPermission = async (): Promise<boolean> => {
    setState("loading");
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setState("denied");
        return false;
      }

      // Register service worker + create push subscription
      const swReg = await navigator.serviceWorker.ready;
      const vapidKey = await getVapidPublicKey();
      const pushSub = await swReg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });

      // Save subscription to server
      const token = await getToken();
      await fetch(`${API_BASE}/api/notifications/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          endpoint: pushSub.endpoint,
          keys: {
            p256dh: btoa(String.fromCharCode(...new Uint8Array(pushSub.getKey("p256dh")!))),
            auth: btoa(String.fromCharCode(...new Uint8Array(pushSub.getKey("auth")!))),
          },
        }),
      });

      setSubscription(pushSub);
      setState("granted");
      return true;
    } catch (err) {
      console.error("Push subscription failed:", err);
      setState("prompt");
      return false;
    }
  };

  const sendTestNotification = async () => {
    const token = await getToken();
    await fetch(`${API_BASE}/api/notifications/test`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return { state, requestPermission, sendTestNotification, isIOS, isStandalone };
}
