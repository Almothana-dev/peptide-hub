import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  type: "welcome" | "action_completed";
  to: string;
  username?: string;
  actionType?: string;
}

const getEmailContent = (type: string, username?: string, actionType?: string) => {
  switch (type) {
    case "welcome":
      return {
        subject: "Welcome to PeptideHub!",
        html: `
          <h1>Welcome to PeptideHub!</h1>
          <p>Hi ${username || "there"},</p>
          <p>Thank you for joining PeptideHub! We're excited to have you on board.</p>
          <p>With PeptideHub, you can:</p>
          <ul>
            <li>Access trusted peptide and supplement information</li>
            <li>Track your supplement stacks</li>
            <li>Get personalized recommendations</li>
          </ul>
          <p>If you have any questions, feel free to reach out to our support team.</p>
          <p>Best regards,<br>The PeptideHub Team</p>
        `,
      };
    case "action_completed":
      return {
        subject: `Action Completed: ${actionType}`,
        html: `
          <h1>Action Completed</h1>
          <p>Hi ${username || "there"},</p>
          <p>This email confirms that you have successfully completed the following action: ${actionType}</p>
          <p>Thank you for using PeptideHub!</p>
          <p>Best regards,<br>The PeptideHub Team</p>
        `,
      };
    default:
      throw new Error("Invalid email type");
  }
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const emailRequest: EmailRequest = await req.json();
    const emailContent = getEmailContent(
      emailRequest.type,
      emailRequest.username,
      emailRequest.actionType
    );

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "PeptideHub <onboarding@resend.dev>",
        to: [emailRequest.to],
        subject: emailContent.subject,
        html: emailContent.html,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Email sent successfully:", data);
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } else {
      const error = await res.text();
      console.error("Error sending email:", error);
      return new Response(JSON.stringify({ error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);