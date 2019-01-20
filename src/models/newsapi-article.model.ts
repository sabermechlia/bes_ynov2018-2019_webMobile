import { newsApiSource } from "./newsapi-source.model";
export class newsApiArticle{
    source:newsApiSource[];
    author:string;
    title:string;
    description:string;
    url:string;
    urlToImage:string;
    publishedAt:string;
    content:string;

}