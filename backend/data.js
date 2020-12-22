import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Einstein",
      email: "admin@houseofglamour.co.ke",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
    },
    {
      name: "Shopper",
      email: "shopper@gmail.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Grey Flowered",
      category: "Duvet Covers",
      image: "/images/products/greyFlowery.jpg",
      brand: "Cotton Duvets",
      price: 10000,
      rating: 4.5,
      numReviews: 10,
      countInStock: 7,
      description: "Cotton with 300tc",
    },
    {
      name: "7Pc Utensil Set",
      category: "Kitchenware",
      image: "/images/products/utensil_set.jpg",
      brand: "Arshia",
      price: 7000,
      rating: 4.9,
      numReviews: 14,
      countInStock: 0,
      description: "Arshia 7pc utensil set with stand.",
    },
    {
      name: "Ceramic Cooking Pots",
      category: "Cookware",
      image: "/images/products/ceramic_hover.jpg",
      brand: "Arshia",
      price: 28000,
      rating: 5.0,
      numReviews: 6,
      countInStock: 4,
      description: "Ceramic cookware non stick and non scratch",
    },
    {
      name: "Vaccum Cleaner",
      category: "Other Appliances",
      image: "/images/products/vaccum.jpg",
      brand: "Arshia",
      price: 18000,
      rating: 4.5,
      numReviews: 16,
      countInStock: 0,
      description: "Arshia vaccum cleaner.",
    },
  ],
};

export default data;
