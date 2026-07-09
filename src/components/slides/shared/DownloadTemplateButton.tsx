import { Download } from 'lucide-react';

interface DownloadTemplateButtonProps {
  text: string;
  filename: string;
  label: string;
  ariaLabel: string;
  className?: string;
}

export default function DownloadTemplateButton({
  text,
  filename,
  label,
  ariaLabel,
  className = 'btn-secondary inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg text-sm font-medium',
}: DownloadTemplateButtonProps) {
  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className={className}
      aria-label={ariaLabel}
    >
      <Download className="w-4 h-4 shrink-0" aria-hidden />
      {label}
    </button>
  );
}
