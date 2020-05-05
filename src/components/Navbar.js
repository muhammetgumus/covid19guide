import React from 'react';
import { getSummaryData } from '../service/MainService.js'
import { Select } from 'semantic-ui-react'
import '../App.css';


class Navbar extends React.Component {
    handleSearch() {
        let searchbar = document.getElementById('searchbar')
        let listElement = document.createElement('ul');
        let listItem = document.createElement('li');
        listItem.textContent="DENEME1"
        listItem.value="DENEME2"
        listItem.title="DENEME3"
        searchbar.appendChild(listElement);
        listElement.appendChild(listItem)


    }
    render() {
        return (
            <div className="card-navbar">
                <h5 className="hashtag">#evdekal #stayhome</h5>
                <input type="text" className="searchbar" placeholder="Search the country" id="searchbar" onChange={this.handleSearch}></input>
            </div>
        );


    }


    getCountriesFunc() {
        const countries = getSummaryData();
        countries.then((countriesData) => {

            console.log(countriesData);
            const isArrived = setInterval(() => {
                if (countriesData !== undefined) {
/*
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
                   
*/
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