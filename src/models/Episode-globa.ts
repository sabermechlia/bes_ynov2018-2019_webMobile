import { ImdbApiRatings } from "./imdbapi-ratings.model";
export interface EpisodeGolbale{
    Title:string;
    Season:string;
    Response:string;
    Year:string;
    Rated:string;
    Released:string;
    Episode:string;
    Runtime:string;
    Genre:string;
    
    Director:string;
    Writer:string;
    Actors:string;
    Plot:string;
    Language:string;
    Country:string;
    Awards:string;
    Poster:string;
    Ratings:ImdbApiRatings[];
    Metascore:string;
    imdbRating:string;
    imdbVotes:string;
    imdbID:string;
    seriesID:string;
    Type:string;
    
}