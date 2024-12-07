const fs = require('fs');
const path = require('path');


const dbPath = path.join(__dirname, '../db.json');

// Utility function to read the database
const readDatabase = () => {
    try {
        const data = fs.readFileSync(dbPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading database:', error);
        return { users: [] };
    }
};

// Utility function to write to the database
const writeDatabase = (data) => {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing database:', error);
    }
};

module.exports = { readDatabase, writeDatabase };