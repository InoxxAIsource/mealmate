import { useState } from "react";
import { useGetGroceryList } from "@workspace/api-client-react";
import { BottomNav } from "@/components/bottom-nav";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

export default function DashboardGrocery() {
  const { data: groceryData, isLoading } = useGetGroceryList();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  if (isLoading) {
    return <div className="min-h-[100dvh] flex items-center justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full"></div></div>;
  }

  const toggleItem = (name: string) => {
    setCheckedItems(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleShare = () => {
    if (!groceryData) return;
    
    let text = "*MealMate Grocery List*\n\n";
    groceryData.categories.forEach(cat => {
      if (cat.items.length === 0) return;
      text += `*${cat.category}*\n`;
      cat.items.forEach(item => {
        text += `- ${item.name.replace(/_/g, ' ')}: ${Math.round(item.totalGrams)}g\n`;
      });
      text += "\n";
    });

    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-[100dvh] bg-background max-w-md mx-auto pb-20">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Grocery List</h1>
          <Button variant="outline" size="sm" className="h-9 rounded-full text-xs border-green-500 text-green-600 hover:bg-green-50" onClick={handleShare}>
            <Share2 className="w-3.5 h-3.5 mr-1.5" /> WhatsApp
          </Button>
        </div>

        <div className="space-y-8">
          {groceryData?.categories.map((category) => {
            if (category.items.length === 0) return null;
            
            return (
              <div key={category.category} className="space-y-3">
                <h3 className="font-semibold text-lg text-primary">{category.category}</h3>
                
                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                  {category.items.map((item, idx) => (
                    <div 
                      key={item.name} 
                      className={`flex items-center gap-3 p-4 border-b border-border last:border-0 transition-colors ${checkedItems[item.name] ? 'bg-muted/50' : ''}`}
                      onClick={() => toggleItem(item.name)}
                    >
                      <Checkbox 
                        checked={checkedItems[item.name] || false}
                        onCheckedChange={() => toggleItem(item.name)}
                        className="h-5 w-5 rounded-md border-muted-foreground"
                      />
                      <div className="flex-1 flex justify-between items-center text-sm">
                        <span className={`capitalize font-medium ${checkedItems[item.name] ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                          {item.name.replace(/_/g, ' ')}
                        </span>
                        <span className={`font-semibold ${checkedItems[item.name] ? 'text-muted-foreground' : 'text-primary'}`}>
                          {Math.round(item.totalGrams)}g
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          
          {(!groceryData?.categories || groceryData.categories.length === 0) && (
            <div className="text-center py-12 text-muted-foreground">
              No items in your grocery list for the active plan.
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}