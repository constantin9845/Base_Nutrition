const welcomeContainer = document.querySelector('#welcome_container');
const appContainer = document.querySelector('#app_container');
const aboutContainer = document.querySelector('#about_container');
const educationContainer = document.querySelector('#education_container');

const welcomeBtn1 = document.querySelector('#welcome_btn_1');
const welcomeBtn2 = document.querySelector('#welcome_btn_2');
const welcomeBtn3 = document.querySelector('#welcome_btn_3');

const navLinkHome = document.querySelector('#nav-link-home');

var returnButtons = document.querySelectorAll('.return_welcome');

welcomeBtn1.addEventListener('click', function(){
    welcomeContainer.style.transition = '0.3s ease-in all';
    welcomeContainer.style.opacity = '0';
    welcomeContainer.style.zIndex = '-5';

    appContainer.style.transition = '0.3s ease-in all';
    appContainer.style.opacity = '1';
    appContainer.style.zIndex = '10';
});

welcomeBtn2.addEventListener('click', function(){
    welcomeContainer.style.transition = '0.3s ease-in all';
    welcomeContainer.style.opacity = '0';
    welcomeContainer.style.zIndex = '-5';

    aboutContainer.style.transition = '0.3s ease-in all';
    aboutContainer.style.opacity = '0.9';
    aboutContainer.style.zIndex = '10';
});

welcomeBtn3.addEventListener('click', function(){
    welcomeContainer.style.transition = '0.3s ease-in all';
    welcomeContainer.style.opacity = '0';
    welcomeContainer.style.zIndex = '-5';

    educationContainer.style.transition = '0.3s ease-in all';
    educationContainer.style.opacity = '0.9';
    educationContainer.style.zIndex = '10';
});

function returnWelcome(){

    appContainer.style.transition = '0.3s ease-in all';
    appContainer.style.opacity = '0';
    appContainer.style.zIndex = '-5';

    aboutContainer.style.transition = '0.3s ease-in all';
    aboutContainer.style.opacity = '0';
    aboutContainer.style.zIndex = '-5';

    educationContainer.style.transition = '0.3s ease-in all';
    educationContainer.style.opacity = '0';
    educationContainer.style.zIndex = '-5';

    welcomeContainer.style.transition = '0.3s ease-in all';
    welcomeContainer.style.opacity = '0.9';
    welcomeContainer.style.zIndex = '10';
};

let return1 = returnButtons[0];
let return2 = returnButtons[1];
let return3 = returnButtons[2];

return1.addEventListener('click', ()=>{
    returnWelcome()
});
return2.addEventListener('click', ()=>{
    returnWelcome()
});
return3.addEventListener('click', ()=>{
    returnWelcome()
});

navLinkHome.addEventListener('click', ()=>{
    returnWelcome()
})


// REQUESTS FOR DATA
let searchBtn = document.querySelector('#submit_search');
let searchData;

let accumulatedData = {
    fat: 0,
    saturatedFat: 0,
    cholesterol: 0,
    sodium: 0,
    carbohydrates: 0,
    fiber: 0,
    sugars: 0,
    protein: 0,
    calcium: 0,
    iron: 0,
    calories: 0
};

let lastData = {
    fat: 0,
    saturatedFat: 0,
    cholesterol: 0,
    sodium: 0,
    carbohydrates: 0,
    fiber: 0,
    sugars: 0,
    protein: 0,
    calcium: 0,
    iron: 0,
    calories: 0
};

searchBtn.addEventListener('click', function(){
    let searchInput = $('#search_key').val()

    if(searchInput == ''){
        alert('Enter Product');
    }
    else{
        $.ajax({
            url: '/get_data',
            type: 'GET',
            data: {
                searchKey: searchInput
            },
            success: function(data){
                if(data.status == false){
                    alert('No Data found.');
                }
                if(data.status == true){
                    
                    for(let key in accumulatedData){
                        if(accumulatedData.hasOwnProperty(key)){
                            if(data[key] != '-'){
                                accumulatedData[key] = accumulatedData[key] + data[key];
                                lastData[key] = data[key];
                            }
                            else{
                                accumulatedData[key] = accumulatedData[key];
                            }
                        }
                    }

                    document.querySelector('#single_summary_title').innerHTML = `${data.searchQuery} (100g)`;
                    document.querySelector('#fat').innerHTML = `${data.fat}g`;
                    document.querySelector('#saturatedFat').innerHTML = `${data.saturatedFat}g`;
                    document.querySelector('#cholesterol').innerHTML = `${data.cholesterol}mg`;
                    document.querySelector('#sodium').innerHTML = `${data.sodium}mg`;
                    document.querySelector('#carbohydrates').innerHTML = `${data.carbohydrates}g`;
                    document.querySelector('#fiber').innerHTML = `${data.fiber}g`;
                    document.querySelector('#sugars').innerHTML = `${data.sugars}g`;
                    document.querySelector('#protein').innerHTML = `${data.protein}g`;
                    document.querySelector('#calcium').innerHTML = `${data.calcium}mg`;
                    document.querySelector('#iron').innerHTML = `${data.iron}mg`;
                    document.querySelector('#calories').innerHTML = `${data.calories}kcal`;
                }
            },
            error: function (request, status, error) {
                console.log(request.responseText);
            }
        })
    }
});


