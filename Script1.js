const sounds = {
    buttonPress: new Audio('sounds/click-button.mp3'),
    start: new Audio('sounds/click-start.mp3'),
    inGame: new Audio('sounds/in-game.mp3'),
    winWait: new Audio('sounds/win-wait.mp3'),
    countdownBeep: new Audio('sounds/countdown_beep.mp3'),
    goBeep: new Audio('sounds/go_beep.wav')
};

sounds.winWait.volume = 0.4;
sounds.inGame.loop = true;
sounds.inGame.volume = 0.4;
Object.values(sounds).forEach(s => s.load());

const pressStartScreen = document.getElementById('pressStartScreen');
const pressStartBtn = document.getElementById('pressStartBtn');
const Menu = document.getElementById("Menu_principale");

const Number_game = document.getElementById("Number_game");

let lastUsedDifficulty = 3; // Default to Medium

function playSound(type) {
    const s = sounds[type];
    if (!s) return;
    s.currentTime = 0;
    s.play().catch(() => { });
}


pressStartBtn.onclick = () => {
    playSound('buttonPress');
    sounds.inGame.play().catch(() => {});
    pressStartScreen.classList.add('press-start-fadeout');
    setTimeout(() => {
        pressStartScreen.remove();
        const title = document.querySelector('h1');
        title.style.opacity = '0';
        title.style.transition = 'opacity 1s ease-out';
        requestAnimationFrame(() => {
            title.style.opacity = '1';
            showModeSelection();
        });
    }, 800);
};


function showModeSelection() {
    Menu.style.display = 'block';
    Menu.style.opacity = '0';
    Menu.style.transform = 'translateX(100vw)';

    Menu.innerHTML = `
        <div class="mode-selection">
            <h2>SELECT YOUR MODE</h2>
            <div class="mode-grid">
                <button id="soloModeBtn" class="mode-btn">
                    <div class="icon">Player</div>
                    <div class="title">SOLO MODE</div>
                    <div class="desc">Play against the computer</div>
                </button>
                <button id="vsModeBtn" class="mode-btn vs">
                    <div class="icon">Versus</div>
                    <div class="title">1v1 BATTLE</div>
                    <div class="desc">Challenge a friend!</div>
                </button>
            </div>
        </div>
    `;
    Menu.classList.add('slide-in-right');

    document.getElementById('soloModeBtn').onclick = () => {
        playSound('buttonPress');
        Menu.classList.add('slide-out-left');
        setTimeout(() => creerMenuBoutons(), 100);
    };
    document.getElementById('vsModeBtn').onclick = () => {
        playSound('buttonPress');
        Menu.classList.add('slide-out-left');
        setTimeout(() => show1v1DifficultyMenu(), 100);
    };
}
function creerMenuBoutons() {
    Menu.style.display = 'block';
    Menu.innerHTML = `
        <div class="menu-container">
            <h2> Choose The Difficulty </h2>
            <button onclick="playSound('buttonPress'); Difficulte(1)">1 - Beginner</button>
            <button onclick="playSound('buttonPress'); Difficulte(2)">2 - Easy</button>
            <button onclick="playSound('buttonPress'); Difficulte(3)">3 - Medium</button>
            <button onclick="playSound('buttonPress'); Difficulte(4)">4 - Hard</button>
            <button onclick="playSound('buttonPress'); Difficulte(5)">5 - Expert</button>
            <button onclick="playSound('buttonPress'); Difficulte(6)">6 - Custom</button>
            <button onclick="playSound('buttonPress'); showModeSelection()" style="margin-top:1.5rem; background:#777;">
                ← Back to Mode Select
            </button>
        </div>
    `;

    Menu.classList.remove('slide-out-left', 'slide-in-right');
    requestAnimationFrame(() => Menu.classList.add('slide-in-right'));
}
function Difficulte(numero) {
    // Show the game area
    Number_game.style.display = 'block';
    Number_game.style.opacity = '0';
    Number_game.style.transform = 'translateX(100vw)';
    // Small delay to trigger transition
    Number_game.innerHTML = "";
    switch (numero) {
        case 1:
            PlayerInput(1, 1, 10);
            break;
        case 2:
            PlayerInput(2, 1, 50);
            break;
        case 3:
            PlayerInput(3, 1, 100);
            break;
        case 4:
            PlayerInput(4, 1, 500);
            break;
        case 5:
            PlayerInput(5, 1, 1000);
            break;
        case 6:
            showCustomMenu();
            break;
    }
    Number_game.classList.add('slide-in-right');
}
function PlayerInput(numero, low, high) {
    Menu.style.display = 'none';
    const container = document.createElement("div");
    container.className = "menu-container";
    const title = document.createElement("h3");
    title.className = "game-start-title";
    title.textContent = `${getName(numero)} - Numbers from ${low} to ${high}`;
    const startBtn = document.createElement("button");
    startBtn.className = "game-start-btn";
    startBtn.textContent = "Start Game";

    startBtn.onclick = () => {
        sounds.inGame.pause();
        sounds.inGame.currentTime = 0;
        playSound('start');
        setTimeout(() => { sounds.inGame.play().catch(() => { }); }, 1000);
        container.remove();
        const nbr = Math.floor(Math.random() * (high - low + 1)) + low;
        initGuessing(numero, low, high, nbr);
    };

    const gobackBtn = document.createElement("button");
    gobackBtn.textContent = "← Back to Difficulty Selection";
    gobackBtn.style.marginTop = "1.5rem";
    gobackBtn.style.background = "#777";
    gobackBtn.onclick = () => {
        playSound('buttonPress');
        container.remove();
        Number_game.style.display = 'none';
        creerMenuBoutons();
    }

    container.appendChild(title);
    container.appendChild(startBtn);
    container.appendChild(gobackBtn);
    Number_game.appendChild(container);
}
function showCustomMenu() {
    Menu.style.display = "none";
    Number_game.innerHTML = "";
    const customMenu = document.createElement("div");
    customMenu.className = "menu-container";
    const title = document.createElement("h2");
    title.textContent = "Custom - Select Range";
    title.className = "game-start-title";
    customMenu.appendChild(title);

    const inputContainer = document.createElement("div");
    inputContainer.id = "inputContainer";
    inputContainer.className = "custom-input-container";

    const minSection = document.createElement("div");
    minSection.className = "custom-input-section";
    const minLabel = document.createElement("span");
    minLabel.className = "custom-input-label";
    minLabel.textContent = "Min:";
    const minInput = document.createElement("input");
    minInput.type = "number";
    minInput.value = 1;
    minInput.min = 1;
    minInput.className = "custom-input custom-input-min";
    minSection.appendChild(minLabel);
    minSection.appendChild(minInput);
    inputContainer.appendChild(minSection);

    const maxSection = document.createElement("div");
    maxSection.className = "custom-input-section";
    const maxLabel = document.createElement("span");
    maxLabel.className = "custom-input-label";
    maxLabel.textContent = "Max:";
    const maxInput = document.createElement("input");
    maxInput.type = "number";
    maxInput.value = 1000;
    maxInput.min = 2;
    maxInput.className = "custom-input custom-input-max";
    maxSection.appendChild(maxLabel);
    maxSection.appendChild(maxInput);
    inputContainer.appendChild(maxSection);

    customMenu.appendChild(inputContainer);

    let minValue = 1;
    let maxValue = 1000;
    minInput.addEventListener("input", () => {
        let val = Number(minInput.value);
        if (val >= 1 && val < maxValue) minValue = val;
        else minInput.value = minValue;
        maxInput.min = minValue + 1;
    });
    maxInput.addEventListener("input", () => {
        let val = Number(maxInput.value);
        if (val > minValue && val <= 10000) maxValue = val;
        else maxInput.value = maxValue;
        minInput.max = maxValue - 1;
    });


    const startBtn = document.createElement("button");
    startBtn.textContent = "Start Game";
    startBtn.className = "game-start-btn";
    startBtn.style.marginTop = "2rem";
    startBtn.onclick = () => {
        sounds.inGame.pause();
        sounds.inGame.currentTime = 0;
        playSound('start');
        setTimeout(() => { sounds.inGame.play().catch(() => { }); }, 1000);
        Number_game.innerHTML = "";
        const randomNumber = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        initGuessing(6, minValue, maxValue, randomNumber);
    };

    const gobackBtn = document.createElement("button");
    gobackBtn.className = "game-back-btn";
    gobackBtn.textContent = "← Back to Difficulty Selection";
    gobackBtn.style.marginTop = "1.5rem";
    gobackBtn.style.background = "#777";

    gobackBtn.onclick = () => {
        playSound('buttonPress');
        customMenu.remove();
        Number_game.style.display = 'none';
        creerMenuBoutons();
    }


    customMenu.appendChild(startBtn);
    customMenu.appendChild(gobackBtn);
    Number_game.appendChild(customMenu);
}
function show1v1DifficultyMenu() {
    Menu.style.display = 'block';
    Menu.innerHTML = `
        <div class="menu-container">
            <h2>1v1 BATTLE - Choose Difficulty</h2>
            <button onclick="playSound('buttonPress'); start1v1NameEntry(1)">1 - Beginner</button>
            <button onclick="playSound('buttonPress'); start1v1NameEntry(2)">2 - Easy</button>
            <button onclick="playSound('buttonPress'); start1v1NameEntry(3)">3 - Medium</button>
            <button onclick="playSound('buttonPress'); start1v1NameEntry(4)">4 - Hard</button>
            <button onclick="playSound('buttonPress'); start1v1NameEntry(5)">5 - Expert</button>
            <button onclick="playSound('buttonPress'); start1v1NameEntry(6)">6 - Custom</button>
            <button onclick="playSound('buttonPress'); showModeSelection()" style="margin-top:1.5rem; background:#777;">
                ← Back to Mode Select
            </button>
        </div>
    `;
    Menu.classList.remove('slide-out-left', 'slide-in-right');
    requestAnimationFrame(() => Menu.classList.add('slide-in-right'));

}


