//DOM
const DOM = {
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

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
//DATA
const nutmeg = [
    {
        initial: 'ABCD',
        name: 'Shelled Nutmeg ABCD',
        quality: 'Grade: ABCD | Shape: Whole Around | Seed Count: 200 - 220 @ 1Kg | Moisture: <10% | Aflatoxin B1: <5 μg/kg',
        hsCode: '090811',
        origin: 'Maluku',
        pol: 'Surabaya',
        quantity: {
            ton: 1000,
            twentyFCL: 14000,
            fourtyFCL: 23000
        },
        pack: 'Gunny Bag, 50 Kg',
        price: 120000,//per Rp per Kg
        margin: 0.075,
        leadTime: 2.2
    },
    {
        initial: 'SS',
        name: 'Shelled Nutmeg SS',
        quality: 'Grade: SS | Shape: Not Whole Around, Shrivelled | Moisture: <10% | Aflatoxin B1: <5 μg/kg',
        hsCode: '090811',
        origin: 'Maluku ',
        pol: 'Surabaya',
        quantity: {
            ton: 1000,
            twentyFCL: 13000,
            fourtyFCL: 22000
        },
        pack: 'Gunny Bag, 50 Kg',
        price: 95000,//per Kg
        margin: 0.075,
        leadTime: 2.5
    },
    {
        initial: 'BWP',
        name: 'Shelled Nutmeg BWP',
        quality: 'Grade: BWP | Shape: Broken, Punctured | Moisture: <13%',
        hsCode: '090811',
        origin: 'Maluku',
        pol: 'Surabaya',
        quantity: {
            ton: 1000,
            twentyFCL: 13000,
            fourtyFCL: 22000
        },
        pack: 'Gunny Bag, 50 Kg',
        price: 72000,//per Kg
        margin: 0.075,
        leadTime: 2.4
    }
];

const biaya = {
    packing: {
        hargaSatuanKarung: 13000,
        ukuranKarung: 50,
        biayaKirimKarung: 10000, //per kg
        hargaSatuanSilica: 2500,
        biayaKirimSilica: 250000
    },

    inspection: {
        biayaParameterAnalysis: 2500000,
        biayaLoadingSurveyReport: 2500000,
        biayaSample: 3500000
    },

    document: {
        BiayaCertificateOrigin: 350000,
        BiayaCertificatePhytosanitary: 1500000,
        BiayaCertificateFumigation: 2100000,
    },

    custom: {
        biayaCustomClearance: 1000000,
        biayaPEB: 500000,
        biayaTruckingSBY: 2500000,
        biayaRework: 2125000,
        biayaLOLO: 1250000,
        biayaSewaGudang: 1000000,
        biayaEmergencyCost: 8000000
    },

    localFreight: {
        freightSurabaya: 6000000,
        THC20Feet: 2600000,
        THC40Feet: 4200000,
        container20Feet: 2000000,
        container40Feet: 4000000
    },

    tax: {
        PPH: 25 / 100
    },

    expenses: {
        BiayaTiketPesawatPP: 0,
        BiayaTransportasiLokalPP: 500000 * 2,
        BiayaPenginapan: 0 * 7,
        BiayaMealPerDay: 35000 * 30,
        BiayaPulsa: 0
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

const date = new Date();
const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
};

const timeout = function (second) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${second} second`));
        }, second * 1000);
    });
};

const formatNumber = function (number) {
    const options = {
        style: 'currency',
        currency: 'USD'
    }

    const formatted = new Intl.NumberFormat('en-US', options).format(number);
    return formatted
};

const generateQuoteNumber = () => Math.ceil(Math.random() * 999) + '-' + Math.ceil(Math.random() * 999);

const generateStartDate = () => new Intl.DateTimeFormat('en-US', options).format(date);
const generateEndDate = () => new Intl.DateTimeFormat('en-US', options).format(new Date(date.setDate(date.getDate() + 14)));

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
//MODEL
const quote = {
    quoteNumber: '',
    validStart: '',
    validEnd: '',
    quantity: '',
    weightTon: '',
    container: '',
    leadTime: '',
    incoterms: '',
    portDischarge: '',
    country: '',
    paymentMethod: '',
    fullName: '',
    companyName: '',
    email: '',
    kurs: '',
    curProduct: '',
    fobRp: '',
    fobUsd: '',
    fobTon: '',
};

const getValues = function () {
    if (nutmeg.some(nut => nut.initial === DOM.nutmegGrade.textContent))
        quote.curProduct = nutmeg.find(nut => nut.initial === DOM.nutmegGrade.textContent);

    quote.quantity = DOM.quantity.value;
    quote.container = DOM.container.value;
    quote.incoterms = DOM.incoterms.value;
    quote.portDischarge = DOM.portDischarge.value;
    quote.country = DOM.country.value;
    quote.paymentMethod = DOM.paymentMethod.value;
    quote.fullName = DOM.fullName.value;
    quote.companyName = DOM.companyName.value;
    quote.email = DOM.email.value;

    quote.quoteNumber = `Q${generateQuoteNumber()}`;
    quote.validStart = generateStartDate();
    quote.validEnd = generateEndDate();

    // console.log(quote.curProduct.quantity[quote.container]);

    return quote
}

const currencyConverter = async function () {
    try {
        const apiKey = '1420a6a39a495ad7b144b457';//1420a6a39a495ad7b144b457
        const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/USD/IDR/1`;

        const fetchUrl = await fetch(url);
        const res = await Promise.race([fetchUrl, timeout(5)]);

        const data = await res.json();

        if (data.result === "error") return quote.kurs = 14364;
        // if (data.result === "error") return console.log(quote.kurs = 14364);

        quote.kurs = +data.conversion_result.toFixed(0) - 80;

    } catch (error) {
        return quote.kurs = 14364;
        // return console.log(quote.kurs = 14364);
    }
};

