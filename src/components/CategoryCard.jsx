import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export default function CategoryCard({
  icon,
  badge,
  title,
  subtitle,
  description,
  buttonText,
  onClick,
  accentColor = '#E67E42',
  featurePills = []
}) {
  const handleClick = () => {
    sound.playSuccess();
    onClick();
  };

  return (
    <div className="bg-white border-2 border-[#DDE2E5] hover:border-[#18324A] rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-md group relative overflow-hidden">
      {/* Top Accent Stripe */}
      <div 
        className="absolute top-0 left-0 right-0 h-1.5 transition-transform origin-left group-hover:scale-x-105"
        style={{ backgroundColor: accentColor }}
      />

      <div>
        {/* Header icon & badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-14 h-14 rounded-2xl bg-[#F7F3EA] border border-[#DDE2E5] flex items-center justify-center text-3xl shadow-2xs group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#4E8585] bg-[#F7F3EA] px-3 py-1 rounded-full border border-[#DDE2E5]">
            {badge}
          </span>
        </div>

        {/* Title & subtitle */}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#18324A] tracking-tight mb-2">
          {title}
        </h3>
        <p className="text-sm font-semibold text-[#E67E42] mb-3">
          {subtitle}
        </p>
        <p className="text-sm text-[#20303C]/80 leading-relaxed mb-6">
          {description}
        </p>

        {/* Quick Features List */}
        {featurePills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {featurePills.map((feat, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium text-[#20303C]/80 bg-[#F7F3EA] px-2.5 py-1 rounded-lg border border-[#DDE2E5]"
              >
                {feat}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={handleClick}
        className="w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base text-white transition-all shadow-md active:scale-98 flex items-center justify-center gap-3 cursor-pointer group-hover:brightness-105"
        style={{ backgroundColor: accentColor }}
      >
        <span>{buttonText}</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
