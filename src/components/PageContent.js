import React from 'react';
import summaryData from '../service/MainService.js'
import CardComponent from './Card.js';
import Navbar from './Navbar.js';
import '../App.css';
import { Container , Grid , Card} from 'semantic-ui-react';

export default class PageContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            globalData: [],
            countriesData: [],
            date: [],
            datas: []
        };
    }

    render() {

return (
           <div>
           <Container className="App"  style={{ margin: '30px' }}>
                <Navbar className="card-navbar"></Navbar>
                <CardComponent className="cardComponent" /*style={{"display":"inline-block"}}*/ data={this.state.countriesData} date={this.state.date} cardType="countries"></CardComponent>
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
