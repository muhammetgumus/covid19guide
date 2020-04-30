import React from 'react';
import { getSummaryData } from '../service/MainService.js'


class Navbar extends React.Component {


    render(){
return (

        <div id="navbar">
            <select id="countries">
            </select>

        </div>
    );


    }

    


    



getCountriesFunc(){
    const countries = getSummaryData();
        countries.then((countriesData) => {
      
        // console.log(countriesData);
         const isArrived = setInterval(() => {
             if (countriesData !== undefined) {
 
                 //console.log("IN NAVBARRRRR " + countries)
                 let selection = document.getElementById("countries")
                 countriesData.forEach(country => {
                     
                     let option = document.createElement('option')
                     option.text = country.label
                     option.name = country.value
                     selection.appendChild(option);
                 })
                 console.log("AFTERR")
                 console.log(selection.childNodes);
                 clearInterval(isArrived)
 
             }
         }, 20000)
 
 
 
 
     })

   



}

componentDidMount(){
    this.getCountriesFunc();


 }

}





export default Navbar;