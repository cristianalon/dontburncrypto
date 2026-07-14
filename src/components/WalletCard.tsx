"use client";

import { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { QrCode } from "lucide-react";
import type { Wallet } from "@/lib/wallets";
import { BtcGlyph, EthGlyph, SolGlyph, UsdtGlyph } from "./CoinGlyphs";
import CopyButton from "./CopyButton";

const glyphs = {
  btc: BtcGlyph,
  eth: EthGlyph,
  sol: SolGlyph,
  usdt: UsdtGlyph,
} as const;

function truncate(address: string) {
  if (address.length <= 18) return address;
  return `${address.slice(0, 8)}…${address.slice(-6)}`;
}

type WalletCardProps = {
  wallet: Wallet;
  onShowQR: (wallet: Wallet) => void;
  index: number;
};

function WalletCard({ wallet, onShowQR, index }: WalletCardProps) {
  const Glyph = glyphs[wallet.id];

  const handleShowQR = useCallback(() => {
    onShowQR(wallet);
  }, [onShowQR, wallet]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 1,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6 }}
      whileTap={{ y: -2 }}
      className="group flex flex-col justify-between rounded-2xl border border-line bg-smoke/30 p-9 hover:border-white/15 hover:shadow-[0_24px_48px_-24px_rgba(255,255,255,0.1)] sm:p-11"
      style={{ transition: "border-color 0.5s, box-shadow 0.5s" }}
    >
      <div className="flex items-center gap-5">
        <Glyph className="h-9 w-9 text-white/90" />
        <div>
          <p className="text-lg font-medium text-white">{wallet.name}</p>
          <p className="mt-0.5 text-xs tracking-wide text-ash">
            {wallet.network}
          </p>
        </div>
      </div>

      <p
        className="mt-12 truncate font-mono text-sm tracking-wide text-ash sm:text-[13px]"
        title={wallet.address}
      >
        {truncate(wallet.address)}
      </p>

      <div className="mt-10 flex items-center gap-8">
        <CopyButton address={wallet.address} label={wallet.name} />
        <button
          onClick={handleShowQR}
          className="flex items-center gap-2 text-sm text-white/80 transition-colors duration-300 hover:text-white"
          aria-label={`Show QR code for ${wallet.name} address`}
        >
          <QrCode size={15} strokeWidth={1.5} />
          QR
        </button>
      </div>
    </motion.div>
  );
}

export default memo(WalletCard);
