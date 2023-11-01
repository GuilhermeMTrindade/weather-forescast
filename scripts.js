const key = "aa9415184f0785232fd417fe89ee3a7e"
let weatherId = null;

function showData(data) {
    weatherText = data.list[0].weather[0].description
    document.querySelector(".city-name").innerHTML = "Tempo em " + data.city.name
    document.querySelector(".temperature").innerHTML = parseInt(data.list[0].main.temp) + " °C"
    document.querySelector(".weather-text").innerHTML = weatherText.charAt(0).toUpperCase() + weatherText.slice(1)
    document.querySelector(".humidity").innerHTML = "Umidade: " + data.list[0].main.humidity + "%"
    modifyIconWeather(weatherId)
    console.log(data.list[0].weather[0].description)
    console.log(data)
}

function modifyWeatherIcon(){}

async function searchCity(city) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`).then((response) => {

        if (!response.ok) {
            throw new Error('Infelizmente não foi possível obter os dados do clima na cidade ', city)
        }
        return response.json()
    })
    weatherId = data.list[0].weather[0].id
    modifyBackground(weatherId)
    showData(data)
}

function pressButton() {
    const city = document.querySelector('.input-city').value
    searchCity(city)
}

function modifyBackground(weatherId) {
    const body = document.body
    const patternBackground = 'url(https://images.unsplash.com/photo-1698507961128-0959d8289d39?auto=format&fit=crop&q=80&w=2130&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
    const backgroundMap = {
        500: 'url(https://usagif.com/wp-content/uploads/rainy-21.gif)',
        803: 'url(https://media.tenor.com/CGcuuOfxRawAAAAd/peaceful-destination-wild.gif)',
        800: 'url(https://im3.ezgif.com/tmp/ezgif-3-e7139a622e.gif)'
    }

    const backgroundImage = backgroundMap[weatherId]

    if (backgroundImage) {
        body.style.backgroundImage = backgroundImage
    } else {
        body.style.backgroundImage = patternBackground
    }
} 

function modifyIconWeather(weatherId){
    const icon = document.querySelector('.icon-weather')
    const iconMap = {
        500: '/cloud-rain-icon.png',
        803: '/cloud-icon.png',
        800: '/sun-icon.png'
    }
    iconWeather = iconMap[weatherId]
    if(iconWeather){
        icon.src = iconWeather
    }
}