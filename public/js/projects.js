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
    if(this.scrollY >= 300) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*==================== LOGO CLICK====================*/
function logoclick(){
    window.location.href = "/";
}