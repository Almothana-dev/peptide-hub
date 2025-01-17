export const CategoryFilter = () => {
  return (
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
  );
};