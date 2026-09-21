import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePWAInstall } from "@/hooks/usePWAInstall";

export function UpdateAvailableToast() {
  const { isUpdateAvailable, updateApp } = usePWAInstall();

  if (!isUpdateAvailable) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm border bg-background p-4 shadow-lg">
      <p className="font-bold">A new version of MAAAX is available.</p>
      <Button type="button" variant="gold" className="mt-3" onClick={() => void updateApp()}>
        <RefreshCw /> Update Now
      </Button>
    </div>
  );
}
