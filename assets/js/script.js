/* Pull in elements by ID from HTML */
let movieBtn = document.getElementById('movie-btn');
let foodBtn = document.getElementById('food-btn');

/* Add button functionality to store movie and food query data into arrays */
movieBtn.addEventListener('click', (event) => {
    event.preventDefault();

    let genre = document.querySelector('#genre').value;
    let releaseYear = document.querySelector('#year').value;
    let runtime = document.querySelector('#runtime').value;
    
    if (genre && releaseYear && runtime) {
        makeUrl(genre, releaseYear, runtime);
    } else {
        alert("fill out all fields");
    }
})

foodBtn.addEventListener('click', (event) => {
    event.preventDefault();

    let zip = document.querySelector('#zip').value;
    //let foodType = document.querySelector('#food-type').value;

    let api_url = `https://api.documenu.com/v2/restaurants/zip_code/${zip}?key=f2ebf71e0ef21c8d0f7d37673878b79d`;

    getFoodApi(api_url);
})

async function getFoodApi(url) {
    const response = await fetch(url);
    var objects = await response.json();
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

// Genre
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

// Release year
function computeYear(inputYear) {
    if (inputYear) parseYear = `&release_date.gte=${inputYear}`;
}

// Runtime
function computeTime(inputTime) {
    inputTime && (parseTime = `&with_runtime.gte=${inputTime}`);
}

async function makeUrl(genre, releaseYear, runtime) {
    await computeGenre(genre);
    await computeYear(releaseYear);
    await computeTime(runtime);
    
    
    let api_url = `https://api.themoviedb.org/3/discover/movie?with_original_language=en${parseGenre}${parseYear}${parseTime}&sort_by=popularity.desc&api_key=a65d471e819b0a6c43ded7506d323429`;
    console.log(api_url);
    getMovieApi(api_url);
}

