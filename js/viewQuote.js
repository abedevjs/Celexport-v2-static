import { DOM } from './dom.js';

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

        // setTimeout(() => {
        //     DOM.sectionQuote.innerHTML = '';
        //     DOM.sectionSpinner.style.height = '80vh'
        // }, 1000)

        // setTimeout(() => {
        //     DOM.blanket.classList.remove('displayNone');
        // }, 2000);

        // setTimeout(() => {
        //     this.renderBtnQuote()
        // }, 4000)

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

export default new View();//This is how we exporting only the instances, not the entire class
