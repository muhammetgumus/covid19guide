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

    }
    resultClick(event) {
        document.getElementsByName(event.title.toString())[0].scrollIntoView({ behavior: "smooth" })
        document.getElementById("searchResultsContainer").innerHTML = ''
    }


    handleSearch(event) {
        let totalResult = 0;
        let searchbar = document.getElementById('searchbar')
        let container = document.createElement('div');
        container.id = "searchResultsContainer"
        container.style.position = "relative"
        container.style.width = "75%"
        container.style.display = "inline-block"
        container.style.zIndex = "100"
        if (document.getElementById("searchResults") != null) {
            document.getElementById("searchResultsContainer").remove()
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
                        tableData.onclick = () => { this.resultClick(tableData); }
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
            while(document.getElementById("searchResultsContainer")!=null){
                document.getElementById("searchResultsContainer").remove()
            }
        }
    }

    render() {
        let currentDate = this.state.currentDate;
        return (
            <div className="card-navbar">
                <div className="clock" >{currentDate}</div>
                <h5 className="hashtag">#evdekal #stayhome</h5>
                <input type="text" className="searchbar" /*onFocus={(event) => this.styleNavbar(event)}*/ placeholder="Search Country" id="searchbar" onChange={this.handleSearch}></input>
            </div>
        );
    }

    getCountriesFunc() {
        const countries = getSummaryData();
        countries.then((countriesData) => {
            const isArrived = setInterval(() => {
                if (countriesData !== undefined) {

                    let tempArr = []
                    tempArr = [...countriesData]
                    this.setState({
                        searchbarArr: [...tempArr]
                    })
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