const User = require('../models/User');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const handleNewUser = async (req, res) => {
  const {email, pwd} = req.body;
  if (!email || !pwd) return res.status(400).send("Empty request");
  const { uid } = req.user;
  console.log(req.user);
  
  console.log(`uid: ${uid}, email: ${email}, pwd: ${pwd}`);
  
  
  try {
    let foundUser = await User.findOne({uid});
    if (foundUser) return res.status(409).send('user already exists');
    
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const username = `@user_${uid.slice(0,5)}`;
    const user = await User.create({
      uid,
      email,
      username,
      password: hashedPwd
    });
    if (user) {
      console.log(user);
      res.status(200).send(`user ${username} created successfully with role${user.roles}`);
    }
  } catch(err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}

module.exports = { handleNewUser }