// ADD ITEM TO SUMMARY LIST
let addBtn = document.querySelector('#add_product');

addBtn.addEventListener('click', function(){

    // CHECK IF ITEM IS ADDED TWICE
    let summaryList = document.querySelector('.products_list_ul');

    let lastListItem = summaryList.lastElementChild;

    // ITEM ADDED MULTIPLE TIMES
    try{
        if(lastListItem.innerHTML.startsWith(document.querySelector('#single_summary_title').innerHTML.substring(0,4))){
            lastListItem.innerHTML += ` |`

            for(let key in accumulatedData){
                if(accumulatedData.hasOwnProperty(key)){
                        accumulatedData[key] = accumulatedData[key] + lastData[key]

                        document.querySelector('#total_calories').innerHTML = `${accumulatedData['calories']}kcal`;
                        document.querySelector('#total_fat').innerHTML = `${accumulatedData['fat']}g`;
                        document.querySelector('#total_protein').innerHTML = `${accumulatedData['protein']}g`;
                        document.querySelector('#total_carbohydrates').innerHTML = `${accumulatedData['carbohydrates']}g`;
                }
            }
        }
        else{
            let newListItem = document.createElement('li');
            newListItem.textContent = `${document.querySelector('#single_summary_title').innerHTML} |`
    
            summaryList.appendChild(newListItem)
        }
    }
    catch{
        let newListItem = document.createElement('li');
        newListItem.textContent = `${document.querySelector('#single_summary_title').innerHTML} |`
    
        summaryList.appendChild(newListItem)

        document.querySelector('#total_calories').innerHTML = `${accumulatedData['calories']}kcal`;
        document.querySelector('#total_fat').innerHTML = `${accumulatedData['fat']}g`;
        document.querySelector('#total_protein').innerHTML = `${accumulatedData['protein']}g`;
        document.querySelector('#total_carbohydrates').innerHTML = `${accumulatedData['carbohydrates']}g`;
    }
});


// RESET SUMMARY LIST
let resetBtn = document.querySelector('#reset_summary_btn');

resetBtn.addEventListener('click', function(){
    let summaryList = document.querySelector('.products_list_ul');
    summaryList.innerHTML = '';

    accumulatedData = {
        fat: 0,
        saturatedFat: 0,
        cholesterol: 0,
        sodium: 0,
        carbohydrates: 0,
        fiber: 0,
        sugars: 0,
        protein: 0,
        calcium: 0,
        iron: 0,
        calories: 0
    };

    document.querySelector('#total_calories').innerHTML = `${accumulatedData['calories']}kcal`;
    document.querySelector('#total_fat').innerHTML = `${accumulatedData['fat']}g`;
    document.querySelector('#total_protein').innerHTML = `${accumulatedData['protein']}g`;
    document.querySelector('#total_carbohydrates').innerHTML = `${accumulatedData['carbohydrates']}g`;

    document.querySelector('#single_summary_title').innerHTML = ``;
    document.querySelector('#fat').innerHTML = `0.0g`;
    document.querySelector('#saturatedFat').innerHTML = `0.0g`;
    document.querySelector('#cholesterol').innerHTML = `0.0mg`;
    document.querySelector('#sodium').innerHTML = `0.0}mg`;
    document.querySelector('#carbohydrates').innerHTML = `0.0g`;
    document.querySelector('#fiber').innerHTML = `0.0g`;
    document.querySelector('#sugars').innerHTML = `0.0g`;
    document.querySelector('#protein').innerHTML = `0.0g`;
    document.querySelector('#calcium').innerHTML = `0.0mg`;
    document.querySelector('#iron').innerHTML = `0.0mg`;
    document.querySelector('#calories').innerHTML = `0.0kcal`;
})

