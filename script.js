import citiesList from "./locations.json" assert {type: 'json'};
import { weather  } from "./weatherLoading.js";

document.addEventListener("DOMContentLoaded", ()=>{
    
   
    
    const cityInput = document.querySelector('input[name="location"]');
    const selectionList = document.querySelector('.input-choise ul');
    const selectCity = document.querySelector("button.choose");
    const weatherDetails = document.querySelector(".weatherDetails");




    cityInput.addEventListener('keyup', ()=>{
         if ( cityInput.value.length ) {
            selectionList.innerHTML = "";
            citiesList.map(item=>item.location)
                .filter(item=>item.toLowerCase().includes(cityInput.value.toLowerCase()))
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
    })
    

    const fillWeatherDetails= async () => {
        const data = await weather(cityInput.value.trim());
        // const {coord:{lat, lon}, wind:{speed, gust, deg}, weather, 
        //         main:{ temp, temp_min, temp_max, feels_like, grnd_level, 
        //         humidity, pressure, sea_level}, name, timezone, visibility, 
        //         sys:{country, sunrise, sunset, type}} = data;
                
        weatherDetails.innerHTML = `
        <p>City: ${data.name}</p>
        <p>Country: ${data.sys.country}</p>
        <p>Tempreture:
        <ul>
        <li>t<sup>o</sup>: ${data.main.temp}</li>
        <li>t<sup>o</sup><sub>min</sub>: ${data.main.temp_min}</li>
        <li>t<sup>o</sup><sub>max</sub>: ${data.main.temp_max}</li>
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


