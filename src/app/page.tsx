"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { MotionConfig, motion } from "framer-motion";
import WalletCard from "@/components/WalletCard";
import { wallets, type Wallet } from "@/lib/wallets";

// Both are only needed after the initial paint — the ember field is
// purely decorative and the QR modal only mounts on interaction — so
// they're code-split out of the main bundle.
const EmberField = dynamic(() => import("@/components/EmberField"), {
  ssr: false,
});
const QRModal = dynamic(() => import("@/components/QRModal"), {
  ssr: false,
});

const easing = [0.16, 1, 0.3, 1] as const;

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-120px" },
    transition: { duration: 1.1, delay, ease: easing },
  };
}

export default function Home() {
  const [activeWallet, setActiveWallet] = useState<Wallet | null>(null);

  const closeModal = useCallback(() => setActiveWallet(null), []);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative flex flex-col items-center overflow-hidden">
        {/* 1. Hero */}
        <section
          aria-label="Introduction"
          className="relative flex min-h-[100svh] w-full flex-col items-center justify-center px-6 text-center"
        >
          <div className="absolute inset-0">
            <EmberField />
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black" />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease: easing }}
            className="text-hero relative z-10 max-w-5xl font-semibold text-white text-balance"
          >
            Before you burn it.
            <br />
            Donate it.
          </motion.h1>
        </section>

        {/* 2. Wallets */}
        <section
          aria-labelledby="wallets-heading"
          className="flex min-h-[100svh] w-full flex-col items-center justify-center px-6 py-30"
        >
          <motion.h2
            id="wallets-heading"
            {...reveal()}
            className="text-section-title mb-20 text-center font-semibold text-balance text-white sm:mb-28"
          >
            Choose your network.
          </motion.h2>

          <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            {wallets.map((wallet, i) => (
              <WalletCard
                key={wallet.id}
                wallet={wallet}
                index={i}
                onShowQR={setActiveWallet}
              />
            ))}
          </div>
        </section>

        {/* 3. The statement */}
        <section
          aria-labelledby="statement-heading"
          className="flex min-h-[100svh] w-full flex-col items-center justify-center px-6 text-center"
        >
          <motion.h2
            id="statement-heading"
            {...reveal()}
            className="text-hero max-w-4xl font-semibold text-balance"
          >
            <span className="text-ash">Burning destroys value.</span>
            <br />
            <span className="text-white">Donating creates value.</span>
          </motion.h2>
        </section>

        {/* 4. Transparency */}
        <section
          aria-labelledby="transparency-heading"
          className="flex min-h-[100svh] w-full flex-col items-center justify-center px-6 text-center"
        >
          <motion.h2
            id="transparency-heading"
            {...reveal()}
            className="text-2xl text-ash sm:text-3xl"
          >
            Blockchain is public.
          </motion.h2>
          <motion.p
            {...reveal(0.25)}
            className="mt-6 text-2xl text-white sm:text-3xl"
          >
            Every donation is verifiable.
          </motion.p>
        </section>

        {/* 5. Minimal closing */}
        <section
          aria-label="Closing"
          className="flex min-h-[100svh] w-full flex-col items-center justify-center px-6 text-center"
        >
          <motion.p
            {...reveal()}
            className="text-hero max-w-5xl font-semibold text-balance text-white"
          >
            Before you burn it.
            <br />
            Donate it.
          </motion.p>
        </section>

        <QRModal wallet={activeWallet} onClose={closeModal} />
      </main>
    </MotionConfig>
  );
}
