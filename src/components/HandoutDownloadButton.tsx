import { Download } from 'lucide-react';

interface HandoutDownloadButtonProps {
  label: string;
  onClick: () => void | Promise<void>;
  className?: string;
  iconClassName?: string;
}

export function HandoutDownloadButton({
  label,
  onClick,
  className = 'btn-secondary flex items-center justify-center gap-2',
  iconClassName = 'w-5 h-5',
}: HandoutDownloadButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      aria-label={label}
    >
      <Download className={iconClassName} aria-hidden />
      {label}
    </button>
  );
}
