import { PlusSquare, Share } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function IOSInstallGuide({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Install MAAAX on your iPhone</DialogTitle>
          <DialogDescription>
            Safari adds web apps from the share menu.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <div className="flex gap-3">
            <Share className="mt-0.5 h-5 w-5 text-gold" />
            <p>Tap the Share button in Safari.</p>
          </div>
          <div className="flex gap-3">
            <PlusSquare className="mt-0.5 h-5 w-5 text-gold" />
            <p>Select Add to Home Screen.</p>
          </div>
          <div className="flex gap-3">
            <span className="grid h-5 w-5 place-items-center bg-gold text-xs font-bold text-gold-foreground">
              3
            </span>
            <p>Tap Add to place MAAAX on your home screen.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
