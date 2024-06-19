let startTime, updatedTime, difference, tInterval, savedTime = 0;
let running = false;
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startStopBtn.innerText = 'Pause';
    } else {
        clearInterval(tInterval);
        savedTime = difference;
        running = false;
        startStopBtn.innerText = 'Start';
    }
}

function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    running = false;
    display.innerText = '00:00:00';
    startStopBtn.innerText = 'Start';
    lapsList.innerHTML = '';
}

function lap() {
    if (running) {
        const li = document.createElement('li');
        li.innerText = display.innerText;
        lapsList.appendChild(li);
        li.style.animation = 'slideIn 0.5s forwards';
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    display.innerText = (hours < 10 ? "0" : "") + hours + ":" +
                        (minutes < 10 ? "0" : "") + minutes + ":" +
                        (seconds < 10 ? "0" : "") + seconds;
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
