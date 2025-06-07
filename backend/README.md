# Plateau Scholarship Backend

This is the backend API for the Plateau State Scholarship Portal built with NestJS.

## Features

- User authentication (JWT + Google OAuth)
- Application management
- File upload handling
- Admin dashboard APIs
- MongoDB integration
- Swagger API documentation

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   - MongoDB connection string
   - JWT secret
   - Google OAuth credentials

3. **Start MongoDB:**
   Make sure MongoDB is running on your system or use a cloud instance.

4. **Run the application:**
   ```bash
   # Development
   npm run start:dev
   
   # Production
   npm run build
   npm run start:prod
   ```

## API Documentation

Once the server is running, visit:
- API Documentation: http://localhost:3000/api/docs
- Health Check: http://localhost:3000/api

## Project Structure

```
src/
├── applications/          # Application management
├── auth/                 # Authentication & authorization
├── users/                # User management
├── upload/               # File upload handling
├── app.module.ts         # Main application module
└── main.ts              # Application entry point
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/plateau-scholarship` |
| `JWT_SECRET` | JWT signing secret | Required |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Optional |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Optional |
| `FRONTEND_URL` | Frontend application URL | `http://localhost:8080` |
| `PORT` | Server port | `3000` |

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback

### Applications
- `POST /api/applications` - Submit application
- `GET /api/applications` - Get all applications (admin)
- `GET /api/applications/:id` - Get application by ID
- `PATCH /api/applications/:id/status` - Update application status
- `POST /api/applications/:id/documents` - Upload application document

### Users
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user (admin)
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Upload
- `POST /api/upload` - Upload file

## Development

```bash
# Watch mode
npm run start:dev

# Debug mode
npm run start:debug

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:cov
```

## Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Set production environment variables

3. Start the application:
   ```bash
   npm run start:prod
   ```

## Security Features

- JWT authentication
- Password hashing with bcrypt
- Input validation
- CORS configuration
- Rate limiting (can be added)
- Helmet security headers (can be added)