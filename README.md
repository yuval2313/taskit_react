# Task-it

Task-it is an intuitive task management web-facing application with a variety of powerful features for creating, tracking, sorting and prioritizing tasks simply and efficiently. 

This repository holds the front-end powered by React.\
[Back-end](https://github.com/yuval2313/taskit_node) is a Node.js application utilizing the express framework.

## Features: 
* Create and edit descriptive tasks;
* Track task status;
* Prioritize your tasks;
* Quick and easy sorting and filtering;
* Group different types of tasks using labels;
* Integrated Google authentication and authorization;
* Google login integration; 
* Easily add tasks as Google Calendar events;

## Technologies:
 * Client side: React front-end application implemented using Redux for state management and communicating with the server side.
* [Server side](https://github.com/yuval2313/taskit_node): Node.js environment utilizing the Express framework as a back-end service, and MongoDB as an external database for storing data.
* Deployment: Hosted on an AWS EC2 Instance at [taskit.in](https://taskit.in).
References and access to Task-it can be provided upon request. 

## Installation

This app runs on node version 16.13.1.\
Make sure you also have NPM version 8.1.2.

### Install dependencies 
```bash
npm install
```
Requires [server side](https://github.com/yuval2313/taskit_node) to be set up and running!

## Usage

On the front-end, this application is dependent on 3 environment variables in order to function properly.

### Environment variables:

```bash
#Client ID for OAuth 2.0 client
REACT_APP_OAUTH_CLIENT_ID=

#Base URL for reaching server side
REACT_APP_API_URL=

#URL where application is being served
REACT_APP_URL=
```
### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

#### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
