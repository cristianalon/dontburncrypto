"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import QRCode from "qrcode";
import type { Wallet } from "@/lib/wallets";
import { BtcGlyph, EthGlyph, SolGlyph, UsdtGlyph } from "./CoinGlyphs";
import CopyButton from "./CopyButton";

type QRModalProps = {
  wallet: Wallet | null;
  onClose: () => void;
};

const glyphs = {
  btc: BtcGlyph,
  eth: EthGlyph,
  sol: SolGlyph,
  usdt: UsdtGlyph,
} as const;

const spring = {
  type: "spring",
  stiffness: 300,
  damping: 28,
  mass: 0.9,
} as const;

function getPaymentUri(wallet: Wallet) {
  switch (wallet.id) {
    case "btc":
      return `bitcoin:${wallet.address}`;
    case "sol":
      return `solana:${wallet.address}`;
    default:
      return wallet.address;
  }
}

function QRModal({ wallet, onClose }: QRModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const [qrImage, setQrImage] = useState("");

  useEffect(() => {
    if (!wallet) return;

    QRCode.toDataURL(getPaymentUri(wallet), {
      width: 520,
      margin: 1,
      color: {
        dark: "#FFFFFF",
        light: "#000000",
      },
    }).then(setQrImage);

    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [wallet, onClose]);

  const stopPropagation = useCallback(
    (e: React.MouseEvent) => e.stopPropagation(),
    []
  );

  const Glyph = wallet ? glyphs[wallet.id] : null;

  return (
    <AnimatePresence>
      {wallet && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative flex w-full max-w-sm flex-col items-center gap-7 rounded-3xl border border-line bg-black p-10"
            initial={{ opacity: 0, y: 20, scale: .95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: .95 }}
            transition={spring}
            onClick={stopPropagation}
          >

            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute right-5 top-5 text-ash hover:text-white"
            >
              <X size={18}/>
            </button>

            {Glyph && <Glyph className="h-12 w-12" />}

            <div className="text-center">
              <p className="text-sm text-ash">{wallet.network}</p>
              <h3 className="mt-1 text-xl font-medium text-white">
                {wallet.name}
              </h3>
            </div>

            {qrImage && (
              <img
                src={qrImage}
                alt={`${wallet.name} QR`}
                className="rounded-2xl border border-line"
                width={240}
                height={240}
              />
            )}

            <p className="break-all text-center font-mono text-xs text-ash">
              {wallet.address}
            </p>

            <CopyButton
              address={wallet.address}
              label={wallet.name}
            />

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(QRModal);