class Calculator {

    weightKg;
    weightTon;
    hargaPokok;
    hargaJual;
    leadTime;
    packing;
    inspection;
    document;
    custom;
    localFreight;
    tax;
    expenses;
    FOBTotalRupiah;
    FOBTotalUSD;
    FOBTon;
    localHandling = [];

    constructor() { }

    calcHargaJual() {//(harga pokok + margin) * kg
        this.weightKg = quote.curProduct.quantity[quote.container];

        if (Number(quote.quantity === 1)) this.weightTon = this.weightKg / 1000; //14000/1000, 23000/1000
        else this.weightTon = (Number(quote.quantity) * this.weightKg) / 1000;//2 * 14000/1000, 3 * 23000/1000

        quote.weightTon = this.weightTon;

        // let price = '';//Klo pesanan 14 ton atau 1x20 = harga normal. tp klo diatas 14 ton atau 1x40 = harga diskon
        let totalMargin = '';



        // this.weightTon <= 14 ? price = quote.curProduct.price : price = quote.curProduct.price - 1500;//120.000 atau 118.500
        totalMargin = (quote.curProduct.margin * quote.curProduct.price) * this.weightKg;//(0.08*120.000) * 14000kg

        this.hargaPokok = quote.curProduct.price * this.weightKg;//120.000*14000kg
        this.hargaJual = totalMargin + this.hargaPokok;//108.000.000 + 1.260.000.000

        console.log(`Kg: ${this.weightKg}, Ton: ${this.weightTon}, Hrg Pokok: ${this.hargaPokok}, Hrg Jual: ${this.hargaJual}`);

        return this;
    }

    calcLeadTime() {
        this.leadTime = Math.ceil(quote.curProduct.leadTime * this.weightTon);
        quote.leadTime = this.leadTime;
        console.log(`leadtime: ${this.leadTime}`);

        return this
    }

    calcPacking() {
        const jumlahKarung = (this.weightKg / biaya.packing.ukuranKarung) + 10;
        const biayaKarung = jumlahKarung * biaya.packing.hargaSatuanKarung;
        const biayaKirimKarung = jumlahKarung * biaya.packing.biayaKirimKarung;

        const biayaTotalKarung = biayaKarung + biayaKirimKarung;

        const jumlahSilica = jumlahKarung * biaya.packing.hargaSatuanSilica;

        const biayaTotalSilica = jumlahSilica + biaya.packing.biayaKirimSilica;

        this.packing = biayaTotalKarung + biayaTotalSilica
        console.log(`packing: ${this.packing}`);
        this.localHandling.push(this.packing)

        return this;
    }

