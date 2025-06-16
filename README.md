<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

A professional, production-ready Task Manager API built with the NestJS framework. This project demonstrates modular architecture, robust authentication, user and task management, and best practices for scalable server-side applications.

## Tech Stack

- Node.js
- NestJS
- TypeScript
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Yarn

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Features Implemented

This project includes the following professionally implemented features:

- **User Management:**  
  Full CRUD operations for users, including user schema definition, service, controller, and integration with MongoDB using Mongoose.

- **Task Management:**  
  Comprehensive task management module with support for creating, updating, retrieving, and deleting tasks. Includes DTOs, interfaces, and schema validation.

- **Authentication & Authorization:**  
  Secure authentication module with guards, decorators, and JWT-based strategies to protect routes and manage user sessions.

- **Common Utilities:**  
  Shared services and modules for reusable logic and constants, promoting DRY principles and modular architecture.

- **Rate Limiting:**  
  Integrated throttling to protect APIs from abuse, using NestJS ThrottlerModule.

- **Configuration Management:**  
  Centralized configuration using NestJS ConfigModule for environment variables and application settings.

- **Modern Project Structure:**  
  Organized codebase following best practices for scalability, maintainability, and clarity, including separation of concerns and modular design.

- **Deployment Ready:**  
  Instructions and support for deploying the application to production environments, including cloud deployment options.

## Configuration

To run this project, create a `.env` file in the root directory with the following environment variables:

```env
# Database Configuration
MONGODB_URI=
PORT=
DB_NAME=

# JWT configurations
JWT_SECRET=
JWT_EXPIRE_TIME=
```

Fill in the values according to your environment and security requirements.

## API Endpoints for Testing

Below are the main API endpoints you can use to test the core features of this application:

### Task Endpoints

- `POST /tasks` — Create a new task (Authenticated)
- `GET /tasks` — Get all tasks (Authenticated, returns tasks for the user, supports pagination: `?page=2&limit=10`)
- `GET /tasks/:id` — Get task by ID (Authenticated, only own tasks)
- `PATCH /tasks/:id` — Update task by ID (Authenticated, only own tasks)
- `DELETE /tasks/:id` — Delete task by ID (Authenticated, only own tasks)

### Authentication Endpoints

- `POST /auth/login` — Authenticate user and receive JWT
- `POST /auth/register` — Register a new user

### User Endpoints

- `GET /users` — Get all users (Admin only)
- `GET /users/:id` — Get user by ID (Authenticated user can get their profile)
- `PATCH /users/:id` — Update user by ID (Authenticated user can update their profile)
- `DELETE /users/:id` — Delete user by ID (Authenticated user can delete their profile)

### Example: Creating a User

**Request:**

```
POST /auth/register
Content-Type: application/json
{
  "name": "johndoe",
  "email": "john@example.com",
  "password": "yourPassword"
}
```

### Example: Creating a Task

**Request:**

```
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json
{
  "title": "My Task",
  "description": "Task details"
}
```

### Example: Login

**Request:**

```
POST /auth/login
Content-Type: application/json
{
  "email": "john@example.com",
  "password": "yourPassword"
}
```

**Response:**

```
{
  "access_token": "<jwt_token>"
}
```

### Example: Paginated Tasks Response

**Request:**

```
GET /tasks?page=2&limit=2
Authorization: Bearer <token>
```

**Response:**

```json
{
  "data": [
    {
      "_id": "60c72b2f9b1e8a001c8d4567",
      "title": "Task 3",
      "description": "Third task details",
      "userId": "60c72b2f9b1e8a001c8d1234",
      "createdAt": "2025-06-16T10:00:00.000Z",
      "updatedAt": "2025-06-16T10:00:00.000Z"
    },
    {
      "_id": "60c72b2f9b1e8a001c8d4568",
      "title": "Task 4",
      "description": "Fourth task details",
      "userId": "60c72b2f9b1e8a001c8d1234",
      "createdAt": "2025-06-16T10:05:00.000Z",
      "updatedAt": "2025-06-16T10:05:00.000Z"
    }
  ],
  "page": 2,
  "limit": 2,
  "total": 6,
  "totalPages": 1
}
```

> **Note:** All endpoints (except /auth/register and /auth/login) require authentication. Use the JWT token from `/auth/login` in the `Authorization: Bearer <token>` header.

---

**Recent Features & Changes:**

- Added admin-only access to list all users.
- User profile endpoints now require authentication and only allow self-access.
- Task endpoints are user-scoped: users can only access and modify their own tasks.
- Improved error handling and validation for all endpoints.
- Enhanced JWT authentication and route protection.
- Added DTOs and validation pipes for user and task creation/update.
- Updated test coverage for new endpoints and features.

For more details, see the code and tests in the `src/` directory.

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
