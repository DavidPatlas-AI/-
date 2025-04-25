from datetime import datetime
import os
from jinja2 import Template

# צבע עיקרי של הטרנד
color = 'צהוב'
bg_color = ''

# הגדרת צבע רקע לפי צבע טרנד
if color == 'צהוב':
    bg_color = '#fffacd'  # light yellow
elif color == 'כחול':
    bg_color = '#e0f7fa'  # light blue
elif color == 'אדום':
    bg_color = '#ffe0e0'  # light red
else:
    bg_color = '#f0f8ff'  # default

# קרא סיפור יומי
try:
    with open("stories/story_of_the_day.txt", encoding="utf-8") as f:
        story = f.read()
except:
    story = "אין סיפור להיום."

# קרא טיפ יומי
try:
    with open("tips/tip_of_the_day.txt", encoding="utf-8") as f:
        tip = f.read()
except:
    tip = "אין טיפ להיום."

# קובץ תבנית HTML
with open("templates/daily_report_template.html", encoding="utf-8") as f:
    template = Template(f.read())

# מילוי נתונים לדוח
data = {
    'date': datetime.now().strftime('%Y-%m-%d'),
    'color': color,
    'bg_color': bg_color,
    'emotion': 'שמחה',
    'animal': 'חתול',
    'keywords': ['אביב', 'שמש', 'פריחה'],
    'story': 'פעם אחת טרנד בשם "שמש צהובה" האיר את הרשת...',
    'tip': 'כדי לזהות טרנד – בדוק שילוב של רגש, צבע וחיה בפוסטים חוזרים.'
}


# עיבוד תבנית
output = template.render(data)

# שמירת הדוח
OUTPUT_DIR = "reports"
os.makedirs(OUTPUT_DIR, exist_ok=True)
filename = f"report_{datetime.now().strftime('%Y%m%d')}.html"
with open(os.path.join(OUTPUT_DIR, filename), 'w', encoding='utf-8') as f:
    f.write(output)

print(f"הדוח נוצר בהצלחה: {filename}")
