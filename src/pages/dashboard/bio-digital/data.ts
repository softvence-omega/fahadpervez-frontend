
export interface BioModel {
  id: string;
  title: string;
  category: "Cardiology" | "Neurology" | "Orthopedics" | "Pulmonology" | "Gastroenterology";
  thumbnail: string; // URL for the card image
  modelUrl: string; // The BioDigital embed URL
  description: string;
  details: string; // Detailed text info
  relatedImages: string[]; // For the slider/related views
}

export const bioModels: BioModel[] = [
  {
    id: "cardio-1",
    title: "Healthy Heart",
    category: "Cardiology",
    thumbnail: "https://human.biodigital.com/widgets/beating-heart-thumbnail.jpg", // Placeholder or real thumbnail
    modelUrl: "https://human.biodigital.com/widget/?m=client/hearth_house/dd_congestive_heart_failure_v02.json&ui-info=true&ui-search=true&ui-reset=true&ui-navigation=true&ui-layers=true&ui-share=false&ui-help=true&ui-fullscreen=true&ui-tools=true",
    description: "A detailed 3D model of a healthy human heart showing chambers and valves.",
    details: "The human heart is an organ that pumps blood throughout the body via the circulatory system, supplying oxygen and nutrients to the tissues and removing carbon dioxide and other wastes.",
    relatedImages: [
      "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=2070"
    ]
  },
  {
    id: "neuro-1",
    title: "Brain Anatomy",
    category: "Neurology",
    thumbnail: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=2070",
    modelUrl: "https://human.biodigital.com/widget/?m=nervous_system_complete.json&ui-info=true&ui-search=true&ui-reset=true&ui-navigation=true", 
    // Note: Using a generic nervous system URL as placeholder if specific one isn't public. 
    // Standard public BioDigital URLs usually look like: https://human.biodigital.com/widget/?m=...
    description: "Complete anatomy of the human brain and nervous system.",
    details: "The brain is the central information processing organ of the body. It controls most of the activities of the body, processing, integrating, and coordinating the information it receives from the sense organs.",
    relatedImages: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=2069"
    ]
  },
  {
    id: "ortho-1",
    title: "Knee Joint",
    category: "Orthopedics",
    thumbnail: "https://images.unsplash.com/photo-1583912267650-6170d10d1c64?auto=format&fit=crop&q=80&w=1976",
    modelUrl: "https://human.biodigital.com/widget/?m=skeletal_system_lower_limb.json&ui-info=true",
    description: "Structure of the knee joint including ligaments and bones.",
    details: "The knee joint is a hinge type synovial joint, which mainly allows for flexion and extension (and a small degree of medial and lateral rotation). It is formed by articulations between the patella, femur and tibia.",
    relatedImages: []
  },
  {
    id: "cardio-2",
    title: "Coronary Arteries",
    category: "Cardiology",
    thumbnail: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=2070",
    modelUrl: "https://human.biodigital.com/widget/?m=client/nyu/coronary_artery_disease_v02.json&ui-info=true",
    description: "Visualization of the coronary arteries and potential blockages.",
    details: "Coronary arteries supply blood to the heart muscle. Like all other tissues in the body, the heart muscle needs oxygen-rich blood to function.",
    relatedImages: []
  }
];
