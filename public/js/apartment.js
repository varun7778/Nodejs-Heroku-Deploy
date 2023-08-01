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

/*==================== IMAGE SLIDER(WEB) ====================*/
var web_slideIndex = 1;
web_showSlides(web_slideIndex);

function web_plusSlides(n) {
  web_showSlides(web_slideIndex += n);
}

function web_currentSlide(n) {
  web_showSlides(web_slideIndex = n);
}

function web_showSlides(n) {
  var i;
  var web_slides = document.getElementsByClassName("web_slides");
  var web_dots = document.getElementsByClassName("web_slide-thumbnail");
  var web_captionText = document.getElementById("web_caption");
  if (n > web_slides.length) {web_slideIndex = 1}
  if (n < 1) {web_slideIndex = web_slides.length}
  console.log(web_slideIndex);

  for (i = 0; i < web_slides.length; i++) {
      web_slides[i].style.display = "none";
      // slides[i].style.display = "inline";
  }
  for (i = 0; i < web_dots.length; i++) {
      web_dots[i].className = web_dots[i].className.replace(" active", "");
  }
  web_slides[web_slideIndex-1].style.display = "block";
  // slides[slideIndex-1].style.display = "inline";
  web_dots[web_slideIndex-1].className += " active";
  web_captionText.innerHTML = web_dots[web_slideIndex-1].alt;
}


/*==================== IMAGE SLIDER(MOBILE) ====================*/
var mobile_slideIndex = 1;
mobile_showSlides(mobile_slideIndex);

function mobile_plusSlides(n) {
  mobile_showSlides(mobile_slideIndex += n);
}

function mobile_currentSlide(n) {
  mobile_showSlides(mobile_slideIndex = n);
}

function mobile_showSlides(n) {
  var i;
  var mobile_slides = document.getElementsByClassName("mobile_slides");
  var mobile_dots = document.getElementsByClassName("mobile_slide-thumbnail");
  var mobile_captionText = document.getElementById("mobile_caption");
  if (n > mobile_slides.length) {mobile_slideIndex = 1}
  if (n < 1) {mobile_slideIndex = mobile_slides.length}
  console.log(mobile_slideIndex);

  for (i = 0; i < mobile_slides.length; i++) {
      mobile_slides[i].style.display = "none";
      // slides[i].style.display = "inline";
  }
  for (i = 0; i < mobile_dots.length; i++) {
      mobile_dots[i].className = mobile_dots[i].className.replace(" active", "");
  }
  mobile_slides[mobile_slideIndex-1].style.display = "block";
  // slides[slideIndex-1].style.display = "inline";
  mobile_dots[mobile_slideIndex-1].className += " active";
  mobile_captionText.innerHTML = mobile_dots[mobile_slideIndex-1].alt;
}

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 2000
    // reset: true
});

sr.reveal(`.apartment_page_title, .apt-info, .info-text, .button,
          .img_container, .web_container, .address-container,
          .map-container, .mobile_container, .footer`, {
    interval: 150
})

/*==================== LOGO CLICK====================*/
function logoclick(){
    window.location.href = "/";
}