function getName(numero) {
    const names = ["", "Beginner", "Easy", "Medium", "Hard", "Expert", "Custom"];
    return names[numero];
}




// ============================================================
// TIMEBOARD & RECORDS - Session-based (resets on refresh/exit)
// ============================================================

// Store best times for each difficulty (1-6)
const soloRecords = {
    1: null, // Beginner
    2: null, // Easy
    3: null, // Medium
    4: null, // Hard
    5: null, // Expert
    6: null  // Custom
};

// Timer utility functions
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}

function updateRecord(difficulty, time, tries) {
    const current = soloRecords[difficulty];
    // Better record = fewer tries, or same tries but faster time
    if (!current || tries < current.tries || (tries === current.tries && time < current.time)) {
        soloRecords[difficulty] = { time, tries };
        return true; // New record!
    }
    return false;
}

function showTimeboard() {
    Menu.style.display = 'block';
    Menu.innerHTML = `
        <div class="menu-container timeboard-container">
            <h2 class="timeboard-title">Solo Records</h2>
            <div class="timeboard">
                <div class="timeboard-header">
                    <span>Difficulty</span>
                    <span>Best Time</span>
                    <span>Tries</span>
                </div>
                <div class="timeboard-row">
                    <span class="difficulty-name beginner">Beginner</span>
                    <span class="record-time">${soloRecords[1] ? formatTime(soloRecords[1].time) : '--:--:--'}</span>
                    <span class="record-tries">${soloRecords[1] ? soloRecords[1].tries : '-'}</span>
                </div>
                <div class="timeboard-row">
                    <span class="difficulty-name easy">Easy</span>
                    <span class="record-time">${soloRecords[2] ? formatTime(soloRecords[2].time) : '--:--:--'}</span>
                    <span class="record-tries">${soloRecords[2] ? soloRecords[2].tries : '-'}</span>
                </div>
                <div class="timeboard-row">
                    <span class="difficulty-name medium">Medium</span>
                    <span class="record-time">${soloRecords[3] ? formatTime(soloRecords[3].time) : '--:--:--'}</span>
                    <span class="record-tries">${soloRecords[3] ? soloRecords[3].tries : '-'}</span>
                </div>
                <div class="timeboard-row">
                    <span class="difficulty-name hard">Hard</span>
                    <span class="record-time">${soloRecords[4] ? formatTime(soloRecords[4].time) : '--:--:--'}</span>
                    <span class="record-tries">${soloRecords[4] ? soloRecords[4].tries : '-'}</span>
                </div>
                <div class="timeboard-row">
                    <span class="difficulty-name expert">Expert</span>
                    <span class="record-time">${soloRecords[5] ? formatTime(soloRecords[5].time) : '--:--:--'}</span>
                    <span class="record-tries">${soloRecords[5] ? soloRecords[5].tries : '-'}</span>
                </div>
                <div class="timeboard-row">
                    <span class="difficulty-name custom">Custom</span>
                    <span class="record-time">${soloRecords[6] ? formatTime(soloRecords[6].time) : '--:--:--'}</span>
                    <span class="record-tries">${soloRecords[6] ? soloRecords[6].tries : '-'}</span>
                </div>
            </div>
            <p class="timeboard-note">Records reset when you refresh or exit the game</p>
            <button onclick="playSound('buttonPress'); creerMenuBoutons()" class="timeboard-back-btn">
                ← Back to Difficulty
            </button>
        </div>
    `;
    Menu.classList.remove('slide-out-left', 'slide-in-right');
    requestAnimationFrame(() => Menu.classList.add('slide-in-right'));
}

