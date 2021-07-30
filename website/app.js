const openWeatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const countryCode = 'us';
const apiKey = '710ce5115e1bf7f0431571fdcd110447';

function main() {
    getData();
}

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
                postData(zipCode, data, userInput);
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

async function postData(zipCode, data, userInput) {
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
    const response = await fetch('/weather', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    });
    try {
        const newData = await response;
        if (newData.status === 200) {
            getData();
        }
    } catch (error) {
        console.log('Error while posting the data:');
        console.log(error);
    }
}

async function getData() {
    const response = await fetch('/weather');
    try {
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.log('An error occurred when retrieving the weather data:')
        console.log(error);
    }
}

function displayData(data) {
    const tableBody = document.getElementById('journal-table-body');
    const tableDoc = document.createDocumentFragment();
    let rowType = 'journal__odd-row';
    for (let [index, item] of data.entries()) {
        let row = document.createElement('tr');
        rowType = (index % 2 === 1) ? 'journal__odd-row' : 'journal__even-row';
        row.classList.add(rowType);
        row.innerHTML = `
            <td>${item['date']}</td>
            <td>${item['zipcode']}</td>
            <td>${item['city']}</td>
            <td>${item['weather']}</td>
            <td>${item['temp']}</td>
            <td>${item['notes']}</td>
            `;
        tableDoc.appendChild(row);
    }
    tableBody.innerHTML = '';
    tableBody.appendChild(tableDoc);
}

// It all starts here.
document.addEventListener('DOMContentLoaded', main);

