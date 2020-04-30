import React from 'react';
import { Card, Image, Grid } from 'semantic-ui-react'
import 'flag-icon-css/css/flag-icon.css'
import { countryList } from '../static/staticData';

export default class CardComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const cardPerRow=4;
    const styleCard = {
    
      "width": "100px",
      "height": "60px",
      "flag-icon-background": {

        "background-size": "contain",
        "background-position": "50%",
        "background-repeat": "no-repeat"
      }
     
    }
   


    let countryList  = []
    if (this.props.cardType == "countries") {
      if (this.props.data != null && this.props.data != undefined && this.props.data.length != 0) {

        let countriesLst = this.props.data[0].map(x => {
          let flagClassName = "flag-icon flag-icon-" + x.CountryCode.toLowerCase()
          const lastStyle = {
    
            "width": "200px",
            "height": "300px",
            "display" :"inline",
            "margin":"10"
  //          "cardComponent:hover": "{backgroundColor: #fff }"
           
          }
          let cnt = //<Grid.Column>
            //<div>
          
              <Card  key={x.CountryCode} className="cardComponent" style={{lastStyle }} >
                <Card.Content style={{"display": "inline-block"}}>
                <br></br><br></br>
                <span className={flagClassName} style={styleCard}></span>
                <h2 /*style={{"display": "inline-block"}} */>{x.Country != null || x.Country != undefined ? x.Country : "Dünya Geneli2"}</h2>
                <Card.Header /*style={{"display": "inline"}}*/><h3 style={{"display": "inline"}}>Günlük Vakalar <br></br> {x.NewConfirmed}</h3></Card.Header>
                <Card.Description /*style={{"display": "inline-block"}}*/>Toplam Vaka: {x.TotalConfirmed}</Card.Description>
                <Card.Description /* style={{"display": "inline-block"}}*/>Günlük Ölüm: {x.NewDeaths}</Card.Description>
                <Card.Description /*style={{"display": "inline-block"}}*/>Toplam Ölüm: {x.TotalDeaths}</Card.Description>
                <Card.Description /*style={{"display": "inline-block"}}*/>Günlük İyileşenler: {x.NewRecovered}</Card.Description>
                </Card.Content>
              </Card>
              
          //  </div>
        //  </Grid.Column>
        countryList.push(cnt)

         }) }
       

    }


    const listItems =
      <Grid columns={4}>
        <Grid.Row >

          {

            this.props.data.map(t => <Grid.Column><div>
              
              <Card  key={t.Country} style={{ width: "200px", height: "200px" ,display :"inline"}} >
                <br></br><br></br>
              <Card.Content style={{"float":"left"}} >
                <span  className="flag-icon flag-icon-eu" style={styleCard}></span>
                <h2>{t.Country != null || t.Country != undefined ? t.Country : "Dünya Geneli"}</h2>
                <Card.Header><h3>Günlük Vakalar <br></br> {t.NewConfirmed}</h3></Card.Header>
                <Card.Description>Toplam Vaka: {t.TotalConfirmed}</Card.Description>
                <Card.Description >Günlük Ölüm: {t.NewDeaths}</Card.Description>
                <Card.Description>Toplam Ölüm: {t.TotalDeaths}</Card.Description>
                <Card.Description>Günlük İyileşenler: {t.NewRecovered}</Card.Description>
                </Card.Content>
              </Card>

            </div></Grid.Column>)
          }

          <Grid.Column>

          </Grid.Column>
          <Grid.Column>

          </Grid.Column>
        </Grid.Row>

      </Grid>

/*
         <Grid.Row columns={this.cardPerRow} style={{"display":"inline"}}>
          <Grid.Column style={{"display": "inline-block"}}  key="1" >{countryList[0]}</Grid.Column>
          <Grid.Column style={{"display": "inline-block"}} key="2">{countryList[1]}</Grid.Column>
           </Grid.Row> 
*/
        
        // <Card.Group itemsPerRow="4"  /*style={{"display": "inline-block"}}*/>{countryList}</Card.Group>
/*
 <Grid.Column style={{"display": "inline-block"}} key="3">{countryList[2]}</Grid.Column>
          <Grid.Column style={{"display": "inline-block"}} key="4">{countryList[3]}</Grid.Column>

*/
    return (
      //{listItems}
      
       //<br></br><br></br><br></br><br></br><br></br>
        
          <Grid  >
   
         
          {countryList.map(currentObject=>{
             let index=countryList.indexOf(currentObject)
            if((index%cardPerRow)!=0){
              return <Grid.Column style={{"display": "inline-block"}}  key={index} >{currentObject}</Grid.Column>     
            }else{
             return  <Grid.Row columns={this.cardPerRow} style={{"display":"inline"}}>
              <Grid.Column style={{"display": "inline-block"}}  key={index} >{currentObject}</Grid.Column>
              </Grid.Row>
            }
          }
           )}

            
          </Grid>
        

      
     
    );
  }

}

/*

     {countryList.forEach(x=>{
          switch(countryList.indexOf(x)%4){
            case 0: document.getElementById("column1").appendChild(x)
                    break;
            case 1: document.getElementById("column2").appendChild(x)
                    break;
            case 2: document.getElementById("column3").appendChild(x)
                    break;
            case 3: document.getElementById("column4").appendChild(x)
            
          }
        })
        
        }


*/