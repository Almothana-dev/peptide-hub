export type Protocol = {
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