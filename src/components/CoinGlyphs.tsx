type GlyphProps = {
  className?: string;
};

export function BtcGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" stroke="#F7931A" strokeWidth="1.2" />
      <path
        d="M12.5 9.5h5.6a2.9 2.9 0 0 1 0 5.8h-5.6m0-5.8v12.9m0-12.9H11m1.5 5.8h6.1a2.9 2.9 0 0 1 0 5.8h-6.1m0-5.8H11m1.5 5.8H11m3.4-12.9v-2m3 2v-2m-3 16.9v2m3-2v2"
        stroke="#F7931A"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EthGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" stroke="#627EEA" strokeWidth="1.2" />
      <path
        d="M16 7.5 10 17l6 3.5 6-3.5-6-9.5Z"
        stroke="#627EEA"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M10 18.7 16 24.5l6-5.8-6 3.4-6-3.4Z"
        stroke="#627EEA"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SolGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" stroke="#14F195" strokeWidth="1.2" />
      <path
        d="M10.8 12.2h10.4M9.6 16h10.4M10.8 19.8h10.4"
        stroke="#14F195"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function UsdtGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" stroke="#26A17B" strokeWidth="1.2" />
      <path
        d="M16 11v10M12 13.4h8"
        stroke="#26A17B"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M10.5 11H21.5"
        stroke="#26A17B"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}