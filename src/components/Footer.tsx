"use client";

import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 py-14">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center">

        <h3 className="text-lg font-semibold text-white">
          Don't Burn Crypto
        </h3>

        <p className="mt-2 text-white/60">
          Before you burn it. Donate it.
        </p>

        <p className="mt-8 text-sm text-white/40">
          Open Source • Public Blockchain • No Registration • No Cookies
        </p>

        <div className="mt-8 flex items-center gap-8">

          <Link
            href="https://github.com/cristianalon/dontburncrypto"
            target="_blank"
            className="flex items-center gap-2 text-white/60 transition hover:text-orange-400"
          >
            <Github size={18} />
            GitHub
          </Link>

          <Link
            href="https://x.com/dontburncrypto"
            target="_blank"
            className="flex items-center gap-2 text-white/60 transition hover:text-orange-400"
          >
            <Twitter size={18} />
            X
          </Link>

          <Link
            href="https://reddit.com/u/DontBurnCrypto"
            target="_blank"
            className="flex items-center gap-2 text-white/60 transition hover:text-orange-400"
          >
            Reddit
          </Link>

          <Link
            href="mailto:dontburncrypto@gmail.com"
            className="flex items-center gap-2 text-white/60 transition hover:text-orange-400"
          >
            <Mail size={18} />
            Contact
          </Link>

        </div>

        <p className="mt-10 text-xs text-white/30">
          © 2026 Don't Burn Crypto
        </p>

      </div>
    </footer>
  );
}