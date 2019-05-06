# Sweater Weather Express

## Introduction

Sweater Weather Express is an API service written in Node.js that is intended to work as the backend for a weather application. Visitors can create an account by making a request to a registration endpoint to receive an api key, which can be retrieved later through a login endpoint.

Once a user has an api key, they can use it to retrieve forecast information for a location. They can also save or delete favorite locations. Users can then later retrieve their favorite locations along with forecast information for each.

## Local Setup

Clone the project and enter the directory

    git clone https://github.com/csvlewis/sweater-weather-express.git
    cd sweater-weather-express
    
Install node packages

    npm install
    
You will need API keys for the [Google Maps API](https://developers.google.com/maps/documentation/geocoding/get-api-key) and the [Dark Sky API](https://darksky.net/dev/register) to run this app locally. Create a .env file in the root directory of the app and add the following environment variables:

    GEOCODING_API=first_key_goes_here
    DARK_SKY_API=second_key_goes_here

Start the server locally

    npm start
    
Now you can access any of the application's endpoints through http requests using an application like [Postman](https://www.getpostman.com/).

## How to Use

Once you have a local server running, you can make API requests to the following six endpoints:

### Registration

Visitors can create an account by making a request to the following endpoint:

    POST /api/v1/users
    Content-Type: application/json
    Accept: application/json

With a body that contains an email, password, and password_confirmation:
    
    {
      "email": "my_email@example.com",
      "password": "password"
      "password_confirmation": "password"
    }
   
If the user's email has not been taken and the password and password_confirmation fields match, an API key will be assigned and returned to the user:

    {
      "api_key": "jgn983hy48thw9begh98h4539h4"
    }
    
### Login

Users can retrieve their API key by making a request to the following endpoint:

    POST /api/v1/sessions
    Content-Type: application/json
    Accept: application/json
    
With a body that contains the user's email and password:

    {
      "email": "my_email@example.com",
      "password": "password"
    }
    
If the user's email and password match that of a user in the database, the user's API key will be returned:

    {
      "api_key": "jgn983hy48thw9begh98h4539h4"
    }

### Forecast

Users can get a detailed weather forecast for a city by making a request to the following endpoint:

    GET /api/v1/forecast?location=denver,co
    Content-Type: application/json
    Accept: application/json
    
With a body that contains their API key:

    {
      "api_key": "jgn983hy48thw9begh98h4539h4"
    }
    
If the user's API key is valid, a forecast for that location will be returned that starts something like this:

    {
      "location": "Denver, C0",
      "currently": {
          "summary": "Overcast",
          "icon": "cloudy",
          "precipIntensity": 0,
          "precipProbability": 0,
          "temperature": 54.91,
          "humidity": 0.65,
          "pressure": 1020.51,
          "windSpeed": 11.91,
          "windGust": 23.39,
          "windBearing": 294,
          "cloudCover": 1,
          "visibility": 9.12,
        },
     
### Favoriting Locations

Users can save a favorite location by making a request to the following endpoint:

    POST /api/v1/favorites
    Content-Type: application/json
    Accept: application/json
    
With a body that contains the location they would like to favorite and their API key:

    {
      "location": "Denver, CO",
      "api_key": "jgn983hy48thw9begh98h4539h4"
    }
    
If the user's API key is valid, that location will be saved to their favorites and they will receive a message:

    {
      "message": "Denver, CO has been added to your favorites",
    }
    
### Listing Favorite Locations

Users can get a list of their favorite locations along with a current forecast for each by making a request to the following endpoint:

    GET /api/v1/favorites
    Content-Type: application/json
    Accept: application/json

With a body that contains their API key:

    {
      "api_key": "jgn983hy48thw9begh98h4539h4"
    }
    
If the user's API key is valid, they will receive a list of their favorite locations and a current forecast for each:

    [
      {
        "location": "Denver, CO",
        "current_weather": {
          "summary": "Overcast",
          "icon": "cloudy",
          "precipIntensity": 0,
          "precipProbability": 0,
          "temperature": 54.91,
          "humidity": 0.65,
          "pressure": 1020.51,
          "windSpeed": 11.91,
          "windGust": 23.39,
          "windBearing": 294,
          "cloudCover": 1,
          "visibility": 9.12,
        },
        "location": "Golden, CO",
        "current_weather": {
          "summary": "Sunny",
          "icon": "sunny",
          "precipIntensity": 0,
          "precipProbability": 0,
          "temperature": 71.00,
          "humidity": 0.50,
          "pressure": 1015.10,
          "windSpeed": 10.16,
          "windGust": 13.40,
          "windBearing": 200,
          "cloudCover": 0,
          "visibility": 8.11,
        }
      }
    ]
    
### Deleting Favorite Locations

Users can delete a favorite location by making a request to the following endpoint:

    DELETE /api/v1/favorites
    Content-Type: application/json
    Accept: application/json
    
With a body containing the location they would like to delete and their API key:

    {
      "location": "Denver, CO",
      "api_key": "jgn983hy48thw9begh98h4539h4"
    }

This endpoint will return a 204 status with no body if the request is successful.

## Known Issues
The project is currently hosted on Heroku at https://secret-stream-64574.herokuapp.com/, but the endpoints still only work locally. It appears to be some sort of a routing error, but I haven't been able to figure out the cause so far.

Also, not every single sad path has a proper error message. For example, if a user tries to make a request to get a list of their favorite locations without having any saved, the application will just hang and not send back an error response.

## How to Contribute
If you would like to contribute to this project, you can do the following:

  1. Fork this repo on GitHub
  2. Clone the project to your own machine
  3. Commit changes to your own branch
  4. Push your work back up to your fork
  5. Submit a pull request to the original repo

## Contributors
- [Chris Lewis](https://github.com/csvlewis)

## Schema Visualization

## Tech Stack
- Node.js
- Express
- Google Maps API
- Dark Sky API
