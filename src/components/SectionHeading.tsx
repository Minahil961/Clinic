import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  theme?: 'dark' | 'light';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  theme = 'light',
  className = ''
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'} ${className}`}
    >
      {badge && (
        <p
          className={`text-xs font-semibold tracking-[0.25em] uppercase mb-2 ${
            isDark ? 'text-[#C9B98A]' : 'text-[#44562A]'
          }`}
        >
          {badge}
        </p>
      )}
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-balance leading-tight ${
          isDark ? 'text-[#F5F0E1]' : 'text-[#2A3320]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-sm md:text-base leading-relaxed text-pretty ${
            isDark ? 'text-[#F5F0E1]/80' : 'text-[#2A3320]/75'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
