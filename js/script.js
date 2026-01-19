(() => {
    const STORAGE_KEY = 'totalWiiis';
    const DELAY = 250;

    let totalWiiis = Number(localStorage.getItem(STORAGE_KEY)) || 0;

    const displayContador = document.getElementById('contador');
    const btnWiii = document.getElementById('btn-click');
    const btnReset = document.querySelector('.btn-reset');
    const btnBack = document.querySelector('.btn-back');
    const buttonsHome = document.querySelectorAll('.btn-play, .btn-ranking');

    const sounds = {
        wiii: new Audio('../sounds/pop.mp3'),
        reset: new Audio('../sounds/shhh.mp3'),
        click: new Audio('../sounds/click.mp3')
    };

    function playSound(sound) {
        if (!sound) return;
        sound.currentTime = 0;
        sound.play();
    }

    function updateDisplay() {
        if (displayContador) {
            displayContador.textContent = totalWiiis;
        }
    }

    updateDisplay();

    function increment() {
        totalWiiis++;
        localStorage.setItem(STORAGE_KEY, totalWiiis);
        updateDisplay();
        playSound(sounds.wiii);
    }

    function reset() {
        totalWiiis = 0;
        localStorage.removeItem(STORAGE_KEY);
        updateDisplay();
        playSound(sounds.reset);
    }

    function navigateWithSound(url) {
        playSound(sounds.click);
        setTimeout(() => {
            window.location.href = url;
        }, DELAY);
    }

    if (btnWiii) {
        btnWiii.addEventListener('click', increment);
    }

    if (btnReset) {
        btnReset.addEventListener('click', reset);
    }

    if (btnBack) {
        btnBack.addEventListener('click', (e) => {
            e.preventDefault();
            navigateWithSound('/index.html');
        });
    }

    buttonsHome.forEach(button => {
        button.addEventListener('click', (e) => {
            const link = button.closest('a');
            if (!link) return;

            e.preventDefault();
            navigateWithSound(link.getAttribute('href'));
        });
    });
})();
