// זיהוי שמות ה'
export function detectDivineNames(text) {
  const names = ['Господь', 'Бог', 'Всевышний', 'Иегова'];
  const found = [];
  for (const name of names) {
    if (text.includes(name)) found.push(name);
  }
  return found;
}
