type DonateMarkProps = {
  className?: string;
};

export default function DonateMark({ className }: DonateMarkProps) {
  return (
    <span
      className={`inline-flex items-center ${className ?? ""}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 42 42"
        className="mr-[-0.05em] h-[0.95em] w-[0.82em]"
        fill="none"
      >
        {/* Outer coin circle */}
        <circle
          cx="21"
          cy="21"
          r="18"
          stroke="#F7931A"
          strokeWidth="2.5"
        />

        {/* D shape */}
        <path
          d="M15 10V32"
          stroke="#F7931A"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <path
          d="M15 10H22C28 10 32 14 32 21C32 28 28 32 22 32H15"
          stroke="#F7931A"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Bitcoin inspired bars */}
        <path
          d="M18 7V13M23 7V13M18 29V35M23 29V35"
          stroke="#F7931A"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}