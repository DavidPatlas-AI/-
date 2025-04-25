/**
 * מנוע תיקון שמות השם משופר
 * 
 * הספרייה הזו מרחיבה את יכולות תיקון שמות השם בטקסטים ברוסית
 * עם תמיכה בהתאמות מורפולוגיות, שמירה על אותיות גדולות/קטנות,
 * ומגוון אפשרויות תיקון
 */

class DivineNameCorrector {
  constructor(options = {}) {
    // הגדרות ברירת מחדל
    this.options = {
      defaultStyle: 'dash',         // סגנון תיקון ברירת מחדל
      preserveCase: true,           // שמירה על אותיות גדולות/קטנות
      highlightChanges: false,      // האם להדגיש את השינויים בטקסט המתוקן
      includeExplanation: false,    // האם לכלול הסבר על השינויים שבוצעו
      strictMode: false,            // חיפוש מדויק או גמיש
      includeStats: true,           // האם לכלול סטטיסטיקות
      ...options
    };

    // הגדרת סגנונות תיקון
    this.styles = {
      dash: {
        name: 'С дефисом',
        example: 'Б-г',
        description: 'Замена буквы дефисом'
      },
      hebrew: {
        name: 'Иврит',
        example: 'ה\'',
        description: 'Замена на соответствующее имя на иврите'
      },
      hashem: {
        name: 'Словом',
        example: 'Вс-вышний',
        description: 'Замена на альтернативное название'
      },
      brackets: {
        name: 'В скобках',
        example: 'Б[о]г',
        description: 'Помещение буквы в скобки'
      },
      transliteration: {
        name: 'Транслитерация',
        example: 'Ашем',
        description: 'Использование транслитерации'
      }
    };

    // הגדרת המילונים לפי סגנון
    this.initializeDictionaries();
  }

