const germanListFormatter = new Intl.ListFormat("de", {
  style: "long",
  type: "conjunction",
});

export function formatGermanList(items: string[]): string {
  return germanListFormatter.format(items);
}

export function getGermanListSeparator(index: number, total: number): string {
  if (index === total - 2) return " und ";
  if (index < total - 1) return ", ";
  return "";
}
