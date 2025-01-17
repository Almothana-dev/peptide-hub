import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#0065A7]">PeptideHub</h1>
        <div className="flex items-center gap-6">
          <nav className="space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Stacks</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Profile</a>
          </nav>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="ml-4"
          >
            Log out
          </Button>
        </div>
      </div>
    </header>
  );
};