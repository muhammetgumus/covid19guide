import React from 'react';
import { getSummaryData } from '../service/MainService.js'
import { Select } from 'semantic-ui-react'
import '../App.css';


class Navbar extends React.Component {

    render() {
        const arrTry = [{ text: 'Turkey', value: 'TR' }, { text: 'USA', value: 'USA' }]
        const countryOptions = [
            { key: 'af', value: 'af', text: 'Afghanistan' },
            { key: 'ax', value: 'ax', text: 'Aland Islands' },
            { key: 'al', value: 'al', text: 'Albania' },
            { key: 'dz', value: 'dz', text: 'Algeria' },
            { key: 'as', value: 'as', text: 'American Samoa' },
            { key: 'ad', value: 'ad', text: 'Andorra' },
            { key: 'ao', value: 'ao', text: 'Angola' },
            { key: 'ai', value: 'ai', text: 'Anguilla' },
            { key: 'ag', value: 'ag', text: 'Antigua' },
            { key: 'ar', value: 'ar', text: 'Argentina' },
            { key: 'am', value: 'am', text: 'Armenia' },
            { key: 'aw', value: 'aw', text: 'Aruba' },
            { key: 'au', value: 'au', text: 'Australia' },
            { key: 'at', value: 'at', text: 'Austria' },
            { key: 'az', value: 'az', text: 'Azerbaijan' },
            { key: 'bs', value: 'bs', text: 'Bahamas' },
            { key: 'bh', value: 'bh', text: 'Bahrain' },
            { key: 'bd', value: 'bd', text: 'Bangladesh' },
            { key: 'bb', value: 'bb', text: 'Barbados' },
            { key: 'by', value: 'by', text: 'Belarus' },
            { key: 'be', value: 'be', text: 'Belgium' },
            { key: 'bz', value: 'bz', text: 'Belize' },
            { key: 'bj', value: 'bj', text: 'Benin' },
          ]
        return (
        <div>
            <div id="navbar">
               
                <select id="countries">
                </select>
             
            </div>
            <br></br>
            <br></br>
                    <input type="text" width="100%" className="searchbar" placeholder="Search the country" id ="searchbar"></input>
            </div>
        );


    }








    getCountriesFunc() {
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

    componentDidMount() {
        this.getCountriesFunc();


    }

}





export default Navbar;