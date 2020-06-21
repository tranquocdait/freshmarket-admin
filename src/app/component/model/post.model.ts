import { UserElement } from "./user.model";

export class PostElement {
    constructor() {
    }
    postId: string;
    postName: string;
    userName: string;
    userElement: UserElement;
    description: string;
    unitPrice: number;
    address: string;
    dateOfPost: Date;
    province: string;
    imageURL: string;
    category: string;
    calculationUnit: string;
}
