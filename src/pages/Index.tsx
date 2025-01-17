import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const renderStars = (count) => {
    return Array(5).fill(0).map((_, index) => (
      <span key={index} className={`text-yellow-400`}>★</span>
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header section remains the same */}
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

      {/* Hero Section remains the same */}
      <section className="bg-[#0065A7] text-white py-20">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold max-w-3xl mx-auto">
            Peptide and supplement information you can trust
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            PeptideHub uses the latest evidence to find out which peptides and supplements work. We have no ads or industry ties.
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <Input 
              type="text"
              placeholder="Search for a supplement or peptide..."
              className="w-full py-6 pl-4 pr-12 rounded-lg text-gray-900"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <Button 
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-lg rounded-full transition-all"
          >
            PeptideHub+ unlocks everything on the site
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-4">
            <button className="whitespace-nowrap px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200">All</button>
            <button className="whitespace-nowrap px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200">👁️ Focus</button>
            <button className="whitespace-nowrap px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200">🧠 Memory</button>
            <button className="whitespace-nowrap px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200">🎯 Cognition</button>
            <button className="whitespace-nowrap px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200">🔄 Recovery</button>
            <button className="whitespace-nowrap px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200">😴 Sleep</button>
            {/* Add more category buttons as needed */}
          </div>
        </div>
      </section>

      {/* Protocols Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Explore Protocols & Stacks</h2>
            <select className="border rounded-lg px-4 py-2">
              <option>Most Popular</option>
              <option>Newest</option>
              <option>Highest Rated</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Longevity Protocol Card */}
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-2">Longevity Protocol</h3>
              <p className="text-gray-600 mb-2">Created by: Prof. David Sinclair</p>
              <p className="text-gray-700 mb-4">Aims to slow aging and promote cellular health</p>
              
              <div className="flex items-center gap-2 mb-4">
                {renderStars(5)}
                <span className="text-gray-600">(2 reviews)</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-sm bg-orange-100 text-orange-800 px-3 py-1 rounded-full">👴 Anti-Aging</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">🧬 Cellular Health</span>
                <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">⚡ Energy</span>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-gray-700">NMN (1) - 1000mg daily</p>
                <p className="text-gray-700">Resveratrol (2) - 1000mg daily</p>
                <p className="text-gray-700">Metformin (3) - 500mg twice daily</p>
                <p className="text-gray-700">Berberine (4) - 500mg thrice daily</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">112</span>
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </div>
                <div className="text-sm text-gray-600">
                  References: [1] [2] [3] [4]
                </div>
              </div>
            </div>

            {/* Immune Booster Card */}
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-2">Immune Booster</h3>
              <p className="text-gray-600 mb-2">Created by: Dr. Emily Chen</p>
              <p className="text-gray-700 mb-4">Strengthens immune system and overall health</p>
              
              <div className="flex items-center gap-2 mb-4">
                {renderStars(5)}
                <span className="text-gray-600">(2 reviews)</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-full">🛡️ Immune Health</span>
                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">🌿 General Wellness</span>
                <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">⚡ Energy</span>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-gray-700">Vitamin C (1) - 1000mg daily</p>
                <p className="text-gray-700">Zinc (2) - 30mg daily</p>
                <p className="text-gray-700">Quercetin (3) - 500mg twice daily</p>
                <p className="text-gray-700">Vitamin D3 (4) - 5000 IU daily</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">89</span>
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </div>
                <div className="text-sm text-gray-600">
                  References: [1] [2] [3] [4]
                </div>
              </div>
            </div>

            {/* Cognitive Boost Card */}
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-2">Cognitive Boost</h3>
              <p className="text-gray-600 mb-2">Created by: Alex T.</p>
              <p className="text-gray-700 mb-4">Improved focus and memory</p>
              
              <div className="flex items-center gap-2 mb-4">
                {renderStars(5)}
                <span className="text-gray-600">(2 reviews)</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full">👁️ Focus</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">🧠 Memory</span>
                <span className="text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">🎯 Cognition</span>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-gray-700">Modafinil (1) - 100mg daily</p>
                <p className="text-gray-700">Lion's Mane (2) - 500mg twice daily</p>
                <p className="text-gray-700">Alpha-GPC (3) - 300mg with Modafinil</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">76</span>
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </div>
                <div className="text-sm text-gray-600">
                  References: [1] [2] [3]
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;