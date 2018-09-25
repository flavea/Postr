
# Postr

A simple blog application with CRUD. Built using [Vue.js](https://vuejs.org/) for the application and [AdonisJs](https://adonisjs.com/) for the api and backend. Using [keen-ui](https://josephuspaye.github.io/Keen-UI) and [materializecss](https://materializecss.com) for the frontend framework. Created based on scotch.io's [building a twitter clone tutorial.](https://scotch.io/courses/build-a-twitter-clone-with-adonis-and-vue) so go there for detailed tutorials on building a vue.js website!

This contains:
- Login and register
 - Create, read, update, delete blog posts
 - Adding and deleting tags/category
 - Commenting and favoriting posts
 - Seeing users list and profiles
 - Following and unfollowing users
 - See posts list in certains tags/category

# Preview
You can preview the application at https://postr-app.herokuapp.com/

# To Install
**General:**
 1. Install [node.js](https://nodejs.org/en/)
 2. Install adonisJs cli through command prompt by using 
 ````npm i -g @adonisjs/cli````

**Run database**

 1. Through command prompt, change the current directory to postr/app
 2. Install modules by running the following code:
 ````npm install````
 3. Create database named 'postr' in your mysql database. You can access phpmyadmin using xampp or others.
 4. Create the tables through the command prompt by running migration using the following:
````adonis migration:run````
5. Run the database using:
````adonis serve````
Your api can be accessed through http://127.0.0.1:3333

**Run  the application**
 1. Through command prompt, change the current directory to postr/app
 2. Install modules by running the following code:
 ````npm install````
 3. Start the application through command prompt using:
 ````npm run dev````
 the command prompt will show you the link to access your application
