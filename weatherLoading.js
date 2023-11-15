export const weather = async (city) => {
    const baseURL = "https://api.openweathermap.org/data/2.5/weather";
    const options = {appid:"15c1c544d3749b242156047033c2f5c8",  dt: 'UTC', timezone: 'UTC' , q: city};
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