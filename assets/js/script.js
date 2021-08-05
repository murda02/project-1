/* Pull in elements by ID from HTML */
let movieBtn = document.getElementById('movie-btn');
let foodBtn = document.getElementById('food-btn');
let closeBtn = document.querySelector('#close-btn');
let popupModal = document.querySelector('.modal');

/* Functionality for submit buttons */
// Movie submit button takes in genre, release year, and runtime, checks to make sure all exist, then runs makeUrl, otherwise alerts user to fill out info.
movieBtn.addEventListener('click', (event) => {
    event.preventDefault();

    let genre = document.querySelector('#genre').value;
    let releaseYear = document.querySelector('#year').value;
    let runtime = document.querySelector('#runtime').value;
    
    if (genre && releaseYear && runtime) {
        makeUrl(genre, releaseYear, runtime);
    } else {
        // alert("fill out all fields");
        popupModal.style.display = 'block';
    }
})

closeBtn.addEventListener('click', function() {
    popupModal.style.display = 'none';
})

// Food submit button takes in zipcode and cuisine type, checkes to make sure both exist, then computes the cuisine formatting function, builds the url, and extracts data from it, otherwise alerts user to fill out info.
foodBtn.addEventListener('click', (event) => {
    event.preventDefault();

    let zip = document.querySelector('#zip').value;
    let foodType = document.querySelector('#food-type').value;

    if (zip && foodType) {
        computeFood(foodType);

        let api_url = `https://api.documenu.com/v2/restaurants/zip_code/${zip}?${parseFood}key=f2ebf71e0ef21c8d0f7d37673878b79d`;

        getFoodApi(api_url);
    } else {
        alert("fill out all fields");
    }  
});

/* Asynchronous functions to run through URLs and pull out desired data */
async function getFoodApi(url) {
    const response = await fetch(url);
    var objects = await response.json();
    console.log(objects);
    for (let i = 0; i < objects.data.length; i++) {
        console.log(objects.data[i].restaurant_name);
    }
}

async function getMovieApi(url) {
    const response = await fetch(url);
    var objects = await response.json();
    console.log(objects);
    for (let i = 0; i < 5; i++) {
        console.log(objects.results[i].original_title);
    }
}

// Function to compute the url formatting for genre based on user input
function computeGenre(inputGenre) {
    if (inputGenre) {
        inputGenre = inputGenre.toLowerCase();
        switch (inputGenre) {
            case "action": 
                parseGenre = "&with_genres=28";
                break;
            case "adventure":
                parseGenre = "&with_genres=12";
                break;
            case "animation":
                parseGenre = "&with_genres=16";
                break;
            case "comedy":
                parseGenre = "&with_genres=35";
                break;
            case "crime":
                parseGenre = "&with_genres=80";
                break;
            case "documentary":
                parseGenre = "&with_genres=99";
                break;
            case "drama":
                parseGenre = "&with_genres=18";
                break;
            case "family":
                parseGenre = "&with_genres=10751";
                break;
            case "fantasy":
                parseGenre = "&with_genres=14";
                break;
            case "history":
                parseGenre = "&with_genres=36";
                break;
            case "horror":
                parseGenre = "&with_genres=27";
                break;
            case "music":
                parseGenre = "&with_genres=10402";
                break;
            case "mystery":
                parseGenre = "&with_genres=9648";
                break;
            case "romance":
                parseGenre = "&with_genres=10749";
                break;
            case "science fiction":
                parseGenre = "&with_genres=878";
                break;
            case "tv movie":
                parseGenre = "&with_genres=10770";
                break;
            case "thriller":
                parseGenre = "&with_genres=53";
                break;
            case "war":
                parseGenre = "&with_genres=10752";
                break;
            case "western":
                parseGenre = "&with_genres=37";
                break;
    }
    }
}

// Function to compute the url formatting based on user input for release year
function computeYear(inputYear) {
    if (inputYear) parseYear = `&release_date.gte=${inputYear}`;
}

// Function to compute the url formatting based on user input for runtime
function computeTime(inputTime) {
    inputTime && (parseTime = `&with_runtime.gte=${inputTime}`);
}

// Function that develops the movie url by running all three compute functions above, and building the url with the results, then pulling data from the url
async function makeUrl(genre, releaseYear, runtime) {
    await computeGenre(genre);
    await computeYear(releaseYear);
    await computeTime(runtime);
    
    
    let api_url = `https://api.themoviedb.org/3/discover/movie?with_original_language=en${parseGenre}${parseYear}${parseTime}&sort_by=popularity.desc&api_key=a65d471e819b0a6c43ded7506d323429`;
    getMovieApi(api_url);
}

// Computes formatting for cuisine type for restaraunt api
function computeFood(inputFood) {
    if (inputFood) {
        inputFood = inputFood.toLowerCase();
        switch (inputFood) {
            case "italian": 
                parseFood = "cuisine=italian&";
                break;
            case "american":
                parseFood = "cuisine=american&";
                break;
            case "chicken": 
                parseFood = "cuisine=chicken&";
                break;
            case "burgers": 
                parseFood = "cuisine=burgers&";
                break;
            case "salads": 
                parseFood = "cuisine=salads&";
                break;
            case "sandwiches": 
                parseFood = "cuisine=sandwiches&";
                break;
            case "soups": 
                parseFood = "cuisine=soups&";
                break;
            case "subs": 
                parseFood = "cuisine=subs&";
                break;
            case "chinese": 
                parseFood = "cuisine=chinese&";
                break;
            case "vietnamese": 
                parseFood = "cuisine=vietnamese&";
                break;
            case "pizza": 
                parseFood = "cuisine=pizza&";
                break;
            case "seafood": 
                parseFood = "cuisine=seafood&";
                break;
            case "indian": 
                parseFood = "cuisine=indian&";
                break;
            case "asian": 
                parseFood = "cuisine=asian&";
                break;
            case "diner": 
                parseFood = "cuisine=diner&";
                break;
            case "healthy": 
                parseFood = "cuisine=healthy&";
                break;
            case "irish": 
                parseFood = "cuisine=irish&";
                break;
            case "mediterranean": 
                parseFood = "cuisine=mediterranean&";
                break;
            case "noodles": 
                parseFood = "cuisine=noodles&";
                break;
            case "steak": 
                parseFood = "cuisine=steak&";
                break;
            case "vegetarian": 
                parseFood = "cuisine=vegetarian&";
                break;
        }
    }
}