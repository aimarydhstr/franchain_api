# Franchise Management API

This is a RESTful API built using Node.js, Express, and Sequelize ORM for managing franchise-related data such as products, orders, transactions, complaints, compensations, and more.


## Installation

```bash
# Install dependencies
npm install
```

## Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=franchain
DB_DIALECT=mysql
PORT=3000
```

## Running the API

```bash

# Start server
nodemon server.js
```

## API Documentation

All endpoints follow the `/api` prefix. Example: `http://localhost:3000/api/products`
