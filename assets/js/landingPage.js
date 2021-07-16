fetchAndCreateTypeWriters(handleCharTyped);
let ctaButton = document.querySelector('.cta-button');//only on available now so simple is best
setTimeout(()=> {
    ctaButton.classList.add('revealed');
    console.log('nene')
}, 5000);//hook into thypewriters later