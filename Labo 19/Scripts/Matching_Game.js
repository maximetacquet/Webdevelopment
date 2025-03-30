const g = {
    IMAGE_SUBFOLDER: 'Extra/FotoKaarten/',
    AUDIO_SUBFOLDER: 'Extra/GeluidKaarten/',
    MAX_IMAGES: 14,
    MAX_SOUNDS: 14,
    CORRECT_TIMEOUT: 250,
    WRONG_TIMEOUT: 500,
    matchCount: 2,
    cardCount: 2,
    Kaart_Draaien: new Audio('Extra/GeluidDraaien/flip.mp3'),
    Kaart_Juist: new Audio('Extra/GeluidDraaien/correct.mp3'),
    Kaart_Verkeerd: new Audio('Extra/GeluidDraaien/wrong.mp3'),
    selectedCards: [],
    processing: false,
    isAudioMode: false,
    cardCountSlider: document.querySelector('#cardCountSlider'),
    cardCountDisplay: document.querySelector('#cardCountDisplay'),
    matchCountSlider: document.querySelector('#matchCountSlider'),
    matchCountDisplay: document.querySelector('#matchCountDisplay'),
    audisModeToggle: document.querySelector('#audioModeToggle'),
    gameBoard: document.querySelector('#game-board'),
    winModal: null
};

const calculateGridDimensions = (totalCards) => {
    const aspectRatio = window.innerWidth / window.innerHeight;
    const totalSlots = totalCards * g.matchCount;
    let bestCols = Math.ceil(Math.sqrt(totalSlots));
    let bestRows = Math.ceil(totalSlots / bestCols);

    const findBestGridConfiguration = () => {
        for (let cols = bestCols; cols > 0; cols--) {
            const rows = Math.ceil(totalSlots / cols);
            if (cols * rows === totalSlots) {
                return { cols, rows };
            }
            if (Math.abs(cols - rows) < Math.abs(bestCols - bestRows)) {
                bestCols = cols;
                bestRows = rows;
            }
        }
        return { cols: bestCols, rows: bestRows };
    };

    const gridConfig = findBestGridConfiguration();
    return aspectRatio > 1
        ? { cols: gridConfig.rows, rows: gridConfig.cols }
        : gridConfig;
};

const createWinModal = () => {
    if (g.winModal) {
        return;
    }
    g.winModal = document.createElement('div');
    g.winModal.id = 'win-modal';
    g.winModal.classList.add('win-modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('win-modal-content');

    const title = document.createElement('h2');
    title.textContent = 'Gefeliciteerd!';
    modalContent.appendChild(title);

    const message = document.createElement('p');
    message.textContent = "Je hebt het spel gewonnnen.";
    modalContent.appendChild(message);

    const playAgainBtn = document.createElement('button');
    playAgainBtn.id = 'play-again-btn';
    playAgainBtn.textContent = 'Speel opnieuw';
    playAgainBtn.addEventListener('click', () => {
        g.winModal.classList.remove('show');
        setup();
    });
    modalContent.appendChild(playAgainBtn);

    g.winModal.appendChild(modalContent);
    document.body.appendChild(g.winModal);
};

// Workaround zodat het geluid altijd afspeeld.
const playSound = (audioElement) => {
    if (g.isAudioMode) { return; }
    const newSound = audioElement.cloneNode(true);
    newSound.play();
};

const setup = () => {
    g.gameBoard.replaceChildren();
    g.gameBoard.style.gridTemplateColumns = '';

    g.cardCount = parseInt(g.cardCountSlider.value);
    g.matchCount = parseInt(g.matchCountSlider.value);
    g.cardCountDisplay.textContent = g.cardCount;
    g.matchCountDisplay.textContent = g.matchCount;

    const { cols, rows } = calculateGridDimensions(g.cardCount);
    g.gameBoard.style.gridTemplateColumns = `repeat(${cols}, 100px)`;

    const availableContent = g.isAudioMode
        ? Array.from({ length: g.MAX_SOUNDS }, (_, i) => `${i}.mp3`)
        : Array.from({ length: g.MAX_IMAGES }, (_, i) => `image${i}.jpg`);

    const selectedContent = [];

    for (let i = 0; i < g.cardCount; i++) {
        const randomIndex = Math.floor(Math.random() * availableContent.length);
        selectedContent.push(availableContent.splice(randomIndex, 1)[0]);
    }

    const CardsSet = [];
    selectedContent.forEach(content => {
        for (let j = 0; j < g.matchCount; j++) {
            CardsSet.push(content);
        }
    });

    shuffleCards(CardsSet);

    CardsSet.forEach((content, index) => {
        const Card = document.createElement('div');
        Card.classList.add('card');

        if (g.isAudioMode) {
            Card.dataset.audio = g.AUDIO_SUBFOLDER + content;
            Card.dataset.contentType = 'audio';
        } else {
            Card.dataset.image = g.IMAGE_SUBFOLDER + content;
            Card.dataset.contentType = 'image';
        }

        Card.addEventListener('click', turnCard);
        g.gameBoard.appendChild(Card);
    });
};

const turnCard = (event) => {
    const Card = event.target;
    if (g.processing ||
        Card.classList.contains('revealed') ||
        Card.classList.contains('matched')) return;

    playSound(g.Kaart_Draaien);
    Card.classList.add('revealed');

    if (Card.dataset.contentType === 'image') {
        Card.style.backgroundImage = `url(${Card.dataset.image})`;
    } else if (Card.dataset.contentType === 'audio') {
        const audio = new Audio(Card.dataset.audio);
        audio.play();
    }

    g.selectedCards.push(Card);

    if (g.selectedCards.length === parseInt(g.matchCount)) {
        processCardGroup();
    }
};

const processCardGroup = () => {
    g.processing = true;

    const firstContent = g.selectedCards[0].dataset.contentType === 'image'
        ? g.selectedCards[0].dataset.image
        : g.selectedCards[0].dataset.audio;

    const allMatch = g.selectedCards.every(card =>
        (g.selectedCards[0].dataset.contentType === 'image'
            ? card.dataset.image
            : card.dataset.audio) === firstContent
    );

    if (allMatch) {
        playSound(g.Kaart_Juist);
        g.selectedCards.forEach(card => {
            card.classList.add('matched');
        });
        setTimeout(() => {
            g.selectedCards = [];
            g.processing = false;
            checkFinish();
        }, g.CORRECT_TIMEOUT);
    } else {
        playSound(g.Kaart_Verkeerd);
        g.selectedCards.forEach(card => {
            card.classList.add('wrong-match');
        });
        setTimeout(() => {
            g.selectedCards.forEach(card => {
                card.classList.remove('revealed', 'wrong-match');
                if (card.dataset.contentType === 'image') {
                    card.style.backgroundImage = ``;
                }
            });
            g.selectedCards = [];
            g.processing = false;
        }, g.WRONG_TIMEOUT);
    }
};

const checkFinish = () => {
    const matchedCards = document.querySelectorAll('.matched');

    if (matchedCards.length === g.cardCount * g.matchCount) {
        createWinModal();

        setTimeout(() => {
            g.winModal.classList.add('show');
        }, g.CORRECT_TIMEOUT);
    }
};

const shuffleCards = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const toggleAudioMode = () => {
    g.isAudioMode = g.audisModeToggle.checked;
    setup();
};

window.addEventListener("load", () => {
    setup();
});
g.cardCountSlider.addEventListener('input', setup);
g.matchCountSlider.addEventListener('input', setup);
g.audisModeToggle.addEventListener('change', toggleAudioMode);