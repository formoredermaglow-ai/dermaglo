import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const form = await request.json();

    /* ── Validate required fields ── */
    if (!form.name || !form.phone || !form.service || !form.date || !form.time) {
      return Response.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    /* ── Build Gmail transporter using App Password ── */
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,         // formoredermaglo@gmail.com
        pass: process.env.GMAIL_APP_PASSWORD, // 16-char Gmail App Password
      },
    });

    /* ── Build a clean HTML email ── */
    const html = `
      <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f4fafa; border-radius: 12px; overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1a5f5c, #2e8c88); padding: 32px 40px; text-align: center;">
          <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">🌸 New Appointment Request</h1>
          <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">Lasya's Derma Glo — Advanced Skin Health</p>
        </div>

        <!-- Body -->
        <div style="padding: 32px 40px; background: #ffffff;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td colspan="2" style="padding-bottom: 16px; font-size: 18px; font-weight: 700; color: #1a3635; border-bottom: 2px solid #c4e4e3;">Patient Information</td></tr>
            ${row('👤 Full Name',      form.name)}
            ${row('📞 Phone',         `+91 ${form.phone}`)}
            ${row('✉️ Email',         form.email || 'Not provided')}
            ${row('⚥  Gender',        form.gender || 'Not provided')}
            ${row('🎂 Date of Birth', form.dob || 'Not provided')}
            <tr><td colspan="2" style="padding: 20px 0 16px; font-size: 18px; font-weight: 700; color: #1a3635; border-bottom: 2px solid #c4e4e3;">Appointment Details</td></tr>
            ${row('💆 Treatment',     form.service, true)}
            ${row('📅 Preferred Date', form.date, true)}
            ${row('🕐 Preferred Time', form.time, true)}
            ${form.notes ? row('📝 Notes', form.notes) : ''}
          </table>
        </div>

        <!-- Footer -->
        <div style="padding: 20px 40px; background: #134f4c; text-align: center;">
          <p style="margin: 0; color: rgba(255,255,255,0.7); font-size: 13px;">
            Lasya's Derma Glo · 1st Floor, Opp. Fasttracks, DDC Road, Danivelpeta, Rajahmundry – 533 108
          </p>
          <p style="margin: 6px 0 0; color: rgba(255,255,255,0.5); font-size: 12px;">
            This email was auto-generated from the website booking form.
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Lasya's Derma Glo Booking" <${process.env.GMAIL_USER}>`,
      to:   process.env.GMAIL_USER,   // sends to itself (the clinic's inbox)
      replyTo: form.email || process.env.GMAIL_USER,
      subject: `✨ New Appointment – ${form.name} | ${form.service} | ${form.date}`,
      html,
      text: `New Appointment Request\n\nName: ${form.name}\nPhone: +91 ${form.phone}\nEmail: ${form.email || 'Not provided'}\nGender: ${form.gender || 'Not provided'}\nDOB: ${form.dob || 'Not provided'}\nService: ${form.service}\nDate: ${form.date}\nTime: ${form.time}\nNotes: ${form.notes || 'None'}`,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

/* Helper to build a table row */
function row(label, value, highlight = false) {
  return `
    <tr>
      <td style="padding: 10px 0; font-size: 13px; color: #4d7a78; width: 160px; vertical-align: top;">${label}</td>
      <td style="padding: 10px 0; font-size: 14px; font-weight: ${highlight ? '700' : '500'}; color: ${highlight ? '#1a5f5c' : '#1a3635'};">${value}</td>
    </tr>`;
}
