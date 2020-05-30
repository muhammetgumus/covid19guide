import React from 'react';
import { getSummaryData } from '../service/MainService.js'
import { Select } from 'semantic-ui-react'
import{ countryList } from '../static/staticData'
import { getCurrentDate } from '../utils/Utility.js'
import {words} from '../static/Internalization'
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
        //event.target.placeholder=''
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
                if (element["Country"].toLowerCase().includes(event.target.value.toLowerCase())) {
                    if (totalResult != 5) {
                        let tableRow = document.createElement('tr');
                        let tableData = document.createElement('td');
                        tableData.id = Math.ceil(Math.random() * 100)
                        tableData.textContent = element.Country;
                        tableData.value = element.CountryCode;
                        tableData.title = element.Country;
                        tableData.name=element.Country;
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
        let wordList= words[this.props.lang];
        // <h5 className="hashtag">{wordList.stayHome}</h5>
        return (
            <div>
            <div style={{display:"contents",float:"left"}}>
                    <img htmlFor="tr-icon" src={require("../images/translate.png")} style={{width:"30px", height:"30px",verticalAlign:"middle",margin:"5px"}} className="translate"/>
                        <div style={{display:"inline",marginRight:"10px"}}>
                            <span id="tr-icon" style={{ zIndex: "0",right:0,cursor:"pointer"}} className={"flag-icon flag-icon-tr"} onClick={(event)=>this.props.onLangChange(event)} ></span>
                        </div>
                        <div style={{display:"inline", right:0}}>
                            <span id="gb-icon" style={{ zIndex: "0",right:0,cursor:"pointer" }} className={"flag-icon flag-icon-gb"} onClick={(event)=>this.props.onLangChange(event)} ></span>
                        </div>
                    <div className="clock" >{currentDate}</div>
                    </div>
                <input type="text" className="searchbar" /*onFocus={(event) => this.styleNavbar(event)}*/ placeholder={wordList.placeHolder +" "+wordList.stayHome } id="searchbar" onChange={this.handleSearch}></input>
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
            return countriesData
        }).then((countryCodes) => {
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