import React, { useEffect } from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
  } from 'mdb-react-ui-kit';

function Header({background}) {
    console.log(background);
    useEffect(() => {

        
          if (background === 'Thunderstorm' || background === 'Drizzle' || background === 'Rain' ) {
            document.getElementById('header').style.backgroundColor = '#2a2b31'
            document.getElementById('text').style.color = `#ffffff`

    
          }
          else if (background === 'Clear' || background=== 'Clouds' ) {
            document.getElementById('header').style.backgroundColor = '#2a5493'
            document.getElementById('text').style.color = `#ffffff`
            
          }
    
          else {
            document.getElementById('header').style.backgroundColor = `#ffffff`
            document.getElementById('text').style.color = `#000`
    
    
          }
        
      })
    
  return (
    <>
    <MDBNavbar id='header'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#' id='text' >
            <img
              src='https://th.bing.com/th/id/R.770b805d5c99c7931366c2e84e88f251?rik=khgO%2bY1Hh3BT9w&riu=http%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-weather-iconsymbolsiconsapple-iosiosios-8-iconsios-8-721522596142qx4ep.png&ehk=6msbAydV7X6D4bO8zvLC664aXwKOdBU17dwrHcKxaAg%3d&risl=&pid=ImgRaw&r=0'
              className='w-12'
              alt=''
              loading='lazy'
            />
            Weather App
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    
    </>
  )
}

export default Header