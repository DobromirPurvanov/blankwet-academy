import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'horizontal' | 'vertical' | 'icon-only';
  color?: 'purple' | 'white' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showAcademy?: boolean;
  className?: string;
}

export function Logo({
  variant = 'horizontal',
  color = 'purple',
  size = 'md',
  showAcademy = true,
  className,
}: LogoProps) {
  const colorClasses = {
    purple: 'text-purple-700',
    white: 'text-white',
    dark: 'text-bw-text',
  };

  const sizeClasses = {
    sm: variant === 'horizontal' ? 'text-xl' : 'text-lg',
    md: variant === 'horizontal' ? 'text-2xl' : 'text-xl',
    lg: variant === 'horizontal' ? 'text-3xl' : 'text-2xl',
  };

  const academySizeClasses = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
  };

  if (variant === 'icon-only') {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <svg width={size === 'sm' ? 28 : size === 'md' ? 36 : 44} height={size === 'sm' ? 28 : size === 'md' ? 36 : 44} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4C20 4 8 14 8 22C8 28.627 13.373 34 20 34C26.627 34 32 28.627 32 22C32 14 20 4 20 4Z" fill="currentColor" className={colorClasses[color]} />
          <circle cx="20" cy="22" r="4" fill="white" fillOpacity="0.4" />
        </svg>
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={cn('flex flex-col items-center', className)}>
        <span className={cn('font-heading italic font-semibold', sizeClasses[size], colorClasses[color])}>blank</span>
        <div className="flex items-center -mt-1">
          <svg width={size === 'sm' ? 12 : size === 'md' ? 16 : 20} height={size === 'sm' ? 12 : size === 'md' ? 16 : 20} viewBox="0 0 16 16" fill="none" className={cn('mx-0.5', colorClasses[color])}>
            <path d="M8 2C8 2 3 7 3 10C3 12.761 5.239 15 8 15C10.761 15 13 12.761 13 10C13 7 8 2 8 2Z" fill="currentColor" />
          </svg>
          <span className={cn('font-heading italic font-semibold', sizeClasses[size], colorClasses[color])}>wet</span>
        </div>
        {showAcademy && (
          <span className={cn('font-body font-medium tracking-[0.15em] uppercase mt-1', academySizeClasses[size], color === 'purple' ? 'text-purple-500' : color === 'white' ? 'text-white/70' : 'text-bw-text-secondary')}>academy</span>
        )}
      </div>
    );
  }

  return (
    <div className={cn('flex items-baseline', className)}>
      <span className={cn('font-heading italic font-semibold', sizeClasses[size], colorClasses[color])}>blank</span>
      <div className="relative inline-flex items-center">
        <svg width={size === 'sm' ? 10 : size === 'md' ? 14 : 18} height={size === 'sm' ? 10 : size === 'md' ? 14 : 18} viewBox="0 0 16 16" fill="none" className={cn('mx-0.5 self-start mt-1', colorClasses[color])}>
          <path d="M8 2C8 2 3 7 3 10C3 12.761 5.239 15 8 15C10.761 15 13 12.761 13 10C13 7 8 2 8 2Z" fill="currentColor" />
        </svg>
        <span className={cn('font-heading italic font-semibold', sizeClasses[size], colorClasses[color])}>wet</span>
      </div>
      {showAcademy && (
        <span className={cn('font-body font-medium tracking-[0.12em] uppercase ml-2', academySizeClasses[size], color === 'purple' ? 'text-purple-500' : color === 'white' ? 'text-white/70' : 'text-bw-text-secondary')}>academy</span>
      )}
    </div>
  );
}
