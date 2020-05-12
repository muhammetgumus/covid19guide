import { countryList } from '../static/staticData.js'

export function getSummaryData() {
    const result = fetch("https://api.covid19api.com/summary")
        .then(response => response.json())
        .then(res => {
            return res
        })
        .then((res) => {
            let countryCodes = []
            res.Countries.forEach(country => {
                countryCodes.push(country.CountryCode);

            })
            return countryCodes;
        }).then((countryCodes) => {
            let availableCountries = []
            countryCodes.forEach((countryCode) => {
                countryList.forEach((countryObject) => {
                    if (countryObject.value === countryCode) {
                        console.log(countryObject);
                        availableCountries.push(countryObject)
                    }
                })
            })
            return availableCountries;
        })
        .then(availableCountries => {
            console.log("AVAILABLE COUNTRIES")
            console.log(availableCountries)
            return availableCountries;

        })
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
            "CountryCode": response[0].Country,
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

