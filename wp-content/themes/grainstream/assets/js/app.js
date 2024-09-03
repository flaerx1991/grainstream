//// check Session state for Preloader

// function hasVisitedBefore() {
//   return document.cookie.indexOf('visited=true') !== -1;
// }

// function setVisitedCookie() {
//   document.cookie = 'visited=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/';
// }
// function showBlockOnFirstVisit() {
//   if (!hasVisitedBefore()) {
//     // Show your block here
//     const block = document.getElementById("preloader");
//     if (block) {
//       block.style.display = 'block';
//     }
   
//     // Set the visited cookie to remember the user
//     setVisitedCookie();
//   }
// }

// showBlockOnFirstVisit();

///// Preloader
let preload = document.getElementById("preloader");
if(preload){
  setTimeout(() => {
    fadeOut(preload, 300, () => {
      preload.style.display = "none";
      
    })
  }, 3000)
}


////// Youtube Banner Init
function loadYTPlayer() {
  if(typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      ////////////// init all players
      window.onYouTubePlayerAPIReady = function () {
          initVideoBannerPlayer();
      };
  }
}

////// Youtube Banner Init
function initVideoBannerPlayer() {
  let players = document.querySelectorAll('.hero-video-banner .player');
  for (let i = 0; i < players.length; i++){
      let player;
      let wrapper = players[i].parentNode;

      player = new YT.Player(players[i], {
          height: '100%',
          width: '100%',
          videoId: players[i].getAttribute('data-video-id'),
          playerVars: {
              'modestbranding': 1,
              'autohide': 1,
              'showinfo': 0,
              'controls': 0,
              'mute': 1,
              'playsinline': 1,
              'loop': 1,
              'rel':0
          },
          events: {
              'onReady': onPlayerReady = (player, event) => {
                  player.target.playVideo();
              },
              'onStateChange': onPlayerStateChange = (event) => {
                  if (event.data === YT.PlayerState.PLAYING) {
                      setTimeout(function () {
                          wrapper.querySelector('.poster').classList.add('hidden');
                      }, 100);
                  }

                  if (event.data === YT.PlayerState.ENDED) {
                      player.playVideo(); 
                  }
              }
          }
      });
  }
}
loadYTPlayer();

///// Product Slider Setting
let tabletAndDesktopSliderSettings = {
  slidesPerView: 1, 
  initialSlide: 0,
  rewind: true,
  // loop: true,
  // spaceBetween: 53,
  effect: 'creative',
   autoplay: {
    delay: 2000,
    disableOnInteraction: false
  },

  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: 'bullets',
    renderBullet: function (index, className) {
       
        return '<div class="'+ className +' pagination-item"> <div class="line-item"></div></div>';
       
      },
  },
  
  breakpoints: {
  
      320: {
      creativeEffect: {
          limitProgress: 1,
          prev: {
            // shadow: true,
            translate: ["0%", "0%", -400],
          },
          next: {
            translate: ["100%", "0%", 0],
          },
      },
      },
      1024: {
        creativeEffect: {
            limitProgress: 5,
            
            prev: {
    
            translate: ['5%', '0%', -2],
            transition: 0.3,
            opacity: 1,
            scale: 0.91,
            },
            next: {
            translate: ['5%', '0%', -1],
            scale: 0.91,
            transition: 0.3,
            opacity: 1,
            },
        }
      }
  },
}

///// Product Slider Init
let mySecondSwiper = new Swiper('.product-slider', tabletAndDesktopSliderSettings); 

let productSlider = document.querySelector(".product-slider");
if(productSlider){
  productSlider.addEventListener("mouseover", () => {
    mySecondSwiper.autoplay.stop();
  });

  productSlider.addEventListener("mouseout", () => {
    mySecondSwiper.autoplay.start();
  });
}


let menuWrapp = document.querySelector(".menu-wrapper");
let allMenuItems = document.querySelectorAll(".menu-item");
let menuOpenButton = document.querySelector(".mobile-burger");
let menuCloseButton = document.querySelector(".close-menu");

allMenuItems.forEach((el) => {
  el.addEventListener("click", () =>{
    window.closeMenu();
  })
})

////// FadeOut Custom Effect
function fadeOut(element, duration, callback) {
  let start = performance.now();
  let initialOpacity = parseFloat(window.getComputedStyle(element).opacity);

  function animate(currentTime) {
      let elapsedTime = currentTime - start;
      let opacity = Math.max(0, initialOpacity - (elapsedTime / duration));
      element.style.opacity = opacity;

      if (elapsedTime < duration) {
          requestAnimationFrame(animate);
      } else {
          if (typeof callback === 'function') {
              callback();
          }
      }
  }

  requestAnimationFrame(animate);
}

////// FadeIn Custom Effect
function fadeIn(element, duration) {
  let start = performance.now();
  
  element.style.display = 'block';
  element.style.opacity = '0';

  function animate(currentTime) {
      let elapsedTime = currentTime - start;
      element.style.opacity = Math.min(1, elapsedTime / duration);
      
      if (elapsedTime < duration) {
          requestAnimationFrame(animate);
      }
  }

  requestAnimationFrame(animate);
}

