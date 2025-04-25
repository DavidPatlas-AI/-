import React, { useState, useEffect } from 'react';

const TehilimViewer = () => {
  const [selectedPsalm, setSelectedPsalm] = useState(1);
  const [psalmText, setPsalmText] = useState({ hebrew: '', russian: '' });
  const [displayMode, setDisplayMode] = useState('dual'); // 'hebrew', 'russian', 'dual'
  const [fontSize, setFontSize] = useState('medium'); // 'small', 'medium', 'large'
  const [divineNameStyle, setDivineNameStyle] = useState('dash'); // 'dash', 'hebrew', 'hashem'
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [showSettings, setShowSettings] = useState(false);

  // Sample psalm data (in a real app, this would come from an API or database)
  const psalms = {
    1: {
      hebrew: 'אַשְׁרֵי הָאִישׁ אֲשֶׁר לֹא הָלַךְ בַּעֲצַת רְשָׁעִים וּבְדֶרֶךְ חַטָּאִים לֹא עָמָד וּבְמוֹשַׁב לֵצִים לֹא יָשָׁב׃ כִּי אִם בְּתוֹרַת יְהוָה חֶפְצוֹ וּבְתוֹרָתוֹ יֶהְגֶּה יוֹמָם וָלָיְלָה׃ וְהָיָה כְּעֵץ שָׁתוּל עַל־פַּלְגֵי מָיִם אֲשֶׁר פִּרְיוֹ יִתֵּן בְּעִתּוֹ וְעָלֵהוּ לֹא־יִבּוֹל וְכֹל אֲשֶׁר־יַעֲשֶׂה יַצְלִיחַ׃',
      russian: 'Блажен муж, который не ходит на совет нечестивых, и не стоит на пути грешников, и не сидит в собрании развратителей. Но в законе Господа воля его, и о законе Его размышляет он день и ночь. И будет он как дерево, посаженное при потоках вод, которое приносит плод свой во время свое, и лист которого не вянет; и во всем, что он ни делает, успеет.'
    },
    2: {
      hebrew: 'לָמָּה רָגְשׁוּ גוֹיִם וּלְאֻמִּים יֶהְגּוּ־רִיק׃ יִתְיַצְּבוּ מַלְכֵי־אֶרֶץ וְרוֹזְנִים נוֹסְדוּ־יָחַד עַל־יְהוָה וְעַל־מְשִׁיחוֹ׃ נְנַתְּקָה אֶת־מוֹסְרוֹתֵימוֹ וְנַשְׁלִיכָה מִמֶּנּוּ עֲבֹתֵימוֹ׃',
      russian: 'Зачем мятутся народы, и племена замышляют тщетное? Восстают цари земли, и князья совещаются вместе против Господа и против Помазанника Его: «Расторгнем узы их, и свергнем с себя оковы их».'
    },
    3: {
      hebrew: 'מִזְמוֹר לְדָוִד בְּבָרְחוֹ מִפְּנֵי אַבְשָׁלוֹם בְּנוֹ׃ יְהוָה מָה־רַבּוּ צָרָי רַבִּים קָמִים עָלָי׃ רַבִּים אֹמְרִים לְנַפְשִׁי אֵין יְשׁוּעָתָה לּוֹ בֵאלֹהִים סֶלָה׃',
      russian: 'Псалом Давида, когда он бежал от Авессалома, сына своего. Господи! как умножились враги мои! Многие восстают на меня. Многие говорят душе моей: «нет ему спасения в Боге».'
    },
    4: {
      hebrew: 'לַמְנַצֵּחַ בִּנְגִינוֹת מִזְמוֹר לְדָוִד׃ בְּקָרְאִי עֲנֵנִי אֱלֹהֵי צִדְקִי בַּצָּר הִרְחַבְתָּ לִּי חָנֵּנִי וּשְׁמַע תְּפִלָּתִי׃',
      russian: 'Начальнику хора. На струнных орудиях. Псалом Давида. Когда я взываю, услышь меня, Боже правды моей! В тесноте Ты давал мне простор. Помилуй меня и услышь молитву мою.'
    },
    5: {
      hebrew: 'לַמְנַצֵּחַ אֶל־הַנְּחִילוֹת מִזְמוֹר לְדָוִד׃ אֲמָרַי הַאֲזִינָה יְהוָה בִּינָה הֲגִיגִי׃ הַקְשִׁיבָה לְקוֹל שַׁוְעִי מַלְכִּי וֵאלֹהָי כִּי־אֵלֶיךָ אֶתְפַּלָּל׃',
      russian: 'Начальнику хора. На духовых орудиях. Псалом Давида. Услышь, Господи, слова мои, уразумей помышления мои. Внемли гласу вопля моего, Царь мой и Бог мой! ибо я к Тебе молюсь.'
    }
  };

  // Format divine names in Russian text based on selected style
  const formatDivineNames = (text) => {
    if (!text) return '';
    
    const divineNameMappings = {
      'dash': {
        'Господь': 'Г-сподь',
        'Господа': 'Г-спода',
        'Господу': 'Г-споду',
        'Господом': 'Г-сподом',
        'Боже': 'Б-же',
        'Бог': 'Б-г',
        'Бога': 'Б-га',
        'Богу': 'Б-гу',
        'Богом': 'Б-гом',
        'Всевышний': 'Вс-вышний',
        'Всевышнего': 'Вс-вышнего',
        'Всевышнему': 'Вс-вышнему',
        'Всевышним': 'Вс-вышним'
      },
      'hebrew': {
        'Господь': 'ה׳',
        'Господа': 'ה׳',
        'Господу': 'ה׳',
        'Господом': 'ה׳',
        'Боже': 'ה׳',
        'Бог': 'ה׳',
        'Бога': 'ה׳',
        'Богу': 'ה׳',
        'Богом': 'ה׳',
        'Всевышний': 'ה׳',
        'Всевышнего': 'ה׳',
        'Всевышнему': 'ה׳',
        'Всевышним': 'ה׳'
      },
      'hashem': {
        'Господь': 'а-Шем',
        'Господа': 'а-Шема',
        'Господу': 'а-Шему',
        'Господом': 'а-Шемом',
        'Боже': 'Вс-вышний',
        'Бог': 'Вс-вышний',
        'Бога': 'Вс-вышнего',
        'Богу': 'Вс-вышнему',
        'Богом': 'Вс-вышним',
        'Всевышний': 'Вс-вышний',
        'Всевышнего': 'Вс-вышнего',
        'Всевышнему': 'Вс-вышнему',
        'Всевышним': 'Вс-вышним'
      }
    };
    
    // Replace divine names in text
    let formattedText = text;
    const names = divineNameMappings[divineNameStyle];
    
    Object.keys(names).forEach(name => {
      const regex = new RegExp(`\\b${name}\\b`, 'g');
      formattedText = formattedText.replace(regex, `<span class="divine-name">${names[name]}</span>`);
    });
    
    return formattedText;
  };
  
  // Format divine names in Hebrew text
  const formatHebrewDivineNames = (text) => {
    if (!text) return '';
    
    // Replace the Tetragrammaton with the appropriate format based on style
    const replacements = {
      'dash': 'י-ה-ו-ה',
      'hebrew': 'ה׳',
      'hashem': 'השם'
    };
    
    return text.replace(/יְהוָה/g, `<span class="divine-name-hebrew">${replacements[divineNameStyle]}</span>`);
  };

  // Load psalm when selectedPsalm changes
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (psalms[selectedPsalm]) {
        setPsalmText({
          hebrew: formatHebrewDivineNames(psalms[selectedPsalm].hebrew),
          russian: formatDivineNames(psalms[selectedPsalm].russian)
        });
      } else {
        setPsalmText({
          hebrew: 'פרק לא נמצא',
          russian: 'Псалом не найден'
        });
      }
      setIsLoading(false);
    }, 300);
  }, [selectedPsalm, divineNameStyle]);

  // Toggle favorites
  const toggleFavorite = () => {
    if (favorites.includes(selectedPsalm)) {
      setFavorites(favorites.filter(id => id !== selectedPsalm));
    } else {
      setFavorites([...favorites, selectedPsalm]);
    }
  };

  // Get font size class
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-xl';
      default: return 'text-base';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Тикун Ха-Шем — Техилим</h1>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-full hover:bg-blue-500 transition-colors"
          >
            ⚙️
          </button>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white shadow-md p-4 border-b border-gray-200">
          <div className="container mx-auto">
            <h2 className="text-lg font-semibold mb-3">Настройки</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Display Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Режим отображения</label>
                <select 
                  value={displayMode} 
                  onChange={(e) => setDisplayMode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="dual">Иврит + Русский</option>
                  <option value="hebrew">Только Иврит</option>
                  <option value="russian">Только Русский</option>
                </select>
              </div>
              
              {/* Font Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Размер шрифта</label>
                <select 
                  value={fontSize} 
                  onChange={(e) => setFontSize(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="small">Маленький</option>
                  <option value="medium">Средний</option>
                  <option value="large">Крупный</option>
                </select>
              </div>
              
              {/* Divine Name Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Стиль имени Вс-вышнего</label>
                <select 
                  value={divineNameStyle} 
                  onChange={(e) => setDivineNameStyle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="dash">С дефисом (Б-г)</option>
                  <option value="hebrew">Иврит (ה׳)</option>
                  <option value="hashem">Словом (а-Шем)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setSelectedPsalm(prev => Math.max(1, prev - 1))}
                disabled={selectedPsalm === 1}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                ◀
              </button>
              
              <div className="relative w-24">
                <select 
                  value={selectedPsalm}
                  onChange={(e) => setSelectedPsalm(Number(e.target.value))}
                  className="block w-full pl-3 pr-10 py-2 text-center bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {[...Array(150)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              
              <button 
                onClick={() => setSelectedPsalm(prev => Math.min(150, prev + 1))}
                disabled={selectedPsalm === 150}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                ▶
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleFavorite}
                className={`p-2 rounded-full ${favorites.includes(selectedPsalm) ? 'text-yellow-500' : 'text-gray-400'}`}
              >
                ★
              </button>
              
              <button className="p-2 rounded-full text-gray-500 hover:text-gray-700">
                🖨️
              </button>
              
              <button className="p-2 rounded-full text-gray-500 hover:text-gray-700">
                💾
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-blue-500">Загрузка...</div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
              Псалом {selectedPsalm} / תהילים {selectedPsalm}
            </h2>
            
            <div className={`space-y-6 ${getFontSizeClass()}`}>
              {/* Hebrew Text */}
              {(displayMode === 'hebrew' || displayMode === 'dual') && (
                <div className="psalm-text hebrew">
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">עברית</h3>
                  <div 
                    className="text-right font-serif leading-loose" 
                    dir="rtl"
                    dangerouslySetInnerHTML={{ __html: psalmText.hebrew }}
                  />
                </div>
              )}
              
              {/* Russian Text */}
              {(displayMode === 'russian' || displayMode === 'dual') && (
                <div className="psalm-text russian">
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">Русский</h3>
                  <div 
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: psalmText.russian }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">Тикун Ха-Шем — Чтение псалмов и молитв на двух языках для возвышения души.</p>
          <p className="text-xs mt-2">© {new Date().getFullYear()} Все права защищены / כל הזכויות שמורות</p>
        </div>
      </footer>
      
      {/* CSS for divine names */}
      <style jsx global>{`
        .divine-name {
          color: #B45309;
          font-weight: bold;
        }
        
        .divine-name-hebrew {
          color: #B45309;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default TehilimViewer;
