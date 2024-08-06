let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1000 / 60);
        startStopBtn.innerText = 'Pause';
        lapBtn.disabled = false;
        resetBtn.disabled = false;
        running = true;
    } else {
        clearInterval(tInterval);
        startStopBtn.innerText = 'Start';
        running = false;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    display.innerText = hours + ':' + minutes + ':' + seconds;
}

function lap() {
    if (running) {
        lapCounter++;
        const lapTime = display.innerText;
        const lapItem = document.createElement('li');
        lapItem.innerText = 'Lap ' + lapCounter + ': ' + lapTime;
        lapsContainer.appendChild(lapItem);
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    lapCounter = 0;
    difference = 0;
    display.innerText = '00:00:00';
    startStopBtn.innerText = 'Start';
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    lapsContainer.innerHTML = '';
}
