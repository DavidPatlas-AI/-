import React, { useState, useEffect } from 'react';
import { Printer, Download, Share2, Check, RotateCcw, Save, Eye, Copy, ChevronDown, ChevronUp, FileText, ArrowLeft } from 'lucide-react';

// טיפוסי מידע
type CorrectionResult = {
  originalText: string;
  correctedText: string;
  htmlResult: string;
  style: string;
  timestamp: string;
  stats: {
    total: number;
    categories: {
      divine: number;
      lord: number;
      most_high: number;
      creator: number;
      tetragrammaton: number;
      other: number;
    }
  }
}

type CorrectionStyle = {
  id: string;
  name: string;
  example: string;
  description: string;
}

// סגנונות תיקון זמינים
const correctionStyles: CorrectionStyle[] = [
  {
    id: 'dash',
    name: 'С дефисом',
    example: 'Б-г',
    description: 'Замена буквы дефисом'
  },
  {
    id: 'hebrew',
    name: 'Иврит',
    example: 'ה\'',
    description: 'Замена на соответствующее имя на иврите'
  },
  {
    id: 'hashem',
    name: 'Словом',
    example: 'Вс-вышний',
    description: 'Замена на альтернативное название'
  },
  {
    id: 'brackets',
    name: 'В скобках',
    example: 'Б[о]г',
    description: 'Помещение буквы в скобки'
  },
  {
    id: 'transliteration',
    name: 'Транслитерация',
    example: 'Ашем',
    description: 'Использование транслитерации'
  }
];

// דוגמא לתוצאות תיקון
const sampleResult: CorrectionResult = {
  originalText: "Благословен Ты, Господь, Бог наш, Владыка Вселенной, создавший плод виноградной лозы. Благословен Ты, Господь, Бог наш, Владыка Вселенной, освятивший нас Своими заповедями и благоволивший к нам, и в любви и благоволении даровавший нам Свою святую Субботу в память о сотворении мира. Ибо этот день – начало всех святых праздников, память об исходе из Египта. Ибо нас Ты избрал и нас освятил из всех народов, и святую Субботу Свою в любви и благоволении даровал нам в наследие. Благословен Ты, Господь, освящающий Субботу.",
  correctedText: "Благословен Ты, Г-сподь, Б-г наш, Владыка Вселенной, создавший плод виноградной лозы. Благословен Ты, Г-сподь, Б-г наш, Владыка Вселенной, освятивший нас Своими заповедями и благоволивший к нам, и в любви и благоволении даровавший нам Свою святую Субботу в память о сотворении мира. Ибо этот день – начало всех святых праздников, память об исходе из Египта. Ибо нас Ты избрал и нас освятил из всех народов, и святую Субботу Свою в любви и благоволении даровал нам в наследие. Благословен Ты, Г-сподь, освящающий Субботу.",
  htmlResult: 'Благословен Ты, <span class="highlight">Г-сподь</span>, <span class="highlight">Б-г</span> наш, Владыка Вселенной, создавший плод виноградной лозы. Благословен Ты, <span class="highlight">Г-сподь</span>, <span class="highlight">Б-г</span> наш, Владыка Вселенной, освятивший нас Своими заповедями и благоволивший к нам, и в любви и благоволении даровавший нам Свою святую Субботу в память о сотворении мира. Ибо этот день – начало всех святых праздников, память об исходе из Египта. Ибо нас Ты избрал и нас освятил из всех народов, и святую Субботу Свою в любви и благоволении даровал нам в наследие. Благословен Ты, <span class="highlight">Г-сподь</span>, освящающий Субботу.',
  style: 'dash',
  timestamp: '2025-04-24T10:30:00Z',
  stats: {
    total: 5,
    categories: {
      divine: 2,
      lord: 3,
      most_high: 0,
      creator: 0,
      tetragrammaton: 0,
      other: 0
    }
  }
};

