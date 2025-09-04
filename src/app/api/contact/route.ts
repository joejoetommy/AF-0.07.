import { NextRequest, NextResponse } from 'next/server';
import { transporter, smtpEmail } from '@/utils/nodemailer';

// --- Safe dev-only logger & helpers ---
const isDev = process.env.NODE_ENV === 'development';
const devLog = (...args: any[]) => {
  if (isDev) console.log(...args);
};
const keysOnly = (obj: Record<string, any>) =>
  Object.keys(obj || {}).sort();

// Helper to format work history for email
const formatWorkHistory = (workHistory: any[]) => {
  if (!workHistory || workHistory.length === 0) return 'No work history provided';
  
  return workHistory.map((item, index) => `
    <div style="margin-bottom: 15px; padding: 10px; background: #f0f0f0; border-radius: 5px;">
      <strong>Work Experience ${index + 1}:</strong><br/>
      <strong>Period:</strong> ${item.startDate || 'N/A'} to ${item.endDate || 'Present'}<br/>
      <strong>Company:</strong> ${item.company || 'N/A'}<br/>
      <strong>Farm Description:</strong> ${item.farmDescription || 'N/A'}<br/>
      <strong>Role Description:</strong> ${item.roleDescription || 'N/A'}
    </div>
  `).join('');
};

