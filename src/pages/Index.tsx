import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Protocol } from "@/types/protocol";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryFilter } from "@/components/home/CategoryFilter";
import { ProtocolGrid } from "@/components/protocols/ProtocolGrid";

const Index = () => {
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

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <CategoryFilter />
      
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

          <ProtocolGrid 
            protocols={protocols}
            isLoading={isLoading}
            error={error as Error}
          />
        </div>
      </section>
    </div>
  );
};

export default Index;