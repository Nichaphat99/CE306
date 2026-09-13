/* ==========================================
   CAT WORLD
   JavaScript
========================================== */


/* ==========================================
   GAME 1 : CAT POP!
========================================== */

const popBoard = document.getElementById("popGameBoard");

if (popBoard) {

    const startBtn = document.getElementById("startPopBtn");
    const restartBtn = document.getElementById("restartPopBtn");

    const startScreen = document.getElementById("popStartScreen");
    const gameOverScreen = document.getElementById("popGameOver");

    const cat = document.getElementById("popCat");
    const bomb = document.getElementById("popBomb");

    const scoreText = document.getElementById("popScore");
    const timeText = document.getElementById("popTime");
    const comboText = document.getElementById("popCombo");

    const finalScoreText = document.getElementById("finalPopScore");


    let popScore = 0;
    let popTime = 30;
    let popCombo = 0;

    let popTimer = null;
    let catTimer = null;
    let bombTimer = null;

    let popPlaying = false;


    /* ---------- RANDOM POSITION ---------- */

    function randomPosition(element) {

        const boardWidth = popBoard.clientWidth;
        const boardHeight = popBoard.clientHeight;

        const x = 50 + Math.random() * (boardWidth - 100);
        const y = 50 + Math.random() * (boardHeight - 100);

        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
    }


    /* ---------- SHOW CAT ---------- */

    function showCat() {

        randomPosition(cat);

        cat.classList.remove("hidden");

        setTimeout(() => {

            if (popPlaying) {
                cat.classList.add("hidden");
            }

        }, 700);
    }


    /* ---------- SHOW BOMB ---------- */

    function showBomb() {

        randomPosition(bomb);

        bomb.classList.remove("hidden");

        setTimeout(() => {

            if (popPlaying) {
                bomb.classList.add("hidden");
            }

        }, 800);
    }


    /* ---------- UPDATE UI ---------- */

    function updatePopUI() {

        scoreText.textContent = popScore;
        timeText.textContent = popTime;
        comboText.textContent = popCombo;

    }


    /* ---------- START GAME ---------- */

    function startPopGame() {

        popScore = 0;
        popTime = 30;
        popCombo = 0;

        popPlaying = true;

        startScreen.classList.add("hidden");
        gameOverScreen.classList.add("hidden");

        cat.classList.remove("hidden");
        bomb.classList.add("hidden");

        updatePopUI();

        showCat();


        catTimer = setInterval(() => {

            showCat();

        }, 900);


        bombTimer = setInterval(() => {

            showBomb();

        }, 2500);


        popTimer = setInterval(() => {

            popTime--;

            updatePopUI();

            if (popTime <= 0) {
                endPopGame();
            }

        }, 1000);

    }


    /* ---------- END GAME ---------- */

    function endPopGame() {

        popPlaying = false;

        clearInterval(popTimer);
        clearInterval(catTimer);
        clearInterval(bombTimer);

        cat.classList.add("hidden");
        bomb.classList.add("hidden");

        finalScoreText.textContent = popScore;

        gameOverScreen.classList.remove("hidden");

    }


    /* ---------- CLICK CAT ---------- */

    cat.addEventListener("click", () => {

        if (!popPlaying) {
            return;
        }

        popScore += 10;

        popCombo++;

        if (popCombo >= 5) {
            popScore += 20;
        }

        updatePopUI();

        showCat();

    });


    /* ---------- CLICK BOMB ---------- */

    bomb.addEventListener("click", () => {

        if (!popPlaying) {
            return;
        }

        popScore = Math.max(0, popScore - 20);

        popCombo = 0;

        updatePopUI();

        bomb.classList.add("hidden");

    });


    startBtn.addEventListener("click", startPopGame);

    restartBtn.addEventListener("click", startPopGame);

}



/* ==========================================
   GAME 2 : CAT VS MOUSE
========================================== */

const mouseBoard = document.getElementById("mouseGameBoard");

