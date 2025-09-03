import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

// Create reusable transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address
    pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail App Password
  },
});

// Helper to format work history for email
const formatWorkHistory = (workHistory: any[]) => {
  if (!workHistory || workHistory.length === 0) return 'No work history provided';
  
  return workHistory.map((item, index) => `
    Work Experience ${index + 1}:
    - Period: ${item.startDate || 'N/A'} to ${item.endDate || 'Present'}
    - Company: ${item.company || 'N/A'}
    - Farm Description: ${item.farmDescription || 'N/A'}
    - Role Description: ${item.roleDescription || 'N/A'}
  `).join('\n');
};

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    
    let data: any = {};
    let attachments: Mail.Attachment[] = [];
    
    // Handle both JSON and FormData
    if (contentType.includes('application/json')) {
      data = await req.json();
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      
      // Process FormData entries
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          // Handle file attachments
          const buffer = Buffer.from(await value.arrayBuffer());
          attachments.push({
            filename: value.name,
            content: buffer,
          });
        } else if (key === 'workHistory') {
          // Parse JSON stringified work history
          try {
            data[key] = JSON.parse(value as string);
          } catch {
            data[key] = [];
          }
        } else {
          data[key] = value;
        }
      }
    }

    // Determine form type and set subject
    let emailSubject = 'Website Form Submission';
    let formType = 'unknown';
    
    // Detect form type based on fields present
    if (data.formIdentifier) {
      // If form explicitly sends identifier
      formType = data.formIdentifier;
    } else if (data.farmType && data.workerType && data.vacancyDescription !== undefined) {
      formType = 'client';
    } else if (data.formType === 'A' || data.formType === 'B' || data.workHistory) {
      formType = 'applicant';
    } else if (data.subject && data.message) {
      formType = 'contact';
    }

    // Set email subject based on form type
    switch (formType) {
      case 'contact':
        emailSubject = 'Reach Out - New Contact Form Submission';
        break;
      case 'applicant':
        emailSubject = 'Applicant - New Application Received';
        break;
      case 'client':
        emailSubject = 'Client - New Client Form Submission';
        break;
      default:
        emailSubject = 'Website Form Submission';
    }

    // Build email content based on form type
    let emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a1a1a; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 5px 5px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-left: 10px; color: #333; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>${emailSubject}</h2>
            </div>
            <div class="content">
    `;

    // Add form-specific content
    if (formType === 'contact') {
      emailHtml += `
        <div class="field"><span class="label">Name:</span> <span class="value">${data.firstName || ''} ${data.lastName || ''}</span></div>
        <div class="field"><span class="label">Email:</span> <span class="value">${data.email || ''}</span></div>
        <div class="field"><span class="label">Phone:</span> <span class="value">${data.phone || 'Not provided'}</span></div>
        <div class="field"><span class="label">Subject:</span> <span class="value">${data.subject || ''}</span></div>
        <div class="field"><span class="label">Message:</span></div>
        <div class="value" style="background: white; padding: 10px; border-radius: 3px; margin-top: 5px;">
          ${(data.message || '').replace(/\n/g, '<br>')}
        </div>
      `;
    } else if (formType === 'applicant') {
      const isOptionA = data.formType === 'A';
      emailHtml += `
        <div class="field"><span class="label">Application Type:</span> <span class="value">Option ${data.formType || 'Unknown'} ${isOptionA ? '(Quick Apply)' : '(Full Application)'}</span></div>
        <div class="field"><span class="label">Name:</span> <span class="value">${data.firstName || ''} ${data.lastName || ''}</span></div>
      `;
      
      if (!isOptionA) {
        emailHtml += `
          <div class="field"><span class="label">Address:</span> <span class="value">${data.address || ''}</span></div>
          <div class="field"><span class="label">Postcode:</span> <span class="value">${data.postcode || 'Not provided'}</span></div>
          <div class="field"><span class="label">Mobile:</span> <span class="value">${data.mobile || ''}</span></div>
          <div class="field"><span class="label">Email:</span> <span class="value">${data.email || ''}</span></div>
          <div class="field"><span class="label">How they heard about us:</span> <span class="value">${data.hearAbout || 'Not specified'}</span></div>
          <div class="field"><span class="label">Ideal Job:</span> <span class="value">${data.idealJob || 'Not specified'}</span></div>
          <div class="field"><span class="label">Qualifications:</span> <span class="value">${data.qualifications || 'None specified'}</span></div>
          <div class="field"><span class="label">Driving Licence:</span> <span class="value">${data.drivingLicence === 'yes' ? 'Yes' : 'No'}</span></div>
          <div class="field"><span class="label">Applied Before:</span> <span class="value">${data.appliedBefore === 'yes' ? 'Yes' : 'No'}</span></div>
          <div class="field"><span class="label">Other Information:</span> <span class="value">${data.otherInfo || 'None'}</span></div>
          <div class="field"><span class="label">Work History:</span></div>
          <div class="value" style="background: white; padding: 10px; border-radius: 3px; margin-top: 5px;">
            <pre>${formatWorkHistory(data.workHistory)}</pre>
          </div>
        `;
      }
      
      if (attachments.length > 0) {
        emailHtml += `<div class="field"><span class="label">CV Attached:</span> <span class="value">Yes (see attachment)</span></div>`;
      }
    } else if (formType === 'client') {
      emailHtml += `
        <div class="field"><span class="label">Name:</span> <span class="value">${data.firstName || ''} ${data.lastName || ''}</span></div>
        <div class="field"><span class="label">Email:</span> <span class="value">${data.email || ''}</span></div>
        <div class="field"><span class="label">Mobile:</span> <span class="value">${data.mobile || ''}</span></div>
        <div class="field"><span class="label">Address:</span> <span class="value">${data.address || ''}</span></div>
        <div class="field"><span class="label">Postcode:</span> <span class="value">${data.postcode || 'Not provided'}</span></div>
        <div class="field"><span class="label">Farm Type:</span> <span class="value">${data.farmType || ''}</span></div>
        <div class="field"><span class="label">Worker Type:</span> <span class="value">${data.workerType || ''}</span></div>
        <div class="field"><span class="label">Vacancy Description:</span></div>
        <div class="value" style="background: white; padding: 10px; border-radius: 3px; margin-top: 5px;">
          ${(data.vacancyDescription || 'Not provided').replace(/\n/g, '<br>')}
        </div>
        <div class="field"><span class="label">How they heard about us:</span> <span class="value">${data.hearAbout || 'Not specified'}</span></div>
        <div class="field"><span class="label">Best time to talk:</span> <span class="value">${data.bestTime || 'Not specified'}</span></div>
      `;
    }

    emailHtml += `
            <div class="footer">
              <p>This email was automatically generated from your website's ${formType} form.</p>
              <p>Submitted on: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </body>
    </html>
    `;

    // Prepare email options
    const mailOptions: Mail.Options = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send to the same Gmail account
      subject: emailSubject,
      html: emailHtml,
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}














// import { NextRequest, NextResponse } from "next/server";

// import { render } from "@react-email/components";

// import { transporter, smtpEmail } from "@/utils/nodemailer";

// import { Email } from "@/app/contact/email";

// export async function POST(req: NextRequest, res: NextResponse) {
//   const body = await req.json();
//   const { name, email, message } = body;

//   const emailHtml = render(
//     <Email name={name} email={email} message={message} />
//   );

//   const options = {
//     from: smtpEmail,
//     to: smtpEmail,
//     subject: "New Form Submission",
//     html: emailHtml,
//   };

//   try {
//     // Send email using the transporter
//     await transporter.sendMail(options);
//   } catch (error) {
//     console.error("Failed to send email:", error);
//   }
//   return new Response("OK");
// }