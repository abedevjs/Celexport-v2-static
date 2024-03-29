'use strict'

////////////////////////////////////////////////////////////////////////////////////////////////
//SLOW SCROLL NAVIGATION LINK
const navigation = document.querySelector('.nav-links');

navigation.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('nav-item')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
    };
});

////////////////////////////////////////////////////////////////////////////////////////////////
// SLIDER
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
let currSlide = 0;
const maxSlide = slides.length;

// slider.style.transform = 'scale(0.2)';
// slider.style.transform = 'scale(0.5)';

const goToSlide = function (slide) {
    slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
};

goToSlide(0);

//Next Slide
const nextSlide = function () {
    if (currSlide === maxSlide - 1)
        currSlide = 0
    else
        currSlide++

    goToSlide(currSlide);
};

const prevSlide = function () {
    if (currSlide === 0)
        currSlide = maxSlide - 1;
    else
        currSlide--;

    goToSlide(currSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
})

////////////////////////////////////////////////////////////////////////////////////////////////
//TAB

const btnContainer = document.querySelector('.tab__button-container');
const buttons = document.querySelectorAll('.btn__tab');
const contents = document.querySelectorAll('.tab__content');


btnContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.btn__tab');

    if (!clicked) return;

    buttons.forEach(button => button.classList.remove('btn__tab--active'));
    contents.forEach(content => content.classList.remove('tab__content--active'));

    clicked.classList.add('btn__tab--active');
    document.querySelector(`.tab__content--${clicked.dataset.tab}`).classList.add('tab__content--active');

})

////////////////////////////////////////////////////////////////////////////////////////////////
//MODAL CONTACT FORM
const navs = document.querySelectorAll('.nav-item');
const btnMainGreen = document.querySelectorAll('.btnMain__green');
const btnsSecond = document.querySelectorAll('.btnSecond');
const btnClose = document.querySelector('.btn--close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const openModal = function (e) {
    e.preventDefault()
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

// navs.forEach(nav => nav.addEventListener('click', function (e) {
//     e.preventDefault()
//     const id = nav.getAttribute('href');
//     if (!id) return;
//     if (id === '#id-catalog')
//         openModal()
// }));

btnMainGreen.forEach(btn => btn.addEventListener('click', openModal));
btnsSecond.forEach(btn => btn.addEventListener('click', openModal));

btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
    if (e.key === "Escape" && !modal.classList.contains('hidden'))
        closeModal();
});

////////////////////////////////////////////////////////////////////////////////////////////////
//!GOOGLE SRIPT for sending Contact Form to my Spread Sheet
//DISPLAY SPINNER AFTER SUBMITTING CONTACT FORM

const modalForm = document.querySelector('.modal__form');
const modalContainer = document.querySelector('.modal__container')
const btnContact = document.querySelector('.btnContact');
const scriptURL =
    'https://script.google.com/macros/s/AKfycbzH8g-YjC-h_1Z9rz70roy5HpVkgFAaffoj8j0KGOBeubVZPobb1DgDpejIkqyf6_yc/exec'
const form = document.forms['celexport-contact']
const inputName = document.querySelector('.inputName');
const inputCompany = document.querySelector('.inputCompany');
const inputEmail = document.querySelector('.inputEmail');
const inputWhatsapp = document.querySelector('.inputWhatsapp');
const inputSample = document.querySelector('.inputSample');
// const inputMessage = document.querySelector('.inputMessage');

const hideAlert = () => {
    const el = document.querySelector('.alert');

    if (el) el.parentElement.removeChild(el);
};

const showAlert = (type, msg) => {//Alert klo usr salah kasi msuk pass
    hideAlert();

    const markup = `<div class="alert alert--${type}">${msg}</div>`;

    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);

    window.setTimeout(hideAlert, 5000);//hide alert after 5sec
};

form.addEventListener('submit', e => {
    e.preventDefault();
    const spinnerMarkup =
        `
        <div class="spinner">
            <svg>
                <use href="./img/icons.svg#icon-loader"></use>
            </svg>
        </div>
        <h3 class="heading-three">Sending your request...</h3>
        
    `;

    const textMarkup =
        `
        <h3 class="heading-three">Request is succesfully delivered!</h3>
        <h5>Please reload the page for other enquiry</h5>
    `;

    if (!isNaN(inputName.value) || !isNaN(inputCompany.value) || isNaN(inputWhatsapp.value)) return showAlert('error', 'Please input correct data 😕')

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            if (response.ok) return showAlert('success', 'Request is succesfully delivered! 😃');
        })
        .catch(error => {
            return showAlert('error', 'Pesan tidak terkirim 😕, coba beberapa saat lagi!')
        });

    btnContact.textContent = 'Waiting...';

    setTimeout(() => {
        modalForm.innerHTML = '';

        modalForm.style.display = 'flex';
        modalForm.style.flexDirection = 'column';
        modalForm.style.alignItemns = 'center';

        modalForm.insertAdjacentHTML("afterbegin", spinnerMarkup);
    }, 500)

    setTimeout(() => {
        modalForm.innerHTML = '';
        modalForm.insertAdjacentHTML("afterbegin", textMarkup);

    }, 4000);
});

// modalForm.addEventListener('submit', function (e) {
//     e.preventDefault();
//     console.log('click');
//     const spinnerMarkup =
//         `
//         <div class="spinner">
//             <svg>
//                 <use href="./img/icons.svg#icon-loader"></use>
//             </svg>
//         </div>
//         <h3 class="heading-three">Sending your request...</h3>
        
//     `;

//     const textMarkup =
//         `
//         <h3 class="heading-three">Request is succesfully delivered!</h3>
//         <h5>Please reload the page for other enquiry</h5>
//     `;

//     btnContact.textContent = 'Waiting...';

//     setTimeout(() => {
//         modalForm.innerHTML = '';

//         modalForm.style.display = 'flex';
//         modalForm.style.flexDirection = 'column';
//         modalForm.style.alignItemns = 'center';

//         modalForm.insertAdjacentHTML("afterbegin", spinnerMarkup);
//     }, 500)

//     setTimeout(() => {
//         modalForm.innerHTML = '';
//         modalForm.insertAdjacentHTML("afterbegin", textMarkup);

//     }, 4000)
// })