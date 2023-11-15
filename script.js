import citiesList from "./locations.json" assert {type: 'json'};
import { weather  } from "./weatherLoading.js";

document.addEventListener("DOMContentLoaded", ()=>{
    
    ( async () => {
        console.log(await weather("Berlin,DE"));

    })()
    
    console.log(citiesList);

    const cityInput = document.querySelector('input[name="location"]');
    const selectionList = document.querySelector('.input-choise ul');
    console.log(cityInput);

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
    



})


