import { useEffect, useRef, useState } from 'react';
import { Shield, GraduationCap, MessageCircle, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const values = [
  { icon: GraduationCap, title: 'Експертни знания', description: 'Сертифицирани сексолози, психолози и гинеколози споделят проверени знания, базирани на наука.' },
  { icon: Shield, title: '100% Дискретност', description: 'Гледай където и когато искаш. Нищо не се публикува в социалните мрежи.' },
  { icon: MessageCircle, title: 'На български', description: 'Качествено съдържание на роден език. Без awkward преводи.' },
  { icon: Heart, title: 'Практични техники', description: 'Не теория, а aplicable съвети за реалния живот.' },
];

export function ValueProposition() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-white relative">
      <div className="container-main">
        <div className={cn('text-center max-w-2xl mx-auto mb-14 transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
          <span className="text-overline text-purple-700 mb-3 block">Защо Blankwet Academy?</span>
          <h2 className="font-heading text-bw-text">Знание, което <span className="text-purple-700">трансформира</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div key={value.title} className={cn('card-elevated p-8 text-center group transition-all duration-500', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')} style={{ transitionDelay: isVisible ? `${150 + index * 100}ms` : '0ms' }}>
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-purple-100 flex items-center justify-center group-hover:bg-purple-700 transition-colors duration-300">
                <value.icon className="w-7 h-7 text-purple-700 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-bw-text mb-3">{value.title}</h3>
              <p className="text-sm text-bw-text-secondary leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
