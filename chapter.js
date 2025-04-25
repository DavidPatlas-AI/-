// ניהול פרקי תהילים
export class Chapter {
  constructor(id, number, title, verses = []) {
    this.id = id;
    this.number = number;
    this.title = title;
    this.verses = verses;
    this.readCount = 0;
    this.lastRead = null;
  }
}
