import {typeWriter} from "./writer.js";

const INTRO_TEXT = `
  Знаешь, иногда кажется, что наши поступки растворяются в повседневности, как далёкие звёзды на утреннем небе. 
  Но на самом деле каждый твой добрый жест, каждое твоё слово - это семя, которое прорастает в сердцах других людей. 
  Сегодня ты увидишь, какой след оставил твой свет, а я проведу тебя по этому пути.
`;

const HELLO_TEXT = `Меня зовут Валентайн Парсиллио. Будем знакомы. Ты готова?`

export function startIntroSpeech() {
  document.getElementById('introStartOverlay').classList.add('hidden');
  document.getElementById('introSpeechOverlay').classList.remove('hidden');

  typeWriter(INTRO_TEXT, document.getElementById('startSpeechText'), 80);
  const audio = new Audio('audios/intro_1.mp3');
  audio.play();

  audio.addEventListener('ended', function() {
    setTimeout(startHelloSpeech, 1500);
  });
}


function startHelloSpeech() {
  document.getElementById('startSpeechText').innerHTML = '';

  typeWriter(HELLO_TEXT, document.getElementById('startSpeechText'), 80);
  const audio = new Audio('audios/intro_2.mp3');
  audio.play();

  document.getElementById('hello-img').classList.remove('opacity-0');

  audio.addEventListener('ended', function() {
    document.getElementById('start-btn').classList.remove('hidden');
  });
}
