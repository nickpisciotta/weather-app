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
  
}); 

