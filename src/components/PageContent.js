import React from 'react';
import summaryData from '../service/MainService.js'
import CardComponent from './Card.js';
import Navbar from './Navbar.js';
import '../App.css';
import { Container, Grid, Card, Icon } from 'semantic-ui-react';
import { getUserCountry,userCountry } from '../service/MainService'
//import "../images/translate."

export default class PageContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            globalData: [],
            countriesData: [],
            date: [],
            datas: [],
            lang: "gb",
            userLocation: {
                Lat: "",
                Lon: "",
                CountryCode: ""
            },
            userLocationData:[]
        };
        this.translateClick = this.translateClick.bind(this);

    }
    translateClick(event) {
        this.setState({
            ...this.state,
            lang: String(event.target.id).substring(0, 2)

        })
    }
    render() {
/*
<div>
                        <CardComponent className="cardComponent" data={this.state.globalData} date={this.state.date}cardType="global"lang={this.state.lang}></CardComponent>
                    </div>

*/
        return (
            <div>
                <Container className="App" className="containerApp" /*style={{ margin: '30px' }}*/>
                    <Navbar className="card-navbar" lang={this.state.lang} onLangChange={this.translateClick}></Navbar>
                    <CardComponent className="cardComponent" data={this.state.globalData} date={this.state.date}
                        cardType="global"
                        lang={this.state.lang}

                    >
                    </CardComponent>
                   {this.state.userLocationData.length!=0 &&
                    <CardComponent className="cardComponent" data={this.state.userLocationData} date={this.state.date}
                        cardType="userCountry"
                        lang={this.state.lang}

                    >
                    </CardComponent>
                   
                   } 
                    

                    <CardComponent className="cardComponent"
                        data={this.state.countriesData}
                        date={this.state.date}
                        cardType="countries"
                        lang={this.state.lang}

                    >
                    </CardComponent>

                </Container>
            </div>
        )
    }

    componentDidMount() {
        const datas = summaryData();
        datas.then((incoming) => {
            const globalData = incoming['Global']
            const countriesData = incoming['Countries']
            const date = incoming['Date']
            this.setState({
                globalData: [...this.state.globalData, globalData],
                countriesData: [...this.state.countriesData, countriesData],
                date: [...this.state.date, date]
            })
        })
        if (window.navigator.geolocation) {
            const userLocation = window.navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    ...this.state,
                    userLocation: {
                        Lat: String(position.coords.latitude).substring(0, 5),
                        Lon: String(position.coords.longitude).substring(0, 5)
                    }
                })

                const coordinates = this.state.userLocation.Lat + "," + this.state.userLocation.Lon
                    userCountry.then(data=>{
                        this.setState({
                            ...this.state,
                            userLocation: {
                                CountryCode: data
                            },
                            
                        })
                        const userCountryCode= this.state.userLocation.CountryCode
                        if(this.state.countriesData.length!=0){
                            this.state.countriesData[0].map(countryCard=>{
                                if(countryCard['CountryCode']==userCountryCode){
                                   this.setState({userLocationData:countryCard}) 
                                }
                            })    

                        }
                        

                    })
                    
            })

        }

    }
}
