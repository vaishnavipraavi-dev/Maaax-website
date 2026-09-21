import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { registerSW } from "virtual:pwa-register";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

type PWAContextValue = {
  canInstall: boolean;
  isInstalled: boolean;
  isIOSInstallAvailable: boolean;
  isInstallAvailable: boolean;
  isUpdateAvailable: boolean;
  install: () => Promise<void>;
  updateApp: () => Promise<void>;
};

const PWAContext = createContext<PWAContextValue | undefined>(undefined);

function isStandalone() {
  if (typeof window === "undefined") return false;

  const navigatorWithStandalone = window.navigator as Navigator & { standalone?: boolean };

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: fullscreen)").matches ||
    navigatorWithStandalone.standalone === true
  );
}

function isIOSSafari() {
  if (typeof window === "undefined") return false;

  const ua = window.navigator.userAgent;
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isSafari = /^((?!CriOS|FxiOS|EdgiOS|OPiOS).)*Safari/i.test(ua);

  return isIOS && isSafari;
}

export function PWAProvider({ children }: { children: ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [updateSW, setUpdateSW] = useState<((reloadPage?: boolean) => Promise<void>) | null>(null);
  const [isIOSInstallAvailable, setIsIOSInstallAvailable] = useState(false);

  useEffect(() => {
    setIsInstalled(isStandalone());
    setIsIOSInstallAvailable(isIOSSafari());

    const update = registerSW({
      immediate: true,
      onNeedRefresh() {
        setIsUpdateAvailable(true);
      },
    });
    setUpdateSW(() => update);

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const onAppInstalled = () => {
      setDeferredPrompt(null);
      setIsInstalled(true);
      localStorage.setItem("maaax_pwa_installed", "true");
    };

    const media = window.matchMedia("(display-mode: standalone)");
    const onDisplayModeChange = () => setIsInstalled(isStandalone());

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);
    media.addEventListener("change", onDisplayModeChange);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
      media.removeEventListener("change", onDisplayModeChange);
    };
  }, []);

  const value = useMemo<PWAContextValue>(
    () => ({
      canInstall: Boolean(deferredPrompt),
      isInstalled,
      isIOSInstallAvailable: isIOSInstallAvailable && !isInstalled,
      isInstallAvailable: (Boolean(deferredPrompt) || isIOSInstallAvailable) && !isInstalled,
      isUpdateAvailable,
      async install() {
        if (!deferredPrompt || isInstalled) return;

        await deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        setDeferredPrompt(null);
      },
      async updateApp() {
        if (!updateSW) return;

        await updateSW(true);
      },
    }),
    [deferredPrompt, isInstalled, isIOSInstallAvailable, isUpdateAvailable, updateSW],
  );

  return <PWAContext.Provider value={value}>{children}</PWAContext.Provider>;
}

export function usePWAInstall() {
  const context = useContext(PWAContext);

  if (!context) {
    throw new Error("usePWAInstall requires PWAProvider");
  }

  return context;
}
