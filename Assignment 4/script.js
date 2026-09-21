/* ===================================
   MOUSE HUNT GAME
=================================== */

let score = 0;
let coins = 0;
let timeLeft = 30;
let gameRunning = false;
let timer;


const startButton = document.getElementById("startGame");
const mouse = document.getElementById("mouseTarget");
const gameArea = document.getElementById("gameArea");


if (startButton) {

    startButton.addEventListener("click", startGame);

}


function startGame() {

    if (gameRunning) {
        return;
    }

    score = 0;
    coins = 0;
    timeLeft = 30;

    gameRunning = true;

    document.getElementById("score").textContent = score;
    document.getElementById("coins").textContent = coins;
    document.getElementById("time").textContent = timeLeft;

    document.getElementById("gameMessage").style.display = "none";

    mouse.style.display = "block";

    moveMouse();

    timer = setInterval(function () {

        timeLeft--;

        document.getElementById("time").textContent = timeLeft;

        if (timeLeft <= 0) {

            endGame();

        }

    }, 1000);

}


function moveMouse() {

    if (!gameRunning) {
        return;
    }

    const maxX =
        gameArea.clientWidth - mouse.offsetWidth;

    const maxY =
        gameArea.clientHeight - mouse.offsetHeight;

    const randomX =
        Math.random() * maxX;

    const randomY =
        Math.random() * maxY;

    mouse.style.left = randomX + "px";

    mouse.style.top = randomY + "px";

}


if (mouse) {

    mouse.addEventListener("click", function () {

        if (!gameRunning) {
            return;
        }

        score += 10;

        coins += 1;

        document.getElementById("score").textContent = score;

        document.getElementById("coins").textContent = coins;

        moveMouse();

    });

}


function endGame() {

    gameRunning = false;

    clearInterval(timer);

    mouse.style.display = "none";

    document.getElementById("gameMessage").style.display = "block";

    document.getElementById("gameMessage").innerHTML = `

        <div class="display-1">
            🎉
        </div>

        <h3>
            Time's Up!
        </h3>

        <p>
            คุณได้ ${score} คะแนน
        </p>

        <p>
            🪙 ได้รับ ${coins} Coins
        </p>

    `;

}


/* ===================================
   MEOW FASHION
=================================== */

function wearItem(type, item) {

    const element =
        document.getElementById(type);

    if (!element) {
        return;
    }

    element.textContent = item;

}


function removeOutfit() {

    document.getElementById("hat").textContent = "";

    document.getElementById("outfit").textContent = "";

}


function randomOutfit() {

    const hats = [
        "👑",
        "🎩",
        "🎀",
        "🧢",
        "👒"
    ];

    const clothes = [
        "👗",
        "👕",
        "🥋",
        "🧥"
    ];


    const randomHat =
        hats[Math.floor(Math.random() * hats.length)];

    const randomClothes =
        clothes[Math.floor(Math.random() * clothes.length)];


    document.getElementById("hat").textContent =
        randomHat;

    document.getElementById("outfit").textContent =
        randomClothes;

}


function saveLook() {

    alert(
        "📸 บันทึก Look ของเจ้าเหมียวแล้ว! 🐱💗"
    );

}