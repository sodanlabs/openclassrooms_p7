# Projet 7 du parcours Développeur Web d'OpenClassrooms

This is the full project for the Web Developer path.

### Prerequisites ###

This folder contains the whole project in itself, the backend as well as the frontend.

You will need to have mysql_server, Git, Node and `npm` or `yarn` installed locally on your machine.

### Installation ###

To create the database and the user needed for this project, you can run the scripts available in the script_sql folder itself:
- `mysql -u root -p < create_db.sql`
- `mysql -u root -p < drop_db.sql`

If you prefer to use a database and a personal mysql user, you can configure the connection of the backend server in `backend/config/db.conf.js`.

Clone this repo. From the backend folder you must run `npm install` or `yarn install` to install dependencies and `node serve` to run it.

The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.