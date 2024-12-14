class Chronometer {
    constructor(display, lapTimesElement) {
        this.display = display;
        this.lapTimesElement = lapTimesElement;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.timerInterval = null;
        this.isRunning = false;
        this.laps = [];
    }

    start() {
        if (!this.isRunning) {
            this.startTime = Date.now() - this.elapsedTime;
            this.timerInterval = setInterval(() => this.update(), 10);
            this.isRunning = true;
            document.getElementById('startStop').textContent = 'Durdur';
            document.getElementById('startStop').classList.remove('btn-start');
            document.getElementById('startStop').classList.add('btn-stop');
        }
    }

    stop() {
        if (this.isRunning) {
            clearInterval(this.timerInterval);
            this.elapsedTime = Date.now() - this.startTime;
            this.isRunning = false;
            document.getElementById('startStop').textContent = 'Devam Et';
            document.getElementById('startStop').classList.remove('btn-stop');
            document.getElementById('startStop').classList.add('btn-start');
        }
    }

    reset() {
        clearInterval(this.timerInterval);
        this.display.textContent = '00:00:00';
        this.startTime = 0;
        this.elapsedTime = 0;
        this.isRunning = false;
        this.laps = [];
        document.getElementById('startStop').textContent = 'Başla';
        document.getElementById('startStop').classList.remove('btn-stop');
        document.getElementById('startStop').classList.add('btn-start');
        this.lapTimesElement.innerHTML = '';
    }

    update() {
        const currentTime = Date.now();
        this.elapsedTime = currentTime - this.startTime;

        let milliseconds = Math.floor((this.elapsedTime % 1000) / 10);
        let seconds = Math.floor((this.elapsedTime / 1000) % 60);
        let minutes = Math.floor((this.elapsedTime / (1000 * 60)) % 60);

        milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        this.display.textContent = `${minutes}:${seconds}:${milliseconds}`;
    }

    recordLap() {
        if (this.isRunning) {
            const lapTime = this.display.textContent;
            this.laps.push(lapTime);
            
            const lapElement = document.createElement('div');
            lapElement.classList.add('lap-item');
            lapElement.textContent = `Tur ${this.laps.length}: ${lapTime}`;
            this.lapTimesElement.prepend(lapElement);
        }
    }
}

// Sayfa yüklendiğinde çalışacak kod
document.addEventListener('DOMContentLoaded', () => {
    const displayElement = document.getElementById('display');
    const lapTimesElement = document.getElementById('lapTimes');
    const chronometer = new Chronometer(displayElement, lapTimesElement);

    document.getElementById('startStop').addEventListener('click', () => {
        chronometer.isRunning ? chronometer.stop() : chronometer.start();
    });

    document.getElementById('reset').addEventListener('click', () => {
        chronometer.reset();
    });

    document.getElementById('lap').addEventListener('click', () => {
        chronometer.recordLap();
    });
});