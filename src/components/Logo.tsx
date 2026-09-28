import React from 'react';

interface LogoProps {
  variant?: 'cream' | 'olive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'cream',
  size = 'md',
  showSubtitle = true,
  className = '',
  onClick
}) => {
  const isCream = variant === 'cream';
  const colorHex = isCream ? '#F5F0E1' : '#44562A';
  const accentHex = isCream ? '#E8DFCA' : '#34431F';

  // Dimension scaling
  const dimensions = {
    sm: { width: 140, height: 48, fontSize: 24, subSize: 6.5, arcH: 14 },
    md: { width: 180, height: 60, fontSize: 32, subSize: 8, arcH: 18 },
    lg: { width: 230, height: 76, fontSize: 40, subSize: 9.5, arcH: 22 },
    xl: { width: 300, height: 100, fontSize: 52, subSize: 12, arcH: 28 },
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex flex-col items-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      role="banner"
      aria-label="VOGUE Dental & Aesthetics Logo"
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 280 92"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 hover:scale-[1.02]"
      >
        {/* Smile curve arc above VOGUE: wide, elegant, tapered smile crescent */}
        <path
          d="M 44 26 C 88 50, 192 50, 236 26 C 204 42, 76 42, 44 26 Z"
          fill={colorHex}
        />

        {/* Primary Wordmark "VOGUE" in elegant serif capitals */}
        <text
          x="137"
          y="66"
          textAnchor="middle"
          fill={colorHex}
          fontFamily="'Cormorant Garamond', 'Playfair Display', Georgia, serif"
          fontSize="44"
          fontWeight="600"
          letterSpacing="4"
        >
          VOGUE
        </text>

        {/* Registered symbol ® */}
        <text
          x="224"
          y="46"
          fill={accentHex}
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="11"
          fontWeight="400"
        >
          ®
        </text>

        {/* Tagline: DENTAL & AESTHETICS in small widely letter-spaced capitals */}
        {showSubtitle && (
          <text
            x="140"
            y="85"
            textAnchor="middle"
            fill={accentHex}
            fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
            fontSize="10"
            fontWeight="500"
            letterSpacing="6.5"
          >
            DENTAL &amp; AESTHETICS
          </text>
        )}
      </svg>
    </div>
  );
};
