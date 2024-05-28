# Rentify

Welcome to Rentify! This project aims to provide a comprehensive platform for rental management, allowing users to list, search, and manage rental properties efficiently.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

### User Authentication
- **Sign Up:** Users can create an account using email and password.
- **Login:** Users can log in using their credentials.

### Property Management
- **List Property:** Users can list their properties for rent by providing details like address, rent amount, description, and images.
- **Edit Property:** Users can edit the details of their listed properties.
- **Delete Property:** Users can remove their properties from the listing.

### Search and Filter
- **Search:** Users can search for properties based on various criteria like location, rent amount, and property type.
- **Filters:** Users can filter search results by criteria such as price range, number of bedrooms, and amenities.

### Booking Management
- **Book Property:** Users can book properties for rent by specifying the rental period.
- **View Bookings:** Users can view their current and past bookings.
- **Cancel Booking:** Users can cancel their bookings.

### Reviews and Ratings
- **Write Reviews:** Users can write reviews and rate properties they have rented.
- **View Reviews:** Users can view reviews and ratings for properties.

### Notifications
- **Email Notifications:** Users receive email notifications for key actions such as booking confirmations, listing approvals, and password recovery.

## Tech Stack

### Frontend
- **React.js:** For building the user interface.
- **Tailwind CSS:** For styling the application.
- **React Router:** For navigation within the application.

### Backend
- **Node.js:** For server-side scripting.
- **Express.js:** For building the REST API.
- **MongoDB:** As the database to store user and property data.

### Others
- **JWT:** For secure authentication.
- **Mongoose:** For MongoDB object modeling.
- **NodeMailer:** For sending email notifications.

## Installation

### Prerequisites
- Node.js (v14.x or higher)
- MongoDB

### Steps

Navigate to the project directory:
```sh
cd rentify
npm install
``` 
## Usage
### Running the Backend
Create a .env file in the backend directory with the following variables:
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
USER_PASSKEY=your_app_key

```
Start the backend server:

<b>Back-end repo is private for now, will be updating it to public repo after some time... </b>
```
npm start
```
## Running the Frontend
```sh
npm install
npm run dev
```

## Contributing
### We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add new feature').
5. Push to the branch (git push origin feature-branch).
6. Open a pull request.

## Contact
If you have any questions or feedback, please contact us at:

1. [Email](mailto:aks2200088@gmail.com)
2. [LinkedIn](https://www.linkedin.com/in/aashish-kumar-singh-499241164/)
