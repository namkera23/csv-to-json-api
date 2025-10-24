# 🧩 CSV to JSON Converter API (with PostgreSQL)

## 📘 Description
This Node.js application reads a CSV file, converts each row into a JSON object, and uploads the data into a PostgreSQL database.  
It also calculates and prints the **age distribution report** on the console once the upload is complete.

The project demonstrates:
- Efficient CSV parsing (without external CSV libraries)
- Proper handling of nested (dot-notated) fields
- Storing structured and unstructured data in PostgreSQL
- Clean, readable, and production-quality Express.js code

---

## 🚀 Features
✅ Parse CSV files manually (no external CSV parsers)  
✅ Handle nested fields (e.g., `name.firstName`, `address.city`)  
✅ Store mandatory fields (`name`, `age`, `address`) and additional fields separately  
✅ Upload data into PostgreSQL efficiently  
✅ Print age group distribution after data upload  
✅ Simple, clean Express.js API  

---

## ⚙️ Requirements
- Node.js ≥ 20  
- PostgreSQL ≥ 14  
- npm  

---

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/namkera23/csv-to-json-api.git
   cd csv-to-json-api


Install dependencies

npm install


Create a PostgreSQL database

CREATE DATABASE csvjson;


Create a config.env file in the project root and add:

PORT=3000
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=csvjson
CSV_FILE_PATH=./data.csv


Run the server

node index.js

📡 API Endpoints
Method	Endpoint	Description
GET	/	Returns a simple test message ("Server is running")
GET	/csv_to_json	Reads the CSV file, converts it to JSON, uploads data into PostgreSQL, and logs age distribution

Example Response:

{
  "message": "Data uploaded successfully!"
}

🧩 Database Table Structure
CREATE TABLE public.users (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  age INT NOT NULL,
  address JSONB,
  additional_info JSONB
);

📊 Example Console Output
Age-Group % Distribution
< 20     20%
20 to 40 45%
40 to 60 25%
> 60     10%

🗂️ Project Structure
csv_to_json_api/
├─ index.js              # Main entry point (Express app)
├─ db.js                 # PostgreSQL connection
├─ data.csv              # CSV data file
├─ config.env            # Environment configuration file
├─ .gitignore            # Files ignored by Git
├─ package.json
└─ README.md

⚠️ Important Notes

Make sure PostgreSQL is running locally before starting the app.

The file path for the CSV file is defined in config.env (e.g., CSV_FILE_PATH=./data.csv).

Do not push config.env to GitHub — add it to .gitignore.

For safety, you can create a config.example file (with dummy credentials) to show what keys are expected.
