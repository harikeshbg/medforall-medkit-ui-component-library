export function id(prefix = "mk"): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}
