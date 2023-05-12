# Virtual Study Room

The Virtual Study Room is an online platform designed to address the lack of motivation in existing study tools. We noticed that many existing tools either lack features to motivate learners or include unnecessary distractions that can hinder learning. Our goal was to create a space where people could come together to study while also enjoying streaming music services and real-time interaction with others. We believe that this combination of features will create a supportive environment that encourages learning and motivates users to reach their goals

The platform features real-time streaming music services to keep users engaged while they study. The platform also features an award and coins system with a leaderboard to motivate users. Users can earn coins by achieving certain goals, and use them to unlock more profiles, music, and backgrounds.

The platform also has a private room feature where the owner friends can join and study together while enjoying the available music.

## Tech Stack

Here's the list of the technologies used in the project:

- Node.js
- Express.js
- React
- MongoDB
- Socket.IO

## Installation

### Prerequisites

- Node.js: Make sure you have Node.js installed on your local machine before proceeding with the installation. You can download Node.js from the official website: https://nodejs.org/en/download/
- npm: npm is the package manager for Node.js. It comes bundled with Node.js. Make sure you have a recent version of npm installed. You can check the version of npm installed by running the command: `npm -v`.

### Clone the repository

Clone the repository using the following command:

```bash
git clone https://github.com/UOA-CS732-SE750-Students-2023/project-group-amber-axolotls.git
```

Change to the project directory:

```bash
cd project-group-amber-axolotls
```

### Install dependencies

> Execute below code from project directory.

#### Server

To install the server dependencies, run the following command:

```bash
npm run install-server
```

This will install all the required dependencies for the server.

#### Client

To install the client dependencies, run the following command:

```bash
npm run install-client
```

This will install all the required dependencies for the client.

#### All

To install all the dependencies (server and client), run the following command:

```bash
npm run install
```

This will install all the required dependencies for the server and client.

## Usage

### Running the server

To start the server, run the following command:

```bash
npm run server
```

This will start the server and listen for incoming requests at address `http://localhost`

### Running the client

To start the client, run the following command:

```bash
npm run client
```

This will start the client and open it in a new browser tab.



> **Note!**
>
> The frontend must be run from `http://localhost` and not any other address such as `http://127.0.0.1`. This is because we use Firebase authentication, which requires the domain to be whitelisted for security purposes. By default, only `http://localhost` is whitelisted for authentication.

### Connecting to the backend server from the frontend

#### Local server

By default, the frontend will try to connect to the backend server running on `http://localhost:4000`. If you need to change this URL, alter the contents of `.env` file:

```properties
VITE_SERVICE_URL=http://localhost:4000/api

VITE_SOCKET_URL=http://localhost:4000
```

Replace `http://localhost:4000` with the URL of your local backend server.

#### Deployed server

Currently, the application has been deployed at url `https://amber-axolotls.herokuapp.com`

To connect to the deployed backend server, you can change the `.env` file to point to the remote URL. For example:

```properties
VITE_SERVICE_URL=https://amber-axolotls.herokuapp.com/api

VITE_SOCKET_URL=https://amber-axolotls.herokuapp.com/
```

## Demo Login Details

To allow you to try out the platform with coins to purchase, we have provided two different user accounts. Here are the login details:

### User 1:

- Username: `tester1`
- Password: `password`
- Coins: 100000

### User 2:

- Username: `tester2`
- Password: `password`
- Coins: 1200 (default value for new users)



Additionally, `tester1` and `tester2` have been set up as friends by default. You can use these accounts to test out the private room feature and study together while enjoying the music available on the platform. Please note that these accounts are only for demo purposes and should not be used for any other purposes.

## Testing

### Running Tests

To run tests for only the client, go to project directory then use the following commands:

```bash
cd client
npm install
npm run test
```

To run tests for only the server, go to project directory then use the following commands:

```bash
cd server
npm install
npm run test
```

## Contribution

- **Team Name:** Amber Axolotls

| Name            | GitHub Username |
| --------------- | --------------- |
| Frank Ji        | FrankJi3        |
| Mike Ma         | sma148          |
| Qingyang Li     | qingyang0506    |
| Harry Qu        | HarryQu1229     |
| Yinuo Xue       | yinuoxue        |
| Xiaoxiao Zhuang | cczhuang420     |

