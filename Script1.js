const Menu = document.getElementById("Menu_principale");
const Number_game = document.getElementById("Number_game");

function creerMenuBoutons() {
    Menu.innerHTML = `
        <div  style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h2> CHOISISSEZ LA DIFFICULTE</h2>
            <button onclick="Difficulte(1)" >1 - Beginner</button>
            <button onclick="Difficulte(2)" >2 - Easy</button>
            <button onclick="Difficulte(3)" >3 - Medium</button>
            <button onclick="Difficulte(4)" >4 - Hard</button>
            <button onclick="Difficulte(5)" >5 - Expert</button>
            <button onclick="Difficulte(6)" >6 - Custom</button>
        </div>
    `;
}
creerMenuBoutons();

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
    playAgainBtn.style.background = "#4CAF50";
    playAgainBtn.style.color = "white";

    const cancelBtn = document.createElement("button");
    cancelBtn.id = "cancelBtn";
    cancelBtn.textContent = "Cancel";
    cancelBtn.style.background = "#f44336";
    cancelBtn.style.color = "white";

    btnContainer.appendChild(playAgainBtn);
    btnContainer.appendChild(cancelBtn);

    modal.appendChild(title);
    modal.appendChild(msg);
    modal.appendChild(btnContainer);
    winModal.appendChild(modal);

    Number_game.appendChild(winModal);

   
    playAgainBtn.addEventListener("click", () => {
        winModal.classList.add("hidden");
        Difficulte(numero);

    });

    cancelBtn.addEventListener("click", () => {
        winModal.classList.add("hidden");
    });

    return winModal;
}



function PlayerInput(numero,low, high, nbr) {
    const input = document.createElement('input');
    input.placeholder = "Deviner le nombre";
    Number_game.appendChild(input);
    let i = 0;
    let T_guess = [];
    input.addEventListener('keydown', function (e) {
        if (e.key !== "Enter") return;
        i++;
        const guess = Number(input.value);
        if (isNaN(guess)) {
            input.value = "";
            return;
        }
        const result = document.createElement('p');
        Number_game.appendChild(result);
        if (guess > high || guess < low) {
            result.textContent = `Guess a number between ${low} and ${high}`
            input.value = "";
            
        }
        if (T_guess.includes(guess)) {
            result.textContent = `You already tried this number guess again`;
            input.value = "";
        }
        T_guess.push(guess);
        if (nbr == guess) {
            result.textContent = `Good Job! You won in ${i} tries`;
            input.disabled = true;
            setTimeout(() => {
                const winModal = createWinModal(numero);
                winModal.classList.remove("hidden");
            }, 200);

        }
        else {
            if (nbr < guess) result.textContent = `Try Again, the number is lower than ${guess}`;
            else result.textContent = `Try Again, the number is higher than ${guess}`;
        }
        input.value = "";
    });
}


function Difficulte(numero) {
    let nbr, low, high;
    Number_game.innerHTML = "";
    switch (numero) {
        case 1:
            console.log("Beginner");
            nbr = Math.floor(Math.random() * 10) + 1;
            low = 1;
            high = 10;
            PlayerInput(numero, low, high, nbr);
            break;
        case 2:
            console.log("Easy");
            nbr = Math.floor(Math.random() * 50) + 1;
            low = 1;
            high = 50;
            PlayerInput(numero, low, high, nbr);
            break;
        case 3:
            console.log("Medium");
            nbr = Math.floor(Math.random() * 100) + 1;
            low = 1;
            high = 100;
            PlayerInput(numero, low, high, nbr);
            break;
        case 4:
            console.log("Hard");
            nbr = Math.floor(Math.random() * 500) + 1;
            low = 1;
            high = 500;
            PlayerInput(numero, low, high, nbr);
            break;
        case 5:
            console.log("Expert");
            nbr = Math.floor(Math.random() * 1000) + 1;
            low = 1;
            high = 1000;
            PlayerInput(numero, low, high, nbr);
            break;
        case 6:
            console.log("Custom");
            nbr = Math.floor(Math.random() * 10) + 1;
            low = 1;
            high = 10;
            PlayerInput(numero, low, high, nbr);
            break;
    }
}