////// Open Menu Event 
function openMenu(){
  menuWrapp.classList.add("offcanvas");

  allMenuItems.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("menuItemsAnima");
    }, 100 + (i * 100));
  });

  let menuBackground = document.createElement("div");
  menuBackground.setAttribute("class", "menu-dim");
  menuBackground.style.position = "fixed";
  menuBackground.style.inset = "0";
  menuBackground.style.zIndex = "1";
  menuBackground.style.transition = "background 0.5s";
  menuBackground.style.background = "rgba(0, 0, 0, 0.6)";
  menuBackground.style.display = "none";
  menuBackground.style.height = "100vh";
  menuBackground.addEventListener("click", closeMenu);
  document.getElementById("header").appendChild(menuBackground);

  fadeIn(menuBackground, 500);
}

menuOpenButton.addEventListener("click", () => {
  openMenu();
});

///// Close Menu Event
window.closeMenu = function() {
  menuWrapp.classList.remove("offcanvas");
  allMenuItems.forEach((el) => {
    el.classList.remove("menuItemsAnima")
  })
  fadeOut(document.querySelector(".menu-dim"), 500, function() {
    document.querySelector(".menu-dim").remove();
  });
}

menuCloseButton.addEventListener("click", () => {
  window.closeMenu();
});

addEventListener('beforeunload', (event) => {  window.closeMenu(); });


///// Next Section Event
let nextSectionButton = document.querySelector('.next-section-button');

if(nextSectionButton){
  nextSectionButton.addEventListener('click', function () {
    let nextSection = getNextSiblingByTag(document.querySelector('section'));
    if (nextSection) {
        scrollToElement(nextSection, 1000, -162);
    }
});
}


function getNextSiblingByTag(element) {
    let sibling = element.nextElementSibling;
    while (sibling) {
        if (sibling.tagName === 'SECTION') {
            return sibling;
        }
        sibling = sibling.nextElementSibling;
    }
    return null;
}

///// Scroll To Element Animation
function scrollToElement(element, duration, offset) {
    let start = performance.now();
    let from = window.scrollY;
    let to = element.offsetTop + (offset || 0);

    function animate(currentTime) {
        let elapsedTime = currentTime - start;
        let progress = Math.min(1, elapsedTime / duration);
        let scrollTop = from + (to - from) * progress;

        window.scrollTo({behavior: 'smooth', top: scrollTop});

        if (elapsedTime < duration) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}


///// Menu Click Anchor Scroll
let navLinks = document.querySelectorAll('ul.menu-ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', event => {       
        if (link.hash !== "") {
            event.preventDefault();
            
            let hash = link.hash;
            let targetElement = document.querySelector(hash);
            
            scrollToElement(targetElement, 500, -162);
        }
    });
});

///// Header Styles Scroll Changes
let scrollMain = document.querySelector("#main-content section:nth-child(2)");
let scrollBlog = document.querySelector(".blog-content .container .posts");
let scrollPost = document.querySelector(".post-content .container .post-content-block-wrap");

let siteHeader = document.querySelector(".site-header");

function scrollHeader(el){
  if(el){
  
    let windowNextSection = window;
    
    windowNextSection.addEventListener("scroll", () => {
  
        if(windowNextSection.scrollY >= 200){
            siteHeader.classList.add("fixed-header-bg1");
        }else{
          siteHeader.classList.remove("fixed-header-bg1");
        }
  
        if ( windowNextSection.scrollY >= el.offsetTop) {
          siteHeader.classList.add("fixed-header");
        }
        else{
            siteHeader.classList.remove("fixed-header");
        }  
    });		
  }
}

scrollHeader(scrollMain);
scrollHeader(scrollBlog);
scrollHeader(scrollPost);

///// Cards Animation
let elements = document.querySelectorAll('.raising-cards');
let elCards = document.querySelector('.raising-cards :nth-child(1)');
if(elCards){
  elCards.classList.add("animate");
}

window.addEventListener("scroll", function(){
    Array.from(elements).forEach(function(element) {
        Array.from(element.children).forEach(function(child, index) {
            if(index % 2 === 0 && window.scrollY >= child.offsetTop - 600){
                child.classList.add("animate");
            }else if(index % 2 !== 0 && window.scrollY >= child.offsetTop - 600){
                child.classList.add("animate2");
            }
        });
    });
})

///// About Us Animation
let aboutUsSection = document.querySelector(".about-us-content");

if(aboutUsSection){
  window.addEventListener("scroll", () => {
    if( window.scrollY >= aboutUsSection.offsetTop + 300){
      aboutUsSection.classList.add("animate");
    }
  })
}

///// Post Page Navigation
document.addEventListener('DOMContentLoaded', function () {
  let previousPageLink = document.querySelector(".back-button");

  if (previousPageLink) {
      previousPageLink.addEventListener('click', function (e) {
          e.preventDefault();
          history.go(-1); 
      });
  }
});



