import { useEffect, useRef, useState } from 'react';
import { Clock, BarChart3, Star, ChevronRight, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

const courses = [
  { id: 1, title: 'Основи на женската сексуалност', description: 'Разбери своята анатомия, научи за различните видове оргазъм.', category: 'Сексуално здраве', level: 'BEGINNER', duration: 180, lessons: 8, instructor: 'Д-р Мария Иванова', instructorTitle: 'Сексолог', rating: 4.9, reviews: 124, color: 'bg-purple-100' },
  { id: 2, title: 'Комуникация в интимната връзка', description: 'Научи се да говориш за желанията си и да изграждаш доверие.', category: 'Комуникация', level: 'INTERMEDIATE', duration: 120, lessons: 6, instructor: 'Психолог Анна Петрова', instructorTitle: 'Психотерапевт', rating: 4.8, reviews: 89, color: 'bg-gold-200/50' },
  { id: 3, title: 'Техники за близост и удоволствие', description: 'Практически техники за по-дълбока връзка.', category: 'Техники', level: 'ALL_LEVELS', duration: 240, lessons: 12, instructor: 'Д-р Елена Костова', instructorTitle: 'Сексуален терапевт', rating: 4.9, reviews: 156, color: 'bg-purple-100' },
  { id: 4, title: 'Психология на желанието', description: 'Разбери механизмите на сексуалното желание.', category: 'Психология', level: 'INTERMEDIATE', duration: 150, lessons: 7, instructor: 'Психолог София Михайлова', instructorTitle: 'Клиничен психолог', rating: 4.7, reviews: 67, color: 'bg-purple-100' },
  { id: 5, title: 'Интимен комфорт и self-care', description: 'Грижа за себе си преди, по време и след интимност.', category: 'Лайфстайл', level: 'BEGINNER', duration: 90, lessons: 5, instructor: 'Д-р Мария Иванова', instructorTitle: 'Сексолог', rating: 4.8, reviews: 93, color: 'bg-gold-200/50' },
  { id: 6, title: 'Сексуално здраве: Всичко, което трябва да знаеш', description: 'Профилактика, контрацепция, STI тестване.', category: 'Сексуално здраве', level: 'BEGINNER', duration: 200, lessons: 10, instructor: 'Д-р Иванка Стоянова', instructorTitle: 'Гинеколог', rating: 4.9, reviews: 201, color: 'bg-purple-100' },
];

const levelLabels: Record<string, string> = { BEGINNER: 'Начинаещи', INTERMEDIATE: 'Напреднали', ADVANCED: 'Експерти', ALL_LEVELS: 'Всички нива' };

export function FeaturedCourses() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="courses" className="section-padding bg-bw-cream">
      <div className="container-main">
        <div className={cn('flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
          <div>
            <span className="text-overline text-purple-700 mb-3 block">Популярни уроци</span>
            <h2 className="font-heading text-bw-text">Започни с <span className="text-purple-700">най-доброто</span></h2>
          </div>
          <button className="btn-secondary self-start md:self-auto">Виж всички уроци<ChevronRight className="w-4 h-4 ml-1" /></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div key={course.id} className={cn('group bg-white rounded-2xl overflow-hidden border border-purple-200/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-md', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')} style={{ transitionDelay: isVisible ? `${150 + index * 100}ms` : '0ms' }}>
              <div className={cn('relative aspect-video overflow-hidden', course.color)}>
                <div className="absolute inset-0 bg-purple-200/30" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-gold-400/90 backdrop-blur-sm flex items-center justify-center shadow-lg"><Play className="w-6 h-6 text-bw-text ml-1" /></div>
                </div>
                <div className="absolute top-4 left-4"><span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-purple-700">{course.category}</span></div>
                <div className="absolute top-4 right-4"><span className="px-3 py-1 bg-bw-text/60 backdrop-blur-sm rounded-full text-xs font-medium text-white">{levelLabels[course.level]}</span></div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-lg font-semibold text-bw-text mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors">{course.title}</h3>
                <p className="text-sm text-bw-text-secondary mb-4 line-clamp-2">{course.description}</p>
                <div className="flex items-center gap-4 mb-4 text-xs text-bw-text-muted">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration} мин</span>
                  <span className="flex items-center gap-1"><BarChart3 className="w-3.5 h-3.5" />{course.lessons} урока</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-purple-200/50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center"><span className="text-xs font-semibold text-purple-700">{course.instructor.charAt(0)}</span></div>
                    <div className="text-xs">
                      <p className="font-medium text-bw-text">{course.instructor}</p>
                      <p className="text-bw-text-muted">{course.instructorTitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                    <span className="text-xs font-medium text-bw-text">{course.rating}</span>
                    <span className="text-xs text-bw-text-muted">({course.reviews})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
