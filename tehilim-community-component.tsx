import React, { useState } from 'react';
import { Clock, MessageCircle, Heart, Share2, Users, BookOpen, Calendar, Search, PlusCircle } from 'lucide-react';

// נתונים לדוגמה - קבוצות תפילה
const prayerGroups = [
  {
    id: 1,
    name: 'תהילים יומי',
    members: 124,
    schedule: 'כל יום בשעה 19:00',
    description: 'קריאת תהילים משותפת מדי יום לעילוי נשמות',
    type: 'public',
    lastActivity: '2025-04-23T14:30:00Z',
    language: 'russian'
  },
  {
    id: 2,
    name: 'תפילה לרפואה',
    members: 47,
    schedule: 'ימי שני וחמישי בשעה 20:30',
    description: 'קבוצת תפילה מיוחדת לרפואת חולים',
    type: 'public',
    lastActivity: '2025-04-24T09:15:00Z',
    language: 'dual'
  },
  {
    id: 3,
    name: 'תיקון הכללי',
    members: 78,
    schedule: 'יום שישי בשעה 14:00',
    description: 'אמירת 10 מזמורי תיקון הכללי לפי רבי נחמן',
    type: 'private',
    lastActivity: '2025-04-22T18:45:00Z',
    language: 'hebrew'
  }
];

// נתונים לדוגמה - פוסטים בקהילה
const communityPosts = [
  {
    id: 1,
    author: {
      name: 'אלכסנדר כהן',
      avatar: 'AC'
    },
    title: 'שאלה בנוגע לניקוד בפרק כ"ג',
    content: 'האם מישהו יכול להסביר את הניקוד הנכון במילים "לֹא אֶחְסָר" בתחילת המזמור? יש לי ספק לגבי הקמץ במילה אחסר.',
    timestamp: '2025-04-24T08:30:00Z',
    tags: ['ניקוד', 'תהילים', 'פרק כ"ג'],
    likes: 12,
    comments: 8
  },
  {
    id: 2,
    author: {
      name: 'מרינה לוי',
      avatar: 'ML'
    },
    title: 'חלוקת ספר תהילים לקבוצה של 30 אנשים',
    content: 'אנחנו מארגנים קבוצה של 30 אנשים שיחלקו ביניהם את כל ספר תהילים לאמירה ביום אחד מדי חודש. האם יש למישהו טבלת חלוקה נוחה או המלצות?',
    timestamp: '2025-04-23T15:45:00Z',
    tags: ['חלוקת תהילים', 'לימוד בקבוצה'],
    likes: 24,
    comments: 15
  },
  {
    id: 3,
    author: {
      name: 'דוד גולדשטיין',
      avatar: 'DG'
    },
    title: 'שיתוף: תרגום חדש לפרק קל"ט',
    content: 'עבדתי על תרגום חדש לפרק קל"ט עם הקפדה על שמות ה׳. אשמח לקבל משוב מכם לפני שאעלה זאת לספרייה המרכזית.',
    timestamp: '2025-04-22T11:20:00Z',
    tags: ['תרגום', 'שיתוף', 'פרק קל"ט'],
    likes: 18,
    comments: 7
  }
];

// נתונים לדוגמה - חלוקות תהילים
const tehilimDistributions = [
  {
    id: 1,
    title: 'חלוקה יומית - לרפואת חולים',
    status: 'active',
    participants: 116,
    completion: 85,
    endsAt: '2025-04-26T23:59:59Z',
    description: 'מסיימים את כל ספר תהילים מדי יום'
  },
  {
    id: 2,
    title: 'חלוקה חודשית - לעילוי נשמת',
    status: 'active',
    participants: 42,
    completion: 64,
    endsAt: '2025-05-15T23:59:59Z',
    description: 'חלוקה חודשית לעילוי נשמות'
  },
  {
    id: 3,
    title: 'תהילים לשלום ישראל',
    status: 'upcoming',
    participants: 28,
    completion: 0,
    endsAt: '2025-05-01T23:59:59Z',
    description: 'קריאת תהילים משותפת ביום העצמאות'
  }
];

