import os
import shutil

# תיקיות יעד
folders = {
    "Claude_Conversations": [],
    "Code": ['.html', '.css', '.js', '.json', '.py', '.tsx', '.ts', '.md', '.txt'],
    "Archives": ['.zip'],
    "Documents": ['.pdf', '.xml'],
    "Other": []
}

# יצירת התיקיות
for folder in folders.keys():
    if not os.path.exists(folder):
        os.makedirs(folder)
        print(f"✅ נוצרה תיקיה: {folder}")

# מעבר על כל הקבצים במאגר
for filename in os.listdir():
    try:
        if os.path.isfile(filename):
            moved = False
            print(f"📂 בודק קובץ: {filename}")

            # שיחות עם קלוד
            if "קלוד" in filename:
                shutil.move(filename, os.path.join("Claude_Conversations", filename))
                print(f"➡️ עבר לתיקיית קלוד (לפי שם): {filename}")
                moved = True
            else:
                with open(filename, 'r', encoding='utf-8', errors='ignore') as file:
                    content = file.read(500)
                    if "קלוד" in content:
                        shutil.move(filename, os.path.join("Claude_Conversations", filename))
                        print(f"➡️ עבר לתיקיית קלוד (לפי תוכן): {filename}")
                        moved = True

            # קבצי קוד
            if not moved:
                for ext in folders["Code"]:
                    if filename.endswith(ext):
                        shutil.move(filename, os.path.join("Code", filename))
                        print(f"➡️ עבר לתיקיית קוד: {filename}")
                        moved = True
                        break

            # ארכיון (גרסאות ישנות או zip)
            if not moved:
                if any(word in filename.lower() for word in ['old', 'backup', 'copy', 'v1', 'ישנה']) or filename.endswith(tuple(folders["Archives"])):
                    shutil.move(filename, os.path.join("Archives", filename))
                    print(f"➡️ עבר לתיקיית ארכיון: {filename}")
                    moved = True

            # מסמכים
            if not moved:
                if filename.endswith(tuple(folders["Documents"])):
                    shutil.move(filename, os.path.join("Documents", filename))
                    print(f"➡️ עבר לתיקיית מסמכים: {filename}")
                    moved = True

            # כל השאר
            if not moved:
                shutil.move(filename, os.path.join("Other", filename))
                print(f"➡️ עבר לתיקיית Other: {filename}")

    except Exception as e:
        print(f"❌ שגיאה בעיבוד הקובץ {filename}: {e}")