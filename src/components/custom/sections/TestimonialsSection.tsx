import { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  { id: 1, name: 'Мария', age: 32, text: 'Най-накрая намерих място, където мога да научавам за тялото си без срам. Уроците са професионални, но разбираеми — все едно говори твоята най-добра приятелка, която е и сексолог.', rating: 5, course: 'Основи на женската сексуалност' },
  { id: 2, name: 'Анна', age: 28, text: 'Винаги съм имала въпроси, за които не знаех къде да питам. Тук намерих отговори на неща, които ме вълнуваха от години. Препоръчвам на всички свои приятелки!', rating: 5, course: 'Сексуално здраве' },
  { id: 3, name: 'София', age: 35, text: 'След 10-годишна връзка мислех, че знам всичко. Курсът за комуникация промени начина, по който говоря с партньора ми. Не съм очаквала подобен ефект.', rating: 5, course: 'Комуникация в интимната връзка' },
];

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-bw-lavender">
      <div className="container-main">
        <div className={cn('text-center max-w-2xl mx-auto mb-14 transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
          <span className="text-overline text-purple-700 mb-3 block">Истории</span>
          <h2 className="font-heading text-bw-text">Какво казват <span className="text-purple-700">жените</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div key={t.id} className={cn('relative p-8 rounded-2xl bg-white transition-all duration-500', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')} style={{ transitionDelay: isVisible ? `${150 + index * 100}ms` : '0ms' }}>
              <Quote className="w-8 h-8 text-gold-400 mb-4" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />)}
              </div>
              <p className="text-bw-text-secondary text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-purple-200/50">
                <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center"><span className="text-sm font-semibold text-purple-700">{t.name.charAt(0)}</span></div>
                <div>
                  <p className="text-sm font-medium text-bw-text">{t.name}, {t.age}</p>
                  <p className="text-xs text-bw-text-muted">{t.course}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