// ============================================================
// UPDATED creerMenuBoutons with Timeboard button
// ============================================================
function creerMenuBoutons() {
    Menu.style.display = 'block';
    Menu.innerHTML = `
        <div class="menu-container">
            <h2> Choose The Difficulty </h2>
            <button onclick="playSound('buttonPress'); Difficulte(1)">1 - Beginner</button>
            <button onclick="playSound('buttonPress'); Difficulte(2)">2 - Easy</button>
            <button onclick="playSound('buttonPress'); Difficulte(3)">3 - Medium</button>
            <button onclick="playSound('buttonPress'); Difficulte(4)">4 - Hard</button>
            <button onclick="playSound('buttonPress'); Difficulte(5)">5 - Expert</button>
            <button onclick="playSound('buttonPress'); Difficulte(6)">6 - Custom</button>
            <button onclick="playSound('buttonPress'); showTimeboard()" class="timeboard-btn">
                🏆 View Records
            </button>
            <button onclick="playSound('buttonPress'); showModeSelection()" style="margin-top:1.5rem; background:#777;">
                ← Back to Mode Select
            </button>
        </div>
    `;

    Menu.classList.remove('slide-out-left', 'slide-in-right');
    requestAnimationFrame(() => Menu.classList.add('slide-in-right'));
}

// ============================================================
// UPDATED initGuessing with Timer for Solo Mode
// ============================================================
function initGuessing(numero, low, high, nbr) {
    const countdown = document.createElement("div");
    countdown.className = "countdown";
    countdown.textContent = "3";
    document.body.appendChild(countdown);

    const flash = document.createElement("div");
    flash.id = "flash";
    flash.className = "go-flash";
    document.body.appendChild(flash);

    Number_game.innerHTML = `
        <div class="menu-container game-container">
            <div class="solo-timer" id="soloTimer">
                <span class="timer-icon">⏱</span>
                <span id="soloTimerValue">00:00.00</span>
            </div>
            <h3 class="game-range-title">Guess a number between ${low} and ${high}</h3>
            <p class="game-tries" id="triesDisplay">Tries: 0</p>
            <input type="text" id="guessInput" placeholder="Enter your guess" disabled>
            <div id="feedback"></div>
        </div>
    `;

    const input = document.getElementById('guessInput');
    const feedback = document.getElementById('feedback');
    const triesDisplay = document.getElementById('triesDisplay');
    const timerValue = document.getElementById('soloTimerValue');

    let T_guess = [];
    let tries = 0;
    let gameActive = false;
    let startTime;
    let timerInterval;

    // Countdown
    let count = 3;
    const timer = setInterval(() => {
        if (count > 0) {
            countdown.textContent = count;
            countdown.classList.add('show');
            playSound('countdownBeep');
            setTimeout(() => countdown.classList.remove('show'), 800);
        } else {
            countdown.textContent = "GO!";
            countdown.classList.add('show');
            playSound('goBeep');
            flash.style.display = "block";
            document.body.insertAdjacentHTML("beforeend", `<div class="go-shockwave"></div>`);
            setTimeout(() => document.querySelector(".go-shockwave")?.remove(), 800);
            gameActive = true;
            input.disabled = false;
            input.focus();

            // Start the timer
            startTime = Date.now();
            timerInterval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                timerValue.textContent = formatTime(elapsed);
            }, 10);

            setTimeout(() => {
                countdown.remove();
                flash.remove();
            }, 1000);
            clearInterval(timer);
        }
        count--;
    }, 1000);

    // Input handling
    input.addEventListener('keydown', e => {
        if (!gameActive || e.key !== "Enter") return;
        const guess = Number(input.value);
        if (isNaN(guess)) {
            input.value = "";
            return;
        }
        if (guess < low || guess > high) {
            input.value = "";
            const msg = document.createElement('p');
            msg.textContent = `Please enter a number between ${low} and ${high}`;
            feedback.prepend(msg);
            return;
        }
        if (T_guess.includes(guess)) {
            const msg = document.createElement('p');
            msg.textContent = "You already tried this number, guess again";
            feedback.prepend(msg);
            input.value = "";
            return;
        }

        tries++;
        triesDisplay.textContent = `Tries: ${tries}`;
        T_guess.push(guess);

        const msg = document.createElement('p');
        if (guess === nbr) {
            // Stop timer and get final time
            clearInterval(timerInterval);
            const finalTime = Date.now() - startTime;

            // Check for new record
            const isNewRecord = updateRecord(numero, finalTime, tries);

            msg.textContent = `Good Job! You won in ${tries} tries`;
            msg.classList.add("win-message");
            gameActive = false;
            sounds.inGame.pause();
            sounds.inGame.currentTime = 0;
            playSound('winWait');
            setTimeout(() => {
                const winModal = createWinModal(numero, tries, finalTime, isNewRecord);
                winModal.classList.remove("hidden");
            }, 200);
        } else {
            msg.textContent = guess < nbr
                ? `Try Again, the number is higher than ${guess}`
                : `Try Again, the number is lower than ${guess}`;
        }
        feedback.prepend(msg);
        input.value = "";
    });
}

