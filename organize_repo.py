```python
import os
import shutil

def create_basic_structure():
    # רשימת התיקיות שצריך ליצור
    folders = [
        "src",
        "src/components",
        "src/components/tehilim",
        "src/components/correction",
        "src/components/memorial",
        "src/styles",
        "public"
    ]
    
    # יצירת התיקיות
    for folder in folders:
        os.makedirs(folder, exist_ok=True)
        print(f"נוצרה תיקייה: {folder}")
    
    # יצירת קובץ README בסיסי
    with open("README.md", "w", encoding="utf-8") as f:
        f.write("# תיקון השם\n\nפלטפורמה לקריאת תהילים ותפילות עם שמירה על שמות קדושים.")

def organize_existing_files():
    # מיפוי קבצים עיקריים
    file_mapping = {
        "tehilim-reader": "src/components/tehilim/",
        "divine-text-corrector": "src/components/correction/",
        "memorial-prayer-generator": "src/components/memorial/",
        "correction-results": "src/components/correction/",
        "dedication-manager": "src/components/memorial/"
    }
    
    # בדיקת כל הקבצים בתיקייה הנוכחית
    for filename in os.listdir('.'):
        # דלג על תיקיות מיוחדות
        if filename in ['.git', 'node_modules', 'organize_repo.py']:
            continue
        
        # בדוק אם זה תיקייה
        if os.path.isdir(filename):
            continue
            
        # בדוק אם זה קובץ שצריך להעביר
        for key, destination in file_mapping.items():
            if key in filename:
                # ודא שהתיקייה קיימת
                os.makedirs(destination, exist_ok=True)
                
                # העתק את הקובץ ליעד
                try:
                    shutil.copy2(filename, destination + filename)
                    print(f"הועתק: {filename} אל {destination}")
                except Exception as e:
                    print(f"שגיאה בהעתקת {filename}: {e}")

if __name__ == "__main__":
    print("מתחיל לסדר את המאגר...")
    create_basic_structure()
    organize_existing_files()
    print("סיום! המבנה החדש נוצר.")
```