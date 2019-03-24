import { id } from "./id.model";
import { snippet } from "./snippet.model";

export class items{
    kind:string;
    etag:string;
    id:id[];
    snippet:snippet;
}