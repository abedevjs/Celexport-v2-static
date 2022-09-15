/////////////////////////////////////////////////////////////////////////////////
//DATA
export const nutmeg = [
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

export const biaya = {
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