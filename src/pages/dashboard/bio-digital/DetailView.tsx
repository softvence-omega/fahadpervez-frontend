import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, Info, ChevronRight } from "lucide-react";
import { useGetModelDetailsQuery } from "@/store/features/bioDigital/bioDigitalExternal.api";

export default function BioDigitalDetailView() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Use External API hook
  const { data: rawModel, isLoading, isError } = useGetModelDetailsQuery(id || "", {
    skip: !id,
  });
  
  // Transform to internal shape
  const model = rawModel ? {
      id: rawModel.content_id || rawModel.id,
      title: rawModel.title,
      category: rawModel.category || "General",
      description: rawModel.description || "",
      thumbnail: rawModel.thumbnail_url || rawModel.thumbnail,
      modelUrl: rawModel.url || `https://human.biodigital.com/widget/?m=${rawModel.id}&ui-tools=true&ui-preset=true&ui-info=true&ui-menu=true&ui-search=true&ui-fadectrls=true`, // Fallback construction if full URL not provided
      details: rawModel.description || "",
      relatedImages: []
  } : null;

  useEffect(() => {
    if (!id) {
       navigate("/dashboard/bio-digital");
    }
  }, [id, navigate]);

  if (isLoading) {
    return (
        <div className="h-screen flex items-center justify-center">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );
  }

  if (!model || isError) {
    return (
        <div className="flex h-[80vh] items-center justify-center flex-col gap-4">
            <h2 className="text-xl font-semibold text-gray-700">Model not found or Error loading</h2>
            <Link to="/dashboard/bio-digital" className="text-blue-600 hover:underline cursor-pointer">Return to Explorer</Link>
        </div>
    )
  }



  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-4">
          <Link 
            to="/dashboard/bio-digital" 
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-gray-800 leading-tight">{model.title}</h1>
            <p className="text-xs text-slate-500 font-medium">{model.category}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
            <button 
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className={`p-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${isSidebarOpen ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-100 text-slate-600'}`}
            >
                <Info size={18} />
                <span className="hidden md:inline">Details</span>
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 cursor-pointer">
                <Share2 size={18} />
            </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* 3D Viewer Container */}
        <div className="flex-1 bg-black relative">
            <iframe
                id="biodigital-player"
                title={`BioDigital Viewer - ${model.title}`}
                src={model.modelUrl}
                width="100%"
                height="100%"
                className="w-full h-full border-0"
                allowFullScreen
            />
            
            {/* Overlay hint if needed */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-xs backdrop-blur-md pointer-events-none">
                Click and drag to rotate • Scroll to zoom • Click parts to select
            </div>
        </div>

        {/* Right Info Sidebar */}
        <div 
            className={`bg-white border-l border-slate-200 w-[350px] flex flex-col transition-all duration-300 absolute right-0 top-0 bottom-0 z-20 shadow-xl ${
                isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            <div className="p-5 overflow-y-auto flex-1">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-800">Information</h2>
                    <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-slate-600">
                        <ChevronRight size={20} />
                    </button>
                </div>

                <div className="prose prose-sm prose-slate">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        {model.description}
                    </p>

                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Detailed Anatomy</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        {model.details}
                    </p>
                </div>

                {/* Related Images / Carousel */}
                {model.relatedImages.length > 0 && (
                     <div className="mt-8">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Related Views</h3>
                        <div className="space-y-3">
                            {model.relatedImages.map((img, idx) => (
                                <div key={idx} className="rounded-lg overflow-hidden border border-slate-200 hover:ring-2 ring-blue-500 cursor-pointer transition-all">
                                    <img src={img} alt="Related view" className="w-full h-32 object-cover" />
                                </div>
                            ))}
                        </div>
                     </div>
                )}
            </div>
            
            <div className="p-4 border-t border-slate-200 bg-slate-50">
                <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors">
                    Take Quiz on this Topic
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
