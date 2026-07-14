import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Mail, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NewsletterCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } }, { threshold: 0.3 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setIsSubmitted(true); setTimeout(() => { setIsSubmitted(false); setEmail(''); }, 3000); }
  };

  return (
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="container-main">
        <div className={cn('gradient-newsletter rounded-3xl p-10 md:p-16 text-center relative overflow-hidden transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-xl mx-auto">
            <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center"><Mail className="w-6 h-6 text-gold-400" /></div>
            <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">Получи <span className="text-gold-400">безплатен урок</span> всяка седмица</h2>
            <p className="text-white/70 mb-8">Без спам. Без срам. Само полезни съвети и нови уроци директно в пощата ти.</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tvoq@email.com" className="flex-1 h-12 px-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-gold-400/50 focus:bg-white/15 transition-colors" required disabled={isSubmitted} />
              <button type="submit" disabled={isSubmitted} className={cn('h-12 px-6 rounded-full font-semibold text-sm inline-flex items-center justify-center gap-2 transition-all', isSubmitted ? 'bg-green-500 text-white' : 'bg-gold-400 text-bw-text hover:bg-gold-500')}>
                {isSubmitted ? <><Check className="w-4 h-4" />Готово!</> : <>Абонирай ме<ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
            <p className="text-white/40 text-xs mt-4">Можеш да се отпишеш по всяко време.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
