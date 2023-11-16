import { appid } from "./setting.js";

export const weather = async (city) => {
    const baseURL = "https://api.openweathermap.org/data/2.5/weather";
    const options = {appid: appid,  dt: 'UTC', timezone: 'UTC', units: "metric", lang: "en" , q: city};
    let url = new URL(baseURL);

    Object.keys(options).forEach(key=>{
        url.searchParams.append(key, options[key]);
    })
    const weatherData = async () => {
        try{
            const resp = await fetch(url.toString()).then(res=> res.json());
            return resp;
        } catch (err) {
            console.log(err)
        }
    }

    return await weatherData();

}