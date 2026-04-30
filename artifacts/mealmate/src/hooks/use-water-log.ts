import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_URL || "";

export interface WaterLogData {
  today: { date: string; glasses: number };
  yesterday: { date: string; glasses: number } | null;
  goal: number;
}

async function fetchWaterLog(): Promise<WaterLogData> {
  const res = await fetch(`${API_BASE}/api/water-log/today`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch water log");
  return res.json();
}

async function setWaterGlasses(glasses: number): Promise<{ date: string; glasses: number }> {
  const res = await fetch(`${API_BASE}/api/water-log/set`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ glasses }),
  });
  if (!res.ok) throw new Error("Failed to update water log");
  return res.json();
}

export const WATER_LOG_QUERY_KEY = ["water-log"] as const;

export function useWaterLog() {
  return useQuery<WaterLogData>({
    queryKey: WATER_LOG_QUERY_KEY,
    queryFn: fetchWaterLog,
    staleTime: 30_000,
  });
}

export function useSetWaterLog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setWaterGlasses,
    onMutate: async (glasses: number) => {
      await queryClient.cancelQueries({ queryKey: WATER_LOG_QUERY_KEY });
      const previous = queryClient.getQueryData<WaterLogData>(WATER_LOG_QUERY_KEY);
      if (previous) {
        queryClient.setQueryData<WaterLogData>(WATER_LOG_QUERY_KEY, {
          ...previous,
          today: { ...previous.today, glasses },
        });
      }
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(WATER_LOG_QUERY_KEY, ctx.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: WATER_LOG_QUERY_KEY });
    },
  });
}
