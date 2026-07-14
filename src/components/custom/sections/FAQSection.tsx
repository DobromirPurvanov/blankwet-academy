import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  { question: 'Ще се вижда ли това във Facebook профила ми?', answer: 'Не, абсолютно не. Ние не публикуваме нищо в социалните мрежи от твое име. Твоите данни са напълно конфиденциални.' },
  { question: 'Каква е разликата между безплатните и платените уроци?', answer: 'Безплатният план дава достъп до 2-3 подбрани урока. С платен абонамент получаваш неограничен достъп до всички курсове.' },
  { question: 'Мога ли да гледам на телефона си?', answer: 'Да! Платформата е responsive и работи перфектно на телефон, таблет и компютър.' },
  { question: 'Има ли възрастово ограничение?', answer: 'Да, трябва да си навършила 18 години. При регистрация проверяваме възрастта.' },
  { question: 'Мога ли да анулирам абонамента си?', answer: 'Разбира се! Можеш да анулираш по всяко време. Предлагаме и 7-дневна гаранция за връщане на парите.' },
  { question: 'Колко често се добавя ново съдържание?', answer: 'Добавяме нови уроци всяка седмица и поне по един курс всеки месец.' },
  { question: 'Информацията медицински точна ли е?', answer: 'Всички медицински теми са прегледани от сертифицирани специалисти. Съдържанието е с образователна цел.' },
  { question: 'Мога ли да гледам с партньора си?', answer: 'Разбира се! Много жени гледат уроците заедно с партньорите си.' },
];

function FAQItem({ faq, index, isOpen, onToggle, isVisible }: { faq: typeof faqs[0]; index: number; isOpen: boolean; onToggle: () => void; isVisible: boolean }) {
  return (
    <div className={cn('border border-purple-200/50 rounded-xl overflow-hidden transition-all duration-500', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')} style={{ transitionDelay: isVisible ? `${150 + index * 60}ms` : '0ms' }}>
      <button onClick={onToggle} className={cn('w-full flex items-center justify-between p-5 text-left transition-colors', isOpen ? 'bg-purple-50' : 'bg-white hover:bg-purple-50/50')}>
        <span className={cn('font-medium text-sm pr-4', isOpen ? 'text-purple-700' : 'text-bw-text')}>{faq.question}</span>
        <ChevronDown className={cn('w-5 h-5 flex-shrink-0 transition-transform duration-200', isOpen ? 'rotate-180 text-purple-700' : 'text-bw-text-muted')} />
      </button>
      <div className={cn('overflow-hidden transition-all duration-300', isOpen ? 'max-h-48' : 'max-h-0')}>
        <p className="px-5 pb-5 text-sm text-bw-text-secondary leading-relaxed">{faq.answer}</p>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="section-padding bg-bw-cream">
      <div className="container-main max-w-3xl">
        <div className={cn('text-center mb-14 transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
          <span className="text-overline text-purple-700 mb-3 block">Често задавани въпроси</span>
          <h2 className="font-heading text-bw-text">Всичко, което искаш да <span className="text-purple-700">знаеш</span></h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, index) => <FAQItem key={index} faq={faq} index={index} isOpen={openIndex === index} onToggle={() => setOpenIndex(openIndex === index ? null : index)} isVisible={isVisible} />)}
        </div>
      </div>
    </section>
  );
}
