export function typeWriter(text, element, speed) {
    let index = 0;
    let interval = setInterval(function () {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
        } else {
            clearInterval(interval);
        }
    }, speed || 100);
}