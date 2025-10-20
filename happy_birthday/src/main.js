import {animateStars, closeVideo, createBackgroundStars, createFriendStars, startJourney} from "./stars.js";
import {startIntroSpeech} from "./intro.js";


window.addEventListener('load', () => {
    createBackgroundStars();
    createFriendStars();
    animateStars();

    const speechBtn = document.getElementById('speech-btn');
    speechBtn.addEventListener('click', startIntroSpeech);

    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', startJourney);

    const closeVideoBtn = document.getElementById('close-video-btn');
    closeVideoBtn.addEventListener('click', closeVideo);
});

window.addEventListener('resize', () => {
    createBackgroundStars();
});