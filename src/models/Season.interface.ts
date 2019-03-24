import { Episode } from './Episode.interface';

export interface Season {
    Title:string;
    totalSeasons:string;
    Response:string;
    Season:string;
    Episodes:Episode[];
}