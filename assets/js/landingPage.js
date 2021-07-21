//later
// var elements = document.querySelectorAll('.typeWriterGroup');
const element = document.querySelector('.typeWriterGroup');
const writer = createTypeWriterGroupFromElement(element,handleCharTyped) ;

const ctaButton = document.querySelector('#games-button');//only on available now so simple is best
ctaButton.classList.add('hide');
ctaButton.hidden = false;

writer.typeText(revealCtaButton);

function revealCtaButton(){
    if(ctaButton){
        ctaButton.classList.remove('hide');
    }
}