// ============================================================
// UPDATED createWinModal with Time Display
// ============================================================
function createWinModal(numero, tries, timeMs, isNewRecord) {
    const winModal = document.createElement("div");
    winModal.id = "winModal";
    winModal.className = "modal-overlay hidden";

    const modal = document.createElement("div");
    modal.className = "modal";

    const trophy = document.createElement("div");
    trophy.className = "win-trophy";
    trophy.textContent = isNewRecord ? "🏆" : "🎉";

    const title = document.createElement("h2");
    title.textContent = isNewRecord ? "New Record!" : "You Won!";
    if (isNewRecord) {
        title.style.background = "linear-gradient(90deg, #f1c40f, #e67e22)";
        title.style.webkitBackgroundClip = "text";
        title.style.webkitTextFillColor = "transparent";
    }

    const stats = document.createElement("div");
    stats.className = "win-stats";
    stats.innerHTML = `
        <div class="stat-item">
            <span class="stat-label">Tries</span>
            <span class="stat-value">${tries}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Time</span>
            <span class="stat-value">${formatTime(timeMs)}</span>
        </div>
    `;

    const msg = document.createElement("p");
    msg.textContent = "Do you want to play again?";
    msg.style.marginTop = "1rem";

    const btnContainer = document.createElement("div");
    btnContainer.className = "modal-buttons";

    const playAgainBtn = document.createElement("button");
    playAgainBtn.id = "playAgainBtn";
    playAgainBtn.textContent = "Play Again";

    const cancelBtn = document.createElement("button");
    cancelBtn.id = "cancelBtn";
    cancelBtn.textContent = "Main Menu";

    btnContainer.appendChild(playAgainBtn);
    btnContainer.appendChild(cancelBtn);

    modal.appendChild(trophy);
    modal.appendChild(title);
    modal.appendChild(stats);
    modal.appendChild(msg);
    modal.appendChild(btnContainer);
    winModal.appendChild(modal);
    Number_game.appendChild(winModal);

    playAgainBtn.addEventListener("click", () => {
        playSound('buttonPress');
        winModal.remove();
        setTimeout(() => {
            sounds.inGame.play().catch(() => { });
            Difficulte(numero);
        }, 500);
    });

    cancelBtn.addEventListener("click", () => {
        playSound('buttonPress');
        winModal.remove();
        setTimeout(() => {
            Number_game.innerHTML = "";
            Number_game.style.display = 'none';
            Menu.innerHTML = "";
            creerMenuBoutons();
            Menu.style.display = 'block';
            Menu.style.opacity = '1';
            sounds.inGame.play().catch(() => { });
        }, 500);
    });

    return winModal;
}

// ============================================================
// 1v1 BATTLE MODE - WITH TIMING FOR DIFFERENT NUMBERS
// ============================================================

let player1Name = "Player 1";
let player2Name = "Player 2";
let current1v1Difficulty = 3;
let current1v1Range = { low: 1, high: 100 };
let current1v1Mode = "same";

function start1v1NameEntry(difficultyNum) {
    current1v1Difficulty = difficultyNum;

    switch (difficultyNum) {
        case 1: current1v1Range = { low: 1, high: 10 }; break;
        case 2: current1v1Range = { low: 1, high: 50 }; break;
        case 3: current1v1Range = { low: 1, high: 100 }; break;
        case 4: current1v1Range = { low: 1, high: 500 }; break;
        case 5: current1v1Range = { low: 1, high: 1000 }; break;
        case 6:
            show1v1CustomMenu();
            return;
    }

    show1v1NameEntry();
}

function show1v1CustomMenu() {
    Menu.style.display = "none";
    Number_game.style.display = "block";
    Number_game.innerHTML = "";

    const customMenu = document.createElement("div");
    customMenu.className = "menu-container";

    const title = document.createElement("h2");
    title.textContent = "1v1 Custom - Select Range";
    title.className = "game-start-title";
    customMenu.appendChild(title);

    const inputContainer = document.createElement("div");
    inputContainer.className = "custom-input-container";

    const minSection = document.createElement("div");
    minSection.className = "custom-input-section";
    const minLabel = document.createElement("span");
    minLabel.className = "custom-input-label";
    minLabel.textContent = "Min:";
    const minInput = document.createElement("input");
    minInput.type = "number";
    minInput.value = 1;
    minInput.min = 1;
    minInput.className = "custom-input custom-input-min";
    minSection.appendChild(minLabel);
    minSection.appendChild(minInput);
    inputContainer.appendChild(minSection);

    const maxSection = document.createElement("div");
    maxSection.className = "custom-input-section";
    const maxLabel = document.createElement("span");
    maxLabel.className = "custom-input-label";
    maxLabel.textContent = "Max:";
    const maxInput = document.createElement("input");
    maxInput.type = "number";
    maxInput.value = 1000;
    maxInput.min = 2;
    maxInput.className = "custom-input custom-input-max";
    maxSection.appendChild(maxLabel);
    maxSection.appendChild(maxInput);
    inputContainer.appendChild(maxSection);

    customMenu.appendChild(inputContainer);

    let minValue = 1;
    let maxValue = 1000;

    minInput.addEventListener("input", () => {
        let val = Number(minInput.value);
        if (val >= 1 && val < maxValue) minValue = val;
        else minInput.value = minValue;
        maxInput.min = minValue + 1;
    });

    maxInput.addEventListener("input", () => {
        let val = Number(maxInput.value);
        if (val > minValue && val <= 10000) maxValue = val;
        else maxInput.value = maxValue;
        minInput.max = maxValue - 1;
    });

    const continueBtn = document.createElement("button");
    continueBtn.textContent = "Continue";
    continueBtn.className = "game-start-btn";
    continueBtn.style.marginTop = "2rem";
    continueBtn.onclick = () => {
        playSound('buttonPress');
        current1v1Range = { low: minValue, high: maxValue };
        Number_game.innerHTML = "";
        show1v1NameEntry();
    };

    const gobackBtn = document.createElement("button");
    gobackBtn.textContent = "← Back to Difficulty Selection";
    gobackBtn.style.marginTop = "1.5rem";
    gobackBtn.style.background = "#777";
    gobackBtn.onclick = () => {
        playSound('buttonPress');
        Number_game.innerHTML = "";
        Number_game.style.display = 'none';
        show1v1DifficultyMenu();
    };

    customMenu.appendChild(continueBtn);
    customMenu.appendChild(gobackBtn);
    Number_game.appendChild(customMenu);
    Number_game.classList.add('slide-in-right');
}

