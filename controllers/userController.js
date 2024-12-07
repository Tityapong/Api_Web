const { readDatabase, writeDatabase } = require('../utils/dbUtils');

// Controller: Get all users
const getAllUsers = (req, res) => {
    const data = readDatabase();
    res.json(data.users);
};

// Controller: Add a new user
const addUser = (req, res) => {
    const newUser = req.body;
    if (!newUser.email || !newUser.password || !newUser.role) {
        // Assign default role as 'user' if role is not provided
        newUser.role = 'user';
    }

    if (!newUser.email || !newUser.password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const data = readDatabase();
    newUser.id = data.users.length ? data.users[data.users.length - 1].id + 1 : 1;
    data.users.push(newUser);
    writeDatabase(data);

    res.status(201).json({ message: 'User added successfully', user: newUser });
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

    // Redirect based on user role
    if (user.role === 'admin') {
        return res.status(200).json({ message: 'Login successful, welcome admin', redirect: '/admin' });
    } else if (user.role === 'supplier') {
        return res.status(200).json({ message: 'Login successful, welcome supplier', redirect: '/supplier' });
    } else {
        return res.status(200).json({ message: 'Login successful, welcome user', redirect: '/user' });
    }
};

// Controller: Admin changes user role
const changeUserRole = (req, res) => {
    // Ensure that the logged-in user is an admin
    const loggedInUser = req.user;  // This assumes you set `req.user` in your authentication middleware
    
    // Check if the logged-in user is an admin
    if (!loggedInUser || loggedInUser.role !== 'admin') {
        return res.status(403).json({ message: 'Only admins can change roles' });
    }

    const { userId, newRole } = req.body;

    // Ensure the newRole is valid
    if (!['user', 'supplier', 'admin'].includes(newRole)) {
        return res.status(400).json({ message: 'Invalid role provided' });
    }

    const data = readDatabase();
    const userToUpdate = data.users.find((user) => user.id === userId);

    if (!userToUpdate) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's role
    userToUpdate.role = newRole;
    writeDatabase(data);

    res.status(200).json({ message: `User's role updated to ${newRole}`, user: userToUpdate });
};

module.exports = {
    getAllUsers,
    addUser,
    loginUser,
    changeUserRole,
};