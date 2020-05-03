import React from 'react';
import { Card, Image, Grid } from 'semantic-ui-react'
import 'flag-icon-css/css/flag-icon.css'
import { countryList } from '../static/staticData';
import '../App.css'

export default class CardComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  onMouseEnter(x){}
  render() {
    const cardPerRow=5;
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
    let lastArray=[]
    const lastStyle = {
    
      "maxWidth": "200px",
      "height": "300px",
      //"display" :"inline-block",
      "margin":"200px",
      "box-shadow": "0 4px 8px 0 rgba(0,0,0,111)",
      "transition": "0.3s"
     
    }
    if (this.props.cardType == "countries") {
      if (this.props.data != null && this.props.data != undefined && this.props.data.length != 0) {

        let countriesLst = this.props.data[0].map(x => {
          let flagClassName = "flag-icon flag-icon-" + x.CountryCode.toLowerCase()
          const lastStyle = {
    
            "width": "275px",
            "height": "320px",
            "display" :"inline-block",
            "margin":"20px",
            "border": "1px solid #ccc",
            "border-radius": "5px",
            "margin": "10px 5px",
            "padding": "4px", 
            "box-shadow": "0 10px 20px rgba(0,0,0,0.19),0 6px 6px rgba(0,0,0,0.23)",
                
            "box-shadow": "0 4px 8px 0 rgba(0,0,0,3)",
            "transition": "0.9s"
           
          }
          const lastStyle2 = {
    
            "width": "275px",
            "height": "320px",
            "display" :"inline-block",
            "margin":"20px",
            "border": "1px solid #ccc",
            "border-radius": "20px",
            "margin": "10px 5px",
            "padding": "4px",//, 
            "&:hover":{
              //'box-shadow': '0 10px 20px rgba(0,0,0,0.19),0 6px 6px rgba(0,0,0,0.23)'
              backgroundColor:"red"
            }
            //"box-shadow": "0 10px 20px rgba(0,0,0,0.19),0 6px 6px rgba(0,0,0,0.23)"
                
           // "box-shadow": "0 4px 8px 0 rgba(0,0,0,3)",
            //"transition": "0.9s"
           
          }
          let cnt = 
              <Card  key={x.CountryCode} /*style={lastStyle2}  */>
                <Card.Content className="cardExample" /*style={lastStyle2}*/>
                <br></br><br></br>
                <span className={flagClassName} style={styleCard}></span>
                <h3 >{x.Country != null || x.Country != undefined ? x.Country : "Dünya Geneli2"}</h3>
                <Card.Header ><h4 style={{"display": "inline"}}>Günlük Vakalar <br></br> {x.NewConfirmed}</h4></Card.Header>
                <Card.Description textAlign="left">Toplam Vaka: {x.TotalConfirmed}</Card.Description>
                <Card.Description textAlign="left">Günlük Ölüm: {x.NewDeaths}</Card.Description>
                <Card.Description /*style={{"backgroundColor":"red"}}*/ textAlign="left">Toplam Ölüm: {x.TotalDeaths}</Card.Description>
                <Card.Description /*style={{"backgroundColor":"#3CB371"}}*/textAlign="left">Günlük İyileşenler: {x.NewRecovered}</Card.Description>
                <Card.Description textAlign="left">Tarih: {this.props.date.toString().substring(0,10)}</Card.Description>
                </Card.Content>
              </Card>
        
        countryList.push(cnt)

         }) 
        
         for(var x=0;x<countryList.length;x+=cardPerRow){
           
              let row = <Grid.Row  style={{"display": "inline-block"}}>
                <Grid.Column  style={{"display": "inline-flex"}}>
                {countryList.slice(x,Math.min(countryList.length,x+cardPerRow))}

                </Grid.Column>
                </Grid.Row>;
              lastArray.push(row)
         }
        
         console.log(lastArray[-1])
         console.log(lastArray.length)
         

        }
    }
    
    return (
        /*  <Grid id="ASDASD" columns={{cardPerRow}} >
          {countryList.map(currentObject=>{
             let index=countryList.indexOf(currentObject)
            if(((index)%(cardPerRow))!=0){
              return <Grid.Column width="4" style={{"display": "inline-block"}}  key={index} >{currentObject}</Grid.Column>     
            }else{
             return  <Grid.Row columns={this.cardPerRow} >
              <Grid.Column width="4" style={{"display": "inline-block"}}  key={index} >{currentObject}</Grid.Column>
              </Grid.Row>
            }
          }
           )}
          </Grid>*/

          <Grid columns={cardPerRow}>
            {lastArray.map(x=>{
              return x;
            })}
          </Grid>
     
    );
  }

}