if (mouseBoard) {

    const startBtn = document.getElementById("startMouseBtn");
    const restartBtn = document.getElementById("restartMouseBtn");

    const startScreen = document.getElementById("mouseStartScreen");
    const gameOverScreen = document.getElementById("mouseGameOver");

    const player = document.getElementById("playerCat");
    const mouse = document.getElementById("targetMouse");

    const scoreText = document.getElementById("mouseScore");
    const countText = document.getElementById("mouseCount");
    const timeText = document.getElementById("mouseTime");

    const resultIcon = document.getElementById("mouseResultIcon");
    const resultTitle = document.getElementById("mouseResultTitle");
    const resultText = document.getElementById("mouseResultText");


    let mouseScore = 0;
    let mouseCount = 0;
    let mouseTime = 60;

    let playerX = 50;
    let playerY = 50;

    let mouseX = 70;
    let mouseY = 50;

    let mouseTimer = null;

    let mousePlaying = false;


    /* ---------- UPDATE PLAYER ---------- */

    function updatePlayer() {

        player.style.left = `${playerX}%`;
        player.style.top = `${playerY}%`;

    }


    /* ---------- RANDOM MOUSE ---------- */

    function moveMouse() {

        mouseX = 10 + Math.random() * 80;
        mouseY = 10 + Math.random() * 80;

        mouse.style.left = `${mouseX}%`;
        mouse.style.top = `${mouseY}%`;

    }


    /* ---------- UPDATE UI ---------- */

    function updateMouseUI() {

        scoreText.textContent = mouseScore;

        countText.textContent =
            `${mouseCount} / 5`;

        timeText.textContent =
            mouseTime;

    }


    /* ---------- CHECK COLLISION ---------- */

    function checkCollision() {

        const distanceX = playerX - mouseX;
        const distanceY = playerY - mouseY;

        const distance =
            Math.sqrt(
                distanceX * distanceX +
                distanceY * distanceY
            );

        if (distance < 10) {

            catchMouse();

        }

    }


    /* ---------- CATCH MOUSE ---------- */

    function catchMouse() {

        mouseCount++;

        mouseScore += 100;

        updateMouseUI();

        if (mouseCount >= 5) {

            winMouseGame();

            return;

        }

        moveMouse();

    }


    /* ---------- KEYBOARD ---------- */

    function handleMovement(event) {

        if (!mousePlaying) {
            return;
        }

        const key = event.key.toLowerCase();

        const speed = 4;


        if (
            key === "arrowup" ||
            key === "w"
        ) {
            playerY -= speed;
        }


        if (
            key === "arrowdown" ||
            key === "s"
        ) {
            playerY += speed;
        }


        if (
            key === "arrowleft" ||
            key === "a"
        ) {
            playerX -= speed;
        }


        if (
            key === "arrowright" ||
            key === "d"
        ) {
            playerX += speed;
        }


        playerX = Math.max(
            5,
            Math.min(95, playerX)
        );

        playerY = Math.max(
            8,
            Math.min(92, playerY)
        );


        updatePlayer();

        checkCollision();

    }


    /* ---------- START GAME ---------- */

    function startMouseGame() {

        mouseScore = 0;
        mouseCount = 0;
        mouseTime = 60;

        playerX = 10;
        playerY = 50;

        mousePlaying = true;

        startScreen.classList.add("hidden");
        gameOverScreen.classList.add("hidden");

        updatePlayer();
        moveMouse();
        updateMouseUI();


        mouseTimer = setInterval(() => {

            mouseTime--;

            updateMouseUI();

            if (mouseTime <= 0) {

                loseMouseGame();

            }

        }, 1000);

    }


    /* ---------- WIN ---------- */

    function winMouseGame() {

        mousePlaying = false;

        clearInterval(mouseTimer);

        resultIcon.textContent = "🏆";
        resultTitle.textContent = "YOU WIN!";
        resultTitle.className =
            "text-4xl font-black text-cyan-400";

        resultText.textContent =
            "จับหนูครบทั้ง 5 ตัวแล้ว!";

        gameOverScreen.classList.remove("hidden");

    }


    /* ---------- LOSE ---------- */

    function loseMouseGame() {

        mousePlaying = false;

        clearInterval(mouseTimer);

        resultIcon.textContent = "💀";
        resultTitle.textContent = "TIME'S UP!";
        resultTitle.className =
            "text-4xl font-black text-fuchsia-400";

        resultText.textContent =
            `จับหนูได้ ${mouseCount} / 5 ตัว`;

        gameOverScreen.classList.remove("hidden");

    }


    document.addEventListener(
        "keydown",
        handleMovement
    );


    startBtn.addEventListener(
        "click",
        startMouseGame
    );


    restartBtn.addEventListener(
        "click",
        startMouseGame
    );

}