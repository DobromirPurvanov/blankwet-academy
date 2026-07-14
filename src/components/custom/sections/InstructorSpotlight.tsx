import { useEffect, useRef, useState } from 'react';
import { Award, BookOpen, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const instructors = [
  { id: 1, name: 'Д-р Мария Иванова', title: 'Сексолог', bio: '15+ години опит в клиничната сексология. Сертифициран сексуален терапевт.', credentials: ['PhD Сексология', 'AASECT сертифициран'], courseCount: 8, studentCount: 3420 },
  { id: 2, name: 'Психолог Анна Петрова', title: 'Психотерапевт', bio: 'Специализира в couples therapy и сексуалната психология.', credentials: ['MA Клинична психология', 'EFT сертифициран'], courseCount: 6, studentCount: 2180 },
  { id: 3, name: 'Д-р Елена Костова', title: 'Сексуален терапевт', bio: 'Фокусира се върху практическите техники за подобряване на интимния живот.', credentials: ['MD Гинекология', 'Сексуална терапия'], courseCount: 5, studentCount: 1890 },
  { id: 4, name: 'Д-р Иванка Стоянова', title: 'Гинеколог', bio: '20-годишен опит в женското репродуктивно здраве.', credentials: ['MD Акушерство и гинекология', 'ECOG сертифициран'], courseCount: 4, studentCount: 2560 },
];

export function InstructorSpotlight() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } }, { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="instructors" className="section-padding bg-white">
      <div className="container-main">
        <div className={cn('text-center max-w-2xl mx-auto mb-14 transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
          <span className="text-overline text-purple-700 mb-3 block">Експертите</span>
          <h2 className="font-heading text-bw-text">Учи от <span className="text-purple-700">най-добрите</span></h2>
          <p className="mt-4 text-bw-text-secondary">Нашите инструктори са сертифицирани професионалисти с дългогодишен опит.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((instructor, index) => (
            <div key={instructor.id} className={cn('group text-center p-6 rounded-2xl border border-purple-200/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-md hover:border-purple-300', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')} style={{ transitionDelay: isVisible ? `${150 + index * 100}ms` : '0ms' }}>
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-700 transition-colors">
                <span className="text-2xl font-heading font-semibold text-purple-700 group-hover:text-white transition-colors">{instructor.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-bw-text">{instructor.name}</h3>
              <p className="text-sm text-purple-600 font-medium mb-3">{instructor.title}</p>
              <p className="text-xs text-bw-text-secondary leading-relaxed mb-4 line-clamp-3">{instructor.bio}</p>
              <div className="flex flex-wrap justify-center gap-1 mb-4">
                {instructor.credentials.map((cred) => (
                  <span key={cred} className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 rounded-full text-[10px] font-medium text-purple-700"><Award className="w-3 h-3" />{cred}</span>
                ))}
              </div>
              <div className="flex items-center justify-center gap-4 pt-4 border-t border-purple-200/50 text-xs text-bw-text-muted">
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{instructor.courseCount} уроци</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{(instructor.studentCount / 1000).toFixed(1)}K</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
