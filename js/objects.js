"use strict";

const deleteBtn = "<a href='#' class='delete text-white bg-danger rounded-3 align-items-center'><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash3-fill\" viewBox=\"0 0 16 16\">\n" +
    "  <path d=\"M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z\"/>\n" +
    "</svg>Delete</a>";

const editBtn = "<a href='#' class='edit text-white bg-success rounded-3 align-items-center'><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-pencil-square\" viewBox=\"0 0 16 16\">\n" +
    "  <path d=\"M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z\"/>\n" +
    "  <path fill-rule=\"evenodd\" d=\"M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z\"/>\n" +
    "</svg>Edit</a>";

const modalBtn = `<button type="button" class="btn btn-primary" id="modal-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">+</button>`

const submitForm = `<label for="title"> Add a movie
\t<input type="text" placeholder="Enter Movie Title..." name="title" id="title">
\t</label>
\t<br>
<fieldset class="rating">
\t<input type="radio" id="1-star" name="star" class="star" value="5"
\t\t>
\t<label for="1-star">1</label>
\t<input type="radio" id="2-star" name="star" class="star" value="4"
\t\t>
\t<label for="2-star">2</label>
\t<input type="radio" id="3-star" name="star" class="star" value="3"
\t\t>
\t<label for="3-star">3</label>
\t<input type="radio" id="4-star" name="star" class="star" value="2"
\t\t>
\t<label for="4-star">4</label>
\t<input type="radio" id="5-star" name="star" class="star" value="1"
\t\t>
\t<label for="5-star">5</label>
</fieldset>`

const modalContent = `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ${submitForm}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" id="submit-button">Understood</button>
      </div>
    </div>
  </div>
</div>`


function Movie(id, title, rating) {
    this.id = id;
    this.title = title;
    this.rating = rating;
    // this.poster = poster;

    this.delete = function () {
        fetch(`https://adaptive-dent-wasabi.glitch.me/movies/` + this.id, {
            method: `DELETE`
        }).then(() => getMovies())
    }

    this.add = function(){
        let addedMovie = {
                title: this.title,
                rating: this.rating
            };

        fetch("https://adaptive-dent-wasabi.glitch.me/movies", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addedMovie),
        }).then(() => getMovies());
    }

    this.edit = function(){
        let editedMovie = {
            title: this.title,
            rating: this.rating
        };
        fetch(`https://adaptive-dent-wasabi.glitch.me/movies/` + this.id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedMovie)
        }).then(() => console.log("Edited movie: " + this.title))
            .then(() => getMovies());
    }
}

$(document).ready(() => {
    $('div#spinner').html(`<div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`)
    getMovies(); //Render movies
});

let movieContainer =[];

//// movie catcher
function getMovies() {
    movieContainer = [];
    fetch(`https://adaptive-dent-wasabi.glitch.me/movies`)
        .then((response) => response.json())
        .then((data) => {
            $("#movies").empty();
            $("#spinner").empty();
            data.forEach(function (m) {
                movieContainer.push(new Movie(m.id, m.title, m.rating))
                $("#movies").append(`<div class="card col-4">Title: ${m.title} Rating: ${m.rating} <span id="movie-id" style="display: none">${m.id}</span>${editBtn} ${deleteBtn}</div>`);
            })
            $("#movies").append(`<div class="card col-4">${modalBtn} ${modalContent}</div>`)

        })
        .then(() => {
            addMovie();
            deleteMovie();
            console.log(movieContainer)
        }).catch(error => console.error(error));
}

const addMovie = () => {
    $("#submit-button").click(function (e) {
        e.preventDefault()
        let title = $("#title").val();
        let rating = $('input[name="star"]:checked').val();
        let movie = new Movie('', title, rating);
        if (title === '' && rating === undefined) {
                    $("#title").css("border-color", "red")
                    $("#title").attr("placeholder", "Enter a title")
                } else if (title === '') {
                    $("#title").css("border-color", "red")
                } else if (rating === undefined) {
                    console.log('need a rating')
                } else {
                    movie.add()
                }
    })
}

const deleteMovie = () => {
    $(".delete").click(function (e) {
        e.preventDefault();
        let movieID = parseInt($(this).siblings("#movie-id").html())
        for (let movie of movieContainer) {
            if (movie.id === movieID) {
                movie.delete()
                break;
            }
        }
    })
}

const editMovie = () => {
    let movieID = parseInt($(this).siblings("#movie-id").html())
    $(".edit").click(function () {

    })

    $("#edit-movie").submit(function (e) {
        e.preventDefault();
        for (let movie of movieContainer) {
            if (movie.id === movieID) {
                movie.edit()
            }
        }
    })
}

/////      https://adaptive-dent-wasabi.glitch.me/movies

/////      http://www.omdbapi.com/?${OMDB_API_KEY}&t=&plot=short&y=1991