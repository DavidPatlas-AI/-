
/**
 * נגן שמע לפסוקי תהילים
 * כולל תמיכה בנגישות והדגשה חיה של הטקסט
 */
class AudioPlayer {
  constructor(audioContainerId) {
    this.audioContainer = document.getElementById(audioContainerId);
    this.audio = new Audio();
    this.currentVerseElement = null;
  }

  /**
   * ניגון פסוק ספציפי
   * @param {string} audioSrc - קובץ שמע
   * @param {HTMLElement} verseElement - אלמנט הפסוק להצגת הדגשה
   */
  playVerse(audioSrc, verseElement) {
    this.stop();
    this.audio.src = audioSrc;
    this.audio.play();

    // הדגשת פסוק בזמן השמעה
    if (this.currentVerseElement) {
      this.currentVerseElement.classList.remove("highlighted");
    }

    this.currentVerseElement = verseElement;
    this.currentVerseElement.classList.add("highlighted");

    this.audio.onended = () => {
      this.currentVerseElement.classList.remove("highlighted");
      this.currentVerseElement = null;
    };
  }

  /**
   * עצירת ניגון
   */
  stop() {
    if (!this.audio.paused) {
      this.audio.pause();
    }
    if (this.currentVerseElement) {
      this.currentVerseElement.classList.remove("highlighted");
      this.currentVerseElement = null;
    }
  }
}

// נגישות: כפתור הגדלת טקסט
function increaseFontSize(containerId) {
  const container = document.getElementById(containerId);
  const currentSize = parseFloat(window.getComputedStyle(container, null).getPropertyValue('font-size'));
  container.style.fontSize = (currentSize + 2) + 'px';
}

// נגישות: כפתור ניגודיות גבוהה
function toggleHighContrast() {
  document.body.classList.toggle('high-contrast');
}
