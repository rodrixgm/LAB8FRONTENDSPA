import type React from 'react';
import { useState } from 'react';
import { ImageModal } from './ImageModal';

interface ImageGalleryProps {
  images: string[];
  title: string;
  operationTypeLabel?: string;
  operationBadgeClassName?: string;
}

export function ImageGallery({
  images,
  title,
  operationTypeLabel,
  operationBadgeClassName,
}: ImageGalleryProps): React.ReactElement {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const safeImages =
    images.length > 0
      ? images
      : [
          `https://placehold.co/1200x600/e2e8f0/64748b?text=${encodeURIComponent(
            title
          )}`,
        ];

  const openModal = (index: number): void => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const goToPrev = (): void => {
    setSelectedIndex((prev) =>
      prev === 0 ? safeImages.length - 1 : prev - 1
    );
  };

  const goToNext = (): void => {
    setSelectedIndex((prev) =>
      prev === safeImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      <div className="space-y-3">
        <div className="relative rounded-lg overflow-hidden">
          <button
            type="button"
            className="w-full"
            onClick={() => openModal(0)}
          >
            <img
              src={safeImages[0]}
              alt={`${title} - Imagen principal`}
              className="w-full h-[400px] object-cover cursor-pointer"
            />
          </button>

          {operationTypeLabel && operationBadgeClassName && (
            <span
              className={`absolute top-4 left-4 px-4 py-2 text-sm font-semibold rounded-full ${operationBadgeClassName}`}
            >
              {operationTypeLabel}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {safeImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => openModal(index)}
              className="rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <img
                src={image}
                alt={`${title} - Imagen ${index + 1}`}
                className="w-full h-24 object-cover cursor-pointer hover:opacity-90 transition"
              />
            </button>
          ))}
        </div>
      </div>

      <ImageModal
        images={safeImages}
        currentIndex={selectedIndex}
        isOpen={isModalOpen}
        title={title}
        onClose={closeModal}
        onPrev={goToPrev}
        onNext={goToNext}
      />
    </>
  );
}