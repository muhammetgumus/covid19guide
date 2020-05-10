import React from 'react';
import { getSummaryData } from '../service/MainService.js'
import { Select } from 'semantic-ui-react'
import '../App.css';


class Navbar extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            searchbarArr: []
        };
        this.handleSearch = this.handleSearch.bind(this);
       // this.handleBodyClick =this.handleBodyClick.bind(this);
    }
/*handleBodyClick(event){
    document.getElementsByName("body").addEventListener('click',()=>{document.getElementById('container').innerHTML=''})
}*/
    handleSearch(event) {
        let totalResult=0;
        let searchbar = document.getElementById('searchbar')
        let container = document.createElement('div');
        container.id="searchResultsContainer"
        container.style.position="relative"
        container.style.zIndex="100"

        if(document.getElementById("searchResults")!=null){
            document.getElementById("searchResults").remove()
        }
        let tableElement = document.createElement('table');
        tableElement.id="searchResults"
        tableElement.innerHTML=''

            container.innerHTML='';
       
        if (this.state.searchbarArr.length >= 1) {
            
            for (let x of this.state.searchbarArr) {
                if (x.toLowerCase().includes(event.target.value.toLowerCase())) {
                    if(totalResult!=5){
                    let tableRow = document.createElement('tr');
                    let tableData = document.createElement('td');
                    tableData.id = Math.ceil(Math.random() * 100)
                    tableData.textContent = x;
                    tableData.value = x;
                    tableData.title = x;
                    //tableData.style={backrogundColor:"red"}

                    tableRow.appendChild(tableData)
                    tableElement.appendChild(tableRow);
                    container.appendChild(tableElement)
                    searchbar.after(container);
                    totalResult++
                }
                }
            }

        }
      if(event.target.value=="" || event.target.value==null){
          container.innerHTML=''
      }

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
                    
                    let tempArr=[]
                    countriesData.forEach(country => {
                        tempArr.push(country.label);
                    })
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
       }
}
export default Navbar;