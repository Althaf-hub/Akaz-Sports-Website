import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function CTA() {
  return (
    <section className="w-full bg-black py-40 relative overflow-hidden">
      {/* Background with abstract diagonal split and glow */}
      <div className="absolute inset-0 bg-zinc-950 skew-y-3 scale-110 origin-bottom-left" />
      <div className="absolute top-[20%] left-[50%] h-[50vw] w-[50vw] rounded-full bg-primary/10 blur-[150px] pointer-events-none -translate-x-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 glass p-10 md:p-16 lg:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden">
            
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />

            <div className="flex-1 max-w-2xl text-center lg:text-left relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-white mb-6 uppercase leading-none">
                Join the <br/><span className="text-primary text-glow">Elite</span>
              </h2>
              <p className="text-lg md:text-xl text-zinc-400 mb-10 font-medium">
                Subscribe to our newsletter to receive exclusive offers, early access to new releases, and elite training tips directly to your inbox.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 w-full">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 px-8 py-5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-zinc-500 font-medium"
                  required
                />
                <button 
                  type="submit"
                  className="px-10 py-5 rounded-full bg-white text-black font-black uppercase tracking-widest hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-zinc-500 mt-6 font-medium">
                By subscribing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
            
            {/* Aesthetic geometric element */}
            <div className="hidden lg:flex flex-1 items-center justify-center relative h-80 z-10">
              <div className="absolute w-80 h-80 border border-primary/40 rounded-full animate-[spin_15s_linear_infinite]" />
              <div className="absolute w-60 h-60 border border-white/20 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
              <div className="absolute w-40 h-40 bg-primary/20 blur-3xl rounded-full" />
              <div className="absolute text-7xl font-black text-white/5 tracking-tighter uppercase">
                AKAZ
              </div>
            </div>
            
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
