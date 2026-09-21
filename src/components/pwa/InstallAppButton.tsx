import { Download } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { IOSInstallGuide } from "./IOSInstallGuide";

export function InstallAppButton({
  className,
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "default" | "lg";
}) {
  const { canInstall, install, isInstallAvailable, isIOSInstallAvailable } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (!isInstallAvailable) return null;

  return (
    <>
      <Button
        type="button"
        variant="gold"
        size={size}
        className={className}
        onClick={() => {
          if (canInstall) {
            void install();
            return;
          }

          if (isIOSInstallAvailable) {
            setShowIOSGuide(true);
          }
        }}
      >
        <Download /> Install App
      </Button>
      <IOSInstallGuide open={showIOSGuide} onOpenChange={setShowIOSGuide} />
    </>
  );
}
