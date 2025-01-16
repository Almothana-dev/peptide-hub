import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#0065A7]">PeptideHub</h1>
          <nav className="space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Supplements</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Stacks</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
          </nav>
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
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Input 
              type="text"
              placeholder="Search for a supplement or peptide..."
              className="w-full py-6 pl-4 pr-12 rounded-lg text-gray-900"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* CTA Button */}
          <Button 
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-lg rounded-full transition-all"
          >
            PeptideHub+ unlocks everything on the site
          </Button>
        </div>
      </section>

      {/* Featured Supplements Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Supplements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* BPC-157 Card */}
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">BPC-157</h3>
              <p className="text-gray-600 mb-4">Promotes healing and reduces inflammation</p>
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400">★</span>
                ))}
                <span className="text-gray-600">(2 reviews)</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">🤒 Gut Health</span>
                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">🔄 Healing</span>
                <span className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full">🦿 Joint Pain</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-600">128</span>
                <Button variant="outline" size="sm">Learn More →</Button>
              </div>
            </div>

            {/* Additional supplement cards would go here, following the same structure */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;