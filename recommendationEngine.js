// המלצות למשתמש
export function recommendChapters(history) {
  const top = [23, 121, 150];
  return top.filter(ch => !history.includes(ch));
}
