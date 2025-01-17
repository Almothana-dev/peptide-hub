import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

// Types for our protocol data
type Protocol = {
  id: string;
  title: string;
  description: string | null;
  creator: {
    username: string | null;
  };
  average_rating: number | null;
  total_ratings: number | null;
  categories: { category: string }[];
  steps: {
    step_number: number;
    supplement_name: string;
    dosage: string;
    frequency: string;
  }[];
};

const Index = () => {
  const navigate = useNavigate();

  const { data: protocols, isLoading, error } = useQuery({
    queryKey: ['protocols'],
    queryFn: async () => {
      const { data: protocols, error } = await supabase
        .from('protocols')
        .select(`
          *,
          creator:profiles(username),
          categories:protocol_categories(category),
          steps:protocol_steps(step_number, supplement_name, dosage, frequency)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return protocols as Protocol[];
    },
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const renderStars = (rating: number | null) => {
    const ratingValue = rating || 0;
    return Array(5).fill(0).map((_, index) => (
      <span key={index} className={`text-yellow-400 ${index >= ratingValue ? 'opacity-30' : ''}`}>★</span>
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header section */}
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

      {/* Hero Section */}
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

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-lg p-6">
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Skeleton key={s} className="h-4 w-4" />
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-600">
              Failed to load protocols. Please try again later.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {protocols?.map((protocol) => (
                <div key={protocol.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold mb-2">{protocol.title}</h3>
                  <p className="text-gray-600 mb-2">Created by: {protocol.creator.username || 'Anonymous'}</p>
                  <p className="text-gray-700 mb-4">{protocol.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    {renderStars(protocol.average_rating)}
                    <span className="text-gray-600">({protocol.total_ratings || 0} reviews)</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {protocol.categories.map(({ category }, index) => (
                      <span 
                        key={index}
                        className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2 mb-6">
                    {protocol.steps
                      .sort((a, b) => a.step_number - b.step_number)
                      .map((step, index) => (
                        <p key={index} className="text-gray-700">
                          {step.supplement_name} ({index + 1}) - {step.dosage} {step.frequency}
                        </p>
                      ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">{protocol.total_ratings}</span>
                      <ChevronDown className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="text-sm text-gray-600">
                      References: {protocol.steps.map((_, i) => `[${i + 1}]`).join(' ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;