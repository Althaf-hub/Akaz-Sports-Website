import { ShieldCheck, Truck, RotateCcw, CreditCard } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function WhyChooseUs() {
  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Free express shipping on all orders over $100. Get your gear when you need it.",
    },
    {
      icon: ShieldCheck,
      title: "Premium Quality",
      description: "Authentic, top-tier products sourced directly from the world's best sports brands.",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day hassle-free return policy. If it doesn't fit right, send it back.",
    },
    {
      icon: CreditCard,
      title: "Secure Checkout",
      description: "100% secure payments with end-to-end encryption for your peace of mind.",
    },
  ];

  return (
    <section className="w-full bg-zinc-950 py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center mb-20 text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white mb-4 uppercase">
              Why Choose <span className="text-primary">Akaz</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl text-lg font-medium">
              We don't just sell equipment; we provide the foundation for your athletic journey. Here's why athletes trust us.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div 
                  className="flex flex-col items-center text-center p-10 rounded-3xl glass-panel group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="h-20 w-20 rounded-full bg-black border border-white/10 flex items-center justify-center mb-8 mx-auto group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(0,87,255,0.4)] transition-all duration-500 text-white group-hover:text-primary">
                      <Icon className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">{feature.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
