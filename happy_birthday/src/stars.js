import {typeWriter} from "./writer.js";

const friendStarsConfig = [
    { name: "Звезда Радости", color: "#4ecdc4", top: "15%", left: "10%", videoUrl: 'K_JP.MP4'},
    { name: "Звезда Тепла", color: "#45b7d1", top: "10%", left: "27%", videoUrl: 'K_FM.MP4' },
    { name: "Звезда Опыта", color: "#118ab2", top: "28%", left: "20%", videoUrl: 'K_AP.MP4' },
    { name: "Звезда Эмпатии", color: "#06d6a0", top: "30%", left: "38%", videoUrl: 'K_DS.MP4' },

    { name: "Звезда Объединения", color: "#7209b7", top: "16%", left: "87%", videoUrl: 'K_VM.MP4' },
    { name: "Звезда Вдохновения", color: "#ff6b6b", top: "41%", left: "86%", videoUrl: 'K_VL.MP4' },
    { name: "Звезда Самопознания", color: "#ffd166", top: "27%", left: "74%", videoUrl: 'K_IK.MP4' },
    { name: "Звезда Веры", color: "#ff9e00", top: "46%", left: "71%", videoUrl: 'K_PK.MP4' },

    { name: "Звезда Истоков", color: "#fb5607", top: "50%", left: "46%", videoUrl: 'P_D.mp4', big: true },
    { name: "Звезда Жизни", color: "#8338ec", top: "50%", left: "54%", videoUrl: 'P_M.mp4', big: true }
];

export function createBackgroundStars() {
    const canvas = document.querySelector('.stars-bg');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const stars = [];

    for (let i = 0; i < 1000; i++) {
        const star = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: 0.3 + Math.random() * 1.2,
            baseOpacity: 0.2 + Math.random() * 0.4,
            speed: 0.2 + Math.random() * 0.8,
            phase: Math.random() * Math.PI * 2
        };
        stars.push(star);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.baseOpacity})`;
        ctx.fill();
    }

    canvas.starsData = stars;
}

export function animateStars() {
    const canvas = document.querySelector('.stars-bg');
    const ctx = canvas.getContext('2d');
    const stars = canvas.starsData;

    if (!stars) return;

    function twinkle() {
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const time = Date.now() * 0.001;

        stars.forEach(star => {
            const flicker = Math.sin(time * star.speed + star.phase) * 0.3 + 0.7;
            const currentOpacity = star.baseOpacity * flicker;

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
            ctx.fill();
        });

        requestAnimationFrame(twinkle);
    }

    twinkle();
}

export function createFriendStars() {
    const container = document.getElementById('friendStars');

    friendStarsConfig.forEach((starConfig, index) => {
        const starElement = document.createElement('div');
        starElement.classList.add('friend-star');
        starElement.classList.add('hidden');
        if (starConfig.big) {
            starElement.classList.add('big');
        }
        starElement.style.top = starConfig.top;
        starElement.style.left = starConfig.left;
        starElement.dataset.video = `videos/${starConfig.videoUrl}`;
        starElement.id = `star-${index}`;

        const glow = document.createElement('div');
        glow.className = 'star-glow';
        glow.style.background = `radial-gradient(circle, ${starConfig.color} 0%, transparent 70%)`;

        const name = document.createElement('div');
        name.className = 'star-name';
        name.textContent = starConfig.name;

        starElement.appendChild(glow);
        starElement.appendChild(name);

        starElement.addEventListener('click', () => showFriendVideo(starConfig.name, starElement.dataset.video, index));
        container.appendChild(starElement);
    });
}


function getCloseEvent(index) {
    return new CustomEvent("videoClosed", {index});
}


export function showFriendVideo(starName, videoUrl, index) {
    if (getStar(index).classList.contains('disabled')) {
        return;
    }


    hideSpeakerOverlay();

    const modal = document.getElementById('videoModal');
    const video = document.getElementById('friendVideo');
    const title = document.getElementById('videoTitle');

    video.src = videoUrl;
    title.textContent = starName;
    modal.classList.remove('hidden');
    modal.dataset.index = index;

    video.play();
}

export function closeVideo() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('friendVideo');

    video.pause();
    video.src = '';
    modal.classList.add('hidden');

    const index = modal.dataset.index;
    const event = getCloseEvent(index);
    getStar(index).dispatchEvent(event);

    showSpeakerOverlay();
}


function getStar(index) {
    return document.getElementById(`star-${index}`);
}

function showStar(index) {
    getStar(index).classList.remove('hidden');
}


function hideSpeakerOverlay() {
    document.getElementById('speakerOverlay').classList.add('hidden');
}


function showSpeakerOverlay() {
    document.getElementById('speakerOverlay').classList.remove('hidden');
}


const SCENE_1_TEXT = `
    Посмотри... Видишь эту одинокую звезду на горизонте? Она только что зажглась. 
    Это кто-то, чью жизнь ты изменила, даже не подозревая об этом. 
    Прикоснись к этой звезде - и услышишь историю, которую ты помогла написать.
`;

const SCENE_2_TEXT = `
    Твой свет не мог остаться незамеченным. 
    Посмотри - на небе зажигаются новые огни. Каждый из них - человек, который стал немного другим благодаря тебе. 
    Три истории, три судьбы, три отражения твоего тепла.
