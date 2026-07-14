import { useEffect, useRef, useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const plans = [
  { id: 'free', name: 'Безплатен', description: 'Започни своето пътуване', price: 0, priceLabel: '0 лв', period: 'завинаги', features: ['Достъп до 3 безплатни урока', 'Седмичен бюлетин със съвети', 'Общностен достъп', 'Препоръки за съдържание'], cta: 'Започни безплатно', highlighted: false },
  { id: 'monthly', name: 'Месечен', description: 'Пълен достъп, месец по месец', price: 1990, priceLabel: '19.90', period: 'лв/месец', features: ['Пълен достъп до всички курсове', 'Ново съдържание всяка седмица', 'HD видео качество', 'Персонализирани препоръки', 'Отмяна по всяко време'], cta: 'Започни месечен', highlighted: false },
  { id: 'yearly', name: 'Годишен', description: 'Най-добра стойност', price: 17900, priceLabel: '179', period: 'лв/година', originalPrice: 23880, discount: '25%', features: ['Всичко от Месечен', 'Ексклузивни уебинари', '1:1 Q&A с експерти (месечно)', 'Ранен достъп до нови курсове', '7-дневна гаранция'], cta: 'Започни годишен', highlighted: true, badge: 'Най-популярен' },
];

export function PricingSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } }, { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="section-padding bg-bw-cream">
      <div className="container-main max-w-5xl">
        <div className={cn('text-center max-w-2xl mx-auto mb-14 transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
          <span className="text-overline text-purple-700 mb-3 block">Абонамент</span>
          <h2 className="font-heading text-bw-text">Избери своя <span className="text-purple-700">план</span></h2>
          <p className="mt-4 text-bw-text-secondary">Пълен достъп до всички уроци. Анулирай по всяко време.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div key={plan.id} className={cn('relative rounded-2xl p-8 transition-all duration-500', plan.highlighted ? 'bg-purple-700 text-white shadow-lg scale-105 md:scale-110 z-10' : 'bg-white border border-purple-200/50', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')} style={{ transitionDelay: isVisible ? `${150 + index * 100}ms` : '0ms' }}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1 bg-gold-400 text-bw-text text-xs font-semibold rounded-full"><Sparkles className="w-3 h-3" />{plan.badge}</span>
                </div>
              )}
              <div className="mb-6">
                <h3 className={cn('font-heading text-xl font-semibold', plan.highlighted ? 'text-white' : 'text-bw-text')}>{plan.name}</h3>
                <p className={cn('text-sm mt-1', plan.highlighted ? 'text-white/70' : 'text-bw-text-secondary')}>{plan.description}</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className={cn('text-4xl font-heading font-bold', plan.highlighted ? 'text-gold-400' : 'text-bw-text')}>{plan.priceLabel}</span>
                  <span className={cn('text-sm', plan.highlighted ? 'text-white/60' : 'text-bw-text-muted')}>{plan.period}</span>
                </div>
                {plan.originalPrice && <p className="text-sm text-white/60 mt-1">Вместо <span className="line-through">{(plan.originalPrice / 100).toFixed(0)} лв</span> <span className="text-gold-400 font-medium">Спести {plan.discount}</span></p>}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3"><Check className={cn('w-4 h-4 mt-0.5 flex-shrink-0', plan.highlighted ? 'text-gold-400' : 'text-purple-600')} /><span className={cn('text-sm', plan.highlighted ? 'text-white/80' : 'text-bw-text-secondary')}>{feature}</span></li>
                ))}
              </ul>
              <button className={cn('w-full py-3.5 rounded-full font-semibold text-sm transition-all', plan.highlighted ? 'bg-gold-400 text-bw-text hover:bg-gold-500' : 'bg-purple-700 text-white hover:bg-purple-800')}>{plan.cta}</button>
              {plan.highlighted && <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-white/50"><span>Сигурно плащане</span><span>•</span><span>Анулирай по всяко време</span></div>}
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-bw-text-muted mt-10">Плащанията се обработват сигурно чрез Stripe. На банковата извадка ще пише "BW ACADEMY".</p>
      </div>
    </section>
  );
}
