import React from 'react';
import ymaps from 'ymaps';
import { getSummaryByCountry } from '../service/MainService.js'
export class CountryPopup extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          Country:'',
          CountryCode:'',
          Lat:0,
          Lon:0,
          Cases:0,
          map:null
        };
      }

render(){
 // const countryPopupData = getSummaryByCountry(this.props.countryCode);
  
  /*  this.setState({
      Lon:countryPopupData.Lon,
      Lat:countryPopupData.Lat,
      country:countryPopupData.Country
     // countryCode:this.props.CountryCode,
    })
*/
  this.renderMap()
    return(
      <div>
        <div>{this.state.map}</div>
        <h6>Country : {this.props.data.Country}</h6>
        <h6>CountryCode : {this.props.data.CountryCode}</h6>
        <h6>Latitude : {this.props.data.Lat}</h6>
        <h6>Longitude : {this.props.data.Lon}</h6>
        <h6>Cases: {this.props.data.Cases}</h6>
      </div>
    )
}
    
componentDidMount(){
  
   
}

renderMap(){
let mapContainer=document.createElement('div');
const map= ymaps.load()
  .then(maps => {
    const map = new maps.Map(mapContainer, {
      center: [this.props.data.Lat, this.props.data.Lon],
      zoom: 3
    });
    this.setState({
      map:mapContainer.innerHTML
    })
    //return map
  })
  .catch(error => console.log('Failed to load Yandex Maps', error));



}






}