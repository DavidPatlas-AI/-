import React, { useState } from 'react';

const DivineCorrectorApp = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('טקסט מתוקן יופיע כאן...');
  const [selectedStyle, setSelectedStyle] = useState('ה\'');
  const [stats, setStats] = useState({
    occurrences: 0,
    corrections: 0,
    length: 0
  });
  const [isProcessed, setIsProcessed] = useState(false);

  // רשימת שמות ה' ברוסית
  const divineNames = [
    'Господь', 'Бог', 'Всевышний', 'Иегова', 'ЙХВХ', 'Яхве', 
    'Адонай', 'Элохим', 'Саваоф', 'Шаддай', 'Вседержитель', 'Всемогущий', 'Творец'
  ];

  // פונקציה לתיקון הטקסט
  const correctText = () => {
    if (!inputText.trim()) {
      alert('נא להזין טקסט לתיקון');
      return;
    }

    let correctedText = inputText;
    let replacementCount = 0;

    // יצירת ביטוי רגולרי לחיפוש שמות ה'
    const namesPattern = divineNames.map(name => `\\b${name}\\b`).join('|');
    const regex = new RegExp(namesPattern, 'gi');

    // ספירת מופעים
    const matches = inputText.match(regex);
    const occurrencesCount = matches ? matches.length : 0;

    // החלפת כל המופעים
    correctedText = correctedText.replace(regex, `<span class="divine-name">${selectedStyle}</span>`);
    replacementCount = occurrencesCount;

    // עדכון הטקסט המתוקן והסטטיסטיקה
    setOutputText(correctedText);
    setStats({
      occurrences: occurrencesCount,
      corrections: replacementCount,
      length: inputText.length
    });
    setIsProcessed(true);
  };

  // פונקציה לניקוי הטקסט
  const clearText = () => {
    setInputText('');
    setOutputText('טקסט מתוקן יופיע כאן...');
    setStats({
      occurrences: 0,
      corrections: 0,
      length: 0
    });
    setIsProcessed(false);
  };

  // פונקציה להעתקת הטקסט
  const copyText = (text) => {
    navigator.clipboard.writeText(text.replace(/<[^>]*>/g, ''));
    alert('הטקסט הועתק בהצלחה!');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600 mb-2">בוט תיקון שם ה׳</h1>
          <p className="text-gray-600">הדבק טקסט ברוסית והמערכת תחליף את שם ה׳ לצורה המועדפת</p>
        </div>

        {/* אפשרויות תיקון */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-lg font-semibold mb-3">אפשרויות תיקון שם ה'</h2>
          <div className="flex flex-wrap gap-2">
            {['ה\'', 'י-ה-ו-ה', 'השם', 'יי', 'אדנ-י'].map(style => (
              <button
                key={style}
                className={`px-3 py-2 rounded-full text-sm ${
                  selectedStyle === style 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800 border border-gray-300'
                }`}
                onClick={() => setSelectedStyle(style)}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* עורך טקסט */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* תיבת טקסט מקור */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-500 text-white py-2 px-3 flex justify-between items-center">
              <div>טקסט מקור ברוסית</div>
              <div>
                <button 
                  className="text-white mr-3 text-sm"
                  onClick={() => copyText(inputText)}
                >
                  העתק
                </button>
                <button 
                  className="text-white text-sm"
                  onClick={clearText}
                >
                  נקה
                </button>
              </div>
            </div>
            <div className="p-4">
              <textarea
                className="w-full min-h-40 border-0 focus:ring-0 text-base resize-none"
                placeholder="הדבק כאן טקסט ברוסית לתיקון..."
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  setStats(prev => ({...prev, length: e.target.value.length}));
                }}
              />
            </div>
          </div>

          {/* תיבת טקסט מתוקן */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-500 text-white py-2 px-3 flex justify-between items-center">
              <div>טקסט מתוקן</div>
              <div>
                <button 
                  className="text-white text-sm"
                  onClick={() => copyText(outputText)}
                >
                  העתק
                </button>
              </div>
            </div>
            <div className="p-4 min-h-40 max-h-60 overflow-auto">
              {isProcessed ? (
                <div dangerouslySetInnerHTML={{ 
                  __html: outputText.replace(
                    /<span class="divine-name">(.*?)<\/span>/g, 
                    '<span style="color: #B45309; font-weight: bold;">$1</span>'
                  ) 
                }} />
              ) : (
                <div className="text-gray-500">{outputText}</div>
              )}
            </div>
          </div>
        </div>

        {/* כפתור תיקון */}
        <div className="mt-6">
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md"
            onClick={correctText}
          >
            תקן את שם ה'
          </button>
        </div>

        {/* סטטיסטיקה */}
        <div className="bg-white rounded-lg shadow-md p-4 mt-6">
          <h2 className="text-lg font-semibold mb-3">סטטיסטיקה</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">נמצאו הופעות של שם ה'</div>
              <div className="text-xl font-bold text-blue-600">{stats.occurrences}</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">בוצעו תיקונים</div>
              <div className="text-xl font-bold text-green-600">{stats.corrections}</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">אורך טקסט מקורי</div>
              <div className="text-xl font-bold">{stats.length} תווים</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DivineCorrectorApp;
