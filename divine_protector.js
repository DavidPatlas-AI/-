
/**
 * מערכת קידוד והצפנה לשמות ה'
 * שלב 9 - תהילים בקדושה
 * מוסיף שכבת הגנה נוספת על שמות ה' בעת שמירת טקסטים או שיתוף
 */

class DivineNameProtector {
  constructor(secret = "kedusha_key") {
    this.secret = secret;
  }

  /**
   * קידוד פשוט של שם ה' (base64 + סיבוב תווים)
   */
  encodeDivineNames(text) {
    const divineNames = [/ה׳/g, /י-ה-ו-ה/g, /השם/g, /אדנ-י/g, /יי/g];
    let encodedText = text;

    divineNames.forEach((regex) => {
      encodedText = encodedText.replace(regex, (match) => {
        const base = btoa(match + this.secret);
        return `[ENC:${base}]`;
      });
    });

    return encodedText;
  }

  /**
   * שחזור שם ה' מקודד
   */
  decodeDivineNames(text) {
    const regex = /\[ENC:([A-Za-z0-9+/=]+)\]/g;
    return text.replace(regex, (_, base64) => {
      try {
        const decoded = atob(base64);
        const name = decoded.replace(this.secret, '');
        return name;
      } catch {
        return '[שגיאה בפענוח]';
      }
    });
  }
}

// דוגמה לשימוש
const protector = new DivineNameProtector();
const example = "ברוך אתה ה׳, י-ה-ו-ה אלוקינו, השם אחד.";
const encoded = protector.encodeDivineNames(example);
const decoded = protector.decodeDivineNames(encoded);

console.log("מקורי:", example);
console.log("מקודד:", encoded);
console.log("מפוענח:", decoded);
