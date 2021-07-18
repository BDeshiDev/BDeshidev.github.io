fetchAndCreateTypeWriters(handleCharTyped);
let ctaButton = document.querySelector('#games-button');//only on available now so simple is best
if(ctaButton){
    ctaButton.classList.add('hide');
    ctaButton.hidden = false;
    setTimeout(()=> {
        ctaButton.classList.remove('hide');
    }, 5000);//hook into thypewriters later
}