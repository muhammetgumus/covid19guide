import React from 'react';
import ymaps from 'ymaps';
import { getSummaryByCountry } from '../service/MainService.js'
export class CountryPopup extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          Country='',
          CountryCode='',
          Lat=0,
          Lon=0,
          Cases=0
        };
      }

render(){
    return(
      <div>
        {this.renderMap()}
        <h6>Country : {this.state.Country}</h6>
        <h6>CountryCode : {this.state.CountryCode}</h6>
        <h6>Latitude : {this.state.Lat}</h6>
        <h6>Longitude : {this.state.Lon}</h6>
        <h6>Cases: {this.state.Cases}</h6>
      </div>
    )
}
    
componentDidMount(){
  const countryPopupData = getSummaryByCountry(this.props.CountryCode)
  this.setState({
    Log:countryPopupData.Log,
    Lat:countryPopupData.Lat,
    Country:countryPopupData.Country,
    CountryCode:countryPopupData.CountryCode,
  }) 
}

renderMap(){
let mapContainer=document.createElement('div');
return ymaps.load()
  .then(maps => {
    const map = new maps.Map(mapContainer, {
      center: [this.state.Lat, this.state.Lon],
      zoom: 3
    });
  })
  .catch(error => console.log('Failed to load Yandex Maps', error));



}






}