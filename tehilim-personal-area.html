import React, { useState } from 'react';

// דוגמת נתונים למארזים אישיים
const sampleCollections = [
  {
    id: '1',
    title: 'תהילים יומי',
    type: 'tehilim',
    icon: '📖',
    itemCount: 13,
    lastUpdated: '2025-04-20T10:30:00Z'
  },
  {
    id: '2',
    title: 'תפילות מיוחדות',
    type: 'prayers',
    icon: '🙏',
    itemCount: 5,
    lastUpdated: '2025-04-15T08:45:00Z'
  },
  {
    id: '3',
    title: 'טקסטים שתיקנתי',
    type: 'edited',
    icon: '📝',
    itemCount: 8,
    lastUpdated: '2025-04-19T14:20:00Z'
  },
  {
    id: '4',
    title: 'לרפואת',
    type: 'dedication',
    icon: '💫',
    itemCount: 3,
    lastUpdated: '2025-04-21T16:30:00Z'
  }
];

// דוגמת נתונים לפעילות אחרונה
const recentActivity = [
  {
    id: '1',
    type: 'correction',
    icon: '✓',
    title: 'תיקנת טקסט "קידוש לשבת"',
    time: '2025-04-22T10:30:00Z'
  },
  {
    id: '2',
    type: 'reading',
    icon: '📖',
    title: 'קראת פרק כ״ג בתהילים',
    time: '2025-04-22T08:15:00Z'
  },
  {
    id: '3',
    type: 'save',
    icon: '💾',
    title: 'שמרת קובץ PDF של תהילים',
    time: '2025-04-20T14:45:00Z'
  }
];

// דוגמת נתונים לתצוגת עריכה
const sampleEditingContent = {
  title: 'ברכת המזון ברוסית',
  text: 'Благословен Ты, ה׳, Бог наш, Владыка Вселенной, питающий весь мир по доброте Своей, по милости, по благодеянию и по милосердию. Он дает пищу всякой плоти, ибо навеки милость Его.'
};

// דוגמת נתונים לטקסטים לעריכה
const textsToEdit = [
  {
    id: '1',
    title: 'קידוש לשבת',
    length: 600,
    divineNameCount: 4
  },
  {
    id: '2',
    title: 'תפילת העמידה',
    length: 1200,
    divineNameCount: 12
  },
  {
    id: '3',
    title: 'תהילים פרק א׳',
    length: 350,
    divineNameCount: 2
  }
];

// דוגמת נתונים לתיקים להדפסה
const collectionsForPrinting = [
  {
    id: '1',
    title: 'תהילים יומי',
    description: '13 פרקים'
  },
  {
    id: '2',
    title: 'תפילות מיוחדות',
    description: '5 תפילות'
  },
  {
    id: '3',
    title: 'שבת קודש',
    description: 'קידוש, זמירות, הבדלה'
  }
];

// המרת תאריך לפורמט יחסי (לפני X זמן)
const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `לפני ${diffInMinutes} דקות`;
  } else if (diffInMinutes < 24 * 60) {
    const hours = Math.floor(diffInMinutes / 60);
    return `לפני ${hours} שעות`;
  } else {
    const days = Math.floor(diffInMinutes / (60 * 24));
    return `לפני ${days} ימים`;
  }
};

