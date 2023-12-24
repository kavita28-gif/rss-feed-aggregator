# RSS-feed-aggregator

RSS-feed-aggregator is a simple feed aggregator application that allows you to perform CRUD operations on a list of feed urls. This application is built using Node.js, Express.js, Sequelize.js, and MySQL to provide a RESTful API for managing feed url data using authorized roles.

## Getting Started

To run the RSS-feed-aggregator from scratch, you need to follow these steps:

### Prerequisites

Before you begin, make sure you have Node.js and MySQL installed on your system.

#### Install Node.js

If you don't have Node.js installed, you can download it from the official website: [Node.js Downloads](https://nodejs.org/)

#### Install MySQL

You can download and install MySQL from the official website: [MySQL Downloads](https://www.mysql.com/downloads/)

### Setting up the Database

1. Checkout to master branch and take a pull.
2. In the project's `config` directory, locate the `config.js` file.
3. Open the `config.js` file and configure your MySQL database settings:

```
module.exports = {
  development: {
    jwtPrivateKey: 'your_jwtPrivateKey',
    database: 'your_database_name',
    username: 'your_database_username',
    password: 'your_database_password',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};
```
Replace 'your_database_name', 'your_database_username', and 'your_database_password' with your MySQL database credentials.
Replace 'your_jwtPrivateKey' with your secret key.

Installing Dependencies
After configuring the database, open your terminal and navigate to the project's root directory. Run the following command to install the necessary Node.js modules:
```
npm install
```
Running the Application
Once you have installed the required modules and set up the database, you can start the application by running:

```
npm run start
```
Registering and Navigating
With the application running, you can perform the following actions on postman:

Register: Access ```http://localhost:3000/users/register``` route to create a new Admin/User account. Provide an email, username, type and password to sign up.
##### Note: Only admins can register a basic user after login.

Login: Access the ```/users/login``` route to log in with your existing (user/admin) credentials.

RSS-feed-aggregator: If you are already logged in as :
#### user 
Create URL: Navigate to the ```/feeds/add``` route to add feed url which needs to be approved by the admin.

Read URL: Navigate to the ```/feeds/get``` route to fetch all saved feed urls from database & ```/feeds/get/:id``` route to fetch single saved feed url from database using id.
#### admin
Create URL: Navigate to the ```/feeds/add``` route to add feed url which needs to be approved by the admin.

Read URL: Navigate to the ```/feeds/get``` route to fetch all saved feed url from database & ```/feeds/get/:id``` route to fetch single saved feed url from database using id.

Update URL: Navigate to the ```/feeds/edit/:id``` route to update (approve/reject) saved feed url from database using id.

Delete URL: Navigate to the ```/feeds/delete/:id``` route to delete saved feed url from database using id.

Enjoy using the RSS-feed-aggregator App!
