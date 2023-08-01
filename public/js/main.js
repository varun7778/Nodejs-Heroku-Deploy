/*==================== SHOW MENU ====================*/
const showMenu = (className, toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId),
    hamburger = document.getElementById('menu-toggler')
  
    // Validate that variables exist
    if(toggle && nav && hamburger){
        toggle.addEventListener('click', ()=>{
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
            hamburger.classList.toggle(className)
        })
    }
}

showMenu('menu-active','nav-toggle','nav-menu')
 
/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu'),
    hamburger = document.getElementById('menu-toggler')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
    hamburger.classList.remove('menu-active')

}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
// Get all sections that have an ID defined
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    // Get current scroll position
    const scrollY = window.pageYOffset

    // Now we loop through sections to get height, top and ID values for each
    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 250;
        sectionId = current.getAttribute('id')

        /*
        - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
        - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
        */
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }
        else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}

// Add an event listener listening for scroll
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 200) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL TOP ====================*/ 
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 2000
    // reset: true
});

sr.reveal(`.home__data, .home__img, .page_title,
            .section-title, .about__img, .about__description, .button,
            .slider_container, .contact__data, .contact__button, .map,
            .direct-contact-container, .footer__content`, {
    interval: 150
})

/*==================== TYPEWRITTER ANIMATION ====================*/
var typed = new Typed(".type-writter",{
    strings: ["25+ Years Experience", "50+ Projects","500+ Customers", "4+ Cities"],
    typeSpeed: 50,
    backSpeed: 40,
    loop: true,
    shuffle: true
})

/*==================== LOGO CLICK====================*/
function logoclick(){
    window.location.href = "/";
}
