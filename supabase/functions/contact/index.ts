import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const RESEND_API_KEY = 're_erfZKgAR_MSKRK2ZHeGHvjojQyBbBDo3Q';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    
    // Validate input
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      throw new Error('Missing required fields');
    }

    // Create email content
    const emailContent = `
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}
    `;

    // Send email using Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'mohamedali.jaadari@gmail.com',
        subject: `[Contact Form] ${formData.subject}`,
        text: emailContent,
        reply_to: formData.email,
      }),
    });

    if (!response.ok) {
      const responseData = await response.json();
      console.error('Resend API error:', responseData);
      throw new Error(responseData.message || 'Failed to send email');
    }

    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    );
  } catch (error) {
    console.error('Error in contact function:', error);
    
    // Return a more specific error message
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: 'Failed to send message. Please try again later.'
      }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
});