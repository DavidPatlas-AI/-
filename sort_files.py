import os
import shutil

target_folder = "All_Files"

# ליצור תיקיה אם לא קיימת
if not os.path.exists(target_folder):
    os.makedirs(target_folder)
    print(f"✅ נוצרה תיקיה: {target_folder}")

# מעבר על כל הקבצים בתיקיה הראשית
for filename in os.listdir():
    if os.path.isfile(filename):
        print(f"📄 מעביר קובץ: {filename}")
        shutil.move(filename, os.path.join(target_folder, filename))