const PersonalArea = () => {
  const [activeTab, setActiveTab] = useState('collections'); // collections, edit, print
  const [activeCollectionId, setActiveCollectionId] = useState(null);
  const [editingStyle, setEditingStyle] = useState('ה\'');
  const [editingText, setEditingText] = useState(sampleEditingContent.text);
  const [printSettings, setPrintSettings] = useState({
    fontSize: 'בינוני',
    divineNameStyle: 'ה\'',
    showNikkud: true,
    showBothLanguages: true,
    addCover: true,
    addDedication: false
  });
  
  // עיצוב שם ה' בטקסט
  const formatDivineName = (text) => {
    if (!text) return '';
    return text.replace(/ה׳/g, '<span class="divine-name">ה׳</span>');
  };
  
  // שינוי הגדרות הדפסה
  const updatePrintSetting = (key, value) => {
    setPrintSettings(prev => ({...prev, [key]: value}));
  };
  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600 mb-2">האזור האישי שלי</h1>
          <p className="text-gray-600">ניהול טקסטים, תיקים אישיים ואוספים מותאמים</p>
        </div>
        
        {/* טאבים */}
        <div className="bg-white rounded-lg shadow-md mb-6 flex overflow-hidden">
          <button 
            className={`flex-1 py-3 px-4 text-center ${activeTab === 'collections' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('collections')}
          >
            התיקים שלי
          </button>
          <button 
            className={`flex-1 py-3 px-4 text-center ${activeTab === 'edit' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('edit')}
          >
            עריכה אישית
          </button>
          <button 
            className={`flex-1 py-3 px-4 text-center ${activeTab === 'print' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('print')}
          >
            הדפסה
          </button>
        </div>
        
        {/* תוכן טאב 1: התיקים שלי */}
        {activeTab === 'collections' && (
          <div>
            {/* כפתור הוספה */}
            <div className="flex justify-end mb-6">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-700 transition-colors">
                <span>+</span>
                <span>תיק חדש</span>
              </button>
            </div>
            
            {/* רשימת תיקים */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {sampleCollections.map(collection => (
                <div 
                  key={collection.id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 cursor-pointer hover:border-blue-200 transform hover:-translate-y-1 transition-transform"
                  onClick={() => setActiveCollectionId(collection.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-2xl bg-blue-100 text-blue-600 h-10 w-10 flex items-center justify-center rounded-lg">
                      {collection.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{collection.title}</h3>
                      <p className="text-sm text-gray-500">
                        {collection.itemCount} פריטים • עודכן {formatRelativeTime(collection.lastUpdated)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* פעילות אחרונה */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium">פעילות אחרונה</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center">
                        {activity.icon}
                      </div>
                      <div>
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-sm text-gray-500">{formatRelativeTime(activity.time)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* תוכן טאב 2: עריכה אישית */}
        {activeTab === 'edit' && (
          <div>
            {/* טקסט שעובדים עליו */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium">{sampleEditingContent.title}</h2>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
                  שמור
                </button>
              </div>
              <div className="p-4">
                <div className="p-4 bg-gray-50 rounded-lg mb-4 relative">
                  <div dangerouslySetInnerHTML={{ 
                    __html: formatDivineName(sampleEditingContent.text)
                  }} className="text-gray-800"></div>
                  <div className="absolute top-2 left-2 flex gap-1">
                    <button className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm text-xs border border-gray-200">
                      ✏️
                    </button>
                    <button className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm text-xs border border-gray-200">
                      ➕
                    </button>
                  </div>
                </div>
                
                {/* כלי עריכה */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {['עברית (ה׳)', 'רוסית (ה׳)', 'י-ה-ו-ה', 'השם', 'הוסף הערה'].map(option => (
                    <button 
                      key={option}
                      className={`px-3 py-2 rounded-full text-sm ${
                        option === 'עברית (ה׳)' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-800 border border-gray-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                
                {/* תיבת עריכה */}
                <textarea
                  className="w-full min-h-[150px] border border-gray-300 rounded-lg p-3 mb-4 focus:ring-blue-500 focus:border-blue-500"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                
                {/* כפתורי פעולה */}
                <div className="flex justify-between">
                  <div className="space-x-2">
                    <button className="px-3 py-2 border border-gray-300 rounded-md text-gray-600">
                      בטל
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded-md text-gray-600">
                      שחזר
                    </button>
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 transition-colors">
                    שמור שינויים
                  </button>
                </div>
              </div>
            </div>
            
            {/* רשימת טקסטים נוספים לעריכה */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium">טקסטים לעריכה</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {textsToEdit.map(text => (
                    <div key={text.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div>
                        <div className="font-medium">{text.title}</div>
                        <div className="text-sm text-gray-500">
                          {text.length} תווים • {text.divineNameCount} מופעים של שם ה׳
                        </div>
                      </div>
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600">
                        ערוך
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* תוכן טאב 3: הדפסה */}
        {activeTab === 'print' && (
          <div>
            {/* בחירת פורמט */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium">בחר פורמט הדפסה</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { id: 'pocket', title: 'ספר כיס', desc: 'A6 • גופן בינוני' },
                    { id: 'regular', title: 'סידור רגיל', desc: 'A5 • גופן גדול' },
                    { id: 'page', title: 'דף בודד', desc: 'A4 • גופן גדול מאוד' },
                    { id: 'custom', title: 'מותאם אישית', desc: 'הגדרות מותאמות' }
                  ].map(format => (
                    <div 
                      key={format.id}
                      className={`p-3 rounded-lg border ${format.id === 'pocket' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} cursor-pointer`}
                    >
                      <div className="font-medium">{format.title}</div>
                      <div className="text-sm text-gray-500">{format.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* הגדרות הדפסה */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium">הגדרות הדפסה</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {[
                    { label: 'גודל גופן', value: printSettings.fontSize },
                    { label: 'סגנון שם ה׳', value: printSettings.divineNameStyle },
                    { label: 'הוסף ניקוד', value: printSettings.showNikkud ? 'כן' : 'לא' },
                    { label: 'תצוגת טקסט', value: printSettings.showBothLanguages ? 'עברית + רוסית' : 'עברית בלבד' },
                    { label: 'הוסף שער', value: printSettings.addCover ? 'כן' : 'לא' },
                    { label: 'הוסף הקדשה', value: printSettings.addDedication ? 'כן' : 'לא' }
                  ].map((setting, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div>{setting.label}</div>
                      <div className="text-blue-600 font-medium">{setting.value}</div>
                    </div>
                  ))}
                </div>
                
                {/* כפתורי פעולה */}
                <div className="flex justify-center gap-4 mt-6">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <span>⬇️</span>
                    <span>הורד PDF</span>
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <span>🖨️</span>
                    <span>הדפס עכשיו</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* תיקים להדפסה */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium">בחר תיק להדפסה</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {collectionsForPrinting.map(collection => (
                    <div key={collection.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div>
                        <div className="font-medium">{collection.title}</div>
                        <div className="text-sm text-gray-500">{collection.description}</div>
                      </div>
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600">
                        בחר
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style jsx global>{`
        .divine-name {
          color: #B45309;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default PersonalArea;
