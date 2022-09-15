//DOM data
// const imageContainer = document.querySelectorAll('.gradeContainer__image');
// const formContainer = document.querySelector('.formContainer')
// const nutmegGrade = document.querySelector('.nutmegGrade');
// const quantity = document.getElementById('quantity');
// const container = document.getElementById('container');
// const incoterms = document.getElementById('incoterms');
// const portDischarge = document.getElementById('portDischarge');
// const country = document.getElementById('country');
// const paymentMethod = document.getElementById('paymentMethod');
// const fullName = document.getElementById('fullName');
// const companyName = document.getElementById('companyName');
// const email = document.getElementById('email');
// const btnQuote = document.getElementById('btnQuote');

// btnQuote.addEventListener('click', function (e) {
//     e.preventDefault();

//     // if (nutmegGrade.textContent === 'Nutmeg') {
//     //     alert('Choose Nutmeg Grade')
//     //     return
//     // };

//     const data = {
//         grade: nutmegGrade.textContent,
//         quantity: quantity.value,
//         container: container.value,
//         incoterms: incoterms.value,
//         country: country.value,
//         portDischarge: portDischarge.value,
//         paymentMethod: paymentMethod.value,
//         fullName: fullName.value,
//         companyName: companyName.value,
//         email: email.value,
//     }

//     console.log(data);
// })

export const DOM = {
    sectionQuote: document.querySelector('.section-quote'),
    sectionSpinner: document.querySelector('.section-spinner'),
    imageContainer: document.querySelectorAll('.gradeContainer__image'),
    formContainer: document.querySelector('.formContainer'),
    formGroupContainer: document.querySelector('.formContainer__group'),
    blanket: document.querySelector('.blanket'),
    overlay: document.querySelector('.overlay'),


    nutmegGrade: document.querySelector('.nutmegGrade'),
    quantity: document.getElementById('quantity'),
    container: document.getElementById('container'),
    incoterms: document.getElementById('incoterms'),
    portDischarge: document.getElementById('portDischarge'),
    country: document.getElementById('country'),
    paymentMethod: document.getElementById('paymentMethod'),
    fullName: document.getElementById('fullName'),
    companyName: document.getElementById('companyName'),
    email: document.getElementById('email'),

    btnQuote: document.getElementById('btnQuote'),
    btnSubmit: document.querySelector('.btnSubmit'),
    btnDownload: document.getElementById('btnDownload'),
};


// const ingredients = ['olives', 'spinach'];

// const orderPizza = setTimeout(function (topping) {
//     console.log('Here is your pizza 🍕');
// }, 5000, ...ingredients);

// if (ingredients.includes('spinach')) clearTimeout(orderPizza);