`;

const SCENE_3_TEXT = `
    Удивительно... Твоё влияние распространяется, как круги по воде. 
    Ещё четыре звезды зажигаются в этом небе. Видишь, как они перекликаются? 
    Это голоса тех, кто благодарен тебе за поддержку в важные моменты.
`;

const SCENE_4_TEXT = `
    Смотри! Ещё Две звезды! 
    Они горят иначе — мягче, но ярче. Они были там с самого начала твоего пути. 
    Это те, кто дал тебе жизнь и продолжает быть твоим самым надёжным ориентиром."
`;

const SCENE_5_TEXT = `
    Теперь посмотри на это небо целиком. Десять звёзд. Десять историй. Десять доказательств того, 
    что твоё присутствие в этом мире имеет значение. Запомни этот момент — ты видишь отражение 
    своей души в глазах тех, кого ты коснулась. С днём рождения, создательница созвездий.
`;


const starsSeen = {
    1: false,
    2: false,
    3: false,

    4: false,
    5: false,
    6: false,
    7: false,
}

let scene3Interval;
let scene4Interval;
let scene5Interval;


export function startJourney() {
    document.getElementById('introSpeechOverlay').classList.add('hidden');
    document.getElementById('mainScene').classList.remove('hidden');

    starsBlocked(true);

    typeWriter(SCENE_1_TEXT, document.getElementById('overlay-dialog'), 80);
    const audio = new Audio('audios/scene_1.mp3');
    audio.play();

    audio.addEventListener('ended', function() {
        starsBlocked(false);
    });

    showStar(0);

    getStar(0).addEventListener('videoClosed', e => {
        document.getElementById('overlay-dialog').innerHTML = '';
        showStar(1);
        showStar(2);
        showStar(3);

        typeWriter(SCENE_2_TEXT, document.getElementById('overlay-dialog'), 80);
        const audio = new Audio('audios/scene_2.mp3');
        audio.play();

        waitForScene3Stars();
    });
}

function waitForScene3Stars() {
    const stars234 = [
      [getStar(1), 1],
      [getStar(2), 2],
      [getStar(3), 3],
    ];

    stars234.forEach(starData => {
        const [star, index] = starData;

        star.addEventListener('videoClosed', e => {
            starsSeen[index] = true;
        });
    });

    scene3Interval = setInterval(() => {
        if (starsSeen[1] && starsSeen[2] && starsSeen[3]) {
            startScene3();
        }
    }, 1000);
}


function startScene3() {
    clearInterval(scene3Interval);

    document.getElementById('overlay-dialog').innerHTML = '';

    starsBlocked(true);

    showStar(4);
    showStar(5);
    showStar(6);
    showStar(7);

    typeWriter(SCENE_3_TEXT, document.getElementById('overlay-dialog'), 80);
    const audio = new Audio('audios/scene_3.mp3');
    audio.play();

    audio.addEventListener('ended', function() {
        starsBlocked(false);
    });

    waitForScene4Stars();
}


function waitForScene4Stars() {
    const stars5678 = [
      [getStar(4), 4],
      [getStar(5), 5],
      [getStar(6), 6],
      [getStar(7), 7],
    ];

    stars5678.forEach(starData => {
        const [star, index] = starData;

        star.addEventListener('videoClosed', e => {
            starsSeen[index] = true;
        });
    });

    scene4Interval = setInterval(() => {
        if (starsSeen[4] && starsSeen[5] && starsSeen[6] && starsSeen[7]) {
            startScene4();
        }
    }, 1000);
}


function startScene4() {
    clearInterval(scene4Interval);

    document.getElementById('overlay-dialog').innerHTML = '';

    starsBlocked(true);

    showStar(8);
    showStar(9);

    typeWriter(SCENE_4_TEXT, document.getElementById('overlay-dialog'), 80);
    const audio = new Audio('audios/scene_4.mp3');
    audio.play();

    audio.addEventListener('ended', function() {
        starsBlocked(false);
    });

    waitForScene5();
}

function waitForScene5() {
    const stars5678 = [
      [getStar(8), 8],
      [getStar(9), 9],
    ];

    stars5678.forEach(starData => {
        const [star, index] = starData;

        star.addEventListener('videoClosed', e => {
            starsSeen[index] = true;
        });
    });

    scene5Interval = setInterval(() => {
        if (starsSeen[8] && starsSeen[9]) {
            startScene5();
        }
    }, 1000);
}


function startScene5() {
    clearInterval(scene5Interval);

    document.getElementById('overlay-dialog').innerHTML = '';

    starsBlocked(true);

    typeWriter(SCENE_5_TEXT, document.getElementById('overlay-dialog'), 80);
    const audio = new Audio('audios/scene_5.mp3');
    audio.play();

    audio.addEventListener('ended', function() {
        starsBlocked(false);
    });
}


function starsBlocked(blocked) {
    [
      getStar(0),
      getStar(1),
      getStar(2),
      getStar(3),
      getStar(4),
      getStar(5),
      getStar(6),
      getStar(7),
      getStar(8),
      getStar(9),
    ].forEach(star => {
        if (blocked) {
            star.classList.add('disabled');
        } else {
            star.classList.remove('disabled');
        }
    })
}

