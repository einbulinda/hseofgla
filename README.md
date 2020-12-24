#House of Glamour Website

1. Install tools
2. Website template
3. Display Products
4. Create a react app
   1. npx create-react-app frontend
   2. npm start
   3. copy index.html content to App.js
   4. copy style.css to index.css
   5. replace class with className
5. Create Rating and Product Component
   1. create components/Rating.js
   2. create div.rating
   3. style div.rating, span and last span
   4. create product component
   5. use Rating Component created.
6. Build Product Screen
   1. install react-router-dom
   2. use BrowserRouter and Route for Home Screen
   3. create HomeScreen.js
   4. Add product list code there
   5. Create ProductScreen.js
   6. Route from product details to App.js
   7. 3 columns of product image, info and action
7. Create Node.js Server
   1. run npm init in root folder
   2. Update package.json set type:module
   3. Add .js to imports
   4. npm install express
   5. create server.js
   6. add start command as node backend/server.js
   7. require express
   8. create route for /return backend is ready
   9. move products.js from frontend to backend
   10. create route for /api/products
   11. return products
   12. run npm start
8. Load Products From Backend
   1. edit HomeScreen.js
   2. define products, loading and error.
   3. create useEffect
   4. define async fetchData and call it
   5. install axios
   6. get data from /api/products
   7. show them in the list
   8. create Loading Component
   9. create Message Box Component
   10. use them in HomeScreen
9. Add Redux to Home Screen
   1. npm install redux react-redux
   2. Create store.js
   3. initState= {products:[]}
   4. reducer = (state, action) => switch LOAD_PRODUCTS: {products: action.payload}
   5. export default createStore(reducer, initState)
   6. Edit HomeScreen.js
   7. shopName = useSelector(state=>state.products)
   8. const dispatch = useDispatch()
   9. useEffect(()=>dispatch({type: LOAD_PRODUCTS, payload: data})
   10. Add store to index.js
10. Add Redux to Product Screen
    a. create product details constants, actions and reducers
    b. add reducer to store.js
    c. use action in ProductScreen.js
    d. add /api/product/:id to backend api
11. Handle add to cart button
12. Implement Add To Cart Action
13. Build Cart Screen
    1. create 2 columns for cart items and cart action
    2. cartItems.length === 0 ? cart is empty
    3. show item image, name, qty and price
    4. Proceed to Checkout button
    5. Implement remove from cart action
14. Implement remove from cart action
    a. create removeFromCart constants, actions and reducers
    b. add reducer to store.js
    c. use action in CartSreen.js
15. Create Sample Users In MongoDB
    1. npm install mongoose
    2. connect to mongodb
    3. create config.js
    4. npm install dotenv
    5. export MONGODB_URL
    6. create models/userModel.js
    7. create userSchema and userModel
    8. create models/productModel.js
    9. create productSchema and productModel
    10. create userRoute
    11. Seed sample data
16. Create Sample Products In MongoDB
    1. create models/productModel.js
    2. create productSchema and productModel
    3. create productRoute
    4. Seed sample data
17. Create Sign-in Backend
    a. create /signin api
    b. check email and password
    c. generate token
    d. install json web token
    e. return token and data
    f. test api using postman
18. Design SignIn Screen
    a. create SigninScreen
    b. render email and password fields
    c. create signin constants, actions and reducers
    e. Update Header based on user login
19. Implement SignIn Action
    1. create signin constants, actions and reducers
    2. add reducer to store.js
    3. use action in SigninScreen.js
20. Create Register Screen and Backend API
    a. create API for /api/users/register
    b. insert new user to the database
    c. return new user info and token
    d. create RegisterScreen
    e. add fields
    f. style fields
    g. add screen to App.js
21. Create shipping screen
    a. create checkoutSteps.js component
    b. create shipping fields
    c. implement shipping constant, action and reducers
22. Create Payment Screen
    1. create payment fields
    2. implement shipping constant, actions and reducers
23. Design Place Order Screen
24. Create Place Order API
    a. createOrder api
    b. create orderModel
    c. create orderRouter
    d. create post order route
25. Implement PlaceOrder Action