    calcInspection() {
        this.inspection = Object.values(biaya.inspection).reduce((accumulator, value) => accumulator + value, 0);

        console.log(`inspection: ${this.inspection}`);
        this.localHandling.push(this.inspection);

        return this;
    }

    calcDocument() {
        this.document = Object.values(biaya.document).reduce((accumulator, value) => accumulator + value, 0);

        console.log(`documents: ${this.document}`);
        this.localHandling.push(this.document)
        return this;
    }

    calcCustom() {
        this.custom = Object.values(biaya.custom).reduce((accumulator, value) => accumulator + value, 0);

        console.log(`custom: ${this.custom}`);
        this.localHandling.push(this.custom)
        return this
    }

    calcLocalFreight() {
        const container = quote.container === 'twentyFCL' ? biaya.localFreight.container20Feet : biaya.localFreight.container40Feet;
        const thc = quote.container === 'twentyFCL' ? biaya.localFreight.THC20Feet : biaya.localFreight.THC40Feet;

        this.localFreight = biaya.localFreight.freightSurabaya + container + thc;

        console.log(`local freight: ${this.localFreight}`);
        this.localHandling.push(this.localFreight)

        return this;
    }

    calcTax() {
        this.tax = this.hargaPokok * biaya.tax.PPH / 100;

        console.log(`tax: ${this.tax}`);

        this.localHandling.push(this.tax)

        return this;
    }

    calcExpenses() {
        this.expenses = Object.values(biaya.expenses).reduce((accumulator, value) => accumulator + value, 0);

        console.log(`expenses: ${this.expenses}`);

        this.localHandling.push(this.expenses)

        return this;
    }

    async calcFOB() {
        const totalLocalHandling = this.localHandling.reduce((accumulator, value) => accumulator + value, 0);

        if (this.weightKg === 1) this.FOBTotalRupiah = this.hargaJual + totalLocalHandling;
        else this.FOBTotalRupiah = (this.hargaJual + totalLocalHandling) * Number(quote.quantity);
        quote.fobRp = this.FOBTotalRupiah;

        await currencyConverter();

        this.FOBTotalUSD = Math.abs(this.FOBTotalRupiah / quote.kurs);
        this.FOBTon = Math.round(Number(this.FOBTotalUSD) / this.weightTon);

        quote.fobUsd = formatNumber(this.FOBTotalUSD);
        quote.fobTon = formatNumber(this.FOBTon);

        // console.log(`kurs: ${quote.kurs}, fob rp: ${this.FOBTotalRupiah}, fob usd: ${this.FOBTotalUSD}, fob ton: ${quote.fobTon}`);

        return this;
    }

    computeALL() {
        this.calcHargaJual()
            .calcLeadTime()
            .calcPacking()
            .calcInspection()
            .calcDocument()
            .calcCustom()
            .calcLocalFreight()
            .calcTax()
            .calcExpenses()
            .calcFOB()
    }
};

const calcFOB = function () {
    const calculator = new Calculator();
    calculator.computeALL();
};

const sendData = (() => quote)

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
//VIEW
class View {
    data
    constructor() {
        // this.quoteAnimation();
    }

    quoteAnimation() {
        DOM.imageContainer.forEach((image, i, arr) => image.addEventListener('click', function (e) {
            //De-select the unpicked grade / matching strategy
            const arrNodeList = Object.values(arr).filter((val) => val !== image);

            //Add effect to the unpicked grade
            arrNodeList.forEach(el => {
                image.classList.remove('capture')
                el.classList.add('capture')
            });

            // DOM.formContainer.classList.remove('displayNone');
            DOM.formContainer.style.display = 'grid';

            //Select the picked grade
            const alt = e.target.getAttribute('alt')
            if (!alt) return;
            DOM.nutmegGrade.textContent = `${alt}`
        }));
    }

    handleBtnForm(handler) {
        DOM.formContainer.addEventListener('submit', function (e) {
            e.preventDefault();
            handler()
        })
    }

    handleBtnQuote(handler) {
        DOM.blanket.addEventListener('click', function (e) {
            e.preventDefault();
            const btn = e.target.closest('.btnQuote');
            if (!btn) return

            handler()
        })
    }

