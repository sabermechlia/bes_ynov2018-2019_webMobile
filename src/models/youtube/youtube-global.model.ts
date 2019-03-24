import { pageInfo } from "./pageInfo.model";
import { items } from "./items.model";
export class YoutubeGlobal{
    kind:string;
    etag:string;
    nextPageToken:string;
    regionCode:string;
    pageInfo :pageInfo[];
    items:items[];
}