import { useState } from 'react';
import type { M9Character } from '../../../types/modules';

export interface CharacterCardProps {
  character: M9Character;
  /** Kai nurodyta – kortelė paspaudžiama, vedė į hub su šiuo veikėju (M9 intro). */
  onSelect?: () => void;
}

/** Modulio 9 role-quest: asmens kortelė (veikėjas atliekantis scenarijų). Rodo nuotrauką (fallback jei PNG nėra), vardą, amžių, profesiją, patirtį, hobį. Kai onSelect – paspaudžiama. */
export default function CharacterCard({ character, onSelect }: CharacterCardProps) {
  const [imageError, setImageError] = useState(false);
  const showImage = character.imagePath && !imageError;
  const isClickable = Boolean(onSelect);

  const baseClasses =
    'flex flex-wrap gap-4 p-4 rounded-xl border-2 border-brand-200 dark:border-brand-800 bg-gradient-to-r from-brand-50 to-accent-50 dark:from-brand-900/20 dark:to-accent-900/20';
  const interactiveClasses = isClickable
    ? ' cursor-pointer hover:ring-2 hover:ring-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow'
    : '';

  const content = (
    <>
      {showImage && (
        <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
          <img
            src={`${import.meta.env.BASE_URL || '/'}${character.imagePath.replace(/^\//, '')}`}
            alt={`${character.name} – ${character.profession}`}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
          {character.name}
          <span className="font-normal text-gray-600 dark:text-gray-400 ml-2">{character.age} m.</span>
        </h4>
        <p className="text-sm font-medium text-brand-700 dark:text-brand-300">{character.profession}</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{character.experience}</p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
          Hobis: {character.hobby}
        </p>
      </div>
    </>
  );

  if (isClickable && onSelect) {
    return (
      <button
        type="button"
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect();
          }
        }}
        className={baseClasses + interactiveClasses + ' min-h-[44px] touch-manipulation'}
        aria-label={`Pasirinkti veikėją ${character.name} – atsidarys jo 4 užduotys`}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={baseClasses} role="complementary" aria-label={`Veikėjas: ${character.name}, ${character.profession}`}>
      {content}
    </div>
  );
}
