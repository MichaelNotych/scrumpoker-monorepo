# Scrum Poker
Scrum Poker is a web-based planning poker application designed to help teams estimate their work collaboratively. This monorepo contains both the frontend and backend of the application.

## Live Demo
You can access the live application here:
 **[Scrum Poker Live](https://scrumpoker-jb19.onrender.com/)**

## Features
- Create and manage game rooms
- Authenticate users
- Submit and reveal voting results
- Real-time updates using Server-Sent Events (SSE)
- Store game data using MongoDB

## Tech Stack
- **Frontend** - Vue.js
- **Backend** - Node.js (Express.js)

## Getting Started
### Clone the repository
```sh
git clone https://github.com/MichaelNotych/scrumpoker.git
cd scrumpoker
```
### Backend Setup
1. Navigate to the backend directory:
	```sh
	cd ./server
	```
2. Install dependencies:
	```sh
	npm install
	```
3. Configure environment variables in a `.env` file:
	```sh
	DB_CONNECTION=<database_url>
	PORT=<preferred_port>
	NODE_ENV=<development | production>
	JWT_SECRET=<your_jwt_secret>
	CLIENT_URL=<your_client_url>
	```
4. Start the server
	```sh
	npm run dev
	```

### Frontend Setup
1. Navigate to the frontend directory:
	```sh
	cd ./client
	```
2. Install dependencies:
	```sh
	npm install
	```
3. Configure environment variables in a `.env` file:
	```sh
	VITE_API_URL=http://localhost:5000/api/v1
	```
4. Start the dev server
	```sh
	npm run dev
	```

## API Endpoints
### Room Endpoints
- POST `/api/v1/room` - Create a new room
- POST `/api/v1/room/vote` - Submit a vote
- POST `/api/v1/room/reveal` - Reveal room results
- POST `/api/v1/room/reset` - Reset room results
- POST `/api/v1/room/leave` - Leave a room
- GET `/api/v1/room/:id` - Get room details
- GET `/api/v1/room/enter/:id/:token` - Enter a room
### User Endpoints
- POST `/api/v1/user/auth` - Authenticate user

## License
This project is open-source under the MIT License.