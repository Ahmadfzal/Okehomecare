import { useState } from "react";
import { useServices, useCarouselImages } from "@/hooks/use-homecare";
import { type Service } from "@shared/schema";
import { ContactDialog } from "@/components/ContactDialog";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Loader2, PhoneCall, ShieldCheck, HeartPulse, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: services, isLoading: isServicesLoading } = useServices();
  const { data: carouselImages, isLoading: isImagesLoading } = useCarouselImages();
  
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleContact = (service?: Service) => {
    setSelectedService(service || null);
    setContactOpen(true);
  };

  const specialOffers = services?.filter(s => s.category === 'special_offer') || [];
  const specialCare = services?.filter(s => s.category === 'special_care') || [];

  if (isServicesLoading || isImagesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-muted-foreground font-medium animate-pulse">Memuat Oki HomeCare...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Navbar - Absolute Positioned */}
      <nav className="absolute top-0 left-0 right-0 z-50 py-6 px-4 md:px-8 border-b border-white/10 bg-gradient-to-b from-black/50 to-transparent">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/50">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold text-white tracking-tight text-shadow">
              Oki<span className="text-accent">HomeCare</span>
            </span>
          </div>
          <Button 
            onClick={() => handleContact()}
            className="bg-white hover:bg-blue-50 text-primary font-bold shadow-lg transition-all hover:scale-105"
          >
            <PhoneCall className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Hubungi Kami</span>
            <span className="sm:hidden">Kontak</span>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroCarousel 
        images={carouselImages || []} 
        onContactClick={() => handleContact()} 
      />

      {/* Trust Indicators */}
      <section className="py-12 bg-white relative z-10 -mt-10 mx-4 md:mx-8 lg:mx-auto max-w-7xl rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8 px-8 border border-slate-100">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-xl text-primary">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">Terpercaya & Aman</h3>
            <p className="text-muted-foreground text-sm">Seluruh tenaga medis kami telah terverifikasi dan memiliki sertifikasi resmi.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-xl text-primary">
            <HeartPulse className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">Pelayanan Sepenuh Hati</h3>
            <p className="text-muted-foreground text-sm">Kami merawat pasien layaknya keluarga sendiri dengan dedikasi tinggi.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-xl text-primary">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">Siap 24/7</h3>
            <p className="text-muted-foreground text-sm">Layanan darurat dan konsultasi tersedia kapanpun Anda butuhkan.</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <div id="services" className="py-24 space-y-24">
        
        {/* Special Offers (Booster & Vitamin) */}
        <section className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-bold tracking-wider uppercase text-sm mb-2 block">Penawaran Spesial</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">Booster & Vitamin</h2>
            <p className="text-lg text-muted-foreground">Tingkatkan imunitas dan energi Anda dengan paket vitamin dan booster pilihan terbaik kami.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialOffers.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                index={index}
                onContact={handleContact} 
              />
            ))}
            {specialOffers.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground bg-slate-50 rounded-2xl border border-dashed">
                Belum ada penawaran spesial saat ini.
              </div>
            )}
          </div>
        </section>

        {/* Special Care (Perawatan Khusus) */}
        <section className="bg-slate-50 py-24 border-y border-slate-200">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Layanan Utama</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">Perawatan Khusus</h2>
              <p className="text-lg text-muted-foreground">Perawatan medis intensif dan pendampingan profesional untuk pemulihan optimal di rumah.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {specialCare.map((service, index) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  index={index}
                  onContact={handleContact} 
                />
              ))}
              {specialCare.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground bg-white rounded-2xl border border-dashed">
                  Layanan perawatan khusus akan segera tersedia.
                </div>
              )}
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-white">
                Oki<span className="text-accent">HomeCare</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Memberikan pelayanan kesehatan terbaik langsung ke rumah Anda dengan tenaga medis profesional dan bersertifikat.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 font-display">Kontak Kami</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-primary" />
                <span>+6285240354224</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 flex items-center justify-center text-primary font-bold">@</span>
                <span>okiwahyudi098@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 font-display">Jam Operasional</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span>Senin - Jumat</span>
                <span className="text-white">08:00 - 20:00</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span>Sabtu - Minggu</span>
                <span className="text-white">09:00 - 17:00</span>
              </li>
              <li className="flex justify-between pt-2">
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Oki HomeCare. All rights reserved.
        </div>
      </footer>

      {/* Contact Dialog */}
      <ContactDialog 
        open={contactOpen} 
        onOpenChange={setContactOpen} 
        selectedService={selectedService} 
      />
    </div>
  );
}
