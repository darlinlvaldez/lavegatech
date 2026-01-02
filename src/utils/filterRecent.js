export function itsNewProduct(publicationDate, days = 30) {
  if (!publicationDate) return false;

  const publicDate = new Date(publicationDate);
  const today = new Date();

  const diffMs = today - publicDate; 
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return diffDays <= days;
}