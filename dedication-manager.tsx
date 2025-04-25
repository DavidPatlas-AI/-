import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Trash2, Edit2, Share, PlusCircle, User, Users, Heart } from 'lucide-react';

// טיפוסי מידע
type Dedication = {
  id: string;
  name: {
    hebrew: string;
    russian: string;
  };
  motherName?: {
    hebrew: string;
    russian: string;
  };
  relation: string;
  dateOfDeath: {
    hebrew: string;
    gregorian: string;
  };
  hasPortrait: boolean;
  psalms: string[];
  sharedWith: string[];
  notes?: string;
};

// נתונים לדוגמה
const sampleDedications: Dedication[] = [
  {
    id: '1',
    name: {
      hebrew: 'אברהם בן יעקב',
      russian: 'Авраам бен Яаков'
    },
    motherName: {
      hebrew: 'שרה',
      russian: 'Сара'
    },
    relation: 'father',
    dateOfDeath: {
      hebrew: 'י״ב אלול תשפ״ג',
      gregorian: '2023-08-29'
    },
    hasPortrait: true,
    psalms: ['23', '91', '103'],
    sharedWith: ['Семья Коган', 'Синагога Москвы'],
    notes: 'Любимый отец и дедушка'
  },
  {
    id: '2',
    name: {
      hebrew: 'רחל בת דוד',
      russian: 'Рахель бат Давид'
    },
    motherName: {
      hebrew: 'לאה',
      russian: 'Лея'
    },
    relation: 'mother',
    dateOfDeath: {
      hebrew: 'ג׳ ניסן תשפ״ב',
      gregorian: '2022-04-04'
    },
    hasPortrait: true,
    psalms: ['23', '121', '130'],
    sharedWith: ['Михаил Левин', 'Семья Коган'],
    notes: 'Мама, которая всегда заботилась о всех'
  }
];

// מיפוי יחס משפחתי לתיאור ברוסית
const relationMap: {[key: string]: string} = {
  'father': 'Отец',
  'mother': 'Мать',
  'grandfather': 'Дедушка',
  'grandmother': 'Бабушка',
  'brother': 'Брат',
  'sister': 'Сестра',
  'son': 'Сын',
  'daughter': 'Дочь',
  'husband': 'Муж',
  'wife': 'Жена',
  'friend': 'Друг',
  'other': 'Другое'
};

