import React, { useEffect, useState } from 'react'
import '../Weather/Weather.css'
import cold from '../Assets/cold.jpg'
import cloud from '../Assets/cloud.jpg'

import clearsky from '../Assets/clearsky.jpg'
import { motion } from 'framer-motion'
import { MDBSpinner } from 'mdb-react-ui-kit';
import Header from '../Header'


function Weather() {
  const api_key = "f5de60e0d6fca3c4a5d4db16099f1313";
  const [location, setLocation] = useState('kochi');
  const [data, setData] = useState({});
  const [weatherIcon, setWeatherIocn] = useState('')
  const [load, setLoad] = useState(true);
  const base_url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`
  // console.log(base_url);
  const displayWeather = async () => {
    try {
      document.getElementById('warning').style.display = 'none'
      document.getElementById('display').style.display = 'block'


      // diplay weather of kochi when loading the page
      const response = await fetch(base_url)
        .then(res => res.json())
      // console.log(response);
      //console.log(response.weather[0].icon);
      const icon = `https://openweathermap.org/img/wn/${response?.weather[0].icon}@2x.png`
      setWeatherIocn(icon)
      setLoad(false)
      setData(response)
      setLocation('')

    }
    catch {
      setLoad(false)
      // alert("Location not fount")
      document.getElementById('display').style.display = 'none'
      document.getElementById('warning').style.display = 'block'
      setLocation('')

    }

  }
  console.log(data);
  console.log(weatherIcon);

  useEffect(() => {
    displayWeather()

  }, [])
  //console.log(location);
  const searchWeather = () => {

    //Search location and fetch data
    setData({})// set the state data empty
    setLoad(true)
    displayWeather()



  }


  useEffect(() => {

    if (data.weather) {
      if (data.weather[0].main === 'Thunderstorm' || data.weather[0].main === 'Drizzle' || data.weather[0].main === 'Rain') {
        document.getElementById('background').style.backgroundImage = `url(${cloud})`

      }
      else if (data.weather[0].main === 'Clear' || data.weather[0].main === 'Clouds') {
        document.getElementById('background').style.backgroundImage = `url(${clearsky})`

      }

      else {
        document.getElementById('background').style.backgroundImage = `url(${cold})`

      }
    }
  })


  return (
    <>
      <div >
        {/* <Header background={data.weather? data.weather[0].main:null} /> */}
        <div className='w-full h-screen  mx-auto  px-4 py-5 bg-cover ' id='background' style={{ backgroundImage: `url(${cold})` }} >
          <div className='w-fit rounded-xl py-3	 px-5  mx-auto  justify-center' style={{ backgroundColor: '#0707077c' }}>
            <input className=' mb-3 h-30 rounded-s-lg border-0 outline-none ps-2' value={location} style={{ height: '40px' }} onChange={(e) => setLocation(e.target.value)} type="text" placeholder='Enter Location' />
            <button className='bg-blue-600  mb-3 rounded-e-lg text-white' style={{ height: '40px' }} onClick={searchWeather}>search</button>
            <p className='text-center text-white' id='warning'>Location Not Found</p>
            <div className='flex flex-row pb-4' id='display'>

              {
                load ? <div className='mx-auto '>
                  <MDBSpinner color='light' >
                    <span className='visually-hidden'>Loading...</span>
                  </MDBSpinner>
                </div> : <div className='flex flex-col w-full'>
                  <div className='w-full flex justify-between'>
                    <div className='h-32 ' >
                      {/* Location */}
                      <motion.img initial={{ y: '-10px', opacity: 0 }} whileInView={{ y: '10px', opacity: 1 }} transition={{ duration: '.20', delay: '0.5' }} className='' src={weatherIcon} alt="" />



                      {data.weather ?
                        <motion.h6 initial={{ y: '-10px', opacity: 0 }} whileInView={{ y: '10px', opacity: 1 }} transition={{ duration: '.20', delay: '0.5' }} className='text-white text-center'> {data.weather[0].description}</motion.h6>

                        : null}
                    </div>
                    {/* Temperature */}

                    <motion.div initial={{ y: '-10px', opacity: 0 }} whileInView={{ y: '10px', opacity: 1 }} transition={{ duration: '.20', delay: '.5' }} className='pt-4'>
                      {data.main ? <motion.h1 className='text-white'>{Math.floor(data.main.temp)}℃</motion.h1> : null
                      }
                      <motion.h3 className='text-white'>{data.name}</motion.h3>

                    </motion.div>


                  </div>
                  <motion.div initial={{ y: '-10px', opacity: 0 }} whileInView={{ y: '0px', opacity: 1 }} transition={{ duration: '.20', delay: '0.5' }} className='grid grid-cols-2 gap-4 mt-4'>
                    <div className='border-2 border-white rounded h-22 '>
                      <div className='flex justify-center pt-3 '>
                        <i class="fa-solid fa-droplet  fa-xl mt-2 me-2" style={{ color: 'white' }}></i>
                        <h6 className='text-white'>Humidity</h6>
                      </div>
                      {
                        data.main ? <h4 className='text-white text-center'>{data.main.humidity} %</h4> : null
                      }
                    </div>
                    <div className='border-2 border-white rounded h-22  '>
                      <div className='flex justify-center pt-3 '>
                        <i class="fa-solid fa-wind  fa-xl mt-2 me-2" style={{ color: 'white' }}></i>

                        <h6 className='text-white'>Wind</h6>
                      </div>
                      {
                        data.wind ? <h4 className='text-white text-center'>{data.wind.speed} Km/h</h4> : null
                      }
                    </div>
                    <div className='border-2 border-white rounded h-22 '>
                      <div className='flex justify-center pt-3 '>

                        <i class="fa-solid fa-temperature-three-quarters  fa-xl mt-2 me-2" style={{ color: 'white' }}></i>
                        <h6 className='text-white'>Pressure</h6>
                      </div>
                      {
                        data.main ? <h4 className='text-white text-center'>{data.main.pressure} hPa</h4> : null
                      }
                    </div>
                    <div className='border-2 border-white rounded h-22 '>
                      <div className='flex justify-center pt-3 '>
                        <i class="fa-solid fa-temperature-low  fa-xl mt-2 me-2" style={{ color: 'white' }}></i>
                        <h6 className='text-white'>Feels Like</h6>
                      </div>
                      {
                        data.main ? <h4 className='text-white text-center'>{data.main.feels_like}℃</h4> : null
                      }
                    </div  >
                    <div className='border-2 border-white rounded h-22 '>
                      <div className='flex justify-center pt-3 '>
                        <i class="fa-solid fa-arrow-down  fa-xl mt-2 me-2" style={{ color: 'white' }}></i>
                        <h6 className='text-white'>Min</h6>
                      </div>
                      {
                        data.main ? <h4 className='text-white text-center'>{data.main.temp_min} ℃</h4> : null
                      }
                    </div>
                    <div className='border-2 border-white rounded h-22 '>
                      <div className='flex justify-center pt-3 '>
                        <i class="fa-solid fa-arrow-up  fa-xl mt-2 me-2" style={{ color: 'white' }}></i>
                        <h6 className='text-white'>Max</h6>
                      </div>
                      {
                        data.main ? <h4 className='text-white text-center'>{data.main.temp_max} ℃</h4> : null
                      }
                    </div>

                  </motion.div>

                </div>

              }
            </div>


          </div>


        </div>

      </div>
    </>
  )
}

export default Weather