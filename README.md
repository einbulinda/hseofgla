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
    c. use action in CartScreen.js
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
26. Create Order Screen
    1. build order api for /api/orders/:id
    2. create OrderScreen.js
    3. dispatch order details action in useEffect
    4. load data with useSelector
    5. show data like place order screen
    6. create order details constant, action and reducer
27. Add PayPal Button
    1. get client id from paypal
    2. set it in .env file
    3. create route form /api/paypal/clientId
    4. create getPaypalClientID in api.js
    5. add paypal checkout script in OrderScreen.js
    6. show paypal button
28. TODO: Add Mpesa Button
29. Implement Order Payment
    1. update order after payment
    2. create payOrder in api.js
    3. create route for /:id/pay in orderRouter.js
    4. Re-render after pay order
30. Display order history
    a. create customer api
    b. create api for getMyOrders
    c. show orders in profile screen
    e. style orders
31. Display User Profile
    a. user details api in backend to return user info
    b. show user info
    c. added jsconfig.json to improve the coding experience - the configuration improves auto import functionality in react project
32. Update user Profile
33. Create Admin View
    1. Create Admin Menu
    2. Create Admin Middleware in Backend
    3. Create Admin Route in Frontend
34. List Products
    1. Create Product List Screen
    2. Add reducer to store
    3. show products on the screen
35. Create Product
    1. build create product api
    2. build Create Product button
    3. define product create constant, action and reducer
    4. use action in Product List Screen
36. Product editing screen
    a. define state
    b. create fields for the product
    c. load product details
    d. add routes
37. Update Product
    a. update api
    b. define constants, reducers and action
    c. use action in product edit screen
38. Upload Product Image
    1. npm install multer
    2. add upload router in backend
    3. create uploads folder
    4. Handle frontend
39. Delete Product
    1. create delete api in backend
    2. create delete constants, action and reducer
    3. use it in product list screen
40. List Orders - Admin
    1. create order list api
    2. create Order List Screen
    3. Add reducer to store
    4. show products on the screen
41. Delete Order by Admin
    a. create delete order action and reducer
    b. add order delete action to order list
