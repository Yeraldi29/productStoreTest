interface IProducts {
  id: number;
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
interface ICustomers {
  id: number;
  name: string;
  email: string;
}
