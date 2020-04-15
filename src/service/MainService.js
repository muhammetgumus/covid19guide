import {countryList} from '../static/staticData.js'

export function getSummaryData(){
  const result=  fetch("https://api.covid19api.com/summary")
    .then(response=>response.json())
    .then(res=>{
        return res
    })
    .then((res)=>{
       let countryCodes = []
        res.Countries.forEach(country => {
            countryCodes.push(country.CountryCode);
        
        })
        return countryCodes;
    }).then((countryCodes)=>{
        let availableCountries=[]
        countryCodes.forEach((countryCode)=>{
            countryList.forEach((countryObject)=>{
                if(countryObject.value===countryCode){   
                    console.log(countryObject);
                    availableCountries.push(countryObject)
                  }
            })
        })
        return availableCountries;
    })
    .then(availableCountries=>{
        console.log("AVAILABLE COUNTRIES")
        console.log(availableCountries)
        return availableCountries;
      
    })
    return result;

}

export default function summaryData(){
    const result=  fetch("https://api.covid19api.com/summary")
    .then(response=>response.json())
    .then(res=>{
        return res
    })

}