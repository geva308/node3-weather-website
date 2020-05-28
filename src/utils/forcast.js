const request = require('request')
const forcast = (latitude,longitude,callback) => {
    const url =
      "http://api.weatherstack.com/current?access_key=faaacd06beabc1878b89a68c15c45a85&query=" +
      latitude +
      "," +
      longitude;
    
    request({ url, json: true }, (error, {body}) => {
        if (error) {
          callback("Unable to connect to weather service!", undefined);
        } else if (body.error) {
                 callback("Unable to find location", undefined);
               } else {
                 callback(
                   undefined,
                   "It is currently " +
                     body.current.temperature +
                     " degress out, and it feels like " +
                     body.current.feelslike +
                     " degress out. " +
                     "\nThe humidity level is " +
                     body.current.humidity +
                     " %"
                 );
               }

    })

}

module.exports = forcast;