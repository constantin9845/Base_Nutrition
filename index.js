const express = require('express');
const axios = require('axios');

const PORT = process.env.PORT || 3060;

const client = express();

client.use(express.static('public'));
client.set('views');

const apiKey = 'bwZ4cWD52wZrC3hSLamxZNzIy169B0r1muFWSjeQ'; // Replace with your actual API key
const baseUrl = 'https://api.nal.usda.gov/fdc/v1';



async function searchFoods(keyword) {
    try {
      const response = await axios.get(`${baseUrl}/foods/search?query=${keyword}&api_key=${apiKey}`);
      return response.data.foods;
    } catch (error) {
      throw error;
    }
}

async function getFoodDetails(fdcId) {
    try {
      const response = await axios.get(`${baseUrl}/food/${fdcId}?api_key=${apiKey}`);
      return response.data;
    } catch (error) {
      throw error;
    }
}

async function main() {
    try {
      const foods = await searchFoods('apple');
      if (foods.length > 0) {
        const firstFood = foods[0];
        const foodDetails = await getFoodDetails(firstFood.fdcId);
        console.log('Food Details:', foodDetails['labelNutrients']);
      } else {
        console.log('No matching foods found.');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
}
   
main();

client.get('/', (req,res)=>{
    res.render('index.ejs');
});

client.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`);
});
    