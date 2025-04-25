
document.addEventListener("DOMContentLoaded", function() {
  fetch('chapter1.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('verses-container');
      data.verses.forEach(verse => {
        const verseDiv = document.createElement('div');
        verseDiv.className = 'verse';

        const hebrewDiv = document.createElement('div');
        hebrewDiv.className = 'hebrew';
        hebrewDiv.textContent = verse.hebrewText;

        const russianDiv = document.createElement('div');
        russianDiv.className = 'russian';
        russianDiv.textContent = verse.russianText;

        verseDiv.appendChild(hebrewDiv);
        verseDiv.appendChild(russianDiv);

        container.appendChild(verseDiv);
      });
    });
});
