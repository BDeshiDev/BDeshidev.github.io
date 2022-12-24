//later
// var elements = document.querySelectorAll('.typeWriterGroup');
const element = document.querySelector('.typeWriterGroup');
const writer = createTypeWriterGroupFromElement(element,handleCharTyped) ;

const ctaGamesButton = document.querySelector('#games-button');//only on available now so simple is best
//need to move it out of the way without user seeing at
//so set it initially to hidden
//then add hide class to translate it
ctaGamesButton.classList.add('hide');
ctaGamesButton.hidden = false;
const ctaPortfolioButton = document.querySelector('#portfolio-button');//only on available now so simple is best
ctaPortfolioButton.classList.add('hide');
ctaPortfolioButton.hidden = false;
let startedTyping = false;
let eyeSVG = document.querySelector('#mirai__Eye__L');

eyeSVG.onload = ()=> {
    if(!startedTyping){
        startedTyping = true;
        writer.typeText(revealCtaButton);
    };
}

setTimeout(() => {
    if(!startedTyping ){
        startedTyping = true;
        console.log("timeout. Force start babbling");
        writer.typeText(revealCtaButton);
    };
}, 3000);




function revealCtaButton(){
    if(ctaGamesButton){
        ctaGamesButton.classList.remove('hide');
    }
    if(ctaPortfolioButton){
        ctaPortfolioButton.classList.remove('hide');
    }
}