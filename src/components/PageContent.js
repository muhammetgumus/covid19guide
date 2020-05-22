import React from 'react';
import summaryData from '../service/MainService.js'
import CardComponent from './Card.js';
import Navbar from './Navbar.js';
import '../App.css';
import { Container, Grid, Card } from 'semantic-ui-react';

export default class PageContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            globalData: [],
            countriesData: [],
            date: [],
            datas: [],
            lang: "tr"
        };
    }

    render() {

        return (
            <div>
                <Container className="App" className="containerApp" /*style={{ margin: '30px' }}*/>
                    <div style={{display:"inline",float:"left"}}>
                    <label htmlFor="tr-icon">Dil:</label>
                        <div style={{display:"inline",marginRight:"10px"}}>
                            <span id="tr-icon" style={{ zIndex: "0",right:0}} className={"flag-icon flag-icon-tr"} ></span>
                        </div>
                        <div style={{display:"inline", right:0}}>
                            <span style={{ zIndex: "0",right:0 }} className={"flag-icon flag-icon-gb"} ></span>
                        </div>
                    </div>
                    <Navbar className="card-navbar" lang={this.state.lang}></Navbar>
                    <CardComponent className="cardComponent" /*style={{"display":"inline-block"}}*/
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
    }
}
