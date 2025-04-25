
document.addEventListener('DOMContentLoaded', function () {
  // Toggle bilingual mode
  const toggleLangBtn = document.getElementById('toggle-lang-btn');
  if (toggleLangBtn) {
    toggleLangBtn.addEventListener('click', function () {
      document.body.classList.toggle('bilingual-mode');
    });
  }

  // Simulated Russian Audio Player
  const russianAudio = new Audio('/audio/sample_russian_tehilim.mp3');
  const playRussianBtn = document.getElementById('play-russian-btn');
  if (playRussianBtn) {
    playRussianBtn.addEventListener('click', function () {
      russianAudio.play();
    });
  }
});
