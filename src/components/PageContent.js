import React from 'react';
import summaryData from '../service/MainService.js'
import CardComponent from './Card.js';
import Navbar from './Navbar.js';
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
           <Container  style={{ margin: '30px' }}>
                <h2 className="hashtag">#evdekal #stayhome</h2>
                <Navbar className="card-navbar"></Navbar>
                <CardComponent  /*style={{"display":"inline-block"}}*/ data={this.state.countriesData} cardType="countries"></CardComponent>
               </Container>
         </div>

        )

    }

    componentDidMount() {
        const datas = summaryData();
        datas.then((incoming) => {
            const globalData = incoming['Global']
            const countriesData = incoming['Countries']
            //countriesData= JSON.parse(countriesData);
            const date = incoming['Date']
            this.setState({
                globalData: [...this.state.globalData, globalData],
                countriesData: [...this.state.countriesData, countriesData],
                date: [...this.state.date, date]

            })

        })



    }



}
