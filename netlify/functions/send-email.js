// Import nodemailer to send emails
const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  // Parse the request body
  let data;
  try {
    data = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request body" }),
    };
  }

  const { name, email, message } = data;
  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required fields" }),
    };
  }

  // Create a transporter object using your SMTP settings.
  // These environment variables should be set in your Netlify dashboard (.env file locally for testing)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g., smtp.gmail.com
    port: process.env.SMTP_PORT, // e.g., 465 for secure connections, 587 for non-secure
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER, // your email address or username
      pass: process.env.SMTP_PASS, // your email password or app-specific password
    },
  });

  // Define the email options
  const mailOptions = {
    from: `"${name}" <${email}>`, // sender address
    to: process.env.RECEIVER_EMAIL, // receiver address (your email)
    subject: "New Contact Form Submission",
    text: message,
    html: `<p>${message}</p>`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() }),
    };
  }
};
