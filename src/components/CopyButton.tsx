"use client";

import { memo, useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";

const COPIED_DURATION_MS = 1500;
const easing = [0.16, 1, 0.3, 1] as const;

type CopyButtonProps = {
  address: string;
  label: string;
};

function CopyButton({ address, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), COPIED_DURATION_MS);
    } catch {
      // Clipboard access can fail silently on unsupported browsers.
    }
  }, [address]);

  return (
    <motion.button
      layout
      onClick={handleCopy}
      className="flex items-center gap-2 text-sm text-white/80 transition-colors duration-300 hover:text-white"
      aria-label={`Copy ${label} address`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3, ease: easing }}
            className="flex items-center gap-2"
          >
            <Check size={15} strokeWidth={1.75} />
            Copied
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3, ease: easing }}
            className="flex items-center gap-2"
          >
            <Copy size={15} strokeWidth={1.5} />
            Copy
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default memo(CopyButton);
