 const apiKey ="trnsl.1.1.20200405T192120Z.7a6dd378098e581e.f999c8bf23f873eda464b276367143f92cf10ff2"
 const lang="tr"
 const translateApiEndpoint= `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKey}&lang=${lang}&text=`

 const countryList = [
	"Afghanistan",
	"Albania",
	"Algeria",
	"Andorra",
	"Angola",
	"Anguilla",
	"Antarctica",
	"Antigua and Barbuda",
	"Argentina",
	"Armenia",
	"Aruba",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Bermuda",
	"Bhutan",
	"Bolivia",
	"Bosnia and Herzegovina",
	"Bouvet Island",
	"Brazil",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cabo Verde",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Central African Republic",
	"Chad",
	"Chile",
	"China",
	"Colombia",
	"Congo",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Curaçao",
	"Cyprus",
	"Czechia",
	"Côte d'Ivoire",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Ethiopia",
	"Faroe Islands",
	"Fiji",
	"Finland",
	"France",
	"Gabon",
	"Gambia",
	"Georgia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Greece",
	"Greenland",
	"Grenada",
	"Guadeloupe",
	"Guatemala",
	"Guinea",
	"Guinea-Bissau",
	"Guyana",
	"Haiti",
	"Honduras",
	"Hong Kong",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran",
	"Iraq",
	"Ireland",
	"Isle of Man",
	"Israel",
	"Italy",
	"Jamaica",
	"Japan",
	"Jersey",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"South Korea",
	"North Korea",
	"Kuwait",
	"Kyrgyzstan",
	"Latvia",
	"Lebanon",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Macao",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Mauritius",
	"Mexico",
	"Micronesia",
	"Moldova",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands",
	"New Caledonia",
	"New Zealand",
	"Nicaragua",
	"Niger",
	"Nigeria",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestine",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines",
	"Poland",
	"Portugal",
	"Puerto Rico",
	"Qatar",
	"North Macedonia",
	"Romania",
	"Russia",
	"Rwanda",
	"Samoa",
	"San Marino",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Slovakia",
	"Slovenia",
	"Somalia",
	"South Africa",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan (the)",
	"Suriname",
	"Sweden",
	"Switzerland",
	"Syria",
	"Taiwan",
	"Tajikistan",
	"Tanzania",
	"Thailand",
	"Timor-Leste",
	"Togo",
	"Tokelau",
	"Tonga",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Tuvalu",
	"Uganda",
	"Ukraine",
	"United Arab Emirates",
	"United Kingdom of Great Britain and Northern Ireland",
	"United States Minor Outlying Islands",
	"United States of America",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Venezuela",
	"Vietnam",
	"Yemen",
	"Zambia",
	"Zimbabwe"
];


const countryMap = new Map();
//export let sortedMap= new Map();
export let countryArray= new Array();
//console.log("11asd")
export function translation(){
  //  console.log("asd")
countryList.forEach(countryName=>
    {
       sendRequestToTranslationApi(countryName)
    })
}

const sendRequestToTranslationApi= (textToTranslate) => {
    let url = translateApiEndpoint+textToTranslate;
    fetch(url).then(response => response.json())
	.then(res => {
		console.log(res.text);
		countryMap.set(textToTranslate,res.text)
		//countryArray.push(res.text)
		
	}
	).then(()=>{
		countryArray.sort();
	})
    .catch(e=> alert(e) )

}

translation()
setTimeout(()=>{
	//countryArray= [...new Set(countryArray)]
	/*uniqueArray = a.filter(function(item, pos) {
		return a.indexOf(item) == pos;
	})*/
    countryArray.forEach(country=>{
      //  console.log(country)
        let option= document.createElement('option');
        option.text=country
      //  console.log(option.text)
        option.value=country
        let select= document.getElementById("countries");
        select.appendChild(option);
       
    }
        
        )

},20000)



