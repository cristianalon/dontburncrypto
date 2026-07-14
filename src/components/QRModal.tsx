"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import type { Wallet } from "@/lib/wallets";

type QRModalProps = {
  wallet: Wallet | null;
  onClose: () => void;
};

const spring = {
  type: "spring",
  stiffness: 300,
  damping: 28,
  mass: 0.9,
} as const;

function QRModal({ wallet, onClose }: QRModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Keyboard, scroll-lock, and focus management for the lifetime of an
  // open modal only — all torn down together when it closes.
  useEffect(() => {
    if (!wallet) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
    };
  }, [wallet, onClose]);

  // Stable identity so the inner card doesn't re-bind a new handler
  // every render.
  const stopPropagation = useCallback(
    (e: React.MouseEvent) => e.stopPropagation(),
    []
  );

  const qrSrc = wallet
    ? `https://api.qrserver.com/v1/create-qr-code/?size=480x480&margin=0&color=ffffff&bgcolor=000000&data=${encodeURIComponent(
        wallet.address
      )}`
    : "";

  return (
    <AnimatePresence>
      {wallet && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${wallet.name} receiving address QR code`}
        >
          <motion.div
            className="relative flex w-full max-w-sm flex-col items-center gap-8 rounded-3xl border border-line bg-black p-10"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={spring}
            onClick={stopPropagation}
          >
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 rounded-full p-2 text-ash transition-colors duration-300 hover:text-white"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            <div className="text-center">
              <p className="text-sm text-ash">{wallet.network}</p>
              <h3 className="mt-1 text-xl font-medium">{wallet.name}</h3>
            </div>

            <Image
              src={qrSrc}
              alt={`QR code for the ${wallet.name} receiving address`}
              width={220}
              height={220}
              className="rounded-2xl border border-line"
            />

            <p className="max-w-[26ch] break-all text-center font-mono text-xs leading-relaxed tracking-wide text-ash">
              {wallet.address}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(QRModal);
