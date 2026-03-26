import type React from 'react';
import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function ImageModal({
  images,
  currentIndex,
  isOpen,
  title,
  onClose,
  onPrev,
  onNext,
}: ImageModalProps): React.ReactElement | null {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onPrev();
      if (event.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-white/20"
        onClick={onClose}
        aria-label="Cerrar modal"
      >
        <X className="h-6 w-6" />
      </Button>

      {images.length > 1 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
          onClick={onPrev}
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
      )}

      <div className="max-w-6xl w-full flex flex-col items-center">
        <img
          src={currentImage}
          alt={`${title} - Imagen ${currentIndex + 1}`}
          className="max-h-[85vh] max-w-full object-contain rounded-lg"
        />

        <div className="mt-4 text-white text-sm md:text-base">
          {currentIndex + 1} of {images.length}
        </div>
      </div>

      {images.length > 1 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
          onClick={onNext}
          aria-label="Imagen siguiente"
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      )}
    </div>
  );
}