import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { type CarouselImage } from "@shared/schema";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

interface HeroCarouselProps {
  images: CarouselImage[];
  onContactClick: () => void;
}

export function HeroCarousel({ images, onContactClick }: HeroCarouselProps) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  const defaultImages = [
    { 
      id: 999, 
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070", 
      caption: "Perawatan Medis Profesional di Rumah Anda" 
    },
    { 
      id: 998, 
      imageUrl: "https://images.unsplash.com/photo-1584515933487-9d3005c010aa?auto=format&fit=crop&q=80&w=2070", 
      caption: "Layanan Kesehatan Terpercaya 24 Jam" 
    },
    {
      id: 997,
      imageUrl: "https://images.unsplash.com/photo-1516574187841-69301976e499?auto=format&fit=crop&q=80&w=2070",
      caption: "Tim Medis Berpengalaman & Bersertifikat"
    }
  ];

  const displayImages = images.length > 0 ? images : defaultImages;

  return (
    <div className="relative w-full h-[600px] md:h-[700px] bg-slate-900 overflow-hidden">
      <div className="embla w-full h-full" ref={emblaRef}>
        <div className="embla__container h-full flex">
          {displayImages.map((image) => (
            <div className="embla__slide flex-[0_0_100%] min-w-0 relative h-full" key={image.id}>
              {/* Image with Gradient Overlay */}
              <div className="absolute inset-0">
                <img
                  src={image.imageUrl}
                  alt={image.caption || "Hero image"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/40 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="relative h-full flex items-center container mx-auto px-4 md:px-6 lg:px-8">
                <div className="max-w-2xl space-y-6 animate-in slide-in-from-left-10 fade-in duration-700">
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white text-shadow-lg leading-tight">
                    {image.caption || "Kesehatan Anda, Prioritas Kami"}
                  </h1>
                  <p className="text-lg md:text-xl text-blue-100 max-w-lg leading-relaxed">
                    Oki HomeCare menghadirkan layanan medis profesional langsung ke kenyamanan rumah Anda.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <Button 
                      onClick={onContactClick}
                      size="lg" 
                      className="bg-accent hover:bg-accent/90 text-white font-bold text-lg px-8 py-6 h-auto rounded-full shadow-lg shadow-orange-900/20 hover:scale-105 transition-transform"
                    >
                      Pesan Sekarang
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm font-semibold text-lg px-8 py-6 h-auto rounded-full transition-all"
                      onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Lihat Layanan
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
