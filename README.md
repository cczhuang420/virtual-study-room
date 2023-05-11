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

This will start the server and listen for incoming requests at address `http://localhost:4000`

### Running the client

To start the client, run the following command:

```bash
npm run client
```

This will start the client and open it in a new browser tab.

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

## Testing

### Adding Tests

To add tests, create a new test file in the `tests` directory in either the client or server folder, depending on what you are testing. Make sure the filename ends with `.test.js`. You can use any testing framework you prefer, but we recommend using Jest, which is already included in the project.

### Running Tests

To run all tests, use the following command:

```bash
npm run test
```

To run tests for only the client or server, use the following commands:

```bash
npm run test-server
```

If you want to run a specific test file, use the following command:

```bash
npm run test -- <file-path>
```

Replace `<file-path>` with the path to the test file you want to run.

We strongly recommend running tests before submitting any changes to the codebase. This will ensure that new changes do not introduce any bugs or regressions.

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

