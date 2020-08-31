
let slides = [
                "Fahim Faysal   ",
                "Indie Dev      ",
                "Game Programmer"
                ];

let textFlashTime = 5000;
let curSlideIndex = -1;

function textFlash() {
    curSlideIndex = (curSlideIndex + 1) % slides.length;
    $('#side-text')
        .text(slides[curSlideIndex])
        .fadeIn(500)
        .delay(textFlashTime)
        .fadeOut(500, textFlash)
    ;
}


window.onload = textFlash;