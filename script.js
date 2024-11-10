import { musicData } from './data.js';

const emotionRadios = document.getElementById('emotion-radios');
const songModalInner = document.getElementById('song-modal-inner');
const songModal = document.getElementById('song-modal');
const songModalCloseBtn = document.getElementById('song-modal-close-btn');
const toggleBtn = document.getElementById("toggle")
const embeddedPlayer = document.getElementById("embedded-player");

embeddedPlayer.addEventListener('click', () => {
    if (songModal.style.display === 'flex') {
        closeModal();
    }
    else {
        openModal();
    }
})

toggleBtn.addEventListener('click', () => {
    const menu = document.querySelector(".menu");
    const closeBtnSVG = document.getElementById("close-btn-svg");

    // Check the current background color and toggle between two states
    if (menu.style.backgroundColor === "whitesmoke") {
        // Reset to original colors => set to dark mode colors
        menu.style.backgroundColor = "#242424";
        toggleBtn.style.backgroundColor = "#0d6efd";
        closeBtnSVG.style.fill = "";
    } else {
        // Set to light mode colors
        toggleBtn.style.backgroundColor = "";
        menu.style.backgroundColor = "whitesmoke";
        closeBtnSVG.style.fill = "black";
    }
});





// Event listeners
emotionRadios.addEventListener('change', highlightCheckedOption);
songModalCloseBtn.addEventListener('click', closeModal);


function highlightCheckedOption(e) {
    const radios = document.getElementsByClassName('radio');
    for (let radio of radios) {
        radio.classList.remove('highlight');
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight');
}

function closeModal() {
    songModal.style.display = 'none';
    embeddedPlayer.style.backgroundColor = "";
}

function openModal() {
    songModal.style.display = 'flex';
    embeddedPlayer.style.backgroundColor = "#0d6efd";
}

// Make playSong a global function by attaching it to window
window.playSong = function (emotion) {
    const songsArray = musicData.filter(song => song.genre.includes(emotion));
    const songObject = songsArray.length === 1 ? songsArray[0] : songsArray[Math.floor(Math.random() * songsArray.length)];

    songModalInner.innerHTML = `
        <iframe draggable="true" class="mood-song" src="${songObject.url}" allow="autoplay; encrypted-media" width="100%" height="100%" loading="lazy" ></iframe>
    `;
    openModal();
};

function getEmotionsArray(songs) {
    const emotionsArray = [];
    for (let song of songs) {
        for (let emotion of song.genre) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion);
            }
        }
    }
    return emotionsArray;
}

function renderEmotionsRadios(songs) {
    let radioItems = ``;
    const emotions = getEmotionsArray(songs);

    for (let emotion of emotions) {
        const matchingSong = songs.find(song => song.genre.includes(emotion));
        const imageUrl = matchingSong.img || 'default-image.jpg';

        radioItems += `
        <div class="radio" id="${emotion}-radio">
            <section class="album-img">
                <img src="${imageUrl}" alt="${emotion} image" />
            </section>
            <label for="${emotion}">${emotion}</label>
            <div class="radio-items" >
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
            <button class="play-song-btn" onclick="playSong('${emotion}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
            </svg>
            </button>
            </div>
        </div>`;
    }

    emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(musicData);