function show1v1NameEntry() {
    Menu.style.display = "none";
    Number_game.style.display = "block";
    Number_game.innerHTML = "";

    const container = document.createElement("div");
    container.className = "menu-container";

    const title = document.createElement("h2");
    title.textContent = "Enter Player Names";
    title.className = "game-start-title";
    container.appendChild(title);

    const inputContainer = document.createElement("div");
    inputContainer.className = "custom-input-container";

    const p1Section = document.createElement("div");
    p1Section.className = "custom-input-section";
    const p1Label = document.createElement("span");
    p1Label.className = "custom-input-label";
    p1Label.textContent = "Player 1:";
    p1Label.style.color = "#3498db";
    const p1Input = document.createElement("input");
    p1Input.type = "text";
    p1Input.value = "Player 1";
    p1Input.maxLength = 15;
    p1Input.className = "custom-input custom-input-min";
    p1Section.appendChild(p1Label);
    p1Section.appendChild(p1Input);
    inputContainer.appendChild(p1Section);

    const p2Section = document.createElement("div");
    p2Section.className = "custom-input-section";
    const p2Label = document.createElement("span");
    p2Label.className = "custom-input-label";
    p2Label.textContent = "Player 2:";
    p2Label.style.color = "#9b59b6";
    const p2Input = document.createElement("input");
    p2Input.type = "text";
    p2Input.value = "Player 2";
    p2Input.maxLength = 15;
    p2Input.className = "custom-input custom-input-max";
    p2Section.appendChild(p2Label);
    p2Section.appendChild(p2Input);
    inputContainer.appendChild(p2Section);

    container.appendChild(inputContainer);

    const rangeInfo = document.createElement("p");
    rangeInfo.style.marginTop = "1.5rem";
    rangeInfo.style.opacity = "0.8";
    rangeInfo.style.fontSize = "1.1rem";
    rangeInfo.textContent = `${getName(current1v1Difficulty)} - Numbers from ${current1v1Range.low} to ${current1v1Range.high}`;
    container.appendChild(rangeInfo);

    const continueBtn = document.createElement("button");
    continueBtn.textContent = "Continue";
    continueBtn.className = "game-start-btn";
    continueBtn.style.marginTop = "2rem";
    continueBtn.onclick = () => {
        player1Name = p1Input.value.trim() || "Player 1";
        player2Name = p2Input.value.trim() || "Player 2";
        playSound('buttonPress');
        Number_game.innerHTML = "";
        show1v1ModeSelection();
    };

    const gobackBtn = document.createElement("button");
    gobackBtn.textContent = "← Back to Difficulty Selection";
    gobackBtn.style.marginTop = "1.5rem";
    gobackBtn.style.background = "#777";
    gobackBtn.onclick = () => {
        playSound('buttonPress');
        Number_game.innerHTML = "";
        Number_game.style.display = 'none';
        show1v1DifficultyMenu();
    };

    container.appendChild(continueBtn);
    container.appendChild(gobackBtn);
    Number_game.appendChild(container);
    Number_game.classList.add('slide-in-right');
}

function show1v1ModeSelection() {
    Number_game.innerHTML = "";

    const container = document.createElement("div");
    container.className = "menu-container";

    const title = document.createElement("h2");
    title.textContent = "Select Battle Mode";
    title.className = "game-start-title";
    container.appendChild(title);

    const subtitle = document.createElement("p");
    subtitle.style.opacity = "0.7";
    subtitle.style.marginBottom = "2rem";
    subtitle.textContent = `${player1Name} vs ${player2Name}`;
    container.appendChild(subtitle);

    const modesContainer = document.createElement("div");
    modesContainer.className = "battle-modes-container";

    // Same Number Mode
    const sameCard = document.createElement("div");
    sameCard.className = "battle-mode-card";
    sameCard.innerHTML = `
        <div class="mode-icon">🎯</div>
        <h3 class="mode-title">Same Number</h3>
        <p class="mode-desc">Both players race to guess the <strong>same</strong> secret number. Take turns guessing - first to find it wins!</p>
    `;
    sameCard.onclick = () => {
        current1v1Mode = "same";
        playSound('buttonPress');
        sounds.inGame.pause();
        sounds.inGame.currentTime = 0;
        playSound('start');
        setTimeout(() => { sounds.inGame.play().catch(() => { }); }, 1000);
        Number_game.innerHTML = "";
        start1v1SameNumber();
    };
    modesContainer.appendChild(sameCard);

    // Different Numbers Mode
    const diffCard = document.createElement("div");
    diffCard.className = "battle-mode-card different";
    diffCard.innerHTML = `
        <div class="mode-icon">🔀</div>
        <h3 class="mode-title">Different Numbers</h3>
        <p class="mode-desc">Each player has their <strong>own</strong> secret number. Race against the clock - fewer tries and faster time wins!</p>
    `;
    diffCard.onclick = () => {
        current1v1Mode = "different";
        playSound('buttonPress');
        sounds.inGame.pause();
        sounds.inGame.currentTime = 0;
        playSound('start');
        setTimeout(() => { sounds.inGame.play().catch(() => { }); }, 1000);
        Number_game.innerHTML = "";
        start1v1DifferentNumbers();
    };
    modesContainer.appendChild(diffCard);

    container.appendChild(modesContainer);

    const gobackBtn = document.createElement("button");
    gobackBtn.textContent = "← Back to Name Entry";
    gobackBtn.style.marginTop = "2rem";
    gobackBtn.style.background = "#777";
    gobackBtn.onclick = () => {
        playSound('buttonPress');
        Number_game.innerHTML = "";
        show1v1NameEntry();
    };

    container.appendChild(gobackBtn);
    Number_game.appendChild(container);
    Number_game.classList.add('slide-in-right');
}

