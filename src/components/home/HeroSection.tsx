import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const HeroSection = () => {
  return (
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
  );
};