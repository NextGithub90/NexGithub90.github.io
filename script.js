// fersi ajax
/* $('.search-button').on('click', function ()  {
  
  $.ajax({
    url: "http://www.omdbapi.com/?apikey=18d0aa6e&s=" + $('.input-keyword').val(),
    success: (results) => {
      const movies = results.Search;
      let cards = "";
      movies.forEach((m) => {
        cards += showimg(m);
      });
      $(".movie-container").html(cards);
  
      //Ketika tombol di klik
      $(".modal-detail-button").on("click", function () {
        $.ajax({
          url:
            "http://www.omdbapi.com/?apikey=18d0aa6e&i=" + $(this).data("imdbid"),
          success: (s) => {
            const movieDetail = showdetails(s);
            $(".modal-body").html(movieDetail);
          },
          error: (e) => {
            console.log(e.responseText);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });
}) */

// versi fetch
const searchButton = document.querySelector(".search-button");

 searchButton.addEventListener("click", function () {
  const inputKeywords = document.querySelector(".input-keyword");
    fetch("http://www.omdbapi.com/?apikey=18d0aa6e&s=" + inputKeywords.value + "&type=movie&language=id")

    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === "False") {
        throw new Error(response.Error);
      }
      let cards = "";
      const movies = response.Search;
      movies.forEach((m) => (cards += showimg(m)));
      const MovieContainer = document.querySelector(".movie-container");
      MovieContainer.innerHTML = cards;

      // ketika tombol di klik
      const modalDetailButton = document.querySelectorAll(".modal-detail-button");

      modalDetailButton.forEach((button) => {
        button.addEventListener("click", function () {
          const imdbid = this.dataset.imdbid;
          fetch("http://www.omdbapi.com/?apikey=18d0aa6e&i=" + imdbid + "&language=id")
            .then((response) => response.json())
            .then((m) => {
              const movieDetail = showdetails(m);
              const modalBody = document.querySelector(".modal-body");
              modalBody.innerHTML = movieDetail;
            })
            .catch((error) => {
              console.log("Terjadi kesalahan dalam permintaan API:", error);
            });
        });
      });
    })
    .catch((error) => {
      console.log("Terjadi kesalahan dalam permintaan API:", error);
    });
}); 


/* // fetch refactor(lebih rapi)
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  try {
    const inputKeyword = document.querySelector(".input-keyword");
    const movies = await getMpvis(inputKeyword.value);
    updateUI(movies);
  } catch (e) {
    console.log(e);
  }
});

function getMpvis(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=18d0aa6e&s=" + keyword)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === "False") {
        throw new Error(response.Error);
      }
      return response.Search;
    });
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((m) => (cards += showimg(m)));
  const MovieContainer = document.querySelector(".movie-container");
  MovieContainer.innerHTML = cards;
}
// ketika tombol di klik fetc refactor
document.addEventListener("click", async function (e) {
  try {
    if (e.target.classList.contains("modal-detail-button")) {
      const imdbid = e.target.dataset.imdbid;
      const movieDetail = await getMovieDetail(imdbid);
      updateUIDetail(movieDetail);
    }
  } catch (e) {
    console.log(e);
  }
});

function getMovieDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=18d0a6e&i=" + imdbid)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((m) => m);
}

function updateUIDetail(m) {
  const movieDetail = showdetails(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
} */

/* functions  tempat  */
function showimg(m) {
  return `<div class="col-md-3 my-2">
  <div class="card">
      <img src='${m.Poster}' class="card-img-top">
      <div class="card-body">
          <h5 class="card-title">${m.Title}</h5>
          <h6 class='card-subtitle mb-2 text-muted'>${m.Year}</h6>
          <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show detail</a>
      </div>
  </div>
</div>`;
}

function showdetails(m) {
  return `<div class="container-fluid">
  <div class="row">
    <div class="col-md-3">
      <img src="${m.Poster}" class="img-fluid">
    </div>
    <div class="col-md">
      <ul class="list-group">
        <li class="list-group-item judul"><h4>${m.Title} ${m.Year}  </h4></li>
        <li class="list-group-item Director"><strong> Director : </strong> ${m.Director} </li>
        <li class="list-group-item Actors"> <strong>Actors :</strong> ${m.Actors}</li>
        <li class="list-group-item Writer"><strong> Writer : </strong>${m.Writer}</li>
        <li class="list-group-item Plot"><strong>Plot twist :  </strong><br> ${m.Plot}</li>
      </ul>
    </div>
  </div>
</div>`;
}
