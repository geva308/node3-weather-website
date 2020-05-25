const path = require("path");
const express = require('express');
const hbs = require('hbs');
const forcast = require("./utils/forcast");
const geocode = require("./utils/geocode");

const app = express();

//define path for express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../src/templates/views')
const partialPath = path.join(__dirname, "../src/templates/partials");

//Setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set("views", viewsPath);
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req,res) => {
    res.render("index", {
      title: "Weather App",
      name: "Geva Jacob",
    });
})

app.get('/about' , (req,res) => {
    res.render("about", {
      title: "About page",
      name: "Geva Jacob",
    });
})

app.get('/help', (req,res) => {
    res.render("help", {
      title: "Help Page",
      name: "Geva Jacob",
      number: "555-2034",
    });

})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide valid address!'
        })
    }

    geocode(req.query.address , (error,{latitude,longitude,location}={})=> {
        if(error) {
            return res.send({error})
        } 
        forcast(latitude, longitude, (error,forcastData)=> {
            if(error) {
                return res.send({error})
            }
            res.send({
                forcast: forcastData,
                location,
                address:req.query.address 
            })
        });

    });
    //   res.send({
    //       forcast: 'forcast',
    //       location: 'location',
    //       address: req.query.address
    //   });
});

app.get('/products',(req,res) => {
    if (!req.query.search) {
       return res.send({
            error: 'you must provide a search term!'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=>{
    res.render("404", {
      title: "404",
      name: "Geva Jacob",
      errorMessage: "Help artical not found",
    });
})

app.get('*',(req,res)=>{
    res.render("404", {
      title: "404",
      name: 'Geva Jacob',
      errorMessage:'Page not found'
    });
})

app.listen(3000, ()=> {
    console.log('Server is up on port 3000')
})