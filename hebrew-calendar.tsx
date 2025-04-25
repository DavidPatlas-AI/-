import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Info, Plus, User, ArrowLeft } from 'lucide-react';

// טיפוסי מידע
type HebrewDate = {
  day: number;
  month: number;
  year: number;
  monthName: string;
}

type CalendarDay = {
  gregorianDate: Date;
  hebrewDate: HebrewDate;
  events: YahrzeitEvent[];
  isToday: boolean;
  isCurrentMonth: boolean;
}

type YahrzeitEvent = {
  id: string;
  name: {
    hebrew: string;
    russian: string;
  };
  relation: string;
  hebrewDate: HebrewDate;
  gregorianDate: Date;
  displayColor?: string;
}

type JewishHoliday = {
  id: string;
  name: {
    hebrew: string;
    russian: string;
  };
  hebrewDate: HebrewDate;
  type: 'major' | 'minor' | 'modern' | 'fast';
  description?: string;
}

// שמות חודשים עבריים ברוסית
const hebrewMonthsRussian = [
  'Нисан', 'Ияр', 'Сиван', 'Таммуз', 'Ав', 'Элул',
  'Тишрей', 'Хешван', 'Кислев', 'Тевет', 'Шват', 'Адар', 'Адар II'
];

// שמות חודשים עבריים בעברית
const hebrewMonthsHebrew = [
  'ניסן', 'אייר', 'סיוון', 'תמוז', 'אב', 'אלול',
  'תשרי', 'חשוון', 'כסלו', 'טבת', 'שבט', 'אדר', 'אדר ב'
];

// שמות ימי השבוע ברוסית
const daysOfWeekRussian = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

// דוגמה לאירועי יארצייט
const sampleYahrzeits: YahrzeitEvent[] = [
  {
    id: '1',
    name: {
      hebrew: 'אברהם בן יעקב',
      russian: 'Авраам бен Яаков'
    },
    relation: 'father',
    hebrewDate: {
      day: 15,
      month: 7, // תשרי
      year: 5783,
      monthName: 'תשרי'
    },
    gregorianDate: new Date(2022, 9, 10), // October 10, 2022
    displayColor: '#4361ee'
  },
  {
    id: '2',
    name: {
      hebrew: 'שרה בת לאה',
      russian: 'Сара бат Леа'
    },
    relation: 'mother',
    hebrewDate: {
      day: 7,
      month: 1, // ניסן
      year: 5782,
      monthName: 'ניסן'
    },
    gregorianDate: new Date(2022, 3, 8), // April 8, 2022
    displayColor: '#10b981'
  },
  {
    id: '3',
    name: {
      hebrew: 'דוד בן משה',
      russian: 'Давид бен Моше'
    },
    relation: 'brother',
    hebrewDate: {
      day: 22,
      month: 2, // אייר
      year: 5783,
      monthName: 'אייר'
    },
    gregorianDate: new Date(2023, 4, 13), // May 13, 2023
    displayColor: '#8b5cf6'
  }
];

// דוגמה לחגים יהודיים
const sampleHolidays: JewishHoliday[] = [
  {
    id: 'rosh-hashana',
    name: {
      hebrew: 'ראש השנה',
      russian: 'Рош а-Шана'
    },
    hebrewDate: {
      day: 1,
      month: 7, // תשרי
      year: 5785,
      monthName: 'תשרי'
    },
    type: 'major',
    description: 'Еврейский Новый год, начало десяти дней трепета'
  },
  {
    id: 'yom-kippur',
    name: {
      hebrew: 'יום כיפור',
      russian: 'Йом Кипур'
    },
    hebrewDate: {
      day: 10,
      month: 7, // תשרי
      year: 5785,
      monthName: 'תשרי'
    },
    type: 'major',
    description: 'День искупления, самый святой день в иудаизме'
  },
  {
    id: 'pesach',
    name: {
      hebrew: 'פסח',
      russian: 'Песах'
    },
    hebrewDate: {
      day: 15,
      month: 1, // ניסן
      year: 5785,
      monthName: 'ניסן'
    },
    type: 'major',
    description: 'Праздник свободы, посвященный исходу из Египта'
  }
];

const HebrewCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [yahrzeits, setYahrzeits] = useState<YahrzeitEvent[]>(sampleYahrzeits);
  const [holidays, setHolidays] = useState<JewishHoliday[]>(sampleHolidays);
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [displayLanguage, setDisplayLanguage] = useState<'hebrew' | 'russian'>('russian');
  
  useEffect(() => {
    // בפועל, כאן היה קוד שיוצר את החודש הנוכחי בלוח השנה
    // ומשלב את אירועי היארצייט והחגים
    generateCalendarDays();
  }, [currentDate, yahrzeits, holidays, displayLanguage]);
  
  // פונקציה ליצירת ימי הלוח
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // היום הראשון בחודש
    const firstDayOfMonth = new Date(year, month, 1);
    // היום האחרון בחודש
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // מספר הימים בחודש
    const daysInMonth = lastDayOfMonth.getDate();
    
    // היום בשבוע של היום הראשון בחודש (0 = ראשון, 6 = שבת)
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    // יצירת מערך של ימי הלוח
    const days: CalendarDay[] = [];
    
    // ימים מהחודש הקודם
    const prevMonth = new Date(year, month - 1, 1);
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrevMonth - i);
      days.push(createCalendarDay(date, false));
    }
    
    // ימים מהחודש הנוכחי
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push(createCalendarDay(date, true));
    }
    
    // ימים מהחודש הבא כדי להשלים את הלוח
    const remainingDays = 42 - days.length; // 6 שורות של 7 ימים
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push(createCalendarDay(date, false));
    }
    
    setCalendarDays(days);
  };
  
  // יצירת יום בלוח
  const createCalendarDay = (date: Date, isCurrentMonth: boolean): CalendarDay => {
    // בפועל, כאן היינו משתמשים בספריה לחישוב התאריך העברי
    // לצורך הדגמה, ניצור תאריך עברי פיקטיבי
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const hebrewMonth = ((month + 6) % 12) + 1; // פשוט לצורך הדגמה
    const hebrewYear = date.getFullYear() + 3760;
    
    const hebrewDate: HebrewDate = {
      day,
      month: hebrewMonth,
      year: hebrewYear,
      monthName: hebrewMonthsHebrew[hebrewMonth - 1]
    };
    
    // בדיקה אם יש אירועי יארצייט ביום זה
    const dayEvents = yahrzeits.filter(event => {
      // במציאות, היינו משווים את התאריך העברי
      // לצורך הדגמה, נשווה רק יום וחודש גרגוריאני
      return event.gregorianDate.getDate() === date.getDate() &&
             event.gregorianDate.getMonth() === date.getMonth();
    });
    
    // האם היום הוא היום הנוכחי
    const today = new Date();
    const isToday = date.getDate() === today.getDate() &&
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear();
    
    return {
      gregorianDate: date,
      hebrewDate,
      events: dayEvents,
      isToday,
      isCurrentMonth
    };
  };
  
  // מעבר לחודש הקודם
  const prevMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };
  
  // מעבר לחודש הבא
  const nextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };
  
  // פורמט שם החודש
  const formatMonthName = (date: Date): string => {
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    
    if (displayLanguage === 'hebrew') {
      const hebrewMonth = ((monthIndex + 7) % 12); // פשוט לצורך הדגמה
      const hebrewYear = year + 3760;
      return `${hebrewMonthsHebrew[hebrewMonth]} ${hebrewYear}`;
    } else {
      return `${new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(date)} ${year}`;
    }
  };
  
  // בחירת יום בלוח
  const selectDay = (day: CalendarDay) => {
    setSelectedDay(day);
  };
  
  // פורמט תאריך עברי
  const formatHebrewDate = (date: HebrewDate): string => {
    if (displayLanguage === 'hebrew') {
      return `${date.day} ${date.monthName} ${date.year}`;
    } else {
      const hebrewMonthRussian = hebrewMonthsRussian[date.month - 1];
      return `${date.day} ${hebrewMonthRussian} ${date.year}`;
    }
  };
  
  // תרגום יחס משפחתי לרוסית
  const relationToRussian = (relation: string): string => {
    const relations: {[key: string]: string} = {
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
      'other': 'Родственник'
    };
    
    return relations[relation] || relation;
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* כותרת */}
        <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-blue-600" />
            <h1 className="text-xl font-bold">Еврейский календарь</h1>
          </div>
          
          <div className="flex gap-2">
            <button 
              className={`px-3 py-1 rounded-lg text-sm ${displayLanguage === 'russian' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
              onClick={() => setDisplayLanguage('russian')}
            >
              Русский
            </button>
            <button 
              className={`px-3 py-1 rounded-lg text-sm ${displayLanguage === 'hebrew' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
              onClick={() => setDisplayLanguage('hebrew')}
            >
              עברית
            </button>
          </div>
        </div>
        
        {/* לוח השנה */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
          {/* ניווט חודשים */}
          <div className="p-4 flex items-center justify-between border-b">
            <button 
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={prevMonth}
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-lg font-bold">{formatMonthName(currentDate)}</h2>
            <button 
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={nextMonth}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          {/* ימי שבוע */}
          <div className="grid grid-cols-7 bg-gray-50 text-sm font-medium text-gray-500">
            {daysOfWeekRussian.map(day => (
              <div key={day} className="p-2 text-center">{day}</div>
            ))}
          </div>
          
          {/* ימי החודש */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => (
              <div 
                key={index}
                className={`p-2 border-t border-r relative min-h-[80px] ${
                  day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
                } ${
                  day.isToday ? 'font-bold' : ''
                } ${
                  day.gregorianDate.getDay() === 6 ? 'bg-blue-50' : ''
                }`}
                onClick={() => selectDay(day)}
              >
                {/* תאריך גרגוריאני */}
                <div className="text-sm">{day.gregorianDate.getDate()}</div>
                
                {/* תאריך עברי */}
                <div className="text-xs text-gray-500">
                  {day.hebrewDate.day}
                </div>
                
                {/* סימון ליארצייט */}
                {day.events.length > 0 && (
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></div>
                )}
                
                {/* סימון לחגים */}
                {holidays.some(h => 
                  h.hebrewDate.day === day.hebrewDate.day && 
                  h.hebrewDate.month === day.hebrewDate.month
                ) && (
                  <div className="mt-1">
                    <span className="px-1 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
                      {holidays.find(h => 
                        h.hebrewDate.day === day.hebrewDate.day && 
                        h.hebrewDate.month === day.hebrewDate.month
                      )?.name[displayLanguage === 'hebrew' ? 'hebrew' : 'russian']}
                    </span>
                  </div>
                )}
                
                {/* רשימת אירועי יארצייט */}
                {day.events.length > 0 && (
                  <div className="mt-1 space-y-1">
                    {day.events.map((event, i) => (
                      <div 
                        key={i}
                        className="px-1 py-0.5 text-xs bg-red-50 text-red-800 rounded truncate"
                        title={event.name[displayLanguage === 'hebrew' ? 'hebrew' : 'russian']}
                      >
                        {event.name[displayLanguage === 'hebrew' ? 'hebrew' : 'russian'].substring(0, 10)}
                        {event.name[displayLanguage === 'hebrew' ? 'hebrew' : 'russian'].length > 10 ? '...' : ''}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* פרטי יום נבחר */}
        {selectedDay && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="text-lg font-bold mb-3 flex items-center justify-between">
              <span>
                {selectedDay.gregorianDate.getDate()} {
                  new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(selectedDay.gregorianDate)
                } {selectedDay.gregorianDate.getFullYear()}
              </span>
              <span className="text-sm font-normal text-gray-500">
                {formatHebrewDate(selectedDay.hebrewDate)}
              </span>
            </h2>
            
            {/* חגים */}
            {holidays.some(h => 
              h.hebrewDate.day === selectedDay.hebrewDate.day && 
              h.hebrewDate.month === selectedDay.hebrewDate.month
            ) && (
              <div className="mb-4">
                <h3 className="font-bold text-blue-800 mb-2">Праздники</h3>
                {holidays
                  .filter(h => 
                    h.hebrewDate.day === selectedDay.hebrewDate.day && 
                    h.hebrewDate.month === selectedDay.hebrewDate.month
                  )
                  .map(holiday => (
                    <div key={holiday.id} className="p-3 bg-blue-50 rounded-lg mb-2">
                      <div className="font-bold">
                        {holiday.name[displayLanguage === 'hebrew' ? 'hebrew' : 'russian']}
                      </div>
                      {holiday.description && (
                        <div className="text-sm text-gray-700 mt-1">
                          {holiday.description}
                        </div>
                      )}
                    </div>
                  ))
                }
              </div>
            )}
            
            {/* יארצייט */}
            {selectedDay.events.length > 0 ? (
              <div>
                <h3 className="font-bold text-red-800 mb-2">Йорцайт</h3>
                {selectedDay.events.map(event => (
                  <div key={event.id} className="p-3 bg-red-50 rounded-lg mb-2">
                    <div className="font-bold">
                      {event.name[displayLanguage === 'hebrew' ? 'hebrew' : 'russian']}
                    </div>
                    <div className="text-sm text-gray-700 mt-1 flex justify-between">
                      <span>{relationToRussian(event.relation)}</span>
                      <span>
                        Дата смерти: {formatHebrewDate(event.hebrewDate)}
                      </span>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg">
                        Молитвы
                      </button>
                      <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg">
                        Напоминание
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                {selectedDay.gregorianDate.getDay() === 6 ? (
                  <div>
                    <div className="font-bold mb-1">Шаббат</div>
                    <div className="text-sm">Суббота - святой день в иудаизме, день отдыха и духовного обновления</div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-2">Нет событий в этот день</div>
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg flex items-center gap-1 mx-auto">
                      <Plus size={16} /> Добавить йорцайт
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* לגנדה */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Info size={16} className="text-blue-600" />
            <h3 className="font-bold">Обозначения</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Йорцайт (годовщина смерти)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-1 bg-blue-100 text-blue-800 rounded text-xs">текст</div>
              <span>Еврейский праздник</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-50"></div>
              <span>Шаббат (суббота)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="font-bold text-xs">22</div>
              <span>Сегодняшний день</span>
            </div>
          </div>
        </div>
        
        {/* כפתורי פעולה */}
        <div className="flex justify-center gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-1">
            <Plus size={16} /> Добавить Йорцайт
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-1">
            <User size={16} /> Мои напоминания
          </button>
        </div>
      </div>
    </div>
  );
};

export default HebrewCalendar;