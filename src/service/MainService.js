import { countryList } from '../static/staticData.js'

export function getSummaryData() {
    const result = fetch("https://api.covid19api.com/summary")
        .then(response => response.json())
        .then(res => {
            return res
        })
        .then((res) => {
            //let countryCodes = []
            let countries = []
            res.Countries.forEach(country => {
               // countryCodes.push(country.CountryCode);
                countries.push(country);

            })
            return countries;
        })/*.then((countryCodes) => {
            let availableCountries = []
            countryCodes.forEach((countryCode) => {
                countryList.forEach((countryObject) => {
                    if (countryObject.value === countryCode) {
                        //console.log(countryObject);
                        availableCountries.push(countryObject)
                    }
                })
            })
            return availableCountries;
        })*/

    return result;

}
export async function getCoordinates(countryCode) {
    let result = await fetch(`https://api.covid19api.com/dayone/country/${countryCode}/status/confirmed`)
    let country = await result.json()
    country = await country[0];
    return { "Lon": country.Lon, "Lat": country.Lat }

}

export  async function getSummaryByCountry(countryCode) {
    
        const coordinates = await getCoordinates(countryCode);
        const country = await fetch(`https://api.covid19api.com/total/country/${countryCode}/status/confirmed`)
        const response = await country.json();
        const countryResult = {
            "Country": response[0].Country,
            "CountryCode": countryCode,
            "Lat": coordinates.Lat,
            "Lon": coordinates.Lon,
            "Cases": response[response.length - 1].Cases,
            "Status": "confirmed",
            "Date": response[response.length - 1].Date
        }
        return countryResult
}


export default async function summaryData() {
    const result = await fetch("https://api.covid19api.com/summary")
    const json = await result.json();
    const finalResult = await json;
    return finalResult;
}

export async function getUserCountry(coordinates){
    const options = {
        "Access-Control-Allow-Origin":true
    }
    const result = await fetch(`https://geocode.xyz/${coordinates}?geoit=JSON`,options)
    
    const parsedResult= await result.json()
    const countryCode = await parsedResult.prov;
    return await countryCode;
}

export const userCountry = new Promise((resolve,reject)=>{
    if(window.navigator.geolocation){
        window.navigator.geolocation.getCurrentPosition((position) => {
            const coordinates=String(position.coords.latitude).substring(0,5)+","+
            String(position.coords.longitude).substring(0,5)
            resolve(getUserCountry(coordinates));
    })
    }else{
        reject("Error occured while getting location")
    }
})
