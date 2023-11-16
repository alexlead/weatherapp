import citiesList from "./locations.json" assert {type: 'json'};
import { weather  } from "./weatherLoading.js";

document.addEventListener("DOMContentLoaded", ()=>{
    
   
    
    const cityInput = document.querySelector('input[name="location"]');
    const selectionList = document.querySelector('.input-choise ul');
    const selectCity = document.querySelector("button.choose");
    const weatherDetails = document.querySelector(".weatherDetails");

    const getList = () => {

        if ( cityInput.value.length ) {
            selectionList.innerHTML = "";
            citiesList.map(item=>item.location)
                .filter(item=>item.toLowerCase().includes(cityInput.value.trim().toLowerCase()))
                .sort((a, b)=> (a).localeCompare(b))
                .forEach((item, ind)=>{
                    if (ind < 5) {
                        const li = document.createElement('li');
                        li.textContent = item;
                        li.addEventListener('click', (e)=>{
                            cityInput.value = e.target.textContent;
                        })
                        selectionList.appendChild(li)
                    }
                })

         }
    }



    cityInput.addEventListener('keyup', ()=>{
        getList();
    })

    cityInput.addEventListener('focus', ()=>{
        getList();
    })
    

    const fillWeatherDetails= async () => {
        const data = await weather(cityInput.value.trim());
        // const {coord:{lat, lon}, wind:{speed, gust, deg}, weather, 
        //         main:{ temp, temp_min, temp_max, feels_like, grnd_level, 
        //         humidity, pressure, sea_level}, name, timezone, visibility, 
        //         sys:{country, sunrise, sunset, type}} = data;
        
        const sunrise = new Date(data.sys.sunrise * 1000 );
        const sunset = new Date(data.sys.sunset * 1000 );
        
        console.log(data.weather[0].main);
        console.log(data.weather[0].description);

        weatherDetails.innerHTML = `
        <p class="loc"><b>City</b>: ${data.name}, <b>Country</b>: ${data.sys.country}</p>
        <p class="weat"><b>Weather</b>: ${data.weather[0].main}, <b>Description</b>: ${data.weather[0].description}</p>
        <p class="sun"><b>Sunrise</b>: ${sunrise.toTimeString()}, <b>Sunset</b>: ${sunset.toTimeString()}</p>
        <p class="tempreture"><b>Tempreture</b>:
        <ul>
        <li><b>t<sup>o</sup></b>: ${data.main.temp}<sup>o</sup>C</li>
        <li><b>t<sup>o</sup><sub>min</sub></b>: ${data.main.temp_min}<sup>o</sup>C, <b>t<sup>o</sup><sub>max</sub></b>: ${data.main.temp_max}<sup>o</sup>C</li>
        </ul>
        </p>
        <p><b>Humidity</b>: ${data.main.humidity}%</p>
        <p><b>Pressure</b>: ${data.main.pressure}hPa</p>
        <p class="wind"><b>Wind</b>:
        <ul>
        <li><b>Speed</b>: ${data.wind.speed}m/s</li>
        <li><b>Direction</b>: ${data.wind.deg}<sup>o</sup></li>
        </ul>
        </p>
        `;
        
    }
    
    selectCity.addEventListener('click', ()=>{

        if( citiesList.map(item=>item.location).includes(cityInput.value.trim()) ) {
            
            weatherDetails.innerHTML = ""

            fillWeatherDetails();
        }
    })

})


