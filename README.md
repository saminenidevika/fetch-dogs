# Fetch Frontend Take-Home Exercise

This is a React-based web application designed to help dog lovers search through a database of shelter dogs and find the perfect match for adoption!

The app allows users to log in, search for dogs by breed, filter results, and save their favorite dogs. Once finished, users can generate a match based on the dogs in their favorites list.

## Features

- Login screen to authenticate users with their name and email.
- Search dogs by breed with pagination.
- Filter dogs by breed and sort results alphabetically by breed.
- View detailed dog information (name, age, zip code, breed, image).
- Favorite dogs and generate a match based on selected favorites.
- Responsive design for optimal user experience.

## Technologies Used

- React
- Axios for API calls
- React Router for navigation
- Styled with CSS/SASS

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:

    git clone https://github.com/saminenidevika/fetch-dogs.git

2. Navigate to the project directory:

    cd fetch-frontend

3. Install dependencies:

    npm install

4. Run the app locally:

    npm run start

This will start the app in development mode and open it in your default browser at http://localhost:3000


## API Integration

This app interacts with the Fetch API. You can find the details of the API endpoints here.

The main functionalities of the API include:

- Logging in and out with authentication tokens.
- Fetching a list of dog breeds and dog data.
- Matching users with their favorite dogs.

# API Endpoints

- POST /auth/login - Authenticate user
- POST /auth/logout - Log out user
- GET /dogs/breeds - Get dog breeds
- GET /dogs/search - Search dogs with filters
- POST /dogs - Fetch dog data
- POST /dogs/match - Generate dog match based on favorites
- POST /locations - Fetch location data
- POST /locations/search - Search locations
