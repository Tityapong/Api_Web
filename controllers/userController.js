const { readDatabase, writeDatabase , addUser } = require('../utils/dbUtils');
const { generateToken } = require('../utils/authUtils');

// Controller: Get all users
const getAllUsers = (req, res) => {
    const data = readDatabase();
    res.json(data.users);
};

// Controller: Add a new user


const addNewUser = (req, res) => {
    const { email, password, name, phone, location, role } = req.body;

    // Validate required fields
    if (!email || !password || !name || !phone || !location) {
        return res.status(400).json({ message: 'Email, password, name, phone, and location are required' });
    }

    const data = readDatabase();

    // Check if the user already exists
    if (data.users.some((user) => user.email === email)) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    // Create new user object
    const newUser = {
        id: Date.now().toString(), // Simple unique ID, improve for production
        email,
        password,
        name,
        phone,
        location,
        role: role || 'user' // Default to 'user' role
    };

    // Add the new user to the database
    addUser(newUser);

    // Generate a token for the new user
    const token = generateToken(newUser);

    // Respond with the user details and token
    res.status(201).json({
        message: 'User added successfully',
        user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            phone: newUser.phone,
            location: newUser.location,
            role: newUser.role
        },
        token
    });
};


// Controller: User login
const loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const data = readDatabase();
    const user = data.users.find(
        (u) => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a token for the logged-in user
    const token = generateToken(user);

    // Respond with user details and token
    res.status(200).json({
        message: 'Login successful',
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            location: user.location,
            role: user.role
        },
        token
    });
};

module.exports = { getAllUsers, addUser, loginUser , addNewUser };