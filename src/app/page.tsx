"use client";

import { ChevronDown } from "lucide-react";
import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { MotionConfig, motion } from "framer-motion";
import WalletCard from "@/components/WalletCard";
import DonateMark from "@/components/DonateMark";
import { wallets, type Wallet } from "@/lib/wallets";

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

function DonateText() {
  return (
    <span className="inline-flex items-center translate-y-[8px]">
      <span className="donate-gradient inline-flex -translate-y-2 sm:-translate-y-1 items-center">
        <DonateMark />
        onate
      </span>
      <span className="text-white translate-y-[-1px]"> it.</span>
    </span>
  );
}

export default function Home() {
  const [activeWallet, setActiveWallet] = useState<Wallet | null>(null);

  const closeModal = useCallback(() => setActiveWallet(null), []);

  const scrollToWallets = useCallback(() => {
    document
      .getElementById("wallets")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative flex flex-col items-center overflow-hidden">

        <section
          aria-label="Introduction"
          className="relative flex min-h-[100svh] w-full flex-col items-center justify-center px-6 text-center"
        >
          <div className="absolute inset-0">
            <EmberField />
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease: easing }}
            className="relative z-10 flex flex-col items-center"
          >
            <h1 className="text-hero max-w-5xl font-semibold text-white text-balance">
              Before you burn it.
            </h1>

            <button
              onClick={scrollToWallets}
              className="donate-link mt-4 text-hero font-semibold text-balance"
            >
              <DonateText />
            </button>

            <button
              onClick={scrollToWallets}
              className="mt-16 bounce-arrow text-white/60 transition hover:text-white"
              aria-label="Scroll to donation wallets"
            >
              <ChevronDown size={42} />
            </button>
          </motion.div>
        </section>


        <section
          id="wallets"
          aria-labelledby="wallets-heading"
          className="scroll-mt-24 flex min-h-[100svh] w-full flex-col items-center justify-center px-6 py-30"
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


        <section
          aria-labelledby="statement-heading"
          className="flex min-h-[100svh] w-full flex-col items-center justify-center px-6 text-center"
        >
          <motion.h2
            id="statement-heading"
            {...reveal()}
            className="text-hero max-w-4xl font-semibold text-balance"
          >
            <button
              onClick={scrollToWallets}
              className="text-ash transition hover:text-orange-400"
            >
              Burning destroys value.
            </button>

            <br />

            <button
              onClick={scrollToWallets}
              className="text-white transition hover:text-orange-400"
            >
              Donating creates value.
            </button>
          </motion.h2>
        </section>


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

          <button
            onClick={scrollToWallets}
            className="mt-6 text-2xl text-white transition hover:text-orange-400 sm:text-3xl"
          >
            Every donation is verifiable.
          </button>
        </section>


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

            <button onClick={scrollToWallets}>
              <DonateText />
            </button>
          </motion.p>
        </section>


        <QRModal wallet={activeWallet} onClose={closeModal} />

      </main>
    </MotionConfig>
  );
}