    renderSpinner() {
        DOM.btnSubmit.textContent = 'Waiting...'

        setTimeout(() => {
            DOM.blanket.classList.remove('hidden')
            DOM.overlay.classList.remove('hidden')
            // DOM.sectionQuote.innerHTML = '';
            // DOM.sectionSpinner.style.height = '80vh'
        }, 1000)

        setTimeout(() => {
            DOM.sectionQuote.innerHTML = '';
            this.renderBtnQuote()
        }, 4000);
    }

    renderBtnQuote() {
        const markup =
            `
            <h2 class="heading-two margin-bottom-medium">Your Quote is ready</h2>
            <button class="btnMain btnMain__green btnQuote"">See Price</button>
        `
        // DOM.sectionSpinner.innerHTML = '';
        // DOM.sectionSpinner.insertAdjacentHTML("afterbegin", markup)


        DOM.blanket.innerHTML = '';
        DOM.blanket.insertAdjacentHTML("afterbegin", markup)
    }

    renderQuote(data) {
        this.data = data;

        const markup = `
        <div class="quoteSummary" id="quoteSummary">
            <h3 class="heading-three">QUOTATION</h3>
            <h2 class="heading-two margin-bottom-medium">Thank you for your enquiry</h2>
                
            <div class="quoteSummary__content"> 
                <div class="quoteLeft">
                    <div class="quoteLeft__list quoteLeft__list--1">
                        <p> Dear <b>${this.data.fullName}</b>,<br><br>
                        Celexport is pleased to make you the following offer, for which please find our further details below.</p>
                        <br>
                        <p> Quote Number: <b>${this.data.quoteNumber}</b><br>
                        <p> Offer expires At: <b>${this.data.validEnd}</b><br>
                        <br>
                        Our quotation is valid until the above mentioned offer expiry date. We reserve the right to review and re-quote, if we do not receive
                        any acceptance confirmation, prior to above mentioned offer expiry date.</p>
                    </div>
                    <div class="quoteLeft__list quoteLeft__list--2">
                        <h5 class="heading-five highlight">Product Information</h5>
                        <ul>
                            <li>Name: <b>${this.data.curProduct.name}</b></li>
                            <li>Origin: <b>Maluku Islands, Indonesia</b></li>
                            <li>HS Code: <b>${this.data.curProduct.hsCode}</b></li>
                            <li>Quality: <a href="#"><b><em>See Product Catalog</em></b></a></li>
                            <li>Loading Plan: <b>${this.data.quantity} x ${this.data.container === 'twentyFCL' ? '20ft FCL' : '40ft FCL'}</b></li>
                            <li>Total Quantity: <b>${this.data.weightTon} Metric Tons</b></li>
                            <li>Est. Lead Time: <b>${this.data.leadTime} days</b> <em>(after payment is confirmed)</em></li>
                            <li>Packing: <b>Gunny Bag, 50 Kg</b></li>
                        </ul>
                    </div>
                    <div class="quoteLeft__list quoteLeft__list--3">
                        <h5 class="heading-five highlight">Documents</h5>
                        <ul>
                            <li>${this.data.incoterms === 'FOB' ? '' : 'Bill of Lading'}</li>
                            <li>Invoice</li>
                            <li>Packing List</li>
                            <li>Certificate of Origin</li>
                            <li>Certificate of Phytosanitary</li>
                            <li>Certificate of Fumigation</li>
                            <li>Report of Analysis</li>
                            <li>Loading Survey Report</li>
                            <li>${this.data.incoterms === 'CIF' ? 'Insurance Policy' : ''}</li>
                        </ul>
                    </div>
                        <div class="quoteLeft__list quoteLeft__list--4">
                            <h5 class="heading-five highlight">Payment Method</h5>
                        <ul>
                            <li><b>${this.data.paymentMethod === 'LC' ? '100% Irrevocable Letter of Credit' : '100% Cash Against Document'}</b></li>
                        </ul>
                    </div>
                    <div class="quoteLeft__list quoteLeft__list--5">
                        <h5 class="heading-five highlight">Price Information</h5>
                        <div class="quotePriceList">
                            <div class="quotePriceList__fob">
                                <h4>FOB Surabaya, Indonesia</h4>
                                <p>per MT: <span class="quotePriceList__fob--numbers highlight">${this.data.fobTon}</span></p>
                                <p>Total: <span class="quotePriceList__fob--numbers highlight">${this.data.fobUsd}</span></p>
                            </div>
                            <div class="quotePriceList__cfr ${this.data.incoterms === 'CIF' || this.data.incoterms === 'FOB' ? 'displayNone' : ''}">
                                <h4>CFR ${this.data.portDischarge}, ${this.data.country}</h4>
                                <p class="quotePriceList__cfr--numbers">Due to frequent freight rates change, we will send this request to: <em class= "highlight">${this.data.email}</em> in less than 24 hours.</p>
                            </div>
                            <div class="quotePriceList__cif ${this.data.incoterms === 'CFR' || this.data.incoterms === 'FOB' ? 'displayNone' : ''}">
                                <h4>CIF ${this.data.portDischarge}, ${this.data.country}</h4>
                                <p class="quotePriceList__cif--numbers">Due to frequent freight rates change, we will send this request to: <em class= "highlight">${this.data.email}</em> in less than 24 hours.</p>
                            </div>
                        </div>
                    </div>

                    <div class="quoteCTA">
                        <p>For more quote request please <a href='/quote'><em>reload</em></a>  this page. <br> If you want to proceed further with this offer or have any other enquiries, kindly to contact me.</p>
                        <div class="quoteCTA__box">
                            <img src="./img/abe.png" alt="Muhammad Akbar"  class="founder__photo">
                            <div class="quoteCTA__box quoteCTA__box--text">
                                <span>Muhammad Akbar</span>
                                <span class="highlight">Managing Director</span>
                            </div>
                            <div class="quoteCTA__box quoteCTA__box--icon">
                                <a href="mailto:akbar@celexport.com" target="_blank">
                                    <svg class="social__icon social__icon--email">
                                        <use xlink:href="./img/social.svg#email"></use>
                                    </svg>  
                                </a>
                                <a href="https://wa.me/6283138256440?text=Hello%20Celexport!" target="_blank">
                                    <svg class="social__icon social__icon--whatsapp">
                                        <use xlink:href="./img/social.svg#whatsapp-3"></use>
                                    </svg>
                                </a>
                                <a href="https://linkedin.com/company/celexport" target="_blank">
                                    <svg class="social__icon social__icon--linkedin">
                                        <use xlink:href="./img/social.svg#linkedin"></use>
                                    </svg>   
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="quoteRight">
                    <img src="./img/${this.data.curProduct.initial}.png" alt="quoteRight image">
                    <div class="quoteRight quoteRight--text">
                        <p>Quote Number: <b>${this.data.quoteNumber}</b></p>
                        <p>Valid from: <b>${this.data.validStart}</b></p>
                        <p>Valid until: <b>${this.data.validEnd}</b></p>
                    </div>
                    <div class="quoteRight quoteRight--button">
                        <!-- <p>Send your Quote to <b>FILLING{emaCon.value}</b> ?</p> -->
                        <button class="btnSubmit" id="btnDownload">Save Quotation</button>
                    </div>
                </div>
            </div>
        </div>
        `
        // DOM.sectionSpinner.innerHTML = '';
        // DOM.sectionSpinner.insertAdjacentHTML('afterbegin', markup);


        DOM.blanket.classList.add('hidden')
        DOM.overlay.classList.add('hidden')

        // DOM.sectionQuote.innerHTML = '';
        DOM.sectionQuote.insertAdjacentHTML('afterbegin', markup);
    }

};
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
//CONTROL
const getQuote = function () {
    const view = new View();

    //Get all data from dom
    getValues();

    //Calculate FOB
    calcFOB();

    //Animate Spinner
    view.renderSpinner();

};

const renderQuote = function () {
    const view = new View();

    //Get Data from Model
    const data = sendData();

    //Render Data Quote to using View
    view.renderQuote(data);
};

const init = function () {
    const view = new View();

    //Animate the grade image
    view.quoteAnimation()
    view.handleBtnForm(getQuote)
    view.handleBtnQuote(renderQuote);
};

init();