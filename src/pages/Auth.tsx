import { useEffect, useState } from "react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { AuthError } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

type AuthChangeEvent = 
  | "SIGNED_IN" 
  | "SIGNED_UP" 
  | "SIGNED_OUT" 
  | "USER_UPDATED" 
  | "USER_DELETED" 
  | "PASSWORD_RECOVERY"
  | "INITIAL_SESSION";

const Auth = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event); // For debugging

        if ((event as AuthChangeEvent) === "SIGNED_IN" && session) {
          navigate("/");
        }
        
        if ((event as AuthChangeEvent) === "SIGNED_UP" && session) {
          try {
            const { error } = await supabase.functions.invoke("send-email", {
              body: {
                type: "welcome",
                to: session.user.email,
                username: session.user.email?.split("@")[0],
              },
            });
            if (error) {
              console.error("Error sending welcome email:", error);
              toast({
                title: "Welcome!",
                description: "Sign up successful, but we couldn't send you a welcome email.",
                variant: "destructive",
              });
            } else {
              toast({
                title: "Welcome!",
                description: "Check your email for a welcome message.",
              });
            }
          } catch (error) {
            console.error("Error invoking send-email function:", error);
          }
          navigate("/");
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const getErrorMessage = (error: AuthError) => {
    switch (error.message) {
      case "Invalid login credentials":
        return "Invalid email or password. Please check your credentials and try again.";
      case "Email not confirmed":
        return "Please verify your email address before signing in.";
      case "User not found":
        return "No user found with these credentials.";
      default:
        return error.message;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-2xl font-bold text-[#0065A7] text-center mb-2">PeptideHub</h1>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {errorMessage && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="light"
            providers={[]}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;