import { ImdbApiRatings } from './imdbapi-ratings.model';

export class ImdbApiGlobal {
    Title : string;
    Year: string;
    Rated : string;
    Released : string;
    Runtime : string;
    Genre : string;
    Director : string;
    Writer : string;
    Actors : string;
    Plot : string;
    Language : string;
    Country : string;
    Awards : string;
    Poster : string; 
    Ratings: ImdbApiRatings[];
    Metascore : string;
    imdbRating : string;
    imdbVotes : string;
    imdbID : string;
    Type : string;
    totalSeasons : string;
    Response : string;
}