const DedicationManager: React.FC = () => {
  const [dedications, setDedications] = useState<Dedication[]>(sampleDedications);
  const [activeTab, setActiveTab] = useState<'list' | 'upcoming' | 'prayer'>('list');
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [editingDedication, setEditingDedication] = useState<Dedication | null>(null);
  const [displayLanguage, setDisplayLanguage] = useState<'hebrew' | 'russian'>('russian');
  
  // פונקציות עזר
  
  // בדיקה אם תאריך יארצייט מתקרב (בטווח של שבוע)
  const isUpcomingYahrzeit = (dateStr: string): boolean => {
    const today = new Date();
    const yahrzeit = new Date(dateStr);
    
    // המרה לתאריך השנה הנוכחית - יארצייט הוא שנתי
    yahrzeit.setFullYear(today.getFullYear());
    
    // אם היארצייט כבר עבר השנה, נבדוק לשנה הבאה
    if (yahrzeit < today) {
      yahrzeit.setFullYear(today.getFullYear() + 1);
    }
    
    // חישוב הפרש בימים
    const diffTime = yahrzeit.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays <= 7;
  };
  
  // פורמט תאריך
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  // הוספת הקדשה חדשה
  const addDedication = (dedication: Dedication) => {
    setDedications(prev => [...prev, dedication]);
    setIsAddFormVisible(false);
  };
  
  // עריכת הקדשה קיימת
  const updateDedication = (dedication: Dedication) => {
    setDedications(prev => 
      prev.map(item => item.id === dedication.id ? dedication : item)
    );
    setEditingDedication(null);
  };
  
  // מחיקת הקדשה
  const deleteDedication = (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту запись?')) {
      setDedications(prev => prev.filter(item => item.id !== id));
    }
  };
  
  // רשימת הקדשות מסודרת לפי תאריך יארצייט
  const upcomingYahrzeits = dedications
    .filter(d => isUpcomingYahrzeit(d.dateOfDeath.gregorian))
    .sort((a, b) => {
      return new Date(a.dateOfDeath.gregorian).getTime() - new Date(b.dateOfDeath.gregorian).getTime();
    });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4">
      <div className="max-w-4xl mx-auto mb-6">
        {/* כותרת */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600 mb-2">Мемориал близких</h1>
          <p className="text-gray-600">Управление записями о близких для чтения молитв</p>
        </div>
        
        {/* טאבים */}
        <div className="flex bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
          <button 
            className={`flex-1 py-3 px-4 ${activeTab === 'list' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('list')}
          >
            Все записи
          </button>
          <button 
            className={`flex-1 py-3 px-4 ${activeTab === 'upcoming' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Ближайшие даты
          </button>
          <button 
            className={`flex-1 py-3 px-4 ${activeTab === 'prayer' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('prayer')}
          >
            Чтение молитв
          </button>
        </div>
        
        {/* כפתור שפה */}
        <div className="flex justify-end mb-4">
          <button 
            className="px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200 transition"
            onClick={() => setDisplayLanguage(prev => prev === 'hebrew' ? 'russian' : 'hebrew')}
          >
            {displayLanguage === 'hebrew' ? 'עברית' : 'Русский'}
          </button>
        </div>
        
        {/* כפתור הוספה */}
        <div className="flex justify-end mb-4">
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm hover:bg-blue-700 transition"
            onClick={() => setIsAddFormVisible(true)}
          >
            <PlusCircle size={20} />
            <span>Добавить запись</span>
          </button>
        </div>
        
        {/* תוכן לפי טאב פעיל */}
        {activeTab === 'list' && (
          <div className="space-y-4">
            {dedications.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <p className="text-gray-500">Нет сохраненных записей</p>
                <button 
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={() => setIsAddFormVisible(true)}
                >
                  Добавить первую запись
                </button>
              </div>
            ) : (
              dedications.map(dedication => (
                <div key={dedication.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 flex flex-col md:flex-row gap-4">
                    {/* תמונה / אווטאר */}
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 self-center md:self-start">
                      {dedication.hasPortrait ? (
                        <span className="text-4xl">👤</span>
                      ) : (
                        <span className="text-4xl">🕯️</span>
                      )}
                    </div>
                    
                    {/* מידע */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">
                        {displayLanguage === 'hebrew' ? dedication.name.hebrew : dedication.name.russian}
                      </h3>
                      
                      <div className="text-gray-500 mb-3">
                        {relationMap[dedication.relation]} • 
                        {displayLanguage === 'hebrew' 
                          ? ` יארצייט: ${dedication.dateOfDeath.hebrew}` 
                          : ` Годовщина: ${formatDate(dedication.dateOfDeath.gregorian)}`
                        }
                      </div>
                      
                      {dedication.notes && (
                        <div className="mb-3 text-gray-600">{dedication.notes}</div>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {dedication.psalms.map(psalm => (
                          <span key={psalm} className="px-2 py-1 bg-blue-50 text-blue-600 text-sm rounded-full">
                            Псалом {psalm}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* כפתורי פעולה */}
                    <div className="flex flex-row md:flex-col gap-2 text-gray-500 self-center md:self-start">
                      <button 
                        className="p-2 hover:bg-gray-100 rounded-full"
                        onClick={() => setEditingDedication(dedication)}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        className="p-2 hover:bg-gray-100 rounded-full"
                        onClick={() => deleteDedication(dedication.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <Share size={18} />
                      </button>
                    </div>
                  </div>
                  
                  {/* כפתורי פעולה */}
                  <div className="bg-gray-50 p-3 flex justify-between text-sm">
                    <button className="text-blue-600">
                      Читать молитвы
                    </button>
                    <div className="flex gap-2 text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{dedication.sharedWith.length}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={16} />
                        <span>{dedication.psalms.length}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        
        {activeTab === 'upcoming' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-bold mb-3">Предстоящие годовщины</h2>
              
              {upcomingYahrzeits.length === 0 ? (
                <p className="text-gray-500 text-center py-6">
                  Нет предстоящих дат в ближайшие 7 дней
                </p>
              ) : (
                <div className="divide-y">
                  {upcomingYahrzeits.map(dedication => (
                    <div key={dedication.id} className="py-3 flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        🕯️
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">
                          {displayLanguage === 'hebrew' ? dedication.name.hebrew : dedication.name.russian}
                        </div>
                        <div className="text-sm text-gray-500">
                          {displayLanguage === 'hebrew'
                            ? dedication.dateOfDeath.hebrew
                            : formatDate(dedication.dateOfDeath.gregorian)
                          }
                        </div>
                      </div>
                      <div>
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg">
                          Молитвы
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-bold mb-3">Еврейский календарь</h2>
              <div className="border rounded-lg overflow-hidden">
                {/* תצוגת לוח שנה בסיסית */}
                <div className="grid grid-cols-7 bg-gray-50 text-center text-xs font-medium text-gray-500">
                  {['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map(day => (
                    <div key={day} className="py-2">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 text-sm">
                  {[...Array(35)].map((_, i) => {
                    const day = (i % 31) + 1;
                    const isYahrzeit = i === 8 || i === 17;
                    return (
                      <div 
                        key={i} 
                        className={`py-2 text-center border-t border-r ${
                          isYahrzeit ? 'bg-blue-50' : ''}`}
                      >
                        <span className={isYahrzeit ? 'text-blue-600 font-bold' : ''}>{day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500 text-center">
                Даты с отметкой — годовщины по еврейскому календарю
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'prayer' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-bold mb-4">Выберите, для кого читать молитвы</h2>
              
              <div className="divide-y">
                {dedications.map(dedication => (
                  <div key={dedication.id} className="py-3 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {dedication.hasPortrait ? '👤' : '🕯️'}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">
                        {displayLanguage === 'hebrew' ? dedication.name.hebrew : dedication.name.russian}
                      </div>
                      <div className="text-sm text-gray-500">
                        {relationMap[dedication.relation]}
                      </div>
                    </div>
                    <div>
                      <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg">
                        Выбрать
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-bold mb-4 flex items-center gap-2">
                <span>Рекомендуемые молитвы</span>
                <span className="text-sm font-normal bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  За отца
                </span>
              </h2>
              
              <div className="space-y-3">
                {[
                  { id: 'kaddish', name: 'Кадиш', duration: '3 мин' },
                  { id: 'el-male', name: 'Эль мале рахамим', duration: '2 мин' },
                  { id: 'psalm-23', name: 'Псалом 23', duration: '1 мин' },
                  { id: 'psalm-91', name: 'Псалом 91', duration: '3 мин' },
                  { id: 'psalm-119', name: 'Псалом 119 по буквам имени', duration: '5 мин' }
                ].map(prayer => (
                  <div key={prayer.id} className="flex justify-between items-center border-b pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                        📖
                      </span>
                      <span className="font-medium">{prayer.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">{prayer.duration}</span>
                      <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg">
                        Читать
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* טופס הוספה - לא פעיל בבניית הקומפוננט הראשונית */}
      {isAddFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-bold text-lg">Добавить запись о близком</h2>
              <button onClick={() => setIsAddFormVisible(false)}>✕</button>
            </div>
            <div className="p-4">
              <div className="mb-3">
                <label className="block mb-1 font-medium">Имя на иврите</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="שם בעברית" />
              </div>
              <div className="mb-3">
                <label className="block mb-1 font-medium">Имя по-русски</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="Имя на русском" />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block mb-1 font-medium">Кем приходится</label>
                  <select className="w-full p-2 border rounded">
                    <option value="father">Отец</option>
                    <option value="mother">Мать</option>
                    <option value="grandfather">Дедушка</option>
                    <option value="grandmother">Бабушка</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-medium">Дата смерти</label>
                  <input type="date" className="w-full p-2 border rounded" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Примечания</label>
                <textarea className="w-full p-2 border rounded" rows={3}></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  className="px-4 py-2 border rounded"
                  onClick={() => setIsAddFormVisible(false)}
                >
                  Отмена
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded">
                  Добавить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DedicationManager;