import { Download, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { IOSInstallGuide } from "./IOSInstallGuide";

const DISMISS_KEY = "maaax_install_banner_dismissed";

export function InstallAppBanner() {
  const { canInstall, install, isInstallAvailable, isIOSInstallAvailable } = usePWAInstall();
  const [dismissed, setDismissed] = useState(true);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    setDismissed(sessionStorage.getItem(DISMISS_KEY) === "true");
  }, []);

  if (dismissed || !isInstallAvailable) return null;

  return (
    <>
      <section className="border-b bg-surface-soft px-5 py-4">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow text-gold">MAAAX WHOLESALER</p>
            <h2 className="mt-1 text-xl font-black">Get the MAAAX App</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Shop faster and check branch availability easily.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="gold"
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
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                sessionStorage.setItem(DISMISS_KEY, "true");
                setDismissed(true);
              }}
            >
              <X /> Not Now
            </Button>
          </div>
        </div>
      </section>
      <IOSInstallGuide open={showIOSGuide} onOpenChange={setShowIOSGuide} />
    </>
  );
}
