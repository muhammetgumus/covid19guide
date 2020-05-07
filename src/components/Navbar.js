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
    }

    handleSearch(event) {
        let totalResult=0;
        let searchbar = document.getElementById('searchbar')
        let container = document.createElement('div');

        if(document.getElementById("unorderedList")!=null){
            document.getElementById("unorderedList").remove()
        }
        let listElement = document.createElement('ul');
        listElement.id="unorderedList"
        listElement.innerHTML=''

            container.innerHTML='';
       
        if (this.state.searchbarArr.length >= 1) {
            for (let x of this.state.searchbarArr) {
                if (x.includes(event.target.value)) {
                    
                    let listItem = document.createElement('li');
                    listItem.id = Math.ceil(Math.random() * 100)
                    listItem.textContent = x;
                    listItem.value = x;
                    listItem.title = x;
                    
                    
                    listElement.appendChild(listItem);
                    container.appendChild(listElement)
                    searchbar.after(container);
                    totalResult++
                
                    
            
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

                        /*let option = document.createElement('option')
                        option.text = country.label
                        option.name = country.value
                        selection.appendChild(option);*/

                    })
                        this.setState({
                            searchbarArr: [...tempArr]
                        })
                    
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