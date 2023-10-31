const key = "aa9415184f0785232fd417fe89ee3a7e"

async function searchCity(city) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`).then((response) => {
        if (!response.ok) {
            throw new Error('Infelizmente não foi possível obter os dados do clima na cidade ', city)
        }
        return response.json()
    })
    console.log(data)
}

function pressButton() {
    const city = document.querySelector('.input-city').value
    searchCity(city)
}