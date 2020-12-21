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
