export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // elimina tildes
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '') // elimina signos
    .replace(/\s+/g, ' ') // espacios múltiples
    .trim();
}
