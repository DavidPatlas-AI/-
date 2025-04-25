// מערכת ניהול שפה בסיסית
const TikunHaShemLanguage = {
  // המצב הנוכחי של השפה
  currentLanguage: 'ru', // ברירת מחדל היא רוסית
  
  // התרגומים
  translations: {
    // רוסית
    ru: {
      // כותרות ראשיות
      siteTitle: 'Тикун Ха-Шем',
      homeTitle: 'Тикун Ха-Шем - Псалмы и Молитвы',
      mainSubtitle: 'Чтение псалмов и молитв на трех языках для возвышения души',
      
      // תפריט ניווט
      nav: {
        home: 'Главная',
        tehilim: 'Техилим',
        memorial: 'За усопших',
        prayerbook: 'Молитвенник',
        corrector: 'Исправление текста'
      },
      
      // כפתורי פעולה
    const btnCorrect = document.getElementById('btn-correct');
    if (btnCorrect) {
      btnCorrect.textContent = this.getText('corrector.btnCorrect');
    }
    
    const btnClear = document.getElementById('btn-clear');
    if (btnClear) {
      btnClear.textContent = this.getText('corrector.btnClear');
    }
    
    // תוצאות
    const resultTitle = document.querySelector('#result-card .result-title span:first-child');
    if (resultTitle) {
      resultTitle.textContent = this.getText('corrector.resultTitle');
    }
    
    // סטטיסטיקות
    const statsLabels = document.querySelectorAll('.stats-label');
    if (statsLabels.length > 0) {
      statsLabels[0].textContent = this.getText('corrector.totalReplacements');
    }
    
    // כפתורי שיתוף
    const btnCopy = document.getElementById('btn-copy');
    if (btnCopy) {
      btnCopy.textContent = this.getText('buttons.copy');
    }
    
    const btnPrint = document.getElementById('btn-print');
    if (btnPrint) {
      btnPrint.textContent = this.getText('buttons.print');
    }
    
    const btnShare = document.getElementById('btn-share');
    if (btnShare) {
      btnShare.textContent = this.getText('buttons.share');
    }
    
    // היסטוריה
    const historyHeader = document.querySelector('.history-header span:first-child');
    if (historyHeader) {
      historyHeader.textContent = this.getText('corrector.history');
    }
    
    const clearHistory = document.getElementById('btn-clear-history');
    if (clearHistory) {
      clearHistory.textContent = this.getText('corrector.clearHistory');
    }
  },
  
  // עדכון דף תהילים
  updateTehilimPage: function() {
    // כותרת העמוד
    const headerTitle = document.querySelector('.header-title');
    if (headerTitle) {
      headerTitle.textContent = this.getText('tehilim.title');
    }
    
    // בורר פרקים
    const selectorTitle = document.querySelector('.selector-title');
    if (selectorTitle) {
      selectorTitle.textContent = this.getText('tehilim.selectChapter');
    }
    
    // קפתורי ניווט
    const prevButton = document.getElementById('prev-chapter');
    if (prevButton) {
      prevButton.textContent = this.getText('buttons.previous');
    }
    
    const nextButton = document.getElementById('next-chapter');
    if (nextButton) {
      nextButton.textContent = this.getText('buttons.next');
    }
    
    // כלי קריאה
    const toolsTitle = document.querySelector('.tools-title');
    if (toolsTitle) {
      toolsTitle.textContent = this.getText('tehilim.readingTools');
    }
    
    // כפתורי כלים
    const toggleTranslation = document.getElementById('toggle-translation');
    if (toggleTranslation) {
      toggleTranslation.textContent = this.getText('tehilim.translation');
    }
    
    const toggleNikud = document.getElementById('toggle-nikud');
    if (toggleNikud) {
      toggleNikud.textContent = this.getText('tehilim.nikud');
    }
    
    const toggleTaamim = document.getElementById('toggle-taamim');
    if (toggleTaamim) {
      toggleTaamim.textContent = this.getText('tehilim.signs');
    }
    
    const toggleNameHighlight = document.getElementById('toggle-name-highlight');
    if (toggleNameHighlight) {
      toggleNameHighlight.textContent = this.getText('tehilim.nameHighlight');
    }
  },
  
  // עדכון דף אזכרה
  updateMemorialPage: function() {
    // כותרת העמוד
    const headerTitle = document.querySelector('.header-title');
    if (headerTitle) {
      headerTitle.textContent = this.getText('memorial.title');
    }
    
    // בורר שפה
    const languageOptions = document.querySelectorAll('.language-option');
    if (languageOptions.length > 0) {
      languageOptions[0].textContent = this.getText('common.russian');
      languageOptions[1].textContent = this.getText('common.hebrew');
      languageOptions[2].textContent = this.getText('common.phonetic');
    }
    
    // טופס
    const formTitle = document.querySelector('.form-title');
    if (formTitle) {
      formTitle.textContent = this.getText('memorial.formTitle');
    }
    
    const formDesc = document.querySelector('.form-desc');
    if (formDesc) {
      formDesc.textContent = this.getText('memorial.formDesc');
    }
    
    const formLabels = document.querySelectorAll('.form-label');
    if (formLabels.length >= 2) {
      formLabels[0].textContent = this.getText('memorial.deceasedName');
      formLabels[1].textContent = this.getText('memorial.motherName');
    }
    
    const updateButton = document.getElementById('update-prayers');
    if (updateButton) {
      updateButton.textContent = this.getText('buttons.apply');
    }
    
    // כלי קריאה
    const toolsTitle = document.querySelector('.tools-title');
    if (toolsTitle) {
      toolsTitle.textContent = this.getText('tehilim.readingTools');
    }
    
    // כרטיסיות תפילה
    const prayerTabs = document.querySelectorAll('.prayer-tab');
    if (prayerTabs.length >= 5) {
      prayerTabs[0].textContent = this.getText('memorial.kaddish');
      prayerTabs[1].textContent = this.getText('memorial.elMale');
      prayerTabs[2].textContent = this.getText('memorial.yizkor');
      prayerTabs[3].textContent = this.getText('memorial.tehilim');
      prayerTabs[4].textContent = this.getText('memorial.azkara');
    }
    
    // כותרות תפילה
    const kaddishTitle = document.querySelector('#prayer-kaddish .prayer-title');
    if (kaddishTitle) {
      kaddishTitle.textContent = this.getText('memorial.kaddish');
    }
    
    const kaddishSubtitle = document.querySelector('#prayer-kaddish .prayer-subtitle');
    if (kaddishSubtitle) {
      kaddishSubtitle.textContent = this.getText('memorial.kaddishDesc');
    }
    
    // כפתורי שיתוף
    const printButtons = document.querySelectorAll('.button-print');
    printButtons.forEach(btn => {
      btn.textContent = this.getText('buttons.print');
    });
    
    const shareButtons = document.querySelectorAll('.button-share');
    shareButtons.forEach(btn => {
      btn.textContent = this.getText('buttons.share');
    });
    
    // רשימת יארצייט
    const yahrzeitHeader = document.querySelector('.yahrzeit-header');
    if (yahrzeitHeader) {
      yahrzeitHeader.textContent = this.getText('memorial.yahrzeit');
    }
    
    const addYahrzeit = document.querySelector('.yahrzeit-item button.button-primary');
    if (addYahrzeit) {
      addYahrzeit.textContent = this.getText('memorial.addYahrzeit');
    }
  },
  
  // עדכון דף תהילים קי"ט
  updatePsalm119Page: function() {
    // כותרת העמוד
    const headerTitle = document.querySelector('.header-title');
    if (headerTitle) {
      headerTitle.textContent = this.getText('psalm119.title');
    }
    
    // בורר שפה
    const languageOptions = document.querySelectorAll('.language-option');
    if (languageOptions.length > 0) {
      languageOptions[0].textContent = this.getText('common.russian');
      languageOptions[1].textContent = this.getText('common.hebrew');
      languageOptions[2].textContent = this.getText('common.phonetic');
    }
    
    // כותרת מידע
    const infoTitle = document.querySelector('.info-title');
    if (infoTitle) {
      infoTitle.textContent = this.getText('psalm119.title');
    }
    
    // תת כותרת
    const infoSubtitle = document.querySelector('.info-subtitle');
    if (infoSubtitle) {
      infoSubtitle.textContent = this.getText('psalm119.subtitle');
    }
    
    // טופס
    const formLabels = document.querySelectorAll('.form-label');
    if (formLabels.length >= 2) {
      formLabels[0].textContent = this.getText('psalm119.deceasedName');
      formLabels[1].textContent = this.getText('psalm119.motherName');
    }
    
    const generateButton = document.getElementById('generate-psalm');
    if (generateButton) {
      generateButton.textContent = this.getText('psalm119.showVerses');
    }
    
    // כלי קריאה
    const toolsTitle = document.querySelector('.tools-title');
    if (toolsTitle) {
      toolsTitle.textContent = this.getText('tehilim.readingTools');
    }
  },
  
  // עדכון דף סידור
  updateSiddurPage: function() {
    // כותרת העמוד
    const headerTitle = document.querySelector('.header-title');
    if (headerTitle) {
      headerTitle.textContent = this.getText('siddur.title');
    }
    
    // בורר שפה
    const languageOptions = document.querySelectorAll('.language-option');
    if (languageOptions.length > 0) {
      languageOptions[0].textContent = this.getText('common.russian');
      languageOptions[1].textContent = this.getText('common.hebrew');
      languageOptions[2].textContent = this.getText('common.phonetic');
    }
    
    // כלי קריאה
    const toolsTitle = document.querySelector('.tools-title');
    if (toolsTitle) {
      toolsTitle.textContent = this.getText('tehilim.readingTools');
    }
    
    // כרטיסיות תפילה
    const categoryOptions = document.querySelectorAll('.category-option');
    if (categoryOptions.length >= 4) {
      categoryOptions[0].textContent = this.getText('siddur.morningPrayers');
      categoryOptions[1].textContent = this.getText('siddur.eveningPrayers');
      categoryOptions[2].textContent = this.getText('siddur.shabbat');
      categoryOptions[3].textContent = this.getText('siddur.other');
    }
    
    // פריטי תפילה
    const prayerTitles = document.querySelectorAll('.prayer-item-title');
    if (prayerTitles.length >= 7) {
      prayerTitles[0].textContent = this.getText('siddur.modeAni');
      prayerTitles[1].textContent = this.getText('siddur.netilatYadayim');
      prayerTitles[2].textContent = this.getText('siddur.asherYatzar');
      prayerTitles[3].textContent = this.getText('siddur.elohaiNeshama');
      prayerTitles[4].textContent = this.getText('siddur.morningBlessings');
      prayerTitles[5].textContent = this.getText('siddur.shema');
      prayerTitles[6].textContent = this.getText('siddur.amidahShacharit');
    }
    
    // הסברי תפילה
    const prayerDescs = document.querySelectorAll('.prayer-item-desc');
    if (prayerDescs.length >= 7) {
      prayerDescs[0].textContent = this.getText('siddur.modeAniDesc');
      prayerDescs[1].textContent = this.getText('siddur.netilatYadayimDesc');
      prayerDescs[2].textContent = this.getText('siddur.asherYatzarDesc');
      prayerDescs[3].textContent = this.getText('siddur.elohaiNeshamaDesc');
      prayerDescs[4].textContent = this.getText('siddur.morningBlessingsDesc');
      prayerDescs[5].textContent = this.getText('siddur.shemaDesc');
      prayerDescs[6].textContent = this.getText('siddur.amidahShacharitDesc');
    }
    
    // כותרת סימניות
    const bookmarksTitle = document.querySelector('.bookmarks-title');
    if (bookmarksTitle) {
      bookmarksTitle.textContent = this.getText('siddur.myBookmarks');
    }
  },
  
  // עדכון תפריט ניווט תחתון
  updateBottomNav: function() {
    const navLabels = document.querySelectorAll('.bottom-nav-label');
    if (navLabels.length >= 4) {
      navLabels[0].textContent = this.getText('nav.home');
      navLabels[1].textContent = this.getText('nav.tehilim');
      navLabels[2].textContent = this.getText('nav.memorial');
      navLabels[3].textContent = this.getText('nav.prayerbook');
    }
  }
};

// אתחול מערכת השפה
// document.addEventListener('DOMContentLoaded', function() {
//   TikunHaShemLanguage.init();
// });

// לשימוש באתר
// TikunHaShemLanguage.init();ם
      buttons: {
        start: 'Начать чтение',
        memorial: 'Молитва за усопших',
        search: 'Поиск',
        select: 'Выбрать',
        correct: 'Исправить текст',
        clear: 'Очистить',
        copy: 'Копировать',
        print: 'Печать',
        share: 'Поделиться',
        save: 'Сохранить',
        apply: 'Применить',
        next: 'Следующий',
        previous: 'Предыдущий',
        back: 'Назад'
      },
      
      // קטגוריות כלליות
      common: {
        chapter: 'Псалом',
        verse: 'Стих',
        section: 'Раздел',
        search: 'Искать псалом или ключевое слово...',
        psalm: 'Псалом',
        psalms: 'Псалмы',
        settings: 'Настройки',
        language: 'Язык',
        hebrew: 'Иврит',
        russian: 'Русский',
        phonetic: 'Фонетика'
      },
      
      // דף תיקון טקסט
      corrector: {
        title: 'Исправление имён Всевышнего',
        subtitle: 'Почему важно правильно писать имена Всевышнего',
        explanation: 'Согласно еврейской традиции, имена Всевышнего обладают святостью и требуют особого уважения. В печатных и электронных материалах принято заменять полные имена особыми формами записи, чтобы избежать их стирания или осквернения.',
        examples: 'Примеры правильной замены:',
        editorTitle: 'Исправление текста',
        editorSubtitle: 'Вставьте текст ниже и выберите предпочтительный способ исправления имён Всевышнего',
        correctionStyle: 'Способ исправления:',
        styleDash: 'С дефисом (Б-г)',
        styleHebrew: 'Иврит (ה\')',
        styleHaShem: 'Словом (а-Шем)',
        btnCorrect: 'Исправить текст',
        btnClear: 'Очистить',
        resultTitle: 'Исправленный текст',
        totalReplacements: 'Всего замен',
        history: 'История исправлений',
        clearHistory: 'Очистить историю'
      },
      
      // דף תהילים
      tehilim: {
        title: 'Псалмы (Техилим)',
        selectChapter: 'Выберите псалом',
        readingTools: 'Инструменты чтения',
        translation: 'Перевод',
        nikud: 'Огласовки',
        signs: 'Знаки',
        nameHighlight: 'Имена',
        fontSize: 'Размер текста',
        multiLingual: 'Много-язычно',
        hebrewOnly: 'Только иврит',
        russianOnly: 'Только русский',
        phoneticOnly: 'Только фонетика',
        bookmark: 'Закладка',
        recent: 'Недавно прочитанные',
        readCount: 'Прочитано раз:',
        lastRead: 'Последнее чтение:'
      },
      
      // דף אזכרה
      memorial: {
        title: 'Молитвы за усопших',
        subtitle: 'Молитвы для возвышения души',
        formTitle: 'Молитва за усопшего',
        formDesc: 'Введите имя усопшего, чтобы включить его в текст молитвы',
        deceasedName: 'Имя усопшего (на иврите):',
        motherName: 'Имя матери усопшего (на иврите):',
        kaddish: 'Кадиш',
        kaddishDesc: 'Молитва освящения Имени Всевышнего',
        elMale: 'Эль Мале Рахамим',
        elMaleDesc: 'Молитва "Бог, исполненный милосердия"',
        yizkor: 'Изкор',
        yizkorDesc: 'Поминальная молитва',
        tehilim: 'Избранные Псалмы',
        tehilimDesc: 'Псалмы, традиционно читаемые в память об усопших',
        azkara: 'День памяти',
        azkaraDesc: 'Обычаи и молитвы для дня годовщины смерти',
        yahrzeit: 'Список годовщин (Яарцайт)',
        addYahrzeit: 'Добавить годовщину'
      },
      
      // Psalm 119
      psalm119: {
        title: 'Псалом 119 по буквам имени',
        subtitle: 'Введите имя усопшего на иврите и получите строфы Псалма 119, соответствующие буквам имени',
        deceasedName: 'Имя усопшего (на иврите):',
        motherName: 'Имя матери усопшего (на иврите):',
        showVerses: 'Показать строфы Псалма 119',
        letterSection: 'Строфа',
        dedication: 'По традиции читают строфы Псалма 119, соответствующие каждой букве имени усопшего.',
        chapterName: 'Псалом 119'
      },
      
      // סידור תפילה
      siddur: {
        title: 'Молитвенник (Сидур)',
        morningPrayers: 'Утренние',
        eveningPrayers: 'Вечерние',
        shabbat: 'Шаббат',
        other: 'Другие',
        modeAni: 'Модэ Ани',
        modeAniDesc: 'Первая утренняя молитва: "Благодарю Тебя"',
        netilatYadayim: 'Нетилат Ядаим',
        netilatYadayimDesc: 'Благословение на омовение рук',
        asherYatzar: 'Ашер Яцар',
        asherYatzarDesc: 'Благословение после посещения туалета',
        elohaiNeshama: 'Элоай Нешама',
        elohaiNeshamaDesc: 'Благодарность за возвращение души',
        morningBlessings: 'Утренние благословения',
        morningBlessingsDesc: 'Биркот а-Шахар',
        shema: 'Шма Исраэль',
        shemaDesc: 'Слушай, Израиль',
        amidahShacharit: 'Амида (Шахарит)',
        amidahShacharitDesc: 'Основная утренняя молитва',
        myBookmarks: 'Мои закладки'
      }
    },
    
    // עברית
    he: {
      // כותרות ראשיות
      siteTitle: 'תיקון השם',
      homeTitle: 'תיקון השם - תהילים ותפילות',
      mainSubtitle: 'קריאת תהילים ותפילות בשלוש שפות לעילוי נשמה',
      
      // תפריט ניווט
      nav: {
        home: 'ראשי',
        tehilim: 'תהילים',
        memorial: 'לעילוי נשמת',
        prayerbook: 'סידור',
        corrector: 'תיקון טקסט'
      },
      
      // כפתורים
      buttons: {
        start: 'התחל לקרוא',
        memorial: 'תפילה לעילוי נשמת',
        search: 'חיפוש',
        select: 'בחר',
        correct: 'תקן טקסט',
        clear: 'נקה',
        copy: 'העתק',
        print: 'הדפס',
        share: 'שתף',
        save: 'שמור',
        apply: 'החל',
        next: 'הבא',
        previous: 'הקודם',
        back: 'חזור'
      },
      
      // קטגוריות כלליות
      common: {
        chapter: 'פרק',
        verse: 'פסוק',
        section: 'חלק',
        search: 'חפש פרק או מילת מפתח...',
        psalm: 'מזמור',
        psalms: 'תהילים',
        settings: 'הגדרות',
        language: 'שפה',
        hebrew: 'עברית',
        russian: 'רוסית',
        phonetic: 'פונטי'
      },
      
      // דף תיקון טקסט
      corrector: {
        title: 'תיקון שמות השם',
        subtitle: 'מדוע חשוב לכתוב נכון את שמות השם',
        explanation: 'על פי המסורת היהודית, שמות השם מקודשים ודורשים כבוד מיוחד. בחומר מודפס ואלקטרוני מקובל להחליף את השמות המלאים בצורות כתיבה מיוחדות, כדי למנוע את מחיקתם או חילולם.',
        examples: 'דוגמאות להחלפה נכונה:',
        editorTitle: 'תיקון טקסט',
        editorSubtitle: 'הדבק טקסט למטה ובחר את האופן המועדף לתיקון שמות השם',
        correctionStyle: 'סגנון תיקון:',
        styleDash: 'עם מקף (א-לוהים)',
        styleHebrew: 'עברית (ה\')',
        styleHaShem: 'במילה (השם)',
        btnCorrect: 'תקן טקסט',
        btnClear: 'נקה',
        resultTitle: 'טקסט מתוקן',
        totalReplacements: 'סך הכל החלפות',
        history: 'היסטורית תיקונים',
        clearHistory: 'נקה היסטוריה'
      },
      
      // דף תהילים
      tehilim: {
        title: 'תהילים',
        selectChapter: 'בחר פרק',
        readingTools: 'כלי קריאה',
        translation: 'תרגום',
        nikud: 'ניקוד',
        signs: 'טעמים',
        nameHighlight: 'שמות',
        fontSize: 'גודל טקסט',
        multiLingual: 'רב לשוני',
        hebrewOnly: 'עברית בלבד',
        russianOnly: 'רוסית בלבד',
        phoneticOnly: 'פונטי בלבד',
        bookmark: 'סימניה',
        recent: 'נקרא לאחרונה',
        readCount: 'מספר קריאות:',
        lastRead: 'קריאה אחרונה:'
      },
      
      // דף אזכרה
      memorial: {
        title: 'תפילות לעילוי נשמת',
        subtitle: 'תפילות לעילוי נשמה',
        formTitle: 'תפילה לעילוי נשמת',
        formDesc: 'הזן את שם הנפטר/ת כדי לכלול אותו בטקסט התפילה',
        deceasedName: 'שם הנפטר/ת (בעברית):',
        motherName: 'שם האם (בעברית):',
        kaddish: 'קדיש',
        kaddishDesc: 'תפילת קידוש שם השם',
        elMale: 'אל מלא רחמים',
        elMaleDesc: 'תפילת "אל מלא רחמים"',
        yizkor: 'יזכור',
        yizkorDesc: 'תפילת הזכרה',
        tehilim: 'מזמורי תהילים נבחרים',
        tehilimDesc: 'מזמורי תהילים שנהוג לקרוא לעילוי נשמת',
        azkara: 'יום הזיכרון',
        azkaraDesc: 'מנהגים ותפילות ליום השנה',
        yahrzeit: 'רשימת יארצייט',
        addYahrzeit: 'הוסף יארצייט'
      },
      
      // תהילים קי"ט
      psalm119: {
        title: 'תהילים קי"ט לפי אותיות השם',
        subtitle: 'הזן את שם הנפטר/ת בעברית וקבל את פסוקי תהילים קי"ט המתאימים לאותיות השם',
        deceasedName: 'שם הנפטר/ת (בעברית):',
        motherName: 'שם האם (בעברית):',
        showVerses: 'הצג פסוקים מתהילים קי"ט',
        letterSection: 'מקטע',
        dedication: 'על פי המסורת קוראים את מקטעי תהילים קי"ט המתאימים לכל אות בשם הנפטר/ת.',
        chapterName: 'תהילים קי"ט'
      },
      
      // סידור תפילה
      siddur: {
        title: 'סידור תפילה',
        morningPrayers: 'תפילות בוקר',
        eveningPrayers: 'תפילות ערב',
        shabbat: 'שבת',
        other: 'אחר',
        modeAni: 'מודה אני',
        modeAniDesc: 'תפילת בוקר ראשונה: "מודה אני"',
        netilatYadayim: 'נטילת ידיים',
        netilatYadayimDesc: 'ברכה על נטילת ידיים',
        asherYatzar: 'אשר יצר',
        asherYatzarDesc: 'ברכה אחרי שירותים',
        elohaiNeshama: 'אלוהי נשמה',
        elohaiNeshamaDesc: 'הודיה על החזרת הנשמה',
        morningBlessings: 'ברכות השחר',
        morningBlessingsDesc: 'ברכות השחר',
        shema: 'שמע ישראל',
        shemaDesc: 'שמע ישראל',
        amidahShacharit: 'עמידה (שחרית)',
        amidahShacharitDesc: 'תפילת העמידה המרכזית בבוקר',
        myBookmarks: 'הסימניות שלי'
      }
    }
  },
  
  // פונקציה לקבלת תרגום
  getText: function(key, section = null) {
    // מפריד את המפתח לחלקים אם יש נקודה
    const parts = key.split('.');
    
    // אם יש מקטע ספציפי, נשתמש בו
    let base = this.translations[this.currentLanguage];
    if (section) {
      base = base[section];
      // אם יש רק חלק אחד במפתח, מחזירים ישירות
      if (parts.length === 1) {
        return base[parts[0]] || key;
      }
    }
    
    // אחרת מחפשים לפי המפתח המלא
    let result = base;
    for (let i = 0; i < parts.length; i++) {
      if (result[parts[i]] === undefined) {
        return key; // אם לא נמצא, מחזירים את המפתח המקורי
      }
      result = result[parts[i]];
    }
    
    return result;
  },
  
  // פונקציה להחלפת השפה
  setLanguage: function(lang) {
    // בדיקה שהשפה נתמכת
    if (this.translations[lang]) {
      this.currentLanguage = lang;
      localStorage.setItem('preferredLanguage', lang);
      
      // הפעלת אירוע שינוי שפה
      const event = new CustomEvent('languageChanged', { detail: { language: lang } });
      document.dispatchEvent(event);
      
      return true;
    }
    return false;
  },
  
  // פונקציה לאתחול מערכת השפה
  init: function() {
    // בדיקה אם יש שפה שמורה
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && this.translations[savedLang]) {
      this.currentLanguage = savedLang;
    }
    
    // יצירת בוחר שפה בסיסי
    this.createLanguageSwitcher();
    
    // עדכון טקסטים ראשוניים
    this.updatePageTexts();
    
    return this;
  },
  
  // יצירת בוחר שפה בסיסי
  createLanguageSwitcher: function() {
    // בדיקה אם כבר קיים בוחר שפה
    if (document.getElementById('language-switcher')) {
      return;
    }
    
    // יצירת האלמנט
    const switcher = document.createElement('div');
    switcher.id = 'language-switcher';
    switcher.className = 'language-switcher';
    switcher.style.cssText = `
      position: absolute;
      top: 10px;
      left: 10px;
      display: flex;
      gap: 8px;
      z-index: 1000;
    `;
    
    // יצירת כפתורי שפה
    const ruBtn = document.createElement('button');
    ruBtn.textContent = 'RU';
    ruBtn.className = this.currentLanguage === 'ru' ? 'active' : '';
    ruBtn.onclick = () => this.setLanguage('ru');
    
    const heBtn = document.createElement('button');
    heBtn.textContent = 'עב';
    heBtn.className = this.currentLanguage === 'he' ? 'active' : '';
    heBtn.onclick = () => this.setLanguage('he');
    
    // סגנון לכפתורים
    const btnStyle = `
      padding: 4px 8px;
      border: 1px solid #ddd;
      background: #fff;
      cursor: pointer;
      border-radius: 4px;
    `;
    
    ruBtn.style.cssText = btnStyle;
    heBtn.style.cssText = btnStyle;
    
    // הוספת סגנון לכפתור פעיל
    if (this.currentLanguage === 'ru') {
      ruBtn.style.background = '#4361ee';
      ruBtn.style.color = 'white';
    } else {
      heBtn.style.background = '#4361ee';
      heBtn.style.color = 'white';
    }
    
    // הוספת הכפתורים לבוחר
    switcher.appendChild(ruBtn);
    switcher.appendChild(heBtn);
    
    // הוספת הבוחר לדף
    document.body.appendChild(switcher);
    
    // האזנה לשינויי שפה
    document.addEventListener('languageChanged', (e) => {
      // עדכון סגנון הכפתורים
      if (e.detail.language === 'ru') {
        ruBtn.style.background = '#4361ee';
        ruBtn.style.color = 'white';
        heBtn.style.background = '#fff';
        heBtn.style.color = 'black';
      } else {
        heBtn.style.background = '#4361ee';
        heBtn.style.color = 'white';
        ruBtn.style.background = '#fff';
        ruBtn.style.color = 'black';
      }
      
      // עדכון טקסטים בדף
      this.updatePageTexts();
    });
  },
  
  // עדכון טקסטים בדף
  updatePageTexts: function() {
    // עדכון כותרת הדף
    document.title = this.getText('homeTitle');
    
    // עדכון טקסטים בסיסיים בהתאם לדף הנוכחי
    const pagePath = window.location.pathname;
    
    if (pagePath.includes('index.html') || pagePath === '/') {
      this.updateHomePage();
    } else if (pagePath.includes('correct-text.html')) {
      this.updateCorrectorPage();
    } else if (pagePath.includes('tehilim.html')) {
      this.updateTehilimPage();
    } else if (pagePath.includes('memorial.html')) {
      this.updateMemorialPage();
    } else if (pagePath.includes('psalm119.html')) {
      this.updatePsalm119Page();
    } else if (pagePath.includes('siddur.html')) {
      this.updateSiddurPage();
    }
    
    // עדכון ניווט תחתון בכל הדפים
    this.updateBottomNav();
  },
  
  // עדכון דף הבית
  updateHomePage: function() {
    // כותרת ראשית
    const headerTitle = document.querySelector('.header-title');
    if (headerTitle) {
      headerTitle.textContent = this.getText('siteTitle');
    }
    
    // כותרת גיבור
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      heroTitle.textContent = this.getText('common.psalms');
    }
    
    // תת כותרת
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
      heroText.textContent = this.getText('mainSubtitle');
    }
    
    // כפתורי פעולה
    const startButton = document.querySelector('.hero .button-primary');
    if (startButton) {
      startButton.textContent = this.getText('buttons.start');
    }
    
    const memorialButton = document.querySelector('.hero .button-outline');
    if (memorialButton) {
      memorialButton.textContent = this.getText('buttons.memorial');
    }
    
    // בורר שפה
    const languageOptions = document.querySelectorAll('.language-option');
    if (languageOptions.length > 0) {
      languageOptions[0].textContent = this.getText('common.russian');
      languageOptions[1].textContent = this.getText('common.hebrew');
      languageOptions[2].textContent = this.getText('common.phonetic');
    }
    
    // טפסים
    const formTitle = document.querySelector('.form-title');
    if (formTitle) {
      formTitle.textContent = this.getText('memorial.formTitle');
    }
    
    const formLabels = document.querySelectorAll('.form-label');
    if (formLabels.length >= 2) {
      formLabels[0].textContent = this.getText('memorial.deceasedName');
      formLabels[1].textContent = this.getText('memorial.motherName');
    }
    
    const generatePrayer = document.getElementById('generate-prayer');
    if (generatePrayer) {
      generatePrayer.textContent = this.getText('psalm119.showVerses');
    }
    
    // כותרות מקטע
    const sectionTitles = document.querySelectorAll('.section-title');
    if (sectionTitles.length > 0) {
      sectionTitles[0].textContent = this.getText('common.section') + ' ' + this.getText('common.select');
    }
    
    // כרטיסיות
    const cardTitles = document.querySelectorAll('.card-title');
    if (cardTitles.length >= 4) {
      cardTitles[0].textContent = this.getText('common.psalms');
      cardTitles[1].textContent = this.getText('memorial.title');
      cardTitles[2].textContent = this.getText('psalm119.title');
      cardTitles[3].textContent = this.getText('siddur.title');
    }
    
    // ניווט תחתון
    this.updateBottomNav();
  },
  
  // עדכון דף תיקון טקסט
  updateCorrectorPage: function() {
    // כותרת העמוד
    const headerTitle = document.querySelector('.header-title');
    if (headerTitle) {
      headerTitle.textContent = this.getText('corrector.title');
    }
    
    // כותרת מידע
    const infoTitle = document.querySelector('.info-title');
    if (infoTitle) {
      infoTitle.textContent = this.getText('corrector.subtitle');
    }
    
    // טקסט הסבר
    const infoText = document.querySelectorAll('.info-text');
    if (infoText.length >= 1) {
      infoText[0].textContent = this.getText('corrector.explanation');
    }
    
    // דוגמאות
    const examplesTitle = document.querySelector('.info-examples h3');
    if (examplesTitle) {
      examplesTitle.textContent = this.getText('corrector.examples');
    }
    
    // כותרת עורך
    const editorTitle = document.querySelector('.editor-title');
    if (editorTitle) {
      editorTitle.textContent = this.getText('corrector.editorTitle');
    }
    
    // תת כותרת עורך
    const editorSubtitle = document.querySelector('.editor-subtitle');
    if (editorSubtitle) {
      editorSubtitle.textContent = this.getText('corrector.editorSubtitle');
    }
    
    // אפשרויות תיקון
    const optionsTitle = document.querySelector('.options-title');
    if (optionsTitle) {
      optionsTitle.textContent = this.getText('corrector.correctionStyle');
    }
    
    // כפתורי סגנון
    const styleDash = document.querySelector('#option-dash + .option-label');
    if (styleDash) {
      styleDash.textContent = this.getText('corrector.styleDash');
    }
    
    const styleHebrew = document.querySelector('#option-hebrew + .option-label');
    if (styleHebrew) {
      styleHebrew.textContent = this.getText('corrector.styleHebrew');
    }
    
    const styleHaShem = document.querySelector('#option-hashem + .option-label');
    if (styleHaShem) {
      styleHaShem.textContent = this.getText('corrector.styleHaShem');
    }
    
    // כפתורי