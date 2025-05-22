require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

const app = express();
app.use(cors({
  origin: [
   "http://localhost:5173",
    "https://outfyldfrontend.onrender.com",       // your old Render URL
    "https://outfyld-frontend-szqq.onrender.com", // exactly as shown in Render
    "https://outfyld.in",
    "https://www.outfyld.in",
  ],
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/signup', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    // Insert into Supabase
    const { data, error: dbError } = await supabase
      .from('signups')
      .insert([{ name, email }])
      .select()
      .single();

    if (dbError) {
      if (dbError.code === '23505') {
        console.warn('Duplicate signup:', email);
        return res.status(409).json({ error: 'This email is already registered.' });
      }
      throw dbError;
    }

    // Send welcome email via Resend
    try {
      const sendResponse = await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: email,
        subject: '🎉 Welcome to PITCH PERFECT!',
        html: `
          <h1>Welcome, ${name}!</h1>
          <p>Thank you for signing up for PITCH PERFECT. We're excited to have you onboard!</p>
          <p>Stay tuned for updates and exclusive offers.</p>
        `,
      });
      console.log('Resend response:', sendResponse);
    } catch (emailErr) {
      console.error('Email send error:', emailErr);
      // Optionally: continue or return error
      // return res.status(502).json({ error: 'Mail service error' });
    }

    return res.status(200).json({ message: 'Signup successful and email sent', user: data });
  } catch (err) {
    console.error('Signup error:', err.message, err.details);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));