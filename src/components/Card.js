import React from 'react';

export default class Card extends React.Component {
    
    render(){
        
        return (
            <div>
                <h3>Country : {this.props.data.countryCode}</h3>
                <p>Total Confirmed: {this.props.data.totalC} </p>
                </div>
            
        )
            

    }


    




} 
