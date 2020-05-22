import React from 'react';
import ymaps from 'ymaps';
import { words } from '../static/Internalization';
export class CountryPopup extends React.Component{
  
  
  constructor(props) {
    super(props);
    this.mapFunc = this.mapFunc.bind(this);
    this.handlePopupContainerClick= this.handlePopupContainerClick.bind(this);
  }

  handlePopupContainerClick(){
    document.getElementById("popupContainer").style.display="none"
  }

  render(){
    let wordList = words[this.props.lang]
    return(
      <div className="outer" id="popupContainer" onClick={this.handlePopupContainerClick} >
      <div className="middle">
        <div id="mapX" className="innerMap" ></div>
        <div className="inner">
        <h4>{wordList.Country} : {this.props.data.Country}</h4>
        <h4>{wordList.CountryCode} : {this.props.data.CountryCode.toUpperCase()}</h4>
        <h4>{wordList.Latitude} : {this.props.data.Lat}</h4>
        <h4>{wordList.Longitude} : {this.props.data.Lon}</h4>
        <h4>{wordList.Cases} : {this.props.data.Cases}</h4>
        </div>
        </div>
      </div>
    )
}
    
componentDidMount(){
  this.mapFunc();
}

mapFunc(){
  let con= document.createElement('div');
  con.id="mapY"
  document.getElementById("mapX").appendChild(con);
  ymaps
  .load()
  .then(maps => {
    const map = new maps.Map(con, {
      center: [this.props.data.Lat, this.props.data.Lon],
      zoom: 6
    });
  })
  .catch(error => console.log('Failed to load Yandex Maps', error));

}

}

