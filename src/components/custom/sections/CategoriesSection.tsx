import { useEffect, useRef, useState } from 'react';
import { Heart, MessageCircle, Sparkles, Brain, Leaf, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  { name: 'Сексуално здраве', slug: 'seksualno-zdrave', description: 'Анатомия, хигиена, профилактика', icon: Heart, courseCount: 12, color: 'bg-rose-50 text-rose-600', iconBg: 'bg-rose-100' },
  { name: 'Комуникация', slug: 'komunikaciya', description: 'Говорене, слушане, доверие', icon: MessageCircle, courseCount: 8, color: 'bg-sky-50 text-sky-600', iconBg: 'bg-sky-100' },
  { name: 'Техники', slug: 'tehniki', description: 'Практически умения и подходи', icon: Sparkles, courseCount: 10, color: 'bg-amber-50 text-amber-600', iconBg: 'bg-amber-100' },
  { name: 'Психология', slug: 'psihologiya', description: 'Желание, интимност, емоции', icon: Brain, courseCount: 7, color: 'bg-violet-50 text-violet-600', iconBg: 'bg-violet-100' },
  { name: 'Лайфстайл', slug: 'lajfstajl', description: 'Self-care, продукти, рутини', icon: Leaf, courseCount: 6, color: 'bg-emerald-50 text-emerald-600', iconBg: 'bg-emerald-100' },
  { name: 'За двойки', slug: 'za-dvojki', description: 'Заедно, по-добри, по-близки', icon: Users, courseCount: 5, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100' },
];

export function CategoriesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="container-main">
        <div className={cn('text-center max-w-2xl mx-auto mb-14 transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
          <span className="text-overline text-purple-700 mb-3 block">Избери тема</span>
          <h2 className="font-heading text-bw-text">Какво искаш да <span className="text-purple-700">научиш</span> днес?</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <button key={category.slug} className={cn('group flex flex-col items-center text-center p-6 rounded-2xl border border-purple-200/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-md hover:border-purple-300', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')} style={{ transitionDelay: isVisible ? `${150 + index * 80}ms` : '0ms' }}>
              <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110', category.iconBg)}>
                <category.icon className={cn('w-6 h-6', category.color.split(' ')[1])} />
              </div>
              <h3 className="font-heading text-sm font-semibold text-bw-text mb-1">{category.name}</h3>
              <p className="text-xs text-bw-text-muted mb-2">{category.description}</p>
              <span className="text-xs text-purple-600 font-medium">{category.courseCount} уроци</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
