"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";

const easing = [0.16, 1, 0.3, 1] as const;
const COPIED_DURATION = 1800;

type CopyButtonProps = {
  address: string;
  label: string;
};

function CopyButton({ address, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(address);

      setCopied(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, COPIED_DURATION);
    } catch {}
  }, [address]);

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.03 }}
      onClick={handleCopy}
      className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition-all duration-300 hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-white"
      aria-label={`Copy ${label} address`}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="copied"
            initial={{ opacity: 0, scale: .8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: .8 }}
            transition={{ duration: .25 }}
            className="flex items-center gap-2 text-green-400"
          >
            <Check size={16} />
            Address copied
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ opacity: 0, scale: .8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: .8 }}
            transition={{ duration: .25 }}
            className="flex items-center gap-2"
          >
            <Copy size={16} />
            Copy address
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default memo(CopyButton);