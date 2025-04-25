
class AdvancedTextRenderer {
  constructor() {
    this.hebrewFontFamily = 'Frank Ruhl Libre, serif';
    this.russianFontFamily = 'Times New Roman, serif';
    this.colorSchemes = {
      default: {
        text: '#212529',
        divineName: '#B45309',
        background: '#FFFFFF'
      }
    };
  }

  renderHebrewWithNikud(text, options = {}) {
    const {
      fontSize = 20,
      showNikud = true,
      showTaamim = false,
      colorScheme = 'default',
      divineNameStyle = 'ה׳',
      lineHeight = 1.8
    } = options;

    const colors = this.colorSchemes[colorScheme] || this.colorSchemes.default;
    let processedText = text.replace(/יהוה|ה'|י-ה-ו-ה|השם|יי|אדנ-י/g,
      `<span style='color: ${colors.divineName}; font-weight: bold;'>${divineNameStyle}</span>`);

    if (!showNikud)
      processedText = processedText.replace(/[ְ-ּׁ-ׂׄ-ׇ]/g, '');
    if (!showTaamim)
      processedText = processedText.replace(/[֑-֯]/g, '');

    return `<div style="font-family: ${this.hebrewFontFamily}; font-size: ${fontSize}px; line-height: ${lineHeight}; color: ${colors.text}; background-color: ${colors.background}; padding: 16px; border-radius: 8px; white-space: pre-wrap; direction: rtl;">${processedText}</div>`;
  }

  renderRussianWithDivineNames(text, options = {}) {
    const {
      fontSize = 18,
      colorScheme = 'default',
      divineNameStyle = 'ה׳',
      lineHeight = 1.6
    } = options;

    const colors = this.colorSchemes[colorScheme] || this.colorSchemes.default;
    const processedText = text.replace(/Господь|Бог|Всевышний|Иегова|ЙХВХ|Яхве|Адонай|Элохим|Саваоф|Шаддай/g,
      `<span style='color: ${colors.divineName}; font-weight: bold;'>${divineNameStyle}</span>`);

    return `<div style="font-family: ${this.russianFontFamily}; font-size: ${fontSize}px; line-height: ${lineHeight}; color: ${colors.text}; background-color: ${colors.background}; padding: 16px; border-radius: 8px; white-space: pre-wrap; direction: ltr; text-align: left;">${processedText}</div>`;
  }

  renderBilingualVerse(verse, options = {}) {
    const hebrewHtml = this.renderHebrewWithNikud(verse.hebrewText, options);
    const russianHtml = this.renderRussianWithDivineNames(verse.russianText, options);
    return `<div>${hebrewHtml}<div style="margin-top: 8px;"></div>${russianHtml}</div>`;
  }
}
