import React from 'react';
import { translation, countryArray ,countrySet} from '../static/staticData'


function Navbar() {
    translation();
    countryArray.sort();

    return (

        <div id="navbar">
            <select id="countries">
                {/*countryArray.forEach(country => //{return <option value={element}> {element}</option> }
                {

                    let option = document.createElement('option');
                    option.text = country
                    //  console.log(option.text)
                    option.value = country
                    let select = document.getElementById("countries");
                    select.appendChild(option);

                }


                )*/}
            </select>

        </div>
    );









}

export default Navbar;