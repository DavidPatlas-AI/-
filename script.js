
async function loadChapter(number) {
    const response = await fetch(`chapter${number}.json`);
    const chapter = await response.json();
    document.getElementById("title").textContent = chapter.title;
    const container = document.getElementById("verses");
    container.innerHTML = "";
    chapter.verses.forEach(verse => {
        const heb = document.createElement("div");
        heb.className = "hebrew";
        heb.textContent = verse.hebrewText;

        const rus = document.createElement("div");
        rus.className = "russian";
        rus.textContent = verse.russianText;

        const wrapper = document.createElement("div");
        wrapper.className = "verse";
        wrapper.appendChild(heb);
        wrapper.appendChild(rus);

        container.appendChild(wrapper);
    });
}

document.addEventListener("DOMContentLoaded", () => loadChapter(1));
