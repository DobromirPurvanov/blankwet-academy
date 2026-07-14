import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, Users, Star, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-[15%] w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-[20%] w-48 h-48 bg-purple-400/10 rounded-full blur-2xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
      </div>

      <div className="container-main relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className={cn('inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8 transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-overline text-gold-400">Ново: Първата видео академия в България</span>
          </div>

          <h1 className={cn('font-heading text-white leading-[1.05] mb-6 transition-all duration-700 delay-100', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold">Научи се да обичаш</span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mt-2">тялото си — <span className="text-gold-400">без срам</span></span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mt-2 text-white/90">и без табута</span>
          </h1>

          <p className={cn('text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
            Видео уроци за сексуално образование, интимен комфорт и модерен женски лайфстайл — създадени от експерти, на български език
          </p>

          <div className={cn('flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-700 delay-300', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
            <button className="btn-primary text-base px-8 py-4 group">
              Започни безплатно
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="inline-flex items-center gap-3 px-6 py-4 text-white font-medium hover:text-gold-400 transition-colors group">
              <span className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-gold-400/20 transition-colors">
                <Play className="w-5 h-5 ml-0.5" />
              </span>
              Виж всички уроци
            </button>
          </div>

          <div className={cn('flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 transition-all duration-700 delay-400', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
            <div className="flex items-center">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-purple-700 bg-purple-200 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-purple-300/50" />
                  </div>
                ))}
              </div>
              <div className="ml-4 text-left">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-gold-400" />
                  <span className="text-white font-semibold text-sm">4,200+</span>
                </div>
                <span className="text-white/60 text-xs">жени вече учат с нас</span>
              </div>
            </div>
            <div className="h-8 w-px bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
                ))}
              </div>
              <span className="text-white font-medium text-sm">4.9/5</span>
              <span className="text-white/60 text-xs">от 856 отзива</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
