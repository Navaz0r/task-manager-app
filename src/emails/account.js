const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (name, email) => {
  sgMail.send({
    to: email,
    from: 'navarin1337@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
  });
};

const sendCancelEmail = (name, email) => {
  sgMail.send({
    to: email,
    from: 'navarin1337@gmail.com',
    subject: 'Your account has been canceled!',
    text: `Hi, ${name} it's bad to see you canceling your account. May we learn why you decided to cancel your account?`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail,
};
/* sgMail.send({
  to: 'navarin1337@gmail.com',
  from: 'navarin1337@gmail.com',
  subject: 'This is my first creation!',
  text: 'I hope this one actually get to you',
}); */
