export interface Product {
    _id?: string;
    name: string;
    shortDescription: string;
    description: string;
    price: number;
    discount: number;
    images: string[];
    categoryId: string[]; // This will hold the ObjectId of categories
    isFeatured: boolean;
    isNew: boolean;
}
