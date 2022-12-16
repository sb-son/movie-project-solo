function Movie(id, title, genre, rating){
    this.id = id
    // this.poster = poster
    this.title = title
    this.genre = genre
    // this.plot = plot
    this.rating = rating
    // this.iRating = irating


    this.delete = function () {
        fetch(`https://adaptive-dent-wasabi.glitch.me/movies` + this.id, {
            method: `DELETE`
        }).then(() => console.log("Deleted: " + this.id))
    }
    this.add = function(){

    }
    this.edit = function(){

    }
    this.thisId = function(){
        return this.id;
    }
}

/////      https://adaptive-dent-wasabi.glitch.me/movies

/////      http://www.omdbapi.com/?${OMDB_API_KEY}&t=&plot=short&y=1991