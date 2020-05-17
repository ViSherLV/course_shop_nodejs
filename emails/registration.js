const keys = require("../keys");

module.exports = function (email) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: "Account created",
    html: `
      <h1>Welcome to our collection of courses!</h1>
      <p>You have successfully created an account with email - ${email}</p>
      <hr />
      <a href="${keys.BASE_URL}">Course Store by Chatbots.Studio.</a>
    `,
  };
};
