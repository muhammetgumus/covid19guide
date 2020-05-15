import React from 'react';
import { getSummaryData } from '../service/MainService.js'
import { Select } from 'semantic-ui-react'
import { getCurrentDate } from '../utils/Utility.js'
import '../App.css';


class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchbarArr: [],
            currentDate: ''
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.resultClick = this.resultClick.bind(this);
        // this.handleBodyClick =this.handleBodyClick.bind(this);
    }
    resultClick(event){
        document.getElementsByName(event.target.value)[0].scrollIntoView({behavior:"smooth"})
//        document.getElementById(event.target.id).scrollIntoView()
    }


    handleSearch(event) {
        let totalResult = 0;
        let searchbar = document.getElementById('searchbar')
        let container = document.createElement('div');
        container.id = "searchResultsContainer"
        container.style.position = "relative"
        container.style.zIndex = "100"

        if (document.getElementById("searchResults") != null) {
            document.getElementById("searchResults").remove()
        }
        let tableElement = document.createElement('table');
        tableElement.id = "searchResults"
        tableElement.innerHTML = ''
        container.innerHTML = '';

        if (this.state.searchbarArr.length >= 1) {

            for (let element of this.state.searchbarArr) {
                if (element["label"].toLowerCase().includes(event.target.value.toLowerCase())) {
                    if (totalResult != 5) {
                        let tableRow = document.createElement('tr');
                        let tableData = document.createElement('td');
                        tableData.id = Math.ceil(Math.random() * 100)
                        tableData.textContent = element.label;
                        tableData.value = element.label;
                        tableData.title = element.value;
                        tableData.onclick=()=>{this.resultClick(tableData);}
                        //tableData.setAttribute('onclick',"resultClick('" + this + "')");
                        tableRow.appendChild(tableData)
                        tableElement.appendChild(tableRow);
                        container.appendChild(tableElement)
                        searchbar.after(container);
                        totalResult++
                    }
                }
            }

        }
        if (event.target.value == "" || event.target.value == null) {
            container.innerHTML = ''
        }

    }

   

    render() {
        let curr = this.state.currentDate;
        return (
            <div className="card-navbar">
                <div className="clock" >{
                    curr
                }</div>
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

                    let tempArr = []
                  /*  countriesData.forEach(country => {
                        tempArr.push(country.label);
                    })*/
                    tempArr=[...countriesData]
                    this.setState({
                        searchbarArr: [...tempArr]
                    })

                    console.log(this.state.searchbarArr);
                    clearInterval(isArrived)
                }
            }, 500)

        })

    }

    componentDidMount() {
        this.getCountriesFunc();
        this.updateDate = setInterval(() => {
            this.setState({ currentDate: getCurrentDate() })
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.updateDate);
    }
}
export default Navbar;