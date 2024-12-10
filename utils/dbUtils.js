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
        return { users: [] , suppliers: [] };
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



const addUser = (user) => {
    const db = readDatabase();
    user.id = db.users.length ? db.users[db.users.length - 1].id + 1 : 1; // Generate ID
    db.users.push(user); // Add user to the users array
    writeDatabase(db); // Save the updated data to db.json
};


// Function to get all service providers
const getSuppliers = () => {
    const db = readDatabase();
    return db.suppliers || []; // Return serviceProviders array or empty array
};


module.exports = { readDatabase, writeDatabase , getSuppliers , addUser };