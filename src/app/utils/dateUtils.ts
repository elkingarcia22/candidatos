import { parse, isValid } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Intenta parsear una cadena de fecha probando múltiples formatos comunes en el repositorio.
 * @param dateStr La cadena de fecha a parsear
 * @returns Un objeto Date válido o undefined si falla
 */
export function parseFlexibleDate(dateStr: string | null | undefined): Date | undefined {
  if (!dateStr || typeof dateStr !== 'string') return undefined;

  const formats = [
    'yyyy-MM-dd',
    'dd/MM/yyyy',
    'MMMM yyyy', // Enero 2023
    'MMM yyyy',  // Ene 2023
    'yyyy',
  ];

  const cleaned = dateStr.trim();
  
  // Intento directo con formatos estándar
  for (const fmt of formats) {
    try {
      const parsed = parse(cleaned, fmt, new Date(), { locale: es });
      if (isValid(parsed) && parsed.getFullYear() > 1900) {
        return parsed;
      }
    } catch (e) {
      // Continuar con el siguiente formato
    }
  }

  // Intento eliminando "de" (ej. "Enero de 2023")
  const noDe = cleaned.replace(/\s+de\s+/gi, ' ');
  for (const fmt of formats) {
    try {
      const parsed = parse(noDe, fmt, new Date(), { locale: es });
      if (isValid(parsed) && parsed.getFullYear() > 1900) {
        return parsed;
      }
    } catch (e) {
      // Continuar
    }
  }

  return undefined;
}
