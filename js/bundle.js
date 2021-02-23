/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
      // Calcualtor of Calories

      const result = document.querySelector('.calculating__result span');

      let sex , height, weight, age, ratio;
  
      if(localStorage.getItem('sex')) {
          sex = localStorage.getItem('sex');
      } else {
          sex = 'female';
          localStorage.setItem('sex', 'female');
      }
  
      if(localStorage.getItem('ratio')) {
          ratio = localStorage.getItem('ratio');
      } else {
          ratio = 1.375;
          localStorage.setItem('ratio', 1.375);
      }
  
      function initLocalSettings(selector, activeClass) {
          const elements = document.querySelectorAll(selector);
  
          elements.forEach(elem => {
              elem.classList.remove(activeClass);
              if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                  elem.classList.add(activeClass);
              }
  
              if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                  elem.classList.add(activeClass);
              }
          });
  
      }
  
      initLocalSettings('#gender div', 'calculating__choose-item_active');
      initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
  
      function calcTotal() {
          if (!sex || !height || !weight || !age || !ratio) {
              result.textContent = '____';
              return;
          }
  
          if (sex == 'female') {
              result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
          } else {
              result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
          }
      }
  
      calcTotal();
  
      function getStaticInformation(selector, activeClass) {
          const elements = document.querySelectorAll(selector);
  
          elements.forEach(elem => {
              elem.addEventListener('click', (e) => {
                  if (e.target.getAttribute('data-ratio')) {
                      ratio = +e.target.getAttribute('data-ratio');
                      localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                  } else {
                      sex = e.target.getAttribute('id');
                      localStorage.setItem('sex', e.target.getAttribute('id'));
                  }
      
                  elements.forEach(elem => {
                      elem.classList.remove(activeClass);
                  });
      
                  e.target.classList.add(activeClass);
                  calcTotal();
              });
          });
      }
  
      getStaticInformation('#gender div', 'calculating__choose-item_active');
      getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
  
      function getDynamicInformation(selector) {
          const input = document.querySelector(selector);
  
          if (input.value.match(/\D/g)) {
              input.style.border = '5px solid red';
          } else {
              input.style.border = 'none';
          }
  
          input.addEventListener('input', () => {
  
              if (input.value.match(/\D/g)) {
                  input.style.border = '1px solid red';
              } else {
                  input.style.border = 'none';
              }
  
              switch (input.getAttribute('id')) {
                  case 'height':
                      height = +input.value;
                      break;
                  case 'weight':
                      weight = +input.value;
                      break;
                  case 'age':
                      age = +input.value;
                      break;
              }
              calcTotal();
          });
      }
  
      getDynamicInformation('#height');
      getDynamicInformation('#age');
      getDynamicInformation('#weight');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
    class MenuCard {
        constructor(image, alt, subtitle, text, price, parentSelector, ...classes) {
            this.image = image;
            this.alt = alt;
            this.subtitle = subtitle;
            this.text = text;
            this.price = price;
            this.classes = classes;
            this.transfer = 27;
            this.parentSelector = document.querySelector(parentSelector);
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.image} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
                `;
            this.parentSelector.append(element);
        }
    }

    // GET prin metoda Then

    const getResource = async url => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(` Could not feth ${url}, status: $res.status`);
        }

        return await res.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // Carduri cu Meniuri V2

    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));


    //     function createCard(data) {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             const element = document.createElement('div');

    //             element.classList.add('menu__item');

    //             element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3> 
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //             `;

    //             document.querySelector('.menu .container').append(element);
    //         });
    //     }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function forms() {
       //POST Forms

       const forms = document.querySelectorAll('form');

       const message = {
           loading: '/food/img/form/spinner.svg',
           succes: 'Succes! pe curand',
           failed: 'Ceva nu a mers corect'
       };
   
       forms.forEach(item => {
           bindPostData(item);
       });
   
       const postData = async (url, data) => {
           const res = await fetch(url, {
               method: "POST",
               headers: {
                   'Content-type': 'application/json'
               },
               body: data
           });
   
           return await res.json();
       };
   
       function bindPostData(form) {
           form.addEventListener('submit', (e) => {
               e.preventDefault();
   
               const statusMessage = document.createElement('img');
               statusMessage.src = message.loading;
               statusMessage.style.cssText = `
                   display:block;
                   margin: 0 auto;
               `;
               form.insertAdjacentElement('afterend', statusMessage);
   
               const formData = new FormData(form);
   
               const json = JSON.stringify(Object.fromEntries(formData.entries()));
   
               const obj = {
                   a: 23,
                   b: 50
               };
   
               console.log(Object.entries(obj));
   
               postData('http://localhost:3000/requests', json)
                   .then(data => {
                       console.log(data);
                       showThanksModal(message.succes);
                       statusMessage.remove();
                   }).catch(() => {
                       showThanksModal(message.failed);
                   }).finally(() => {
                       form.reset();
                   });
           });
       }
   
       // Modal Succes 
   
       function showThanksModal(message) {
           const prevModalDialog = document.querySelector('.modal__dialog');
   
           prevModalDialog.classList.add('hide');
           openModal();
   
           const thanksModal = document.createElement('div');
           thanksModal.classList.add('modal__dialog');
           thanksModal.innerHTML = `
               <div class="modal__content">
                   <div class="modal__close" data-close>×</div>
                   <div class="modal__title">${message}</div>
               </div>
           `;
   
           document.querySelector(".modal").append(thanksModal);
           setTimeout(() => {
               thanksModal.remove();
               prevModalDialog.classList.add('show');
               prevModalDialog.classList.remove('hide');
               closeModal();
           }, 4000);
       }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal() {

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 100000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function addZero() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    let transformStringToNumber = string => +string.replace(/\D/g, '');

    function setDotOpacity() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    }

    next.addEventListener('click', () => {
        if (offset == transformStringToNumber(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += transformStringToNumber(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        addZero();

        setDotOpacity();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = transformStringToNumber(width) * (slides.length - 1);
        } else {
            offset -= transformStringToNumber(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        addZero();

        setDotOpacity();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = transformStringToNumber(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            addZero();

            setDotOpacity();
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');


    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');

    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {

    const deadline = '2021-03-13';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor(t / 1000 % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }

        }
    }

    setClock('.timer', deadline);
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");








window.addEventListener('DOMContentLoaded', () => {

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.default)();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__.default)();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__.default)();

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map