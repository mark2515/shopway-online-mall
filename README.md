# shopway-online-mall
Shop Smart, Live Better with ShopWay. [Visit Site](https://shopway-4c77d3b0a927.herokuapp.com/)

# Development Environment
- React 17.0.1
- Node.js 16.20.2
- Express.js 4.17.1
- Mongoose 5.11.3

# Usage
### ECMAScript Modules
The backend of this project is implemented using ECMAScript Modules. To ensure compatibility and proper functionality, please verify that your Node.js environment is updated to version 14.6 or higher. Additionally, when importing files, it is essential to append the .js extension to the filenames. Neglecting to do so may lead to a "module not found" error due to ECMAScript Modules' strict resolution logic.

### Environment Variables
Create a **.env** file in the root directory and add the following content:
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<your-database-url>/?retryWrites=true&w=majority&appName=ShopWay
JWT_SECRET=<your-jwt-secret>
PAYPAL_CLIENT_ID=<your-paypal-client-id>
```

### Installing Dependencies
To set up the project, you need to install dependencies for both the backend and the frontend.

1. In the root directory, install backend dependencies:
```
npm install
```

2. Navigate to the frontend directory and install its dependencies:
```
cd frontend
npm install
```

### Running the Application
To launch both the frontend (on port 3000) and backend (on port 5000) simultaneously, use the following command:
```
npm run dev
```
To start only the backend, execute:
```
npm run server
```

### Packaging and Deployment
To create a production build of the frontend, follow these steps:
```
cd frontend
npm run build
```

### Database Test
You can use the following commands to create and destroy test data for users and products in the database:
- Insert Data:
```
npm run data:import
```
- Destroy Data:
```
npm run data:destroy
```
`If you are interested in accessing the site's management page, you are welcome to message me to obtain the administrator credentials.`

# Contributing
If you want to contribute to this project, please fork this repository and create a pull request, or drop me an email at kha112@sfu.ca
