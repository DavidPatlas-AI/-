import os
import shutil

# תיקיות יעד
claude_folder = "Claude_Conversations"
code_folder = "Code"
archive_folder = "Archive"

# יצירת תיקיות אם לא קיימות
for folder in [claude_folder, code_folder, archive_folder]:
    if not os.path.exists(folder):
        os.makedirs(folder)

# מעבר על כל הקבצים בתיקיה הראשית
for filename in os.listdir():
    if os.path.isfile(filename):
        moved = False

        # העברה לשיחות עם קלוד (אם יש "קלוד" בשם או בתוכן)
        if "קלוד" in filename:
            shutil.move(filename, os.path.join(claude_folder, filename))
            moved = True
        else:
            with open(filename, 'r', encoding='utf-8', errors='ignore') as file:
                content = file.read(500)  # קורא רק את ההתחלה כדי לא להיתקע
                if "קלוד" in content:
                    shutil.move(filename, os.path.join(claude_folder, filename))
                    moved = True

        # העברת קבצי קוד
        if not moved and filename.endswith(('.html', '.css', '.js', '.json')):
            shutil.move(filename, os.path.join(code_folder, filename))
            moved = True

        # העברת גרסאות ישנות
        if not moved and any(word in filename.lower() for word in ['old', 'backup', 'copy', 'v1', 'ישנה']):
            shutil.move(filename, os.path.join(archive_folder, filename))
            