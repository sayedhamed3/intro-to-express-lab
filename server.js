const express = require('express')

const app = express()

app.listen(3000, () => {
    console.log('Listening on port 3000')
})


// Question 1:

app.get('/greetings/:username', (req,res) => {
    res.send(`<h1>Hello there, ${req.params.username} !</h1>`)
})

// Question 2:

app.get('/roll/:number', (req,res) => {

    const max = req.params.number
    if(isNaN(max)){
        res.send('<h1>You musst specify a number.</h1>')
    } else {
        const number = Math.ceil(Math.random()*max)
        res.send(`<h1>You rolled a ${number}</h1>`)
    }
})


// Question 3

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  app.get('/collectibles/:index', (req,res) => {
    const index = req.params.index
    if(isNaN(index)) {
        res.send(`<h1>Please enter number</h1>`)
    }
    if (index > collectibles.length - 1 || index < 0) {
        res.send(`<h1>This item is not yet in stock. Check back soon!</h1>`)
    } else {
        res.send(`<h1>So, you want the ${collectibles[index].name}? For ${collectibles[index].price}, it can be yours!</h1>`)
    }
})

// Question 4
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    let filteredShoes = shoes
    const {minPrice, maxPrice, type} = req.query

    if (minPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice)
    }

    if(maxPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice)
    }

    if(type) {
        filteredShoes = filteredShoes.filter((shoe) => shoe.type == type )
    }
    let shoeString = ""
    filteredShoes.forEach((shoe) => {
        shoeString += `<li> Name: ${shoe.name}, Price: ${shoe.price}, Type: ${shoe.type}</li>`
    })
    res.send(`<h1>Shoes:</h1><h2><ul>${shoeString}</ul></h2>`)
});
