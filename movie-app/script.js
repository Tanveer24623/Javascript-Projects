const MOVIEURL ='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=996f325dc253726ea49e9becfec8afff&page=1';
const TVURL ='https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=996f325dc253726ea49e9becfec8afff&page=1';
const genreUrl ='https://api.themoviedb.org/3/genre/movie/list?api_key=996f325dc253726ea49e9becfec8afff&language=en-US';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const movieBodyEl = document.getElementById('movies-category-body');
const genreBodyEl = document.getElementById('genre');
async function getMovies() {
    const resp = await fetch(MOVIEURL);
    const respData = await resp.json();
    getTopFive(respData);
    return respData;
}
getGenre();
getMovies();

async function getGenre(){
    const resp = await fetch(genreUrl);
    const respData = await resp.json();
    getGenreList(respData);
    return respData;
}
async function getTvShows(){
    const resp = await fetch(TVURL);
    const respData = await resp.json();
    return respData;
}
function getTopFive(respData){
    movies = respData.results;
    movies.forEach(movie => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
        <img src="${IMGPATH+movie.poster_path}" alt="${movie.title}" class="movie-poster">
        <div class="movie-bottom">
            <h4 class="movie-title">${movie.title}</h4>
            <div class="movie-detail">
                <span class="release-year">${movie.release_date.substring(0,4)}</span>
                <p class="movie-rating-text" id="average-rating">${movie.vote_average}</p>
        </div>

        </div>
    `;
    movieBodyEl.appendChild(movieEl);
    if(movie.vote_average >= 8){
    }else if(movie.vote_average >= 6.5){
    }else{
    }
    });

    movieEl.addEventListener('click', () => {
    alert('movie clicked');
    });
}
function getGenreList(respData){
    genres = respData.genres;
    genres.forEach(genre => {
        const genreEl = document.createElement('li');
        genreEl.classList.add('genre-link');
        genreEl.innerHTML = `
        ${genre.name}
    `;
    genreBodyEl.appendChild(genreEl);
    genreEl.addEventListener('click', () => {
        alert(genre.id);
    });
      $(".genre-ul li").mouseover(function(){
        $('.genre-ul li').removeClass('active');
        $(this).addClass('active');
    });
    }); 
}
      $(".languages li").mouseover(function(){
        $('.languages li').removeClass('active');
        $(this).addClass('active');
    });