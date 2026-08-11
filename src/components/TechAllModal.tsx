import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import type { Tech } from "@/types";
import { TechCard } from "./TechCard";
import { Dialog } from "./ui/dialog";
import { DialogContent } from "./ui/dialog";

type TechAllModalProps = {
  open: boolean;
  onClose: () => void;
  items: Tech[];
};

export function TechAllModal({ open, onClose, items }: TechAllModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  return (
    <Dialog open={!!open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto border-border bg-card/50 backdrop-blur-md sm:max-w-4xl">
        {open && (
          <>
            <div className="flex items-center justify-between border-b border-border/60 px-6 py-4 sm:px-8">
              <h3 id="tech-all-title" className="font-display text-lg font-semibold sm:text-xl">
                All Technologies
              </h3>
              {/* <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button> */}
            </div>

            <div className="grid grid-cols-2 gap-3 overflow-y-auto px-6 py-6 sm:grid-cols-3 sm:gap-4 sm:px-8 xl:grid-cols-4">
              {items.map((tech) => (
                <TechCard key={tech.name} tech={tech} fluid />
              ))}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
