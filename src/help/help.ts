export const slugify = (text?: string) => {
  if (!text) return "";
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const originalTitle = (slug: string): string => {
  if (!slug) return "";
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

export const loadingList = new Array(4).fill(null);

export const toSlug = (str: string) =>
  str.toLowerCase().replace(/\s+/g, "-").trim();

export function toBerhanTime(isoString: string) {
  const date = new Date(isoString);

  // Convert to EAT (UTC +3)
  const eatDate = new Date(date.getTime() + 3 * 60 * 60 * 1000);

  let hours = eatDate.getHours();
  const minutes = eatDate.getMinutes().toString().padStart(2, "0");
  const seconds = eatDate.getSeconds().toString().padStart(2, "0");

  // Convert EAT → Ethiopian (Berhan) hours
  let ethHour = hours - 6;
  if (ethHour <= 0) ethHour += 12;

  // Final format like: 13/11/2025, 8:35:10
  const day = eatDate.getDate().toString().padStart(2, "0");
  const month = (eatDate.getMonth() + 1).toString().padStart(2, "0");
  const year = eatDate.getFullYear();

  return `${day}/${month}/${year}, ${ethHour}:${minutes}:${seconds}`;
}

export const mapCorrectOption = (option: string): "A" | "B" | "C" | "D" => {
  switch (option) {
    case "A":
    case "B":
    case "C":
    case "D":
      return option;
    default:
      return "A"; // fallback
  }
};

export const mapDifficulty = (
  difficulty: string
): "Basics" | "Intermediate" | "Advance" => {
  switch (difficulty) {
    case "Basics":
    case "Intermediate":
    case "Advance":
      return difficulty;
    default:
      return "Basics"; // fallback
  }
};