const CorrectionResults: React.FC = () => {
  const [result, setResult] = useState<CorrectionResult>(sampleResult);
  const [currentStyle, setCurrentStyle] = useState<string>(sampleResult.style);
  const [showOriginal, setShowOriginal] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(true);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
  
  // החלפת סגנון התיקון
  const changeStyle = (style: string) => {
    // במימוש אמיתי, כאן היינו מפעילים את מנגנון התיקון מחדש עם הסגנון החדש
    setCurrentStyle(style);
    
    // לצורך הדגמה, נשנה רק את שם הסגנון
    setResult(prev => ({
      ...prev,
      style: style
    }));
    
    showNotification('Стиль исправления изменен');
  };
  
  // הצגת התראה
  const showNotification = (message: string) => {
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 3000);
  };
  
  // העתקת הטקסט המתוקן ללוח
  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.correctedText)
      .then(() => {
        showNotification('Текст скопирован в буфер обмена');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        showNotification('Ошибка при копировании');
      });
  };
  
  // שמירת התיקון להיסטוריה
  const saveCorrection = () => {
    // במימוש אמיתי, כאן היינו שומרים את התיקון
    showNotification('Исправление сохранено');
  };
  
  // הורדת הטקסט המתוקן כקובץ טקסט
  const downloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([result.correctedText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `corrected-text-${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    showNotification('Файл загружен');
  };
  
  // פורמט תאריך
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // מילון קטגוריות בשפה הרוסית
  const categoryNames: {[key: string]: string} = {
    divine: 'Б-г (и падежи)',
    lord: 'Г-сподь (и падежи)',
    most_high: 'Вс-вышний (и падежи)',
    creator: 'Тв-рец (и падежи)',
    tetragrammaton: 'Тетраграмматон',
    other: 'Другие имена'
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* כותרת */}
        <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3 mb-4">
          <a href="correct-text.html" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft size={20} />
          </a>
          <h1 className="text-xl font-bold">Результаты исправления</h1>
        </div>
        
        {/* סטטיסטיקה */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-lg font-bold mb-3">Статистика исправлений</h2>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{result.stats.total}</div>
              <div className="text-sm text-gray-600">Всего исправлений</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{Object.keys(result.stats.categories).length}</div>
              <div className="text-sm text-gray-600">Типов имён</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{result.originalText.split(' ').length}</div>
              <div className="text-sm text-gray-600">Всего слов</div>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">По категориям:</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(result.stats.categories)
                .filter(([_, count]) => count > 0)
                .map(([category, count]) => (
                  <div key={category} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <span>{categoryNames[category]}</span>
                    <span className="font-bold text-blue-600">{count}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        
        {/* אפשרויות תיקון */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-lg font-bold mb-3">Стиль исправления</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
            {correctionStyles.map(style => (
              <button
                key={style.id}
                className={`p-3 border rounded-lg text-center ${currentStyle === style.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                onClick={() => changeStyle(style.id)}
              >
                <div className="font-medium">{style.name}</div>
                <div className="text-sm text-gray-500">Пример: {style.example}</div>
              </button>
            ))}
          </div>
          
          <div className="flex justify-end">
            <button 
              className="flex items-center gap-1 text-blue-600 text-sm"
              onClick={() => setShowExplanation(!showExplanation)}
            >
              {showExplanation ? (
                <>Скрыть объяснение <ChevronUp size={16} /></>
              ) : (
                <>Показать объяснение <ChevronDown size={16} /></>
              )}
            </button>
          </div>
          
          {showExplanation && (
            <div className="mt-2 p-3 bg-blue-50 text-sm rounded-lg">
              <p className="mb-2">
                <strong>Почему важно исправлять имена Всевышнего:</strong> В еврейской традиции имена Всевышнего обладают святостью и должны использоваться с уважением. В текстах, которые могут быть напечатаны или показаны на экране, принято заменять эти имена специальными формами, чтобы избежать их стирания или неуважительного обращения.
              </p>
              
              <div className="mb-1"><strong>Варианты исправления:</strong></div>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>С дефисом (Б-г)</strong>: Классический метод, при котором одна буква заменяется дефисом.</li>
                <li><strong>Иврит (ה')</strong>: Замена на соответствующее имя на иврите.</li>
                <li><strong>Словом (Вс-вышний)</strong>: Использование альтернативных названий.</li>
                <li><strong>В скобках (Б[о]г)</strong>: Помещение одной буквы в скобки.</li>
                <li><strong>Транслитерация (Ашем)</strong>: Использование транслитерации слова "Имя" (ха-Шем).</li>
              </ul>
            </div>
          )}
        </div>
        
        {/* טקסט מתוקן */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold">Исправленный текст</h2>
            <button
              className="flex items-center gap-1 text-blue-600 text-sm"
              onClick={() => setShowOriginal(!showOriginal)}
            >
              {showOriginal ? (
                <>Скрыть оригинал <ChevronUp size={16} /></>
              ) : (
                <>Показать оригинал <ChevronDown size={16} /></>
              )}
            </button>
          </div>
          
          {showOriginal && (
            <div className="p-3 border border-gray-200 rounded-lg mb-3 text-gray-700">
              <div className="text-sm font-medium mb-1">Исходный текст:</div>
              <div>{result.originalText}</div>
            </div>
          )}
          
          <div className="p-3 bg-blue-50 rounded-lg mb-3">
            <div dangerouslySetInnerHTML={{ 
              __html: result.htmlResult.replace(
                /<span class="highlight">(.*?)<\/span>/g, 
                '<span style="background-color: #fff3cd; padding: 0 2px; border-radius: 2px;">$1</span>'
              ) 
            }} />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button 
              className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg"
              onClick={copyToClipboard}
            >
              <Copy size={16} /> Копировать
            </button>
            <button 
              className="flex items-center gap-1 px-3 py-2 bg-gray-600 text-white rounded-lg"
              onClick={downloadText}
            >
              <Download size={16} /> Скачать
            </button>
            <button 
              className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg"
              onClick={saveCorrection}
            >
              <Save size={16} /> Сохранить
            </button>
            <button 
              className="flex items-center gap-1 px-3 py-2 bg-gray-600 text-white rounded-lg"
            >
              <Printer size={16} /> Печать
            </button>
            <button 
              className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg"
            >
              <Share2 size={16} /> Поделиться
            </button>
          </div>
        </div>
        
        {/* הכרטיסייה שלך */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-lg font-bold mb-3">Ваша карточка</h2>
          
          <div className="flex gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <FileText size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <div className="font-bold">Текст молитвы (Кидуш)</div>
                <div className="text-sm text-gray-500">{formatDate(result.timestamp)}</div>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                Исправлено имен: {result.stats.total} • Стиль: {correctionStyles.find(s => s.id === result.style)?.name || result.style}
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                  Редактировать заново
                </button>
                <button className="px-3 py-1 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50">
                  В избранное
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* כפתורי פעולה נוספים */}
        <div className="flex flex-wrap gap-2 justify-center">
          <a href="correct-text.html" className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700">
            <RotateCcw size={16} /> Исправить новый текст
          </a>
          <a href="index.html" className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg">
            <Check size={16} /> Завершить
          </a>
        </div>
      </div>
      
      {/* התראה */}
      {notificationMessage && (
        <div className="fixed bottom-4 right-4 left-4 bg-green-600 text-white p-3 rounded-lg shadow-lg text-center">
          {notificationMessage}
        </div>
      )}
    </div>
  );
};

export default CorrectionResults;