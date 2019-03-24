import { newsApiArticle } from "./newsapi-article.model";


export class newsApiGlobal{
    totalResults:number;
    status:string;
    articles:newsApiArticle[];
}