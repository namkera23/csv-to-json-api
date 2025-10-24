const fs = require('fs');
const express = require('express');
const pool = require('./db');
require('dotenv').config({ path: './config.env' });

const app = express();

function parseCSVtoJSON(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  const [headerLine, ...rows] = data.trim().split('\n');
  const headers = headerLine.split(',').map(h => h.trim());
  
  const jsonData = rows.map(row => {
    const values = row.split(',').map(v => v.trim());
    const record = {};
    headers.forEach((key, index) => {
      record[key] = values[index];
    });
    return record;
  });

  return jsonData;
}

async function uploadToDB(data) {
  for (const user of data) {
    const name = `${user['name.firstName']} ${user['name.lastName']}`;
    const age = parseInt(user.age, 10);

    const address = {
      line1: user['address.line1'],
      line2: user['address.line2'],
      city: user['address.city'],
      state: user['address.state']
    };

    const additional = { gender: user.gender };

    await pool.query(
      'INSERT INTO users (name, age, address, additional_info) VALUES ($1, $2, $3, $4)',
      [name, age, address, additional]
    );
  }
  console.log('Data inserted successfully!');
}

function calculateAgeDistribution(data) {
  const total = data.length;
  const groups = { '<20': 0, '20-40': 0, '40-60': 0, '>60': 0 };

  data.forEach(u => {
    const age = parseInt(u.age, 10);
    if (age < 20) groups['<20']++;
    else if (age <= 40) groups['20-40']++;
    else if (age <= 60) groups['40-60']++;
    else groups['>60']++;
  });

  console.log('\nAge Group % Distribution');
  for (const [range, count] of Object.entries(groups)) {
    console.log(`${range} : ${((count / total) * 100).toFixed(2)}%`);
  }
}

app.listen(3000, async () => {
  console.log('Server running on port 3000');
  const jsonData = parseCSVtoJSON(process.env.CSV_FILE_PATH);
  await uploadToDB(jsonData);
  calculateAgeDistribution(jsonData);
});
