const openWeatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const countryCode = 'us';
const apiKey = '710ce5115e1bf7f0431571fdcd110447';

function formSubmit() {
    document.getElementById('error-message').classList.add('error-msg--hidden');
    getWeather(
        document.getElementById('zipcode').value,
        document.getElementById('userinput').value,
    );
}

async function getWeather(zipCode, userInput) {
    const url = openWeatherBaseUrl + '?zip=' + zipCode + ',' + countryCode + '&appid=' + apiKey;
    try {
        const response = await fetch(url);
        try {
            const data = await response.json();
            if (data['cod'] === 200) {
                console.log('Response received:')
                postData(zipCode, data, userInput);
                console.log(data);
            } else {
                console.log('An error occurred when retrieving the response:')
                showErrorMessage(data['message']);
            }
        } catch (error) {
            console.log('An error occurred when retrieving the response:')
            console.log(error);
        }
    } catch (error) {
        console.log('An error occurred during the fetch command:')
        console.log(error);
    }
}

function showErrorMessage(errorMessage) {
    const elem = document.getElementById('error-message');
    elem.innerText = 'An error occurred: ' + errorMessage;
    elem.classList.remove('error-msg--hidden');
}

function postData(zipCode, data, userInput) {
    const time = new Date();
    const timeStr =
        time.getFullYear() + '/' +
        (time.getMonth() + 1) + '/' +
        time.getDate() + ' ' +
        time.getHours() + ':' +
        time.getMinutes() + ':' +
        time.getSeconds()
    const postData = {
        date: timeStr,
        zipcode: zipCode,
        city: data.name,
        weather: data.weather[0].main,
        temp: Math.round(data.main.temp / 10) + '&deg;C',
        notes: userInput,
    };
    console.log(postData);
}
