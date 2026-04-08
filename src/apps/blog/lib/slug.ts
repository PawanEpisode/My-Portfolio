export function slugifyTitle(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function slugifyTagLabel(label: string): string {
  return slugifyTitle(label);
}
