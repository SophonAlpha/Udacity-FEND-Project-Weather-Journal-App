const openWeatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const countryCode = 'us';
const apiKey = '710ce5115e1bf7f0431571fdcd110447_____';

function formSubmit() {
    console.log('Form submitted.');
    const ret = getWeather(document.getElementById('zipcode').value);
    console.log('Data returned:')
    console.log(ret);
}

async function getWeather(zipCode) {
    const url = openWeatherBaseUrl + '?zip=' + zipCode + ',' + countryCode + '&appid=' + apiKey;
    const response = await fetch(url);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log('An error occurred:')
        console.log(error);
    }
}
