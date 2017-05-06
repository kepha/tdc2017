import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
 
export class MovieService { 

    static PRIVATE_KEY : string = '';

    static get parameters() {
        return [[Http]];
    }
 
	constructor(private http:Http) {
		
	}
 
    searchMovies(movieName) {
        var url = 'https://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI(movieName) + '&api_key=' + MovieService.PRIVATE_KEY;
        var response = this.http.get(url).map(res => res.json());
		return response;
    }
}