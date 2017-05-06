import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MovieService } from '../../service/movie-service';

@Component({
  selector: 'playlist',
  templateUrl: 'playlist.html',
  providers: [MovieService]
})
export class Playlist {

  movies: Array<any>;

  constructor(public navCtrl: NavController, private movieService: MovieService) {

  }
  
  searchMovieDB(event, key) {
    this.movies = [];
    if(event.target.value.length > 2) {
      this.movieService.searchMovies(event.target.value).subscribe(
        data => {
          this.movies = data.results; 
        },
        err => {
          this.movies = [];
          console.log("Error ");
        },
        () => console.log('Movie Search Complete')
      );
    }
  }  
}