  // אתחול מילוני החלפה
  initializeDictionaries() {
    // מילון המילים להחלפה - עם כל הנטיות והצורות
    this.replacementDictionary = {
      // "בוג" = אלוהים
      'бог': {
        dash: 'Б-г',
        hebrew: 'ה\'',
        hashem: 'Вс-вышний', 
        brackets: 'Б[о]г',
        transliteration: 'Ашем'
      },
      'бога': {
        dash: 'Б-га',
        hebrew: 'ה\'',
        hashem: 'Вс-вышнего',
        brackets: 'Б[о]га',
        transliteration: 'Ашема'
      },
      'богу': {
        dash: 'Б-гу',
        hebrew: 'ה\'',
        hashem: 'Вс-вышнему',
        brackets: 'Б[о]гу',
        transliteration: 'Ашему'
      },
      'богом': {
        dash: 'Б-гом',
        hebrew: 'ה\'',
        hashem: 'Вс-вышним',
        brackets: 'Б[о]гом',
        transliteration: 'Ашемом'
      },
      'боге': {
        dash: 'Б-ге',
        hebrew: 'ה\'',
        hashem: 'Вс-вышнем',
        brackets: 'Б[о]ге',
        transliteration: 'Ашеме'
      },
      'боже': {
        dash: 'Б-же',
        hebrew: 'ה\'',
        hashem: 'Вс-вышний',
        brackets: 'Б[о]же',
        transliteration: 'Ашем'
      },
      'божество': {
        dash: 'Б-жество',
        hebrew: 'ה\'',
        hashem: 'Вс-вышний',
        brackets: 'Б[о]жество',
        transliteration: 'Ашем'
      },

      // "גוספוד" = אדון
      'господь': {
        dash: 'Г-сподь',
        hebrew: 'ה\'',
        hashem: 'а-Шем',
        brackets: 'Г[о]сподь',
        transliteration: 'а-Шем'
      },
      'господа': {
        dash: 'Г-спода',
        hebrew: 'ה\'',
        hashem: 'а-Шема',
        brackets: 'Г[о]спода',
        transliteration: 'а-Шема'
      },
      'господу': {
        dash: 'Г-споду',
        hebrew: 'ה\'',
        hashem: 'а-Шему',
        brackets: 'Г[о]споду',
        transliteration: 'а-Шему'
      },
      'господом': {
        dash: 'Г-сподом',
        hebrew: 'ה\'',
        hashem: 'а-Шемом',
        brackets: 'Г[о]сподом',
        transliteration: 'а-Шемом'
      },
      'господе': {
        dash: 'Г-споде',
        hebrew: 'ה\'',
        hashem: 'а-Шеме',
        brackets: 'Г[о]споде',
        transliteration: 'а-Шеме'
      },

      // "וסביישני" = עליון
      'всевышний': {
        dash: 'Вс-вышний',
        hebrew: 'ה\'',
        hashem: 'Вс-вышний',
        brackets: 'Вс[е]вышний',
        transliteration: 'Элйон'
      },
      'всевышнего': {
        dash: 'Вс-вышнего',
        hebrew: 'ה\'',
        hashem: 'Вс-вышнего',
        brackets: 'Вс[е]вышнего',
        transliteration: 'Элйона'
      },
      'всевышнему': {
        dash: 'Вс-вышнему',
        hebrew: 'ה\'',
        hashem: 'Вс-вышнему',
        brackets: 'Вс[е]вышнему',
        transliteration: 'Элйону'
      },
      'всевышним': {
        dash: 'Вс-вышним',
        hebrew: 'ה\'',
        hashem: 'Вс-вышним',
        brackets: 'Вс[е]вышним',
        transliteration: 'Элйоном'
      },
      'всевышнем': {
        dash: 'Вс-вышнем',
        hebrew: 'ה\'',
        hashem: 'Вс-вышнем',
        brackets: 'Вс[е]вышнем',
        transliteration: 'Элйоне'
      },

      // "אדונאי"
      'адонай': {
        dash: 'А-донай',
        hebrew: 'ה\'',
        hashem: 'а-Шем',
        brackets: 'А[д]онай',
        transliteration: 'а-Шем'
      },

      // "טבוריץ" = בורא
      'творец': {
        dash: 'Тв-рец',
        hebrew: 'ה\'',
        hashem: 'Тв-рец',
        brackets: 'Тв[о]рец',
        transliteration: 'ха-Борэ'
      },
      'творца': {
        dash: 'Тв-рца',
        hebrew: 'ה\'',
        hashem: 'Тв-рца',
        brackets: 'Тв[о]рца',
        transliteration: 'ха-Борэ'
      },
      'творцу': {
        dash: 'Тв-рцу',
        hebrew: 'ה\'',
        hashem: 'Тв-рцу',
        brackets: 'Тв[о]рцу',
        transliteration: 'ха-Борэ'
      },
      'творцом': {
        dash: 'Тв-рцом',
        hebrew: 'ה\'',
        hashem: 'Тв-рцом',
        brackets: 'Тв[о]рцом',
        transliteration: 'ха-Борэ'
      },
      'творце': {
        dash: 'Тв-рце',
        hebrew: 'ה\'',
        hashem: 'Тв-рце',
        brackets: 'Тв[о]рце',
        transliteration: 'ха-Борэ'
      },

      // שמות אחרים
      'иегова': {
        dash: 'И-гова',
        hebrew: 'ה\'',
        hashem: 'а-Шем',
        brackets: 'И[е]гова',
        transliteration: 'а-Шем'
      },
      'яхве': {
        dash: 'Я-ве', 
        hebrew: 'ה\'',
        hashem: 'а-Шем',
        brackets: 'Я[х]ве',
        transliteration: 'а-Шем'
      },
      'саваоф': {
        dash: 'С-ваоф',
        hebrew: 'צבאות',
        hashem: 'Ц-ваот',
        brackets: 'С[а]ваоф',
        transliteration: 'Цваот'
      },
      'шаддай': {
        dash: 'Ш-ддай',
        hebrew: 'שדי',
        hashem: 'Ш-дай',
        brackets: 'Ш[а]ддай',
        transliteration: 'Шадай'
      },
      'элохим': {
        dash: 'Эл-хим',
        hebrew: 'אלהים',
        hashem: 'Эл-ким',
        brackets: 'Эл[о]хим',
        transliteration: 'Элоким'
      }
    };

    // קטגוריות של שמות להחלפה (לסטטיסטיקות)
    this.nameCategories = {
      'divine': ['бог', 'бога', 'богу', 'богом', 'боге', 'боже', 'божество'],
      'lord': ['господь', 'господа', 'господу', 'господом', 'господе'],
      'most_high': ['всевышний', 'всевышнего', 'всевышнему', 'всевышним', 'всевышнем'],
      'creator': ['творец', 'творца', 'творцу', 'творцом', 'творце'],
      'tetragrammaton': ['иегова', 'яхве'],
      'other': ['адонай', 'саваоф', 'шаддай', 'элохим']
    };
  }

