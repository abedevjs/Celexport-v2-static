const date = new Date();
const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
};

export const timeout = function (second) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${second} second`));
        }, second * 1000);
    });
};

export const formatNumber = function (number) {
    const options = {
        style: 'currency',
        currency: 'USD'
    }

    const formatted = new Intl.NumberFormat('en-US', options).format(number);
    return formatted
}

export const generateQuoteNumber = () => Math.ceil(Math.random() * 999) + '-' + Math.ceil(Math.random() * 999);

export const generateStartDate = () => new Intl.DateTimeFormat('en-US', options).format(date);
export const generateEndDate = () => new Intl.DateTimeFormat('en-US', options).format(new Date(date.setDate(date.getDate() + 14)));

