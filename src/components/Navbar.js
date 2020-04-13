import React from 'react';
import { getSummaryData } from '../service/MainService.js'


function Navbar() {
    const countries = getSummaryData();
    countries.then((countriesData) => {

        console.log(countriesData);
        const isArrived = setInterval(() => {
            if (countriesData !== undefined) {

                console.log("IN NAVBARRRRR " + countries)
                countriesData.forEach(country => {
                    let selection = document.getElementById("countries")
                    let option = document.createElement('option')
                    option.text = country
                    option.name = country
                    selection.appendChild(option);
                })
                clearInterval(isArrived)

            }
        }, 2000)




    })


    return (

        <div id="navbar">
            <select id="countries">
                {

                }
            </select>

        </div>
    );









}

export default Navbar;