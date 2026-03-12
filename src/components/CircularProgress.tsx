interface CircularProgressProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
  label?: string;
  className?: string;
}

export default function CircularProgress({
  progress,
  size = 80,
  strokeWidth = 8,
  showPercentage = true,
  label,
  className = '',
}: CircularProgressProps) {
  const safeProgress = Number.isFinite(progress) ? Math.min(100, Math.max(0, progress)) : 0;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (safeProgress / 100) * circumference;

  // Color based on progress
  const getProgressColor = () => {
    if (safeProgress >= 100) return 'text-emerald-500';
    if (safeProgress >= 70) return 'text-brand-500';
    if (safeProgress >= 30) return 'text-accent-500';
    return 'text-gray-400';
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />
        
        {/* Gradient definition - Navy to Gold */}
        <defs>
          <linearGradient id={`progress-gradient-${safeProgress}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#334e68" />
            <stop offset="100%" stopColor="#d4a520" />
          </linearGradient>
        </defs>
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#progress-gradient-${safeProgress})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
          style={{
            filter: safeProgress > 0 ? 'drop-shadow(0 0 6px rgba(51, 78, 104, 0.4))' : 'none',
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showPercentage && (
          <span className={`text-lg font-bold ${getProgressColor()}`}>
            {Math.round(safeProgress)}%
          </span>
        )}
        {label && (
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
