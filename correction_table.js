
/**
 * טבלת ניהול תיקונים
 * שומרת את סטטוס התיקון עבור כל פסוק
 */

class VerseCorrectionTable {
  constructor() {
    this.verses = new Map(); // מיפוי verseId -> status
  }

  /**
   * הוספת פסוק חדש למעקב
   * @param {string} verseId - מזהה ייחודי לפסוק (למשל chapter:verse)
   * @param {string} text - טקסט הפסוק
   */
  addVerse(verseId, text) {
    if (!this.verses.has(verseId)) {
      this.verses.set(verseId, {
        originalText: text,
        correctedText: '',
        status: 'pending', // statuses: pending, in_progress, done
        comments: []
      });
    }
  }

  /**
   * עדכון טקסט מתוקן לפסוק
   */
  updateCorrection(verseId, correctedText) {
    if (this.verses.has(verseId)) {
      const verse = this.verses.get(verseId);
      verse.correctedText = correctedText;
      verse.status = 'done';
    }
  }

  /**
   * הוספת הערה לפסוק
   */
  addComment(verseId, comment) {
    if (this.verses.has(verseId)) {
      this.verses.get(verseId).comments.push(comment);
    }
  }

  /**
   * קבלת מצב סטטיסטי כללי
   */
  getStatusSummary() {
    const summary = { total: 0, done: 0, pending: 0, in_progress: 0 };
    for (let [_, data] of this.verses) {
      summary.total++;
      summary[data.status]++;
    }
    return summary;
  }

  /**
   * הדפסת סיכום למסוף
   */
  printSummary() {
    const summary = this.getStatusSummary();
    console.log("סיכום תיקונים:");
    console.log(`סה"כ פסוקים: ${summary.total}`);
    console.log(`בוצע: ${summary.done}, בהמתנה: ${summary.pending}, בתהליך: ${summary.in_progress}`);
  }
}

// דוגמה
const corrections = new VerseCorrectionTable();
corrections.addVerse("23:1", "ה׳ רֹעִי לֹא אֶחְסָר");
corrections.updateCorrection("23:1", "ה' רֹעִי לֹא אֶחְסָר");
corrections.addComment("23:1", "ווידאנו את סגנון השם");
corrections.printSummary();
