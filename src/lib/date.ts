export function formatDate(dateString: string | undefined) {
  if (!dateString) return "—";

  const parsed = new Date(dateString);

  if (isNaN(parsed.getTime())) {
    const parts = dateString.split("-");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return new Date(`20${year}-${month}-${day}`).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    }

    return dateString;
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}
