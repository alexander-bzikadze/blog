export function argbToRGB(color: number): string {
  return '#' + ('000000' + (color & 0xFFFFFF).toString(16)).slice(-6);
}
