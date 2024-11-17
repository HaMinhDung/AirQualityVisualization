const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // Replace this with your actual authentication logic
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

module.exports = router; 