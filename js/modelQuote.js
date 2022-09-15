import { DOM } from './dom.js';
import * as DATA from './data.js';
import * as HELPER from './helper.js';

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

export const getValues = function () {
    if (DATA.nutmeg.some(nut => nut.initial === DOM.nutmegGrade.textContent))
        quote.curProduct = DATA.nutmeg.find(nut => nut.initial === DOM.nutmegGrade.textContent);

    quote.quantity = DOM.quantity.value;
    quote.container = DOM.container.value;
    quote.incoterms = DOM.incoterms.value;
    quote.portDischarge = DOM.portDischarge.value;
    quote.country = DOM.country.value;
    quote.paymentMethod = DOM.paymentMethod.value;
    quote.fullName = DOM.fullName.value;
    quote.companyName = DOM.companyName.value;
    quote.email = DOM.email.value;

    quote.quoteNumber = `Q${HELPER.generateQuoteNumber()}`;
    quote.validStart = HELPER.generateStartDate();
    quote.validEnd = HELPER.generateEndDate();

    // console.log(quote.curProduct.quantity[quote.container]);

    return quote
}

const currencyConverter = async function () {
    try {
        const apiKey = '1420a6a39a495ad7b144b457';//1420a6a39a495ad7b144b457
        const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/USD/IDR/1`;

        const fetchUrl = await fetch(url);
        const res = await Promise.race([fetchUrl, HELPER.timeout(5)]);

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
        const jumlahKarung = (this.weightKg / DATA.biaya.packing.ukuranKarung) + 10;
        const biayaKarung = jumlahKarung * DATA.biaya.packing.hargaSatuanKarung;
        const biayaKirimKarung = jumlahKarung * DATA.biaya.packing.biayaKirimKarung;

        const biayaTotalKarung = biayaKarung + biayaKirimKarung;

        const jumlahSilica = jumlahKarung * DATA.biaya.packing.hargaSatuanSilica;

        const biayaTotalSilica = jumlahSilica + DATA.biaya.packing.biayaKirimSilica;

        this.packing = biayaTotalKarung + biayaTotalSilica
        console.log(`packing: ${this.packing}`);
        this.localHandling.push(this.packing)

        return this;
    }

    calcInspection() {
        this.inspection = Object.values(DATA.biaya.inspection).reduce((accumulator, value) => accumulator + value, 0);

        console.log(`inspection: ${this.inspection}`);
        this.localHandling.push(this.inspection);

        return this;
    }

    calcDocument() {
        this.document = Object.values(DATA.biaya.document).reduce((accumulator, value) => accumulator + value, 0);

        console.log(`documents: ${this.document}`);
        this.localHandling.push(this.document)
        return this;
    }

    calcCustom() {
        this.custom = Object.values(DATA.biaya.custom).reduce((accumulator, value) => accumulator + value, 0);

        console.log(`custom: ${this.custom}`);
        this.localHandling.push(this.custom)
        return this
    }

    calcLocalFreight() {
        const container = quote.container === 'twentyFCL' ? DATA.biaya.localFreight.container20Feet : DATA.biaya.localFreight.container40Feet;
        const thc = quote.container === 'twentyFCL' ? DATA.biaya.localFreight.THC20Feet : DATA.biaya.localFreight.THC40Feet;

        this.localFreight = DATA.biaya.localFreight.freightSurabaya + container + thc;

        console.log(`local freight: ${this.localFreight}`);
        this.localHandling.push(this.localFreight)

        return this;
    }

    calcTax() {
        this.tax = this.hargaPokok * DATA.biaya.tax.PPH / 100;

        console.log(`tax: ${this.tax}`);

        this.localHandling.push(this.tax)

        return this;
    }

    calcExpenses() {
        this.expenses = Object.values(DATA.biaya.expenses).reduce((accumulator, value) => accumulator + value, 0);

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

        quote.fobUsd = HELPER.formatNumber(this.FOBTotalUSD);
        quote.fobTon = HELPER.formatNumber(this.FOBTon);

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

        // 1. 
        // this.helper.defineCommodity();

        // 2. Berapa Harga di Supplier?
        // this.calcHargaJual();

        // // 3. Hitung leadtime
        // this.calcLeadTime();

        // // 4. Berapa Biaya Packing?
        // this.calcPacking();

        // // 5. Hitung Biaya Inspection dan Sample
        // this.calcInspection();

        // // 6. Hitung Biaya Document
        // this.calcDocument();

        // // 7. Hitung Biaya Custom
        // this.calcCustom();

        // // 8. Hitung Biaya Local Freight
        // this.calcLocalFreight();

        // // 9. Hitung Tax
        // this.calcTax();

        // // 10. Hitung Expenses
        // this.calcExpenses();

        // // 11. Hitung FOB
        // this.calcFOB();
    }

};

export const calcFOB = function () {
    const calculator = new Calculator();
    calculator.computeALL();
};

export const sendData = (() => quote)