export async function POST(req: NextRequest) {
  try {
    // Check if environment variables are set (do NOT print actual values)
    if (!smtpEmail || !process.env.GOOGLE_PASSWORD) {
      console.error('Email configuration missing:', {
        email: smtpEmail ? 'Set' : 'Missing',
        password: process.env.GOOGLE_PASSWORD ? 'Set' : 'Missing'
      });
      return NextResponse.json(
        { error: 'Email configuration error' },
        { status: 500 }
      );
    }

    const contentType = req.headers.get('content-type') || '';
    
    let data: any = {};
    let attachments: any[] = [];
    
    // Handle both JSON and FormData
    if (contentType.includes('application/json')) {
      data = await req.json();
      // Dev-only, and only log keys (not values)
      devLog('Received JSON form data keys:', keysOnly(data));
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      devLog('Processing FormData...');

      // Process FormData entries
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          // Handle file attachments
          devLog(`Processing file (name only): ${value.name}`);
          const bytes = await value.arrayBuffer();
          const buffer = Buffer.from(bytes);
          attachments.push({
            filename: value.name,
            content: buffer,
          });
          data[key] = `${value.name} (attached)`;
        } else if (key === 'workHistory') {
          // Parse JSON stringified work history
          try {
            data[key] = JSON.parse(value as string);
            devLog('Parsed work history count:', Array.isArray(data[key]) ? data[key].length : 0);
          } catch {
            data[key] = [];
          }
        } else {
          data[key] = value;
        }
      }
      devLog('Processed form data keys:', { keys: keysOnly(data), attachmentCount: attachments.length });
    }

    // Determine form type and set subject
    let emailSubject = 'Website Form Submission';
    let formType = data.formIdentifier || 'unknown';
    
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

    // Build email content
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
            .message-box { background: white; padding: 15px; border-radius: 5px; margin-top: 10px; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
            .section-header { background: #e0e0e0; padding: 10px; margin: 20px 0 10px 0; border-radius: 5px; font-weight: bold; }
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
        <div class="field">
          <span class="label">Name:</span>
          <span class="value">${data.firstName || ''} ${data.lastName || ''}</span>
        </div>
        <div class="field">
          <span class="label">Email:</span>
          <span class="value">${data.email || ''}</span>
        </div>
        <div class="field">
          <span class="label">Phone:</span>
          <span class="value">${data.phone || 'Not provided'}</span>
        </div>
        <div class="field">
          <span class="label">Subject:</span>
          <span class="value">${data.subject || ''}</span>
        </div>
        <div class="field">
          <span class="label">Message:</span>
        </div>
        <div class="message-box">
          ${(data.message || '').replace(/\n/g, '<br>')}
        </div>
      `;
    } else if (formType === 'applicant') {
      const isOptionA = data.formType === 'A';
      
      emailHtml += `
        <div class="field">
          <span class="label">Application Type:</span>
          <span class="value" style="background: ${isOptionA ? '#ffd700' : '#90EE90'}; padding: 5px 10px; border-radius: 3px;">
            Option ${data.formType || 'Unknown'} ${isOptionA ? '(Quick Apply)' : '(Full Application)'}
          </span>
        </div>
        
        <div class="section-header">Personal Information</div>
        <div class="field">
          <span class="label">Name:</span>
          <span class="value">${data.firstName || ''} ${data.lastName || ''}</span>
        </div>
      `;
      
      if (isOptionA) {
        // Option A - Quick Apply
        if (attachments.length > 0) {
          emailHtml += `
            <div class="field">
              <span class="label">CV:</span>
              <span class="value" style="color: green;">✓ CV attached (${attachments[0].filename})</span>
            </div>
          `;
        } else {
          emailHtml += `
            <div class="field">
              <span class="label">CV:</span>
              <span class="value" style="color: red;">No CV attached</span>
            </div>
          `;
        }
      } else {
        // Option B - Full Application
        emailHtml += `
          <div class="field">
            <span class="label">Address:</span>
            <span class="value">${data.address || ''}</span>
          </div>
          <div class="field">
            <span class="label">Postcode/Eircode:</span>
            <span class="value">${data.postcode || 'Not provided'}</span>
          </div>
          <div class="field">
            <span class="label">Mobile:</span>
            <span class="value">${data.mobile || ''}</span>
          </div>
          <div class="field">
            <span class="label">Email:</span>
            <span class="value">${data.email || ''}</span>
          </div>
          
          <div class="section-header">Additional Information</div>
          <div class="field">
            <span class="label">How they heard about us:</span>
            <span class="value">${data.hearAbout || 'Not specified'}</span>
          </div>
          <div class="field">
            <span class="label">Ideal Job:</span>
            <div class="message-box">${(data.idealJob || 'Not specified').replace(/\n/g, '<br>')}</div>
          </div>
          <div class="field">
            <span class="label">Qualifications/Certificates:</span>
            <div class="message-box">${(data.qualifications || 'None specified').replace(/\n/g, '<br>')}</div>
          </div>
          <div class="field">
            <span class="label">Full Driving Licence:</span>
            <span class="value">${data.drivingLicence === 'yes' ? '✓ Yes' : '✗ No'}</span>
          </div>
          <div class="field">
            <span class="label">Applied Before:</span>
            <span class="value">${data.appliedBefore === 'yes' ? '✓ Yes' : '✗ No'}</span>
          </div>
          <div class="field">
            <span class="label">Other Information:</span>
            <div class="message-box">${(data.otherInfo || 'None provided').replace(/\n/g, '<br>')}</div>
          </div>
          
          <div class="section-header">Work History</div>
          ${formatWorkHistory(data.workHistory)}
          
          <div class="field">
            <span class="label">CV:</span>
            <span class="value">${attachments.length > 0 ? `✓ CV attached (${attachments[0].filename})` : 'No CV attached'}</span>
          </div>
        `;
      }
    } else if (formType === 'client') {
      emailHtml += `
        <div class="field">
          <span class="label">Name:</span>
          <span class="value">${data.firstName || ''} ${data.lastName || ''}</span>
        </div>
        <div class="field">
          <span class="label">Email:</span>
          <span class="value">${data.email || ''}</span>
        </div>
        <div class="field">
          <span class="label">Mobile:</span>
          <span class="value">${data.mobile || ''}</span>
        </div>
        <div class="field">
          <span class="label">Address:</span>
          <span class="value">${data.address || ''}</span>
        </div>
        <div class="field">
          <span class="label">Postcode:</span>
          <span class="value">${data.postcode || 'Not provided'}</span>
        </div>
        <div class="field">
          <span class="label">Farm Type:</span>
          <span class="value">${data.farmType || ''}</span>
        </div>
        <div class="field">
          <span class="label">Worker Type:</span>
          <span class="value">${data.workerType || ''}</span>
        </div>
        <div class="field">
          <span class="label">Vacancy Description:</span>
        </div>
        <div class="message-box">
          ${(data.vacancyDescription || 'Not provided').replace(/\n/g, '<br>')}
        </div>
        <div class="field">
          <span class="label">How they heard about us:</span>
          <span class="value">${data.hearAbout || 'Not specified'}</span>
        </div>
        <div class="field">
          <span class="label">Best time to talk:</span>
          <span class="value">${data.bestTime || 'Not specified'}</span>
        </div>
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
    const mailOptions: any = {
      from: smtpEmail,
      to: smtpEmail, // Send to the same Gmail account
      subject: emailSubject,
      html: emailHtml,
    };

    // Add attachments if any
    if (attachments.length > 0) {
      mailOptions.attachments = attachments;
      devLog(`Adding ${attachments.length} attachment(s) to email`);
    }

    devLog('Attempting to send email to configured smtpEmail (not printing address in prod).');

    // Send email
    await transporter.sendMail(mailOptions);
    
    devLog('Email sent successfully with subject:', emailSubject);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    // Keep error logs, but avoid dumping full objects that might contain sensitive data
    console.error('Error sending email:', error?.message || error);
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: isDev ? (error?.message || 'Unknown error') : undefined
      },
      { status: 500 }
    );
  }
}

// GET endpoint for testing
export async function GET(req: NextRequest) {
  return NextResponse.json({
    message: "Contact API is working",
    emailConfigured: !!process.env.GOOGLE_EMAIL,
    passwordConfigured: !!process.env.GOOGLE_PASSWORD,
  });
}







