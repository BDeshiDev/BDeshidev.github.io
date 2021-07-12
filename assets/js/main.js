const menuButton = document.querySelector('.menu-btn');
const hamburger = document.querySelector('.menu-btn__burger');
const nav = document.querySelector('.burger-nav');
const navMenu = document.querySelector('.menu-nav');
const navItems = document.querySelectorAll('.menu-nav__item');

let showMenu = false;

menuButton.addEventListener('click', toggleMenu);

function toggleMenu(){
    if(!showMenu){
        hamburger.classList.add('open');
        nav.classList.add('open');
        navMenu.classList.add('open');
        navItems.forEach(element => {
            element.classList.add('open');
        }); 
        showMenu = true;
    }else{
        hamburger.classList.remove('open');    
        nav.classList.remove('open');
        navMenu.classList.remove('open');
        navItems.forEach(element => {
            element.classList.remove('open');
        }); 
        showMenu = false;
    }
}
