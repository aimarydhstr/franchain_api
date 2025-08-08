
const db = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { user, franchisor } = db;

exports.register = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({
      name,
      username,
      email,
      password: hashedPassword,
      role,
      status: 'pending'
    });
    
    if(!newUser) return res.status(400).json({ message: 'Failed to create user' });

    if (role === 'franchisor' && newUser.status === 'pending') {
      const token = jwt.sign({ id: newUser.id, username: newUser.username, role: newUser.role, status: newUser.status }, process.env.JWT_SECRET, { expiresIn: '1d' });

      res.json({ message: 'Login Success', token });
    }

    res.status(201).json({ message: 'User has been created, please wait for admin approval', user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await user.findOne({ where: { username } });
    if (!existingUser) return res.status(404).json({ message: 'User not found' });

    if (existingUser.status !== 'aktif' && existingUser.role !== 'franchisor') {
      return res.status(403).json({ message: 'User is not active' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) return res.status(401).json({ message: 'Username or password is incorrect' });

    let verified = null;
    if (existingUser.role == 'franchisor' && (existingUser.status === 'pending' || existingUser.status === 'aktif')) {
      const existingFranchisor = await franchisor.findOne({ where: { userId: existingUser.id } });
      verified = existingFranchisor?.verified ?? false;
    }

    const payload = {
      id: existingUser.id,
      username: existingUser.username,
      role: existingUser.role,
      status: existingUser.status,
      ...(verified !== null && { verified })
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: 'Login Success', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
