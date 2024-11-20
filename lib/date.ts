export function formatDateToReadable(dateString: string): string {
  const date = new Date(dateString);

  // Format options for the desired output
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}