  /**
   * פונקציה ראשית לתיקון טקסט
   * @param {string} text - הטקסט לתיקון
   * @param {string} style - סגנון התיקון (dash, hebrew, hashem, brackets, transliteration)
   * @returns {Object} - אובייקט עם הטקסט המתוקן וסטטיסטיקות
   */
  correctText(text, style = this.options.defaultStyle) {
    if (!text) return { 
      text: '', 
      html: '', 
      stats: this.createEmptyStats() 
    };

    // וידוא שהסגנון קיים
    if (!this.styles[style]) {
      style = this.options.defaultStyle;
    }

    let processedText = text;
    let htmlResult = text;
    
    // מעקב אחר סטטיסטיקות
    const stats = this.createEmptyStats();

    // יצירת ביטוי רגולרי לחיפוש כל המילים
    const words = Object.keys(this.replacementDictionary);
    const wordsPattern = words.map(word => `\\b${word}\\b`).join('|');
    const regex = new RegExp(wordsPattern, 'gi');

    // ספירת מופעים ועיבוד הטקסט
    const matches = text.match(regex);
    
    if (matches) {
      // עדכון סטטיסטיקה כללית
      stats.total = matches.length;

      // החלפת כל המילים ועדכון סטטיסטיקות לפי קטגוריה
      words.forEach(word => {
        const replacement = this.replacementDictionary[word][style];
        
        // ביטוי רגולרי לחיפוש המילה בגבולות מילה
        const wordRegex = new RegExp(`\\b${word}\\b`, 'gi');
        
        // ספירת המופעים של המילה הספציפית
        const wordMatches = text.match(wordRegex);
        if (wordMatches) {
          const count = wordMatches.length;
          
          // עדכון סטטיסטיקות לפי קטגוריה
          for (const category in this.nameCategories) {
            if (this.nameCategories[category].includes(word.toLowerCase())) {
              stats.categories[category] += count;
              break;
            }
          }
          
          // החלפה בטקסט הרגיל
          processedText = processedText.replace(wordRegex, (match) => {
            // שמירה על אותיות גדולות/קטנות אם האפשרות מופעלת
            if (this.options.preserveCase && match.charAt(0) === match.charAt(0).toUpperCase()) {
              return replacement.charAt(0).toUpperCase() + replacement.slice(1);
            }
            return replacement;
          });
          
          // החלפה בטקסט HTML עם הדגשה אם האפשרות מופעלת
          if (this.options.highlightChanges) {
            htmlResult = htmlResult.replace(wordRegex, (match) => {
              let finalReplacement = replacement;
              
              // שמירה על אותיות גדולות/קטנות
              if (this.options.preserveCase && match.charAt(0) === match.charAt(0).toUpperCase()) {
                finalReplacement = finalReplacement.charAt(0).toUpperCase() + finalReplacement.slice(1);
              }
              
              return `<span class="divine-name">${finalReplacement}</span>`;
            });
          } else {
            htmlResult = processedText;
          }
        }
      });
    }

    // בניית הסבר אם האפשרות מופעלת
    let explanation = '';
    if (this.options.includeExplanation && stats.total > 0) {
      explanation = this.generateExplanation(stats, style);
    }

    return {
      text: processedText,
      html: htmlResult,
      stats: stats,
      explanation: explanation
    };
  }

  /**
   * יצירת אובייקט סטטיסטיקה ריק
   * @returns {Object} - אובייקט סטטיסטיקה ריק
   */
  createEmptyStats() {
    return {
      total: 0,
      categories: {
        divine: 0,    // בוג/אלהים
        lord: 0,      // גוספוד/אדוני
        most_high: 0, // וסביישני/עליון
        creator: 0,   // טבוריץ/בורא
        tetragrammaton: 0, // יגובה, יחבה וכו'
        other: 0      // אחרים
      }
    };
  }

  /**
   * יצירת הסבר על התיקונים שבוצעו
   * @param {Object} stats - סטטיסטיקת התיקונים
   * @param {string} style - סגנון התיקון שנבחר
   * @returns {string} - הסבר בפורמט טקסט
   */
  generateExplanation(stats, style) {
    const styleName = this.styles[style].name;
    const styleExample = this.styles[style].example;
    
    let explanation = `В этом тексте было исправлено ${stats.total} упоминаний имен Вс-вышнего, используя стиль "${styleName}" (пример: ${styleExample}).\n\n`;
    
    // הוספת פירוט לפי קטגוריות
    explanation += 'Статистика замены по типам:\n';
    
    if (stats.categories.divine > 0) {
      explanation += `- "Бог" (и падежи): ${stats.categories.divine}\n`;
    }
    
    if (stats.categories.lord > 0) {
      explanation += `- "Господь" (и падежи): ${stats.categories.lord}\n`;
    }
    
    if (stats.categories.most_high > 0) {
      explanation += `- "Всевышний" (и падежи): ${stats.categories.most_high}\n`;
    }
    
    if (stats.categories.creator > 0) {
      explanation += `- "Творец" (и падежи): ${stats.categories.creator}\n`;
    }
    
    if (stats.categories.tetragrammaton > 0) {
      explanation += `- Тетраграмматон (Иегова, Яхве): ${stats.categories.tetragrammaton}\n`;
    }
    
    if (stats.categories.other > 0) {
      explanation += `- Другие имена (Адонай, Саваоф и др.): ${stats.categories.other}\n`;
    }
    
    return explanation;
  }

  /**
   * קבלת רשימת כל הסגנונות הזמינים
   * @returns {Array} - מערך של אובייקטים המתארים את הסגנונות הזמינים
   */
  getAvailableStyles() {
    return Object.keys(this.styles).map(key => ({
      id: key,
      name: this.styles[key].name,
      example: this.styles[key].example,
      description: this.styles[key].description
    }));
  }

  /**
   * קבלת מילון ההחלפות
   * @returns {Object} - מילון ההחלפות
   */
  getReplacementDictionary() {
    return this.replacementDictionary;
  }

  /**
   * עדכון אפשרויות
   * @param {Object} newOptions - אפשרויות חדשות
   */
  updateOptions(newOptions) {
    this.options = {
      ...this.options,
      ...newOptions
    };
  }
}

// ייצוא המחלקה לשימוש
if (typeof module !== 'undefined') {
  module.exports = DivineNameCorrector;
}