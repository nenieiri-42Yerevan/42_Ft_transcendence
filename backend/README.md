## ft_transcendence API

<br>

### Introduction ⭐

ft_transcendence is an open source platform that enable users to play pong and interact with each other with with the hopes \
of connecting with other users equally interested in the game and having fun.

<br>

### Platform Features 🕹️

People who use the platform can perform the following actions:

- Users can signup and login to their accounts
- Users can play pong with the computer or other users
- Users can challenge other users
- Users can have chats and even create groups
- Authenticated users can access all causes as well as create a new cause, edit their created cause and also
  delete what they've created.

... and much more.

<br>

### Installation Guide ⚙️

To be witten...

<br>

### Usage 🛠️

- Run `npm run start:dev` to start the application.
- Connect to the API using Postman on port 7000.

<br>

### API Endpoints 🔗

<br>

- Main route

<br>

| HTTP Verbs | Endpoints      | Action              |
| ---------- | -------------- | ------------------- |
| GET        | /transcendence | To get welcome page |

<br>

- User routes

<br>

| HTTP Verbs | Endpoints                            | Action                                   |
| ---------- | ------------------------------------ | ---------------------------------------- |
| GET        | /transcendence/user                  | To get all the users                     |
| GET        | /transcendence/user:id               | To get a user by id                      |
| GET        | /transcendence/user:username         | To get a user by username                |
| GET        | /transcendence/user:id/avatar        | To get a user's avatar by user id        |
| GET        | /transcendence/user:id/matches       | To get a user's match history by user id |
| GET        | /transcendence/user:id/follows       | To get all users followd by another user |
| GET        | /transcendence/user:id/blocked       | To get all users blocked by another user |
| PUT        | /transcendence/user/update-user:id   | To update a user by id                   |
| PUT        | /transcendence/user/update-avatar:id | To update a user's avatar by id          |
| PUT        | /transcendence/user/follow/:uid/:tid | To follow/unfollow a user by id          |
| PUT        | /transcendence/user/block/:uid/:tid  | To block/unblock a user by id            |
| POST       | /transcendence/user/signup           | To sign up a new user account            |

<br>

- Auth routes

<br>

| HTTP Verbs | Endpoints                       	    | Action                                   |
| ---------- | ------------------------------------ | ---------------------------------------- |
| POST       | /transcendence/auth/signin/local     | To login an existing user account        |
| POST       | /transcendence/auth/logout           | To logout                                |
| POST       | /transcendence/auth/refresh          | To get a new pair of tokens              |
