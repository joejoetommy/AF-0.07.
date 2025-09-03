// import nodemailer from "nodemailer";
// import SMPTransport from "nodemailer-smtp-transport";

// export const smtpEmail = process.env.GOOGLE_EMAIL;
// export const smtpPassword = process.env.GOOGLE_PASSWORD;

// export const transporter = nodemailer.createTransport(
//   SMPTransport({
//     service: "gmail",
//     auth: {
//       user: smtpEmail,
//       pass: smtpPassword,
//     },
//   })
// );

// import nodemailer from "nodemailer";

// // Use environment variables
// export const smtpEmail = process.env.GOOGLE_EMAIL;
// export const smtpPassword = process.env.GOOGLE_PASSWORD;

// // Create transporter - no need for SMPTransport wrapper
// export const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: smtpEmail,
//     pass: smtpPassword,
//   },
// });

// // Verify transporter configuration
// transporter.verify((error, success) => {
//   if (error) {
//     console.error("SMTP configuration error:", error);
//   } else {
//     console.log("SMTP server is ready to send emails");
//   }
// });





import nodemailer from "nodemailer";

// Use environment variables
export const smtpEmail = process.env.GOOGLE_EMAIL;
export const smtpPassword = process.env.GOOGLE_PASSWORD;

console.log('Email Configuration:', {
  email: smtpEmail ? `${smtpEmail.substring(0, 3)}...@gmail.com` : 'NOT SET',
  password: smtpPassword ? 'SET' : 'NOT SET'
});

// Create transporter
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: smtpEmail,
    pass: smtpPassword,
  },
});

// Verify transporter configuration
if (smtpEmail && smtpPassword) {
  transporter.verify((error, success) => {
    if (error) {
      console.error("SMTP configuration error:", error);
    } else {
      console.log("SMTP server is ready to send emails");
    }
  });
} else {
  console.error("Missing email configuration - check environment variables");
}
