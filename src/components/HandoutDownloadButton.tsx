import { Download } from 'lucide-react';
import CTAButton from './ui/CTAButton';

interface HandoutDownloadButtonProps {
  label: string;
  onClick: () => void | Promise<void>;
  className?: string;
  iconClassName?: string;
}

export function HandoutDownloadButton({
  label,
  onClick,
  className = '',
  iconClassName = 'w-5 h-5',
}: HandoutDownloadButtonProps) {
  return (
    <CTAButton
      variant="secondary"
      onClick={onClick}
      className={className}
      aria-label={label}
    >
      <Download className={iconClassName} aria-hidden />
      {label}
    </CTAButton>
  );
}
