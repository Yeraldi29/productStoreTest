interface IProducts {
  category_id: number;
  name: string;
  description: string;
  price: number;
  amount: number;
  image: string;
  categories: ICategories;
}

interface ICategories {
  id: number;
  name: string;
}
