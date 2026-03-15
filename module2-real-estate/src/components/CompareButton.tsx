import type React from 'react';
import { Button } from '@/components/ui/button';

interface CompareButtonProps {
  isSelected?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
}

export function CompareButton({
  isSelected = false,
  isDisabled = false,
  onClick,
}: CompareButtonProps): React.ReactElement {
  return (
    <Button
      type="button"
      variant={isSelected ? 'default' : 'outline'}
      className="w-full"
      disabled={isDisabled && !isSelected}
      onClick={onClick}
    >
      {isSelected ? 'Quitar de comparar' : 'Comparar'}
    </Button>
  );
}