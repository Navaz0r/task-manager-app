const sgMail = require('@sendgrid/mail');

const sendgridApiKey = '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';

sgMail.setApiKey(sendgridApiKey);

sgMail.send({
  to: 'navarin1337@gmail.com',
  from: 'navarin1337@gmail.com',
  subject: 'This is my first creation!',
  text: 'I hope this one actually get to you',
});
