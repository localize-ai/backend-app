# LocalizeAI Backend

LocalizeAI is an AI-powered location discovery platform designed to help users find the best local spots, from coffee shops to restaurants, in Jakarta and beyond. With both image and text search capabilities, LocalizeAI enables users to explore places, read and share reviews, and navigate local hotspots with ease.

## Tech Stack

- AWS S3
- JWT
- Google Sign-In
- Mongoose
- Redis

## Features

- **User Authentication**: Secure authentication using JWT and Google Sign-In.
- **Place Discovery**: Search and discover local places with AI-powered recommendations.
- **Reviews**: Read and share reviews for various places.
- **Image Upload**: Upload images to AWS S3.
- **Caching**: Improve performance with Redis caching.

## Getting Started

### Prerequisites

- Node.js
- npm or pnpm
- MongoDB
- Redis
- AWS S3 account


### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/localize-ai-backend.git
    cd localize-ai-backend
    ```

2. Install dependencies:

    ```sh
    pnpm install
    ```

3. Create a `.env` file based on the `.env.example`:

    ```sh
    cp .env.example .env
    ```

4. Update the `.env` file with your configuration:

    ```env
    MONGO_URI=your_mongo_uri
    MONGO_DB_NAME=your_db_name
    FIREBASE_PROJECT_ID=your_firebase_project_id
    FIREBASE_PRIVATE_KEY=your_firebase_private_key
    FIREBASE_CLIENT_EMAIL=your_firebase_client_email
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRATION=your_jwt_expiration
    PORT=your_port
    REDIS_URL=your_redis_url
    AWS_S3_BUCKET_NAME=your_s3_bucket_name
    AWS_S3_BUCKET_REGION=your_s3_bucket_region
    AWS_S3_ACCESS_KEY=your_s3_access_key
    AWS_S3_SECRET_KEY=your_s3_secret_key
    TEST_EMAIL=your_test_email
    NODE_ENV=development
    ```

### Running the Application

1. Start the application:

    ```sh
    pnpm start
    ```

2. The application will be running at `http://localhost:your_port`.

## Project Structure

- `src/`: Source code
  - `app.module.ts`: Main application module
  - `main.ts`: Entry point of the application
  - `modules/`: Feature modules
    - `auth/`: Authentication module
    - `places/`: Places module
    - `storages/`: Storage module
    - `users/`: Users module
  - `common/`: Common utilities and helpers
  - `core/`: Core services and configurations

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.