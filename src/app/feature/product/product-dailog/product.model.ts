export interface IProduct {
  id?: number;
  title: string;
  thumbnail: string;
  productImage: any;
  price: number | null;
  shortDescription: string;
  description: string;
  productUrl: string;
  category: any;
  tags: any;
  createdBy?: number;
}
