/* Pull in elements by ID from HTML */
let movieBtn = document.getElementById('movie-btn');
let foodBtn = document.getElementById('food-btn');

/* Add button functionality to store movie and food query data into arrays */
movieBtn.addEventListener('click', (event) => {
    event.preventDefault();

    let genre = document.querySelector('#genre').value;
    let score = document.querySelector('#score').value;
    let runtime = document.querySelector('#runtime').value;

    let searchMovieInfo = [genre, score, runtime];
    console.log(searchMovieInfo);
    return searchMovieInfo;
})

foodBtn.addEventListener('click', (event) => {
    event.preventDefault();

    let zip = document.querySelector('#zip').value;
    let foodType = document.querySelector('#food-type').value;

    let searchFoodInfo = [zip, foodType];
    console.log(searchFoodInfo);
    return searchFoodInfo;
})