import React from 'react';
import { Card, Image, Grid } from 'semantic-ui-react'
import 'flag-icon-css/css/flag-icon.css'
import { countryList } from '../static/staticData';
import '../App.css'
import { CountryPopup } from '../components/CountryPopup.js'
import { getSummaryByCountry } from '../service/MainService.js'
import { words } from '../static/Internalization';

export default class CardComponent extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props)
    this.state = {
      currentCountryCode: null,
      popupData: {
        Log: '',
        Lon: '',
        CountryCode: '',
        Cases:''

      }
    }
    this.handleCardClick = this.handleCardClick.bind(this);
    this.resetCurrentCountryCode = this.resetCurrentCountryCode.bind(this);
  }
  handleCardClick(event) {

    event.persist()

    if (event.target.parentElement.getAttribute("value") != null) {
      this.resetCurrentCountryCode();
      const countryCode = event.target.parentElement.getAttribute("value").toLowerCase();//.attributes.nodeValue
      getSummaryByCountry(countryCode).then((response) => {
        if (response != undefined) {
          this.setState({
            currentCountryCode: response.CountryCode,
            popupData: {
              Lat: response.Lat,
              Lon: response.Lon,
              CountryCode: response.CountryCode,
              Cases:response.Cases,
              Country:response.Country
            }
          })
        }
      })
    }

  }
  resetCurrentCountryCode() {
    this.setState({
      currentCountryCode: null
    })
  }


  render() {
    const cardPerRow = 5;
    const styleCard = {

      "width": "100px",
      "height": "60px",
      "flag-icon-background": {
      }
    }

    let countryList = []
    let lastArray = []
    let wordList= words[this.props.lang]

    if (this.props.cardType == "countries") {
      if (this.props.data != null && this.props.data != undefined && this.props.data.length != 0) {

        let countriesLst = this.props.data[0].map(x => {
          let flagClassName = "flag-icon flag-icon-" + x.CountryCode.toLowerCase()
          let cnt =
            <Card key={x.CountryCode} name={x.CountryCode} value={x.CountryCode} id={x.CountryCode}>
              <Card.Content key={x.CountryCode} className="cardExample" name={x.CountryCode} value={x.CountryCode} onClick={this.handleCardClick.bind(this)}>
                <br></br><br></br>
                <span style={{zIndex:"0"}} className={flagClassName} style={styleCard}></span>
                <h3 >{x.Country != null || x.Country != undefined ? x.Country : "Dünya Geneli2"}</h3>
                <Card.Header style={{ "fontWeight": "bold" }} >{wordList.NewConfirmed}: {x.NewConfirmed}</Card.Header>
                <Card.Description textAlign="left">{wordList.TotalConfirmed}: {x.TotalConfirmed}</Card.Description>
                <Card.Description textAlign="left">{wordList.NewDeaths}: {x.NewDeaths}</Card.Description>
                <Card.Description textAlign="left">{wordList.TotalDeaths}: {x.TotalDeaths}</Card.Description>
                <Card.Description textAlign="left">{wordList.NewRecovered}: {x.NewRecovered}</Card.Description>
                <Card.Description textAlign="left">{wordList.Date}: {this.props.date.toString().substring(0, 10)}</Card.Description>
              </Card.Content>
            </Card>

          countryList.push(cnt)

        })

        for (var x = 0; x < countryList.length; x += cardPerRow) {

          let row = <Grid.Row style={{"display": "inline-flex"/*,"transform": "scale(0.8, 0.8)"*/ }}>
            <Grid.Column style={{ "display": "inline-flex"/*,"transform": "scale(0.8, 0.8)"*/ }}>
              {countryList.slice(x, Math.min(countryList.length, x + cardPerRow))}

            </Grid.Column>
          </Grid.Row>;
          lastArray.push(row)
        }
      }
    }else{
      if (this.props.data != null && this.props.data != undefined && this.props.data.length != 0){

        return(
          <div style={{display:"block"}}>
          <Card key={"global"} name={"global"} value={"global"} id={"global"}>
          <Card.Content key={"global"} className="world" style={{width:"85%"}} name={"global"} value={"global"} onClick={this.handleCardClick.bind(this)}>
          <br></br><br></br>
          <img style={{zIndex:"0"}} src={require("../images/global.png")} style={styleCard}></img>
          <h3 >{wordList.Global}</h3>
          <Card.Header style={{ "fontWeight": "bold" }} >{wordList.NewConfirmed}: {this.props.data[0].NewConfirmed}</Card.Header>
          <Card.Description textAlign="left">{wordList.TotalConfirmed}: {this.props.data[0].TotalConfirmed}</Card.Description>
          <Card.Description textAlign="left">{wordList.NewDeaths}: {this.props.data[0].NewDeaths}</Card.Description>
          <Card.Description textAlign="left">{wordList.TotalDeaths}: {this.props.data[0].TotalDeaths}</Card.Description>
          <Card.Description textAlign="left">{wordList.NewRecovered}: {this.props.data[0].NewRecovered}</Card.Description>
          <Card.Description textAlign="left">{wordList.Date}: {this.props.date.toString().substring(0, 10)}</Card.Description>
        </Card.Content>
      </Card>
      </div>
        ) 

      }
      

    }

    return (
      <div>
        <Grid columns={cardPerRow}>
          {lastArray.map(x => {
            return x;
          })}
        </Grid>
        {
          this.state.currentCountryCode && (
            <div>
              <CountryPopup data={this.state.popupData} className="popup" countryCode={this.state.currentCountryCode} lang={this.props.lang} ></CountryPopup>
            </div>
          )
        }
      </div>
    );
  }
  componentDidMount() {
    console.log("DID MOUNT " + this.state.currentCountryCode)

  }
  componentWillUnmount() {
    this.state.currentCountryCode = null;
  }
}