// ============================================================
// SAME NUMBER MODE - Turn-based, no timer
// ============================================================
function start1v1SameNumber() {
    const { low, high } = current1v1Range;
    const secretNumber = Math.floor(Math.random() * (high - low + 1)) + low;

    const countdown = document.createElement("div");
    countdown.className = "countdown";
    countdown.textContent = "3";
    document.body.appendChild(countdown);

    const flash = document.createElement("div");
    flash.id = "flash";
    flash.className = "go-flash";
    document.body.appendChild(flash);

    Number_game.innerHTML = `
        <div class="vs-game-container">
            <div class="vs-mode-badge same">Same Number</div>
            <div class="vs-header">
                <div class="vs-player-indicator p1-active">
                    <span class="player-name p1-name">${player1Name}</span>
                    <span class="player-tries p1-tries">0 tries</span>
                </div>
                <div class="vs-divider">VS</div>
                <div class="vs-player-indicator">
                    <span class="player-name p2-name">${player2Name}</span>
                    <span class="player-tries p2-tries">0 tries</span>
                </div>
            </div>
            <div class="vs-turn-indicator">
                <span id="turnText">${player1Name}'s Turn</span>
            </div>
            <div class="vs-range-info">Guess a number between ${low} and ${high}</div>
            <input type="text" id="vsGuessInput" class="vs-input" placeholder="Enter your guess" disabled>
            <div id="vsFeedback" class="vs-feedback"></div>
        </div>
    `;

    const input = document.getElementById('vsGuessInput');
    const feedback = document.getElementById('vsFeedback');
    const turnText = document.getElementById('turnText');
    const p1Indicator = document.querySelector('.vs-player-indicator:first-child');
    const p2Indicator = document.querySelector('.vs-player-indicator:last-child');
    const p1TriesEl = document.querySelector('.p1-tries');
    const p2TriesEl = document.querySelector('.p2-tries');

    let currentPlayer = 1;
    let p1Tries = 0;
    let p2Tries = 0;
    let p1Guesses = [];
    let p2Guesses = [];
    let gameActive = false;

    let count = 3;
    const timer = setInterval(() => {
        if (count > 0) {
            countdown.textContent = count;
            countdown.classList.add('show');
            playSound('countdownBeep');
            setTimeout(() => countdown.classList.remove('show'), 800);
        } else {
            countdown.textContent = "GO!";
            countdown.classList.add('show');
            playSound('goBeep');
            flash.style.display = "block";
            document.body.insertAdjacentHTML("beforeend", `<div class="go-shockwave"></div>`);
            setTimeout(() => document.querySelector(".go-shockwave")?.remove(), 800);
            gameActive = true;
            input.disabled = false;
            input.focus();
            setTimeout(() => {
                countdown.remove();
                flash.remove();
            }, 1000);
            clearInterval(timer);
        }
        count--;
    }, 1000);

    function switchPlayer() {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        if (currentPlayer === 1) {
            p1Indicator.classList.add('p1-active');
            p2Indicator.classList.remove('p2-active');
            turnText.textContent = `${player1Name}'s Turn`;
            input.style.borderColor = "rgba(52, 152, 219, 0.6)";
        } else {
            p1Indicator.classList.remove('p1-active');
            p2Indicator.classList.add('p2-active');
            turnText.textContent = `${player2Name}'s Turn`;
            input.style.borderColor = "rgba(155, 89, 182, 0.6)";
        }
        input.focus();
    }

    function addFeedback(text, isWin = false, player = currentPlayer) {
        const msg = document.createElement('div');
        msg.className = `vs-feedback-msg ${player === 1 ? 'p1-msg' : 'p2-msg'} ${isWin ? 'win-msg' : ''}`;
        msg.innerHTML = `<span class="feedback-player">${player === 1 ? player1Name : player2Name}:</span> ${text}`;
        feedback.prepend(msg);
    }

    input.addEventListener('keydown', e => {
        if (!gameActive || e.key !== "Enter") return;

        const guess = Number(input.value);
        input.value = "";

        if (isNaN(guess)) return;

        if (guess < low || guess > high) {
            addFeedback(`Please enter a number between ${low} and ${high}`);
            return;
        }

        const currentGuesses = currentPlayer === 1 ? p1Guesses : p2Guesses;

        if (currentGuesses.includes(guess)) {
            addFeedback("Already tried this number!");
            return;
        }

        currentGuesses.push(guess);

        if (currentPlayer === 1) {
            p1Tries++;
            p1TriesEl.textContent = `${p1Tries} tries`;
        } else {
            p2Tries++;
            p2TriesEl.textContent = `${p2Tries} tries`;
        }

        if (guess === secretNumber) {
            const winner = currentPlayer === 1 ? player1Name : player2Name;
            const tries = currentPlayer === 1 ? p1Tries : p2Tries;
            addFeedback(`Found it! The number was ${secretNumber}!`, true);
            gameActive = false;
            sounds.inGame.pause();
            sounds.inGame.currentTime = 0;
            playSound('winWait');
            setTimeout(() => {
                create1v1WinModal(winner, tries, "same");
            }, 500);
        } else if (guess < secretNumber) {
            addFeedback(`${guess} is too LOW ↑`);
            switchPlayer();
        } else {
            addFeedback(`${guess} is too HIGH ↓`);
            switchPlayer();
        }
    });
}