// קומפוננט ראשי
const TehilimCommunity = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');

  // חישוב זמן יחסי
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

  // הצגת מיקום השפה
  const renderLanguageBadge = (language) => {
    switch(language) {
      case 'hebrew':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">עברית</span>;
      case 'russian':
        return <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">רוסית</span>;
      case 'dual':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">דו-לשוני</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans overflow-x-hidden">
      {/* כותרת */}
      <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-blue-600">קהילת תהילים בקדושה</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Search size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Users size={20} />
          </button>
        </div>
      </header>

      {/* תיבת חיפוש */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="relative mb-6">
          <input
            type="text"
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 shadow-sm"
            placeholder="חיפוש בקהילה..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute left-3 top-3 text-gray-400">
            <Search size={20} />
          </div>
        </div>

        {/* טאבים */}
        <div className="flex overflow-x-auto bg-white rounded-lg shadow-sm mb-6">
          <button
            className={`px-4 py-3 font-medium text-sm flex-1 ${activeTab === 'feed' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('feed')}
          >
            פיד הקהילה
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm flex-1 ${activeTab === 'groups' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('groups')}
          >
            קבוצות תפילה
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm flex-1 ${activeTab === 'distribution' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('distribution')}
          >
            חלוקת תהילים
          </button>
        </div>

        {/* תוכן הטאב הפעיל */}
        <div className="space-y-6">
          {/* פיד הקהילה */}
          {activeTab === 'feed' && (
            <>
              {/* כפתור יצירת פוסט חדש */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  A
                </div>
                <button 
                  className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-full py-2 px-4 text-right text-gray-500"
                >
                  שתף שאלה או תובנה עם הקהילה...
                </button>
                <button className="text-blue-600">
                  <PlusCircle size={24} />
                </button>
              </div>

              {/* רשימת פוסטים */}
              {communityPosts.map(post => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  {/* כותרת הפוסט */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {post.author.avatar}
                      </div>
                      <div>
                        <div className="font-medium">{post.author.name}</div>
                        <div className="text-xs text-gray-500">{formatRelativeTime(post.timestamp)}</div>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                    <p className="text-gray-700">{post.content}</p>
                  </div>
                  
                  {/* תגיות */}
                  <div className="px-4 py-2 bg-gray-50">
                    <div className="flex gap-2 flex-wrap">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* אינטראקציות */}
                  <div className="px-4 py-3 flex justify-between text-gray-500 text-sm">
                    <div className="flex gap-6">
                      <button className="flex items-center gap-1 hover:text-blue-600">
                        <MessageCircle size={18} />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-red-500">
                        <Heart size={18} />
                        <span>{post.likes}</span>
                      </button>
                    </div>
                    <button className="flex items-center gap-1 hover:text-blue-600">
                      <Share2 size={18} />
                      <span>שתף</span>
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* קבוצות תפילה */}
          {activeTab === 'groups' && (
            <>
              {/* כפתור יצירת קבוצה חדשה */}
              <div className="flex justify-end mb-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 flex items-center gap-2">
                  <PlusCircle size={18} />
                  <span>קבוצה חדשה</span>
                </button>
              </div>

              {/* רשימת קבוצות */}
              {prayerGroups.map(group => (
                <div key={group.id} className="bg-white rounded-lg shadow-sm p-4 flex gap-4 relative mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 self-start">
                    <BookOpen size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <h3 className="font-bold">{group.name}</h3>
                      {renderLanguageBadge(group.language)}
                    </div>
                    <p className="text-gray-500 text-sm mb-2">{group.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>{group.members} משתתפים</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{group.schedule}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>עדכון {formatRelativeTime(group.lastActivity)}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">
                        הצטרף
                      </button>
                      <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm">
                        פרטים
                      </button>
                    </div>
                  </div>
                  {group.type === 'private' && (
                    <div className="absolute top-3 left-3 text-gray-500">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">קבוצה פרטית</span>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {/* חלוקת תהילים */}
          {activeTab === 'distribution' && (
            <>
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <h2 className="text-xl font-bold mb-4">חלוקת ספר תהילים</h2>
                <p className="mb-4">השתתפו בחלוקת ספר תהילים בין חברי הקהילה. בחרו פרקים לקריאה או הצטרפו לאחת החלוקות הקיימות.</p>
                
                <div className="flex justify-end mb-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 flex items-center gap-2">
                    <PlusCircle size={18} />
                    <span>צור חלוקה חדשה</span>
                  </button>
                </div>
              </div>
              
              {/* רשימת חלוקות */}
              {tehilimDistributions.map(dist => (
                <div key={dist.id} className={`bg-white rounded-lg shadow-sm mb-4 overflow-hidden border-r-4 ${dist.status === 'active' ? 'border-green-500' : 'border-yellow-500'}`}>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-lg">{dist.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${dist.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {dist.status === 'active' ? 'פעילה' : 'עתידית'}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">{dist.description}</p>
                    
                    <div className="bg-gray-100 rounded-full h-2 mb-2">
                      <div 
                        className="bg-blue-500 rounded-full h-2" 
                        style={{ width: `${dist.completion}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                      <span>{dist.completion}% הושלמו</span>
                      <span>{dist.participants} משתתפים</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm flex-1">
                        הצטרף לחלוקה
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md text-sm">
                        פרטים
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* טבלת החלוקה האישית */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-bold mb-3">הפרקים שלי</h3>
                <p className="text-sm text-gray-600 mb-4">הפרקים שבחרת לקרוא בחלוקות הפעילות</p>
                
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-3 text-right font-medium text-gray-500">פרק</th>
                        <th className="py-2 px-3 text-right font-medium text-gray-500">חלוקה</th>
                        <th className="py-2 px-3 text-right font-medium text-gray-500">תאריך יעד</th>
                        <th className="py-2 px-3 text-right font-medium text-gray-500">סטטוס</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 px-3">פרק כ״ג</td>
                        <td className="py-3 px-3">חלוקה יומית - לרפואת חולים</td>
                        <td className="py-3 px-3">היום, 23:59</td>
                        <td className="py-3 px-3"><span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">בהמתנה</span></td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3">פרק צ״א</td>
                        <td className="py-3 px-3">חלוקה יומית - לרפואת חולים</td>
                        <td className="py-3 px-3">היום, 23:59</td>
                        <td className="py-3 px-3"><span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">הושלם</span></td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3">פרק ק״ל</td>
                        <td className="py-3 px-3">תהילים לשלום ישראל</td>
                        <td className="py-3 px-3">01/05/2025</td>
                        <td className="py-3 px-3"><span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">עתידי</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* ניווט תחתון */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around">
        <button className="flex flex-col items-center py-2 px-4 text-blue-600">
          <div className="text-xl mb-1">📝</div>
          <div className="text-xs">פיד</div>
        </button>
        <button className="flex flex-col items-center py-2 px-4 text-gray-500">
          <div className="text-xl mb-1">👥</div>
          <div className="text-xs">קבוצות</div>
        </button>
        <button className="flex flex-col items-center py-2 px-4 text-gray-500">
          <div className="text-xl mb-1">📖</div>
          <div className="text-xs">תהילים</div>
        </button>
        <button className="flex flex-col items-center py-2 px-4 text-gray-500">
          <div className="text-xl mb-1">👤</div>
          <div className="text-xs">פרופיל</div>
        </button>
      </nav>
    </div>
  );
};

export default TehilimCommunity;