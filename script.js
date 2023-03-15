const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${
  Math.floor(Math.random() * 100) + 1
}`;

const SEARCHAPIURL =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';

const IMGPATH = 'https://image.tmdb.org/t/p/w1280';

const main = document.querySelector('main');
const search = document.querySelector('#search');
const searchbtn = document.querySelector('#searchbtn');
const footer = document.querySelector(' #footer');

getData(APIURL);
async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    console.log(data.page);
    //var testPage=data.page;
    showmovies(data.results);
    getpagination(data.page);
  } catch (e) {
    console.log(e.message);
  }
}

function showmovies(movies) {
  main.innerHTML = '';
  movies.forEach((movie) => {
    // const img=document.createElement('img');
    // img.src=IMGPATH+movie.poster_path;
    // document.body.appendChild(img);
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
           <img src="${IMGPATH + movie.poster_path}" alt="${movie.title}">
           <div class="img-info">
               <h3>${movie.title}</h3>
               <span class='${getClassbyrate(movie.vote_average)}'>${
      movie.vote_average
    }</span>
           </div>
           <div class="overview">
               <h3>Overview</h3>
               ${movie.overview}
           </div>
       `;
    main.appendChild(movieEl);
  });
}

function getClassbyrate(vote) {
  if (vote >= 8) {
    return 'green';
  }
  if (vote >= 5) {
    return 'orange';
  }
  if (vote >= 0) {
    return 'red';
  }
}

// search.onkeyup = (e)=>{
//     e.preventDefault();
//     if(search){
//         getData(SEARCHAPIURL+search.value);
//     }else{
//         getData(APIURL);
//     }
// }
searchbtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (search.value.trim() != '') {
    getData(SEARCHAPIURL + search.value);
  }
  getpagination(testPage);
});

function getpagination(page) {
  let totalpages = page;
  const F_content = document.createElement('div');
  F_content.classList.add('footer-content');
  F_content.innerHTML = '';

  F_content.insertAdjacentHTML(
    'afterbegin',
    "<button class='paginbtn'>Previous</button>"
  );

  for (let i = 1; i < totalpages; i++) {
    if (i < 4) {
      F_content.innerHTML += `
            <button class='paginbtn'>${i}</button>
        `;
    }
  }
  F_content.innerHTML += `<span style="color:#fff;">...</span><button class='paginbtn' style="margin-right:0.3rem; margin-left:0.3rem;">${totalpages}</button>`;
  F_content.insertAdjacentHTML(
    'beforeend',
    "<button class='paginbtn'>Next</button>"
  );
  footer.appendChild(F_content);
}
