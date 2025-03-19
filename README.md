# Brews & Blues

Brews & Blues is a web application for a bar that offers a wide variety of drinks, including beers, non-alcoholic beverages, mocktails, and snacks. It also features live music events. The project utilizes Express with Sequelize ORM for MySQL database interaction and EJS templating for a dynamic user interface.

## Features

- **Dynamic Menu:** Browse through our selection of drinks, including beers, non-alcoholic beverages, mocktails, and snacks.

- **Events:** Check out upcoming live music events with detailed descriptions and media previews.

- **Reservations & Contact:** Easily reserve tables and get in touch with us through our contact form.

- **Admin Dashboard:** Secure login for administrators to manage reservations and messages.

## Technologies Used

- **Server:** Node.js, Express
- **Database:** MySQL (Sequelize ORM)
- **Templating:** EJS
- **Styling:** CSS (stored in `/public/css/`)
- **Data Management:** JSON files (stored in `/data/`) and seeders (in `/seeders/`)

## Database Setup

1. **Configure MySQL Connection:**

   - Open MySQL Workbench and create a new connection:
     - **Connection Name:** Brews & Blues DB
     - **Hostname:** localhost
     - **Port:** 3306
     - **Username:** root
     - **Password:** admin *(adjust if different)*
     - **Default Schema:** Brews_Blues

2. **Run Seeders:**

   - Populate database tables using the following commands:
     ```sh
     node seeders/seedEvents.js
     node seeders/seedBeers.js
     node seeders/seedDrinks.js
     node seeders/seedMocktails.js
     node seeders/seednonAlcoholic.js
     node seeders/seedNuts.js
     ```

## Installation

1. **Clone the Repository:**

   ```sh
   git clone <repository_url>
   cd Brews&Blues
   ```

2. **Install Dependencies:**

   ```sh
   npm install ejs express express-session mysql2 sequelize
   ```

## Running the Application

Start the server:

```sh
node app.js
```

The application will run on [http://localhost:3000](http://localhost:3000).

