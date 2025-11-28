const sounds = {
    difficulty: new Audio('sounds/click-difficulty.mp3'),
    start: new Audio('sounds/click-start.mp3'),
    inGame: new Audio('sounds/in-game.mp3'),
    winWait: new Audio('sounds/win-wait.mp3'),
    countdownBeep: new Audio('sounds/countdown_beep.mp3'),
    goBeep: new Audio('sounds/go_beep.wav')
};
sounds.winWait.volume = 0.4;
sounds.inGame.loop = true;
sounds.inGame.volume = 0.4;
function playSound(type) {
    const s = sounds[type];
    if (!s) return;
    s.currentTime = 0;
    s.play().catch(() => {});
}
Object.values(sounds).forEach(s => s.load());
// === PRESS START SYSTEM ===
const pressStartScreen = document.getElementById('pressStartScreen');
const pressStartBtn = document.getElementById('pressStartBtn');
const Menu = document.getElementById("Menu_principale");
const Number_game = document.getElementById("Number_game");
let lastUsedDifficulty = 3; // Default to Medium
pressStartBtn.onclick = () => {
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
    Menu.style.display = 'block';
    Menu.style.opacity = '0';
    Menu.style.transform = 'translateX(100vw)';
    requestAnimationFrame(() => {
        Menu.classList.add('slide-in-right');
        Menu.style.opacity = '1';
        Menu.style.transform = 'translateX(0)';
    });
    document.getElementById('soloModeBtn').onclick = () => {
        playSound('difficulty');
        Menu.classList.add('slide-out-left');
        setTimeout(() => creerMenuBoutons(), 400);
    };
    document.getElementById('vsModeBtn').onclick = () => {
        playSound('difficulty');
        Menu.classList.add('slide-out-left');
        setTimeout(() => show1v1DifficultyMenu(), 400);
    };
}
function show1v1DifficultyMenu() {
    Menu.innerHTML = `
        <div class="menu-container">
            <h2 style="color:#ff6b6b; text-shadow:0 0 20px #ff6b6b;">1v1 BATTLE - Choose Difficulty</h2>
            <button onclick="playSound('difficulty'); start1v1NameEntry(1)">1 - Beginner</button>
            <button onclick="playSound('difficulty'); start1v1NameEntry(2)">2 - Easy</button>
            <button onclick="playSound('difficulty'); start1v1NameEntry(3)">3 - Medium</button>
            <button onclick="playSound('difficulty'); start1v1NameEntry(4)">4 - Hard</button>
            <button onclick="playSound('difficulty'); start1v1NameEntry(5)">5 - Expert</button>
            <button onclick="playSound('difficulty'); start1v1NameEntry(6)">6 - Custom</button>
            <button onclick="playSound('difficulty'); showModeSelection()" style="margin-top:1.5rem; background:#777;">
                ← Back to Mode Select
            </button>
        </div>
    `;
    Menu.style.opacity = '0';
    Menu.style.transform = 'translateX(100vw)';
    requestAnimationFrame(() => Menu.classList.add('slide-in-right'));
}
function start1v1NameEntry(difficulty) {
    lastUsedDifficulty = difficulty;
    Menu.classList.add('slide-out-left');
    setTimeout(show1v1NameEntryScreen, 800);
}
function show1v1NameEntryScreen() {
    document.body.insertAdjacentHTML('beforeend', `
        <div id="nameEntryScreen" class="name-entry-screen">
            <h1 class="name-entry-title">ENTER YOUR NAMES</h1>
            <div class="name-entry-grid">
                <div class="name-entry-player p1"><h3>PLAYER 1</h3><input type="text" id="p1NameInput" value="Player 1" maxlength="12"></div>
                <div class="name-entry-player p2"><h3>PLAYER 2</h3><input type="text" id="p2NameInput" value="Player 2" maxlength="12"></div>
            </div>
            <button id="start1v1Btn" class="name-entry-start">START BATTLE</button>
        </div>
    `);
    const screen = document.getElementById('nameEntryScreen');
    const p1 = document.getElementById('p1NameInput');
    const p2 = document.getElementById('p2NameInput');
    const btn = document.getElementById('start1v1Btn');
    p1.select();
    p2.addEventListener('keydown', e => e.key === 'Enter' && btn.click());
    btn.onclick = () => {
        playSound('start');
        screen.classList.add('slide-out-left');
        setTimeout(() => {
            screen.remove();
            launch1v1Battle(p1.value.trim() || "Player 1", p2.value.trim() || "Player 2");
        }, 800);
    };
}
function launch1v1Battle(p1Name, p2Name) {
    Menu.style.display = 'none';
    Number_game.style.display = 'block';
    Number_game.classList.add('active');
    Number_game.innerHTML = '';
    const ranges = {1:[1,10], 2:[1,50], 3:[1,100], 4:[1,500], 5:[1,1000]};
    let [low, high] = ranges[lastUsedDifficulty] || [1,100];
    if (lastUsedDifficulty === 6) {
        const min = prompt("Custom Range - Min:", "1") || 1;
        const max = prompt("Custom Range - Max:", "1000") || 1000;
        low = Math.min(+min, +max);
        high = Math.max(+min, +max);
    }
    const secret1 = Math.floor(Math.random() * (high - low + 1)) + low;
    const secret2 = Math.floor(Math.random() * (high - low + 1)) + low;
    Number_game.innerHTML = `
        <div class="v1-container">
            <div class="v1-panel p1">
                               <div class="v1-name">${p1Name}</div>
                <div id="p1turn" class="v1-turn p1">WAITING...</div>
                <input type="text" id="p1input" class="v1-input" placeholder="Guess..." disabled>
                <div id="p1feedback" class="v1-feedback"></div>
                <div id="p1tries" class="v1-tries p1">0</div>
            </div>
            <div class="v1-panel p2">
                <div class="v1-name">${p2Name}</div>
                <div id="p2turn" class="v1-turn p2">WAITING...</div>
                <input type="text" id="p2input" class="v1-input" placeholder="Guess..." disabled>
                <div id="p2feedback" class="v1-feedback"></div>
                <div id="p2tries" class="v1-tries p2">0</div>
            </div>
        </div>
        <div class="countdown" id="countdown">3</div>
        <div class="go-flash" id="flash"></div>
        <div class="v1-winner" id="winnerBanner">
            <div id="winnerText"></div>
            <button onclick="location.reload()">PLAY AGAIN</button>
        </div>
    `;
    // All the same logic as before — now with real names
    const p1input = document.getElementById('p1input');
    const p2input = document.getElementById('p2input');
    const p1turn = document.getElementById('p1turn');
    const p2turn = document.getElementById('p2turn');
    const p1feedback = document.getElementById('p1feedback');
    const p2feedback = document.getElementById('p2feedback');
    const p1tries = document.getElementById('p1tries');
    const p2tries = document.getElementById('p2tries');
    const countdown = document.getElementById('countdown');
    const flash = document.getElementById('flash');
    const winnerBanner = document.getElementById('winnerBanner');
    const winnerText = document.getElementById('winnerText');
    let currentPlayer = 1;
    let tries1 = 0, tries2 = 0;
    let gameActive = false;
    // Countdown
    p1input.disabled = p2input.disabled = true;
    let count = 3;
    const timer = setInterval(() => {
        if (count > 0) {
            countdown.textContent = count;
            countdown.classList.add('show');
            playSound('countdownBeep');
        } else {
            countdown.textContent = "GO!";
            countdown.classList.add('show');
            playSound('goBeep');
            flash.style.display = "block";
            gameActive = true;
            p1input.disabled = false;
            p1input.focus();
            p1turn.textContent = "YOUR TURN";
            p2turn.textContent = "WAIT";
            setTimeout(() => { countdown.remove(); flash.remove(); }, 1000);
            clearInterval(timer);
            sounds.inGame.play().catch(() => {});
        }
        count--;
    }, 1000);
    const switchTurn = () => {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        p1input.disabled = currentPlayer !== 1;
        p2input.disabled = currentPlayer !== 2;
        p1turn.textContent = currentPlayer === 1 ? "YOUR TURN" : "WAIT";
        p2turn.textContent = currentPlayer === 2 ? "YOUR TURN" : "WAIT";
        (currentPlayer === 1 ? p1input : p2input).focus();
    };
    const makeGuess = (player, input, feedback, triesDisplay, secret) => {
        if (!gameActive) return;
        const guess = Number(input.value);
        if (isNaN(guess) || guess < low || guess > high) { input.value = ""; return; }
        triesDisplay.textContent = player === 1 ? ++tries1 : ++tries2;
        const msg = document.createElement('div');
        msg.className = "feedback-message";
        if (guess === secret) {
            gameActive = false;
            msg.textContent = "WINNER!";
            msg.className += " win";
            winnerText.innerHTML = `${player === 1 ? p1Name : p2Name}<br><small>WINS IN ${triesDisplay.textContent} TRIES!</small>`;
            winnerBanner.style.display = "flex";
            playSound('winWait');
        } else {
            msg.textContent = guess < secret ? "Higher" : "Lower";
        }
        feedback.prepend(msg);
        input.value = "";
        if (gameActive) switchTurn();
    };
    p1input.addEventListener('keydown', e => { if (e.key === "Enter") makeGuess(1, p1input, p1feedback, p1tries, secret1); });
    p2input.addEventListener('keydown', e => { if (e.key === "Enter") makeGuess(2, p2input, p2feedback, p2tries, secret2); });
}
// === CONFIGURABLE DELAYS ===
const VICTORY_DISPLAY_TIME = 2000; // ← Change this number anytime (3000 = 3 seconds)
const SMOOTH_TRANSITION = 400; // Small delay for smooth animations
// ================================
function creerMenuBoutons() {
    Menu.innerHTML = `
        <div class="menu-container">
            <h2> Choose The Difficulty </h2>
                <button onclick="playSound('difficulty'); Difficulte(1)">1 - Beginner</button>
                <button onclick="playSound('difficulty'); Difficulte(2)">2 - Easy</button>
                <button onclick="playSound('difficulty'); Difficulte(3)">3 - Medium</button>
                <button onclick="playSound('difficulty'); Difficulte(4)">4 - Hard</button>
                <button onclick="playSound('difficulty'); Difficulte(5)">5 - Expert</button>
                <button onclick="playSound('difficulty'); Difficulte(6)">6 - Custom</button>
                <button onclick="playSound('difficulty'); showModeSelection()" style="margin-top:1.5rem; background:#777;">
                ← Back to Mode Select
            </button>
        </div>
    `;
}
function getName(numero) {
    const names = ["", "Beginner", "Easy", "Medium", "Hard", "Expert", "Custom"];
    return names[numero];
}
function initGuessing(numero, low, high, nbr) {
    // Create countdown overlay
    const countdown = document.createElement("div");
    countdown.className = "countdown";
    countdown.textContent = "3";
    document.body.appendChild(countdown);
    const flash = document.createElement("div");
    flash.className = "go-flash";
    document.body.appendChild(flash);
    // Prepare game area
    Number_game.innerHTML = `
        <input type="text" id="guessInput" placeholder="Deviner le nombre" autofocus>
        <div id="feedback"></div>
    `;
    Number_game.classList.add('active');
    const input = document.getElementById('guessInput');
    const feedback = document.getElementById('feedback');
   
    let i = 0;
    let T_guess = [];
    // === 3…2…1…GO! COUNTDOWN ===
        // ←←← INPUT DISABLED UNTIL GO!
    input.disabled = true;
    input.style.opacity = "0.5";
    let count = 3;
    const timer = setInterval(() => {
        if (e.key !== "Enter") return;
        const guess = Number(input.value);
        if (isNaN(guess)) {
            input.value = "";
            return;
        }
        const result = document.createElement('p');
        Number_game.appendChild(result);
        if (guess > high || guess < low) {
            result.textContent = `Guess a number between ${low} and ${high}`;
            input.value = "";
            return;
        }
        if (T_guess.includes(guess)) {
            result.textContent = `You already tried this number guess again`;
            input.value = "";
            return;
        }
        i++;
        T_guess.push(guess);
        if (nbr == guess) {
            result.textContent = `Good Job! You won in ${i} tries`;
            input.disabled = true;
            sounds.inGame.pause();
            sounds.inGame.currentTime = 0;
            playSound('winWait');
            setTimeout(() => {
                const winModal = createWinModal(numero);
                winModal.classList.remove("hidden");
            }, 200);
        } else {
            if (nbr < guess) result.textContent = `Try Again, the number is lower than ${guess}`;
            else result.textContent = `Try Again, the number is higher than ${guess}`;
        }
        input.value = "";
    });
}
function PlayerInput(numero, low, high) {
    Number_game.innerHTML = "";
    const container = document.createElement("div");
    container.className = "game-start-screen";
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
    container.appendChild(title);
    container.appendChild(startBtn);
    Number_game.appendChild(container);
}
function createWinModal(numero) {
   
    const winModal = document.createElement("div");
    winModal.id = "winModal";
    winModal.className = "modal-overlay hidden";
   
    const modal = document.createElement("div");
    modal.className = "modal";
    const title = document.createElement("h2");
    title.textContent = " You Won! ";
    const msg = document.createElement("p");
    msg.textContent = "Do you want to play again?";
    const btnContainer = document.createElement("div");
    btnContainer.className = "modal-buttons";
    const playAgainBtn = document.createElement("button");
    playAgainBtn.id = "playAgainBtn";
    playAgainBtn.textContent = "Play Again";
    const cancelBtn = document.createElement("button");
    cancelBtn.id = "cancelBtn";
    cancelBtn.textContent = "Cancel";
    btnContainer.appendChild(playAgainBtn);
    btnContainer.appendChild(cancelBtn);
    modal.appendChild(title);
    modal.appendChild(msg);
    modal.appendChild(btnContainer);
    winModal.appendChild(modal);
    Number_game.appendChild(winModal);
  
    playAgainBtn.addEventListener("click", () => {
        playSound('difficulty');
        sounds.inGame.play().catch(() => { });
        winModal.classList.add("hidden");
        Difficulte(numero);
    });
    cancelBtn.addEventListener("click", () => {
        playSound('difficulty');
        winModal.classList.add("hidden");
        Number_game.innerHTML = "";
        Number_game.style.display = 'none';
        Menu.innerHTML = "";
        creerMenuBoutons();
        Menu.style.display = 'block';
        Menu.style.opacity = '1';
        sounds.inGame.play().catch(() => { });
    });
    return winModal;
}
function showCustomMenu() {
    Number_game.innerHTML = "";
    const customMenu = document.createElement("div");
    customMenu.className = "game-start-screen";
    const title = document.createElement("h2");
    title.textContent = "Custom Mode";
    customMenu.appendChild(title);
    let minValue = 1;
    let maxValue = 10;
    const inputContainer = document.createElement("div");
    const minInput = document.createElement("input");
    minInput.type = "number";
    minInput.value = minValue;
    minInput.min = 1;
    minInput.max = maxValue - 1;
    const minLabel = document.createElement("span");
    minLabel.textContent = "Min:";
    const maxInput = document.createElement("input");
    maxInput.type = "number";
    maxInput.value = maxValue;
    maxInput.min = minValue + 1;
    const maxLabel = document.createElement("span");
    maxLabel.textContent = "Max:";
    minInput.addEventListener("input", () => {
        let val = Number(minInput.value);
        if (val >= 1 && val < maxValue) minValue = val;
        else minInput.value = minValue;
        maxInput.min = minValue + 1;
    });
    maxInput.addEventListener("input", () => {
        let val = Number(maxInput.value);
        if (val > minValue && val <= 1000) maxValue = val;
        else maxInput.value = maxValue;
        minInput.max = maxValue - 1;
    });
    inputContainer.appendChild(minLabel);
    inputContainer.appendChild(minInput);
    inputContainer.appendChild(maxLabel);
    inputContainer.appendChild(maxInput);
    customMenu.appendChild(inputContainer);
    const startBtn = document.createElement("button");
    startBtn.textContent = "Start";
    startBtn.className = "game-start-btn";
    startBtn.onclick = () => {
        sounds.inGame.pause();
        sounds.inGame.currentTime = 0;
        playSound('start');
        setTimeout(() => { sounds.inGame.play().catch(() => {}); }, 1000);
        customMenu.remove();
        const randomNumber = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        initGuessing(6, minValue, maxValue, randomNumber);
    };
    customMenu.appendChild(startBtn);
    Number_game.appendChild(customMenu);
}
function Difficulte(numero) {
    // Show the game area
    Number_game.style.display = 'block';
    Number_game.style.opacity = '0';
    // Small delay to trigger transition
    setTimeout(() => {
        Number_game.style.transition = 'opacity 0.5s';
        Number_game.style.opacity = '1';
    }, 50);
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
}