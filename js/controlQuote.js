// import { DOM } from './dom.js';
import View from './viewQuote.js';
import * as Model from './modelQuote.js';


const getQuote = function () {
    //Get all data from dom
    Model.getValues();

    //Calculate FOB
    Model.calcFOB();

    //Animate Spinner
    View.renderSpinner()

};

const renderQuote = function () {
    //Get Data from Model
    const data = Model.sendData();

    //Render Data Quote to using View
    View.renderQuote(data)
};

const init = function () {
    //Animate the grade image
    View.quoteAnimation()
    View.handleBtnForm(getQuote)
    View.handleBtnQuote(renderQuote);
};

init();
