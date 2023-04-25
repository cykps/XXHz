function run() {
    input = document.querySelector("#input").value;
    if (input >= 0) {
        s.setHz(input);
        s.starStop();
    }
}

function reset() {
    input = document.querySelector("#input").value;
    if (input >= 0) {
        s.setHz(input);
    }
}

function note() {
    let hz = 440;
    let sounding = -1;

    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    let audioCtx = new AudioContext();
    let audOsc = audioCtx.createOscillator(); //Hzから音を生成
    let audDes = audioCtx.destination; //音の出力

    audOsc.connect(audDes); //ドッキング
    audOsc.type = "sine"; //"sine","square","sawtooth","triangle","custom"

    this.play = function() {
        if (sounding === -1) {
            audOsc.start = audOsc.start || audOsc.noteOn;
            audOsc.start();
        } else if (sounding === 0) {
            audioCtx.resume();
        }
        sounding = 1;
        console.log(audOsc.frequency)
    }
    this.stop = function() {
        audioCtx.suspend();
        sounding = 0;
        console.log("s.stop")
    }
    this.starStop = function() {
        console.log(sounding);
        if (sounding === 1) {
            this.stop();
        } else {
            this.play();
        }
    }
    this.setHz = function(num) {
        hz = num;
        audOsc.frequency.value = hz;
        console.log(`set hz = ${hz}`);
    }
}

const s = new note();

window.onkeydown = function(e){
    if (e.key=="Enter") {
        run();
    }
}