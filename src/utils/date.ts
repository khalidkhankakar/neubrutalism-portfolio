/**
 * Formats a date string into the format 'MMM DD, YYYY' (e.g., "OCT 24, 2026")
 * @param dateString - The date string to format
 * @returns Formatted date string in uppercase
 */
export function formatDate(isoString:string) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
  });
}
