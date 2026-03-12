import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Star, Sparkles, Trophy } from 'lucide-react';

interface CelebrationProps {
  show: boolean;
  type?: 'task' | 'module' | 'quiz';
  message?: string;
  onComplete?: () => void;
}

export default function Celebration({
  show,
  type = 'task',
  message,
  onComplete,
}: CelebrationProps) {
  const { t } = useTranslation('celebration');
  const [particles, setParticles] = useState<Array<{ id: number; x: number; color: string }>>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      
      // M-DS4: 2 spalvos (brand, accent) – DESIGN_GUIDE confetti/particles
      const palette = ['#627d98', '#d4a520']; // brand-500, accent-500
      const newParticles = Array.from({ length: type === 'module' ? 20 : 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: palette[i % palette.length],
      }));
      setParticles(newParticles);
      
      // Auto hide after animation
      const timer = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, type === 'module' ? 2500 : 1500);
      
      return () => clearTimeout(timer);
    }
  }, [show, type, onComplete]);

  if (!visible) return null;

  const getIcon = () => {
    switch (type) {
      case 'module':
        return <Trophy className="w-12 h-12 text-accent-500" />;
      case 'quiz':
        return <Star className="w-12 h-12 text-accent-500" />;
      default:
        return <CheckCircle className="w-10 h-10 text-emerald-500" />;
    }
  };

  const getMessage = () => {
    if (message) return message;
    switch (type) {
      case 'module':
        return t('moduleDone');
      case 'quiz':
        return t('quizDone');
      default:
        return t('taskDone');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-3 h-3 rounded-full particle"
            style={{
              left: `${particle.x}%`,
              bottom: '40%',
              backgroundColor: particle.color,
              animationDelay: `${Math.random() * 0.3}s`,
            }}
          />
        ))}
      </div>
      
      {/* Celebration card */}
      <div className={`
        bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 
        flex flex-col items-center gap-3 
        animate-bounce-in
        border-2 ${type === 'module' ? 'border-accent-400' : 'border-emerald-400'}
      `}>
        {/* Icon with glow */}
        <div className={`
          relative p-4 rounded-full 
          ${type === 'module' ? 'bg-accent-100 dark:bg-accent-900/30' : 'bg-emerald-100 dark:bg-emerald-900/30'}
          animate-celebrate
        `}>
          {getIcon()}
          
          {/* Sparkles around icon */}
          <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-accent-400 animate-pulse" />
          <Sparkles className="absolute -bottom-1 -left-1 w-4 h-4 text-brand-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
        </div>
        
        {/* Message */}
        <p className={`
          text-lg font-bold 
          ${type === 'module' ? 'text-accent-600 dark:text-accent-400' : 'text-emerald-600 dark:text-emerald-400'}
        `}>
          {getMessage()}
        </p>
        
        {type === 'module' && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('continueNext')}
          </p>
        )}
      </div>
    </div>
  );
}
