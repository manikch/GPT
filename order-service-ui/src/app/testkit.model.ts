import { Brand } from './Brand.model';
import { Category } from './category.model';

export class TestKit {
    id: number;
    availability: boolean;
    popularity: number;
    releaseDate: Date;
    name: string;
    brand: Brand;
  category: Category;
  
  constructor(id: number, availability: boolean, popularity: number, releaseDate: Date, name: string, brand: Brand, category: Category) {
    this.id = id;
    this.availability = availability;
    this.popularity = popularity;
    this.releaseDate = releaseDate;
    this.name = name;
    this.brand = brand;
    this.category = category; 
  }
  }
  