// ============================================================
// DIFFERENT NUMBERS MODE - With individual timers
// ============================================================
function start1v1DifferentNumbers() {
    const { low, high } = current1v1Range;
    const p1SecretNumber = Math.floor(Math.random() * (high - low + 1)) + low;
    let p2SecretNumber = Math.floor(Math.random() * (high - low + 1)) + low;
    while (p2SecretNumber === p1SecretNumber && (high - low) > 0) {
        p2SecretNumber = Math.floor(Math.random() * (high - low + 1)) + low;
    }

    const countdown = document.createElement("div");
    countdown.className = "countdown";
    countdown.textContent = "3";
    document.body.appendChild(countdown);

    const flash = document.createElement("div");
    flash.id = "flash";
    flash.className = "go-flash";
    document.body.appendChild(flash);

    Number_game.innerHTML = `
        <div class="vs-game-container split-mode">
            <div class="vs-mode-badge different">Different Numbers</div>
            <div class="split-screen">
                <!-- Player 1 Side -->
                <div class="split-player p1-side">
                    <div class="split-header">
                        <span class="player-name p1-name">${player1Name}</span>
                        <div class="split-timer p1-timer" id="p1Timer">
                            <span class="timer-icon">⏱</span>
                            <span id="p1TimerValue">00:00.00</span>
                        </div>
                    </div>
                    <div class="split-stats">
                        <span class="player-tries p1-tries">0 tries</span>
                    </div>
                    <div class="split-range">Find your number (${low} - ${high})</div>
                    <input type="text" id="p1Input" class="split-input p1-input" placeholder="Your guess..." disabled>
                    <div id="p1Feedback" class="split-feedback"></div>
                    <div id="p1Status" class="split-status">Waiting...</div>
                </div>
                
                <!-- Divider -->
                <div class="split-divider">
                    <span>VS</span>
                </div>
                
                <!-- Player 2 Side -->
                <div class="split-player p2-side">
                    <div class="split-header">
                        <span class="player-name p2-name">${player2Name}</span>
                        <div class="split-timer p2-timer" id="p2Timer">
                            <span class="timer-icon">⏱</span>
                            <span id="p2TimerValue">00:00.00</span>
                        </div>
                    </div>
                    <div class="split-stats">
                        <span class="player-tries p2-tries">0 tries</span>
                    </div>
                    <div class="split-range">Find your number (${low} - ${high})</div>
                    <input type="text" id="p2Input" class="split-input p2-input" placeholder="Your guess..." disabled>
                    <div id="p2Feedback" class="split-feedback"></div>
                    <div id="p2Status" class="split-status">Waiting...</div>
                </div>
            </div>
            <div class="race-info">Race to find your number! Fewer tries wins. If tied, faster time wins!</div>
        </div>
    `;

    const p1Input = document.getElementById('p1Input');
    const p2Input = document.getElementById('p2Input');
    const p1Feedback = document.getElementById('p1Feedback');
    const p2Feedback = document.getElementById('p2Feedback');
    const p1Status = document.getElementById('p1Status');
    const p2Status = document.getElementById('p2Status');
    const p1TriesEl = document.querySelector('.p1-tries');
    const p2TriesEl = document.querySelector('.p2-tries');
    const p1TimerValue = document.getElementById('p1TimerValue');
    const p2TimerValue = document.getElementById('p2TimerValue');

    let p1Tries = 0;
    let p2Tries = 0;
    let p1Guesses = [];
    let p2Guesses = [];
    let p1Finished = false;
    let p2Finished = false;
    let p1FinishTries = 0;
    let p2FinishTries = 0;
    let p1FinishTime = 0;
    let p2FinishTime = 0;
    let gameActive = false;

    let startTime;
    let p1TimerInterval;
    let p2TimerInterval;

    let count = 3;
    const timer = setInterval(() => {
        if (count > 0) {
            countdown.textContent = count;
            countdown.classList.add('show');
            playSound('countdownBeep');
            setTimeout(() => countdown.classList.remove('show'), 800);
        } else {
            countdown.textContent = "GO!";
            countdown.classList.add('show');
            playSound('goBeep');
            flash.style.display = "block";
            document.body.insertAdjacentHTML("beforeend", `<div class="go-shockwave"></div>`);
            setTimeout(() => document.querySelector(".go-shockwave")?.remove(), 800);
            gameActive = true;
            p1Input.disabled = false;
            p2Input.disabled = false;
            p1Status.textContent = "Guessing...";
            p2Status.textContent = "Guessing...";
            p1Input.focus();

            // Start timers
            startTime = Date.now();
            p1TimerInterval = setInterval(() => {
                if (!p1Finished) {
                    const elapsed = Date.now() - startTime;
                    p1TimerValue.textContent = formatTime(elapsed);
                }
            }, 10);
            p2TimerInterval = setInterval(() => {
                if (!p2Finished) {
                    const elapsed = Date.now() - startTime;
                    p2TimerValue.textContent = formatTime(elapsed);
                }
            }, 10);

            setTimeout(() => {
                countdown.remove();
                flash.remove();
            }, 1000);
            clearInterval(timer);
        }
        count--;
    }, 1000);

    function addP1Feedback(text, isWin = false) {
        const msg = document.createElement('div');
        msg.className = `split-feedback-msg ${isWin ? 'win-msg' : ''}`;
        msg.textContent = text;
        p1Feedback.prepend(msg);
    }

    function addP2Feedback(text, isWin = false) {
        const msg = document.createElement('div');
        msg.className = `split-feedback-msg ${isWin ? 'win-msg' : ''}`;
        msg.textContent = text;
        p2Feedback.prepend(msg);
    }

    function checkGameEnd() {
        if (p1Finished && p2Finished) {
            gameActive = false;
            clearInterval(p1TimerInterval);
            clearInterval(p2TimerInterval);
            sounds.inGame.pause();
            sounds.inGame.currentTime = 0;
            playSound('winWait');

            let winner, winTries, winTime;

            if (p1FinishTries < p2FinishTries) {
                winner = player1Name;
                winTries = p1FinishTries;
                winTime = p1FinishTime;
            } else if (p2FinishTries < p1FinishTries) {
                winner = player2Name;
                winTries = p2FinishTries;
                winTime = p2FinishTime;
            } else {
                // Same tries - faster time wins
                if (p1FinishTime < p2FinishTime) {
                    winner = player1Name;
                    winTries = p1FinishTries;
                    winTime = p1FinishTime;
                } else if (p2FinishTime < p1FinishTime) {
                    winner = player2Name;
                    winTries = p2FinishTries;
                    winTime = p2FinishTime;
                } else {
                    // Perfect tie
                    winner = "Tie";
                    winTries = p1FinishTries;
                    winTime = p1FinishTime;
                }
            }

            setTimeout(() => {
                create1v1WinModal(winner, winTries, "different", p1FinishTries, p2FinishTries, p1FinishTime, p2FinishTime);
            }, 500);
        }
    }

    // Player 1 input
    p1Input.addEventListener('keydown', e => {
        if (!gameActive || p1Finished || e.key !== "Enter") return;

        const guess = Number(p1Input.value);
        p1Input.value = "";

        if (isNaN(guess)) return;

        if (guess < low || guess > high) {
            addP1Feedback(`Between ${low} and ${high}!`);
            return;
        }

        if (p1Guesses.includes(guess)) {
            addP1Feedback("Already tried!");
            return;
        }

        p1Guesses.push(guess);
        p1Tries++;
        p1TriesEl.textContent = `${p1Tries} tries`;

        if (guess === p1SecretNumber) {
            p1FinishTime = Date.now() - startTime;
            clearInterval(p1TimerInterval);
            addP1Feedback(`Found it! (${p1SecretNumber})`, true);
            p1Finished = true;
            p1FinishTries = p1Tries;
            p1Input.disabled = true;
            p1Status.textContent = `Finished! ${formatTime(p1FinishTime)}`;
            p1Status.style.color = "#2ecc71";
            document.querySelector('.p1-side').classList.add('finished');
            document.getElementById('p1Timer').classList.add('timer-stopped');
            checkGameEnd();
        } else if (guess < p1SecretNumber) {
            addP1Feedback(`${guess} - Too LOW ↑`);
        } else {
            addP1Feedback(`${guess} - Too HIGH ↓`);
        }
    });

    // Player 2 input
    p2Input.addEventListener('keydown', e => {
        if (!gameActive || p2Finished || e.key !== "Enter") return;

        const guess = Number(p2Input.value);
        p2Input.value = "";

        if (isNaN(guess)) return;

        if (guess < low || guess > high) {
            addP2Feedback(`Between ${low} and ${high}!`);
            return;
        }

        if (p2Guesses.includes(guess)) {
            addP2Feedback("Already tried!");
            return;
        }

        p2Guesses.push(guess);
        p2Tries++;
        p2TriesEl.textContent = `${p2Tries} tries`;

        if (guess === p2SecretNumber) {
            p2FinishTime = Date.now() - startTime;
            clearInterval(p2TimerInterval);
            addP2Feedback(`Found it! (${p2SecretNumber})`, true);
            p2Finished = true;
            p2FinishTries = p2Tries;
            p2Input.disabled = true;
            p2Status.textContent = `Finished! ${formatTime(p2FinishTime)}`;
            p2Status.style.color = "#2ecc71";
            document.querySelector('.p2-side').classList.add('finished');
            document.getElementById('p2Timer').classList.add('timer-stopped');
            checkGameEnd();
        } else if (guess < p2SecretNumber) {
            addP2Feedback(`${guess} - Too LOW ↑`);
        } else {
            addP2Feedback(`${guess} - Too HIGH ↓`);
        }
    });
}

