const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const expressLayOut = require('express-ejs-layouts');


const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
// view engine setup ejs

app.use(expressLayOut);
app.set('view engine','ejs');


// View engine setup
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

// Static folder
// app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  // res.render('contact', {layout: false});
  res.render('register.ejs')
});

app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTranslayoutport({
    service: 'Gmail',
    auth: {
        user: 'nguyenvanlongt2@gmail.com', // generated ethereal user
        pass: '01665596604'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" <nguyenvanlongt2@gmail.com>', // sender address
      to: 'longvlxx99@gmail.com', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log('loi roi vcl', error);
      }
      // res.render('contact', {layout: false});
      res.render('register.ejs')
  });
  });

app.listen(2001, () => console.log('Server started...'));