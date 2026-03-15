import type React from 'react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { filterProperties } from '@/lib/storage';
import type { Property } from '@/types/property';
import { formatPrice, formatArea } from '@/lib/utils';

interface ComparePageProps {
  compareList: string[];
  onRemoveFromCompare: (id: string) => void;
}

export function ComparePage({
  compareList,
  onRemoveFromCompare,
}: ComparePageProps): React.ReactElement {
  const allProperties = useMemo(() => filterProperties({}), []);

  const selectedProperties = useMemo(() => {
    return allProperties.filter((property) => compareList.includes(property.id));
  }, [allProperties, compareList]);

  const pricePerSqm = (property: Property): number => {
    if (!property.area || property.area <= 0) return 0;
    return property.price / property.area;
  };

  const lowestPrice =
    selectedProperties.length > 0
      ? Math.min(...selectedProperties.map((property) => property.price))
      : 0;

  const highestArea =
    selectedProperties.length > 0
      ? Math.max(...selectedProperties.map((property) => property.area))
      : 0;

  const bestPricePerSqm =
    selectedProperties.length > 0
      ? Math.min(...selectedProperties.map((property) => pricePerSqm(property)))
      : 0;

  if (selectedProperties.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="text-center py-16 border rounded-xl bg-card">
          <h1 className="text-3xl font-bold mb-4">Comparación de Propiedades</h1>
          <p className="text-muted-foreground text-lg mb-6">
            No properties selected for comparison
          </p>
          <Button asChild>
            <Link to="/">Volver a propiedades</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Comparación de Propiedades</h1>
          <p className="text-muted-foreground">
            {selectedProperties.length} seleccionada
            {selectedProperties.length !== 1 ? 's' : ''} para comparar
          </p>
        </div>

        <Button asChild variant="outline">
          <Link to="/">Volver al listado</Link>
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="border-b bg-muted/40">
              <th className="text-left p-4 font-semibold">Métrica</th>
              {selectedProperties.map((property) => (
                <th key={property.id} className="text-left p-4 align-top">
                  <div className="space-y-3">
                    <div className="font-semibold text-base">{property.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {property.city}
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => onRemoveFromCompare(property.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Quitar
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="p-4 font-medium">Precio</td>
              {selectedProperties.map((property) => {
                const isBest = property.price === lowestPrice;

                return (
                  <td
                    key={property.id}
                    className={`p-4 ${isBest ? 'bg-green-100 dark:bg-green-900/30 font-semibold' : ''}`}
                  >
                    {formatPrice(property.price)}
                    {isBest && (
                      <div className="text-xs text-green-700 dark:text-green-400 mt-1">
                        Mejor precio
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>

            <tr className="border-b">
              <td className="p-4 font-medium">Habitaciones</td>
              {selectedProperties.map((property) => (
                <td key={property.id} className="p-4">
                  {property.bedrooms}
                </td>
              ))}
            </tr>

            <tr className="border-b">
              <td className="p-4 font-medium">Baños</td>
              {selectedProperties.map((property) => (
                <td key={property.id} className="p-4">
                  {property.bathrooms}
                </td>
              ))}
            </tr>

            <tr className="border-b">
              <td className="p-4 font-medium">Área</td>
              {selectedProperties.map((property) => {
                const isBest = property.area === highestArea;

                return (
                  <td
                    key={property.id}
                    className={`p-4 ${isBest ? 'bg-blue-100 dark:bg-blue-900/30 font-semibold' : ''}`}
                  >
                    {formatArea(property.area)}
                    {isBest && (
                      <div className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                        Mayor área
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>

            <tr>
              <td className="p-4 font-medium">Precio / m²</td>
              {selectedProperties.map((property) => {
                const value = pricePerSqm(property);
                const isBest = value === bestPricePerSqm;

                return (
                  <td
                    key={property.id}
                    className={`p-4 ${isBest ? 'bg-amber-100 dark:bg-amber-900/30 font-semibold' : ''}`}
                  >
                    {formatPrice(value)}
                    {isBest && (
                      <div className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                        Mejor valor
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}