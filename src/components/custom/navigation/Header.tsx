import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Logo } from '../Logo';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Уроци', href: '#courses' },
  { label: 'Експерти', href: '#instructors' },
  { label: 'Цени', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 50); };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5')}>
        <div className="container-main flex items-center justify-between">
          <a href="/" className="flex-shrink-0">
            <Logo variant="horizontal" color={isScrolled ? 'purple' : 'white'} size="sm" showAcademy={true} />
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button key={link.href} onClick={() => handleNavClick(link.href)} className={cn('px-4 py-2 text-sm font-medium rounded-full transition-colors', isScrolled ? 'text-bw-text-secondary hover:text-purple-700 hover:bg-purple-100' : 'text-white/80 hover:text-white hover:bg-white/10')}>
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button className={cn('text-sm font-medium transition-colors', isScrolled ? 'text-purple-700 hover:text-purple-800' : 'text-white hover:text-gold-400')}>Вход</button>
            <button className="btn-primary text-xs py-2.5 px-5">Започни безплатно<ChevronRight className="w-4 h-4 ml-1" /></button>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={cn('lg:hidden p-2 rounded-full transition-colors', isScrolled ? 'text-bw-text hover:bg-purple-100' : 'text-white hover:bg-white/10')}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <div className={cn('fixed inset-0 z-40 bg-purple-900/98 backdrop-blur-lg transition-all duration-300 lg:hidden', isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')}>
        <div className="flex flex-col items-center justify-center h-full gap-6">
          <Logo variant="vertical" color="white" size="lg" />
          <nav className="flex flex-col items-center gap-4 mt-8">
            {navLinks.map((link) => (
              <button key={link.href} onClick={() => handleNavClick(link.href)} className="text-white/90 text-xl font-medium hover:text-gold-400 transition-colors">{link.label}</button>
            ))}
          </nav>
          <div className="flex flex-col items-center gap-3 mt-8">
            <button className="text-white/70 text-sm font-medium hover:text-white transition-colors">Вход</button>
            <button className="btn-primary">Започни безплатно</button>
          </div>
        </div>
      </div>
    </>
  );
}
