export function calculateReadingTime(htmlContent:string) {
  const wordsPerMinute = 200; // Average reading speed

  // Remove HTML tags using regex
  const textContent = htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

  // Count words
  const words = textContent.split(' ').length;

  // Calculate estimated reading time
  const readingTime = Math.ceil(words / wordsPerMinute);

  return `${readingTime} min read`;

  return `${readingTime} min read`;
}