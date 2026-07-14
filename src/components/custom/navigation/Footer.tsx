import { Logo } from '../Logo';
import { Instagram, Facebook } from 'lucide-react';

const footerLinks = {
  help: [
    { label: 'Политика за поверителност', href: '#' },
    { label: 'Доставка, връщане и замяна', href: '#' },
    { label: 'Общи условия', href: '#' },
  ],
  contact: [{ label: 'hello@blankwet.eu', href: 'mailto:hello@blankwet.eu' }],
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/blankwet.eu', icon: Instagram },
    { label: 'TikTok', href: 'https://tiktok.com/@blankwet.eu', icon: () => (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.25 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.28 8.28 0 0 0 4.83 1.54V6.83a4.85 4.85 0 0 1-1.17-.14z"/></svg>) },
    { label: 'Facebook', href: 'https://facebook.com/blankwet.eu', icon: Facebook },
  ],
};

export function Footer() {
  return (
    <footer className="bg-bw-cream border-t border-purple-200/50">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="lg:col-span-1">
            <Logo variant="horizontal" color="purple" size="md" showAcademy={true} />
            <p className="mt-4 text-sm text-bw-text-secondary leading-relaxed max-w-xs">Видео академия за сексуално образование, интимен комфорт и модерен женски лайфстайл. Знанието е най-секси аксесоарът.</p>
            <div className="flex items-center gap-4 mt-6">
              {footerLinks.socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 hover:bg-purple-700 hover:text-white transition-colors" aria-label={social.label}>
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold text-bw-text mb-4">Помощ</h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.label}><a href={link.href} className="text-sm text-bw-text-secondary hover:text-purple-700 transition-colors">{link.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold text-bw-text mb-4">Контакти</h4>
            <ul className="space-y-3">
              {footerLinks.contact.map((link) => (
                <li key={link.label}><a href={link.href} className="text-sm text-bw-text-secondary hover:text-purple-700 transition-colors">{link.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold text-bw-text mb-4">Плащане</h4>
            <div className="flex flex-wrap gap-2">
              {['visa', 'mastercard', 'apple-pay', 'google-pay'].map((method) => (
                <div key={method} className="h-9 px-3 bg-white rounded-lg border border-purple-200/50 flex items-center justify-center">
                  <span className="text-xs font-medium text-bw-text-secondary capitalize">{method.replace('-', ' ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-purple-200/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-bw-text-muted">© {new Date().getFullYear()} Blankwet Academy. Всички права запазени.</p>
          <p className="text-xs text-bw-text-muted">Уеб дизайн и разработка за Blankwet</p>
        </div>
      </div>
    </footer>
  );
}
