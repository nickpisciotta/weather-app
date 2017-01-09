const yargs = require ('yargs'); 
const axios = require ('axios'); 

const argv = yargs 
  .options({
    a: {
      demand: true, 
      alias: 'address', 
      describe: 'Address to fetch weather for',
      string: true 
    }
  })
  .help()
  .alias('help', 'h')
  .argv; 


var encodedAddress = encodeURIComponent(argv.address); 
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`; 

axios.get(geocodeURL).then((response) => {
  if (response.data.status === "ZERO_RESULTS") {
    throw new Error("Unable to find that address"); 
  }
  sendGeocodeToWeatherAPI(response).then((response) => {
    displayWeatherData(response); 
  })
}).catch((error) => {
    if (error.code === 'ENOTFOUND') {
      console.log("Could not connect to API server"); 
    } else {
      console.log(error.message);  
    }
});  

const sendGeocodeToWeatherAPI = (geocodeData) => { 
  var lat = geocodeData.data.results[0].geometry.location.lat; 
  var long = geocodeData.data.results[0].geometry.location.lng;
  console.log(geocodeData.data.results[0].formatted_address)
  var weatherURL = `https://api.darksky.net/forecast/${process.env.DARKSKYAPI}/${lat},${long}`
  return axios.get(weatherURL); 
}

const displayWeatherData = (weatherData) => {
  var temperature = weatherData.data.currently.temperature; 
  var apparentTemperature = weatherData.data.currently.apparentTemperature
  console.log(`It's currently: ${temperature}.  It feels like: ${apparentTemperature}`)
}


