const express = require('express');
const axios = require('axios');

const PORT = process.env.PORT || 3060;

const client = express();

client.use(express.static('public'));
client.set('views');

const apiKey = 'bwZ4cWD52wZrC3hSLamxZNzIy169B0r1muFWSjeQ'; // Replace with your actual API key
const baseUrl = 'https://api.nal.usda.gov/fdc/v1';

client.get('/get_data', (req,res)=>{
    var searchQuery = req.query.searchKey;

    async function searchFoods(searchQuery) {
      try {
        const response = await axios.get(`${baseUrl}/foods/search?query=${searchQuery}&api_key=${apiKey}`);
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
        const foods = await searchFoods(searchQuery);
        if (foods.length > 0) {
          const firstFood = foods[0];
          const foodDetails = await getFoodDetails(firstFood.fdcId);
          return foodDetails; // Return foodDetails here
        } else {
          return null; // Return null when no matching foods are found
        }
      } catch (error) {
        console.error('Error:', error.message);
        return null; // Return null on error as well
      }
    }

    let resultFromIIFE = (async () => {
      let x = await main();
      if (x) {

        if(x['labelNutrients'] == undefined){
          // NO VALID RESULT
          console.log('No food details available.');
          res.json({status:false})
        }

        if(x['labelNutrients'] != undefined){
          // VALID DATA FOUND
          // DATA DESSEMBLY 
          let categories = ['fat', 'saturatedFat', 'transFat', 'cholesterol', 'sodium', 'carbohydrates', 'fiber', 'sugars', 'protein', 'calcium', 'iron', 'calories'];
          for(let i=0;i<12; i++){
            try{
              categories[i] = x['labelNutrients'][`${categories[i]}`]['value'];
            }
            catch{
              categories[i] = '-';
            }
          }


          let fat = categories[0];
          let saturatedFat = categories[1];
          let transFat = categories[2];
          let cholesterol = categories[3];
          let sodium = categories[4];
          let carbohydrates = categories[5];
          let fiber = categories[6];
          let sugars = categories[7];
          let protein = categories[8];
          let calcium = categories[9];
          let iron = categories[10];
          let calories = categories[11];


          res.json({status:true, searchQuery:searchQuery, fat:fat, saturatedFat:saturatedFat, transFat:transFat, cholesterol:cholesterol, sodium:sodium, carbohydrates:carbohydrates,
                    fiber:fiber, sugars:sugars, protein:protein, calcium:calcium, iron:iron, calories:calories
          })
        }
      } else {
        // NO VALID RESULT
        console.log('No food details available.');
        res.json({status:false})
      }
    })();
})

client.get('/', (req,res)=>{
    res.render('index.ejs');
});

client.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`);
});
    