// ============================================================
// WIN MODAL FOR 1v1
// ============================================================
function create1v1WinModal(winner, tries, mode, p1Tries = 0, p2Tries = 0, p1Time = 0, p2Time = 0) {
    const winModal = document.createElement("div");
    winModal.id = "winModal";
    winModal.className = "modal-overlay";

    const modal = document.createElement("div");
    modal.className = "modal";

    const trophy = document.createElement("div");
    trophy.className = "win-trophy";
    trophy.textContent = winner === "Tie" ? "🤝" : "🏆";

    const title = document.createElement("h2");
    title.style.background = "linear-gradient(90deg, #3498db, #9b59b6)";
    title.style.webkitBackgroundClip = "text";
    title.style.webkitTextFillColor = "transparent";
    title.style.fontSize = "2rem";
    title.style.marginBottom = "0.5rem";

    const statsContainer = document.createElement("div");
    statsContainer.className = "vs-win-stats";

    if (winner === "Tie") {
        title.textContent = "It's a Tie!";
        statsContainer.innerHTML = `
            <div class="vs-stat-row">
                <span>Both finished in ${tries} tries</span>
            </div>
            <div class="vs-stat-row">
                <span>Time: ${formatTime(p1Time)}</span>
            </div>
        `;
    } else {
        title.textContent = `${winner} Wins!`;
        if (mode === "different") {
            statsContainer.innerHTML = `
                <div class="vs-stat-comparison">
                    <div class="vs-stat-player p1-stat">
                        <span class="stat-name">${player1Name}</span>
                        <span class="stat-tries">${p1Tries} tries</span>
                        <span class="stat-time">${formatTime(p1Time)}</span>
                    </div>
                    <div class="vs-stat-player p2-stat">
                        <span class="stat-name">${player2Name}</span>
                        <span class="stat-tries">${p2Tries} tries</span>
                        <span class="stat-time">${formatTime(p2Time)}</span>
                    </div>
                </div>
            `;
        } else {
            statsContainer.innerHTML = `
                <div class="vs-stat-row">
                    <span>Victory in ${tries} ${tries === 1 ? 'try' : 'tries'}!</span>
                </div>
            `;
        }
    }

    const btnContainer = document.createElement("div");
    btnContainer.className = "modal-buttons";

    const playAgainBtn = document.createElement("button");
    playAgainBtn.id = "playAgainBtn";
    playAgainBtn.textContent = "Rematch";

    const newModeBtn = document.createElement("button");
    newModeBtn.textContent = "Change Mode";
    newModeBtn.style.background = "linear-gradient(45deg, #9b59b6, #8e44ad)";

    const cancelBtn = document.createElement("button");
    cancelBtn.id = "cancelBtn";
    cancelBtn.textContent = "Main Menu";

    btnContainer.appendChild(playAgainBtn);
    btnContainer.appendChild(newModeBtn);
    btnContainer.appendChild(cancelBtn);

    modal.appendChild(trophy);
    modal.appendChild(title);
    modal.appendChild(statsContainer);
    modal.appendChild(btnContainer);
    winModal.appendChild(modal);
    Number_game.appendChild(winModal);

    playAgainBtn.addEventListener("click", () => {
        playSound('buttonPress');
        winModal.remove();
        setTimeout(() => {
            sounds.inGame.play().catch(() => { });
            Number_game.innerHTML = "";
            if (mode === "same") {
                start1v1SameNumber();
            } else {
                start1v1DifferentNumbers();
            }
        }, 500);
    });

    newModeBtn.addEventListener("click", () => {
        playSound('buttonPress');
        winModal.remove();
        setTimeout(() => {
            sounds.inGame.play().catch(() => { });
            Number_game.innerHTML = "";
            show1v1ModeSelection();
        }, 500);
    });

    cancelBtn.addEventListener("click", () => {
        playSound('buttonPress');
        winModal.remove();
        setTimeout(() => {
            Number_game.innerHTML = "";
            Number_game.style.display = 'none';
            Menu.innerHTML = "";
            showModeSelection();
            sounds.inGame.play().catch(() => { });
        }, 500);
    });
}