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
        this.mapFunc = this.mapFunc.bind(this);
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
 // this.renderMap()
    return(
      <div style={{align:"center"}} className="popup" >
        <div id="mapX" ></div>
        <h6>Country : {this.props.data.Country}</h6>
        <h6>CountryCode : {this.props.data.CountryCode}</h6>
        <h6>Latitude : {this.props.data.Lat}</h6>
        <h6>Longitude : {this.props.data.Lon}</h6>
        <h6>Cases: {this.props.data.Cases}</h6>
      </div>
    )
}
    
componentDidMount(){
  this.mapFunc();
   
}
/*
renderMap(){
let mapContainer=document.createElement('div');
let container= document.getElementById('mapX');
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
*/


mapFunc(){
  let con= document.createElement('div');
  con.id="mapY"
  con.className="popup"
  document.getElementById("mapX").append(con);
  ymaps
  .load()
  .then(maps => {
    const map = new maps.Map(con, {
      center: [this.props.data.Lat, this.props.data.Lon],
      zoom: 5
    });
  })
  .catch(error => console.log('Failed to load Yandex Maps', error));

}

}

