import os
import shutil

claude_folder = "Claude_Conversations"
code_folder = "Code"
archive_folder = "Archive"

# יוצרים תיקיות אם לא קיימות
for folder in [claude_folder, code_folder, archive_folder]:
    if not os.path.exists(folder):
        os.makedirs(folder)
        print(f"נוצרה תיקיה: {folder}")

# עוברים על כל הקבצים בתיקיה הראשית
for filename in os.listdir():
    if os.path.isfile(filename):
        moved = False
        print(f"בודק קובץ: {filename}")

        # שיחות עם קלוד (לפי שם או תוכן)
        if "קלוד" in filename:
            shutil.move(filename, os.path.join(claude_folder, filename))
            print(f"עבר לתיקיית קלוד (לפי שם): {filename}")
            moved = True
        else:
            with open(filename, 'r', encoding='utf-8', errors='ignore') as file:
                content = file.read(500)
                if "קלוד" in content:
                    shutil.move(filename, os.path.join(claude_folder, filename))
                    print(f"עבר לתיקיית קלוד (לפי תוכן): {filename}")
                    moved = True

        # קבצי קוד
        if not moved and filename.endswith(('.html', '.css', '.js', '.json')):
            shutil.move(filename, os.path.join(code_folder, filename))
            print(f"עבר לתיקיית קוד: {filename}")
            moved = True

        # גרסאות ישנות
        if not moved and any(word in filename.lower() for word in ['old', 'backup', 'copy', 'v1', 'ישנה']):
            shutil.move(filename, os.path.join(archive_folder, filename))
            print(f"עבר לתיקיית ארכיון: {filename}")
            moved = True

        if not moved:
            print(f"נשאר במקומו: {filename}")