const express = require('express');
const router  = express.Router();
const nodemailer = require ('nodemailer')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


/* POST information from the singup module on every page */
router.post('/send-email', (req, res, next) => {
  let { email } = req.body;
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'ekaterina.vik.pavlova@gmail.com',
      pass: 'ncg7qehh!'
    }
  });
  transporter.sendMail({
    from: '"My Awesome Project " <myawesome@project.com>',
    to: email, 
    subject: 'You have been invited to join PikIt', 
    text: 'Hello! You have been invited to join PickIt by your friend. Follow the link and start sharing immediately!',
    // html: `<b>${Hello! You have been invited to join pickit.com}</b>`
  })
  .then(info => res.render('message', {email}))
 .catch(error => console.log(error));
});


router.get ('/send-email', (req,res) => {
  res.render('message');
});
module.exports = router;
