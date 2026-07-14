import { useState, useEffect } from 'react';
import { Quote, Star } from 'lucide-react';

export default function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setCount(1), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="gradient-hero min-h-screen flex items-center justify-center text-white">
        <div className="text-center max-w-4xl px-4">
          <h1 className="font-heading text-5xl md:text-7xl font-semibold mb-6">
            Blankwet Academy
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8">
            Видео уроци за сексуално образование и интимен комфорт
          </p>
          <button className="btn-primary text-lg px-8 py-4">
            Започни безплатно
          </button>
          <div className="mt-12 flex items-center justify-center gap-2">
            <Star className="w-5 h-5 text-gold-400 fill-gold-400" />
            <Star className="w-5 h-5 text-gold-400 fill-gold-400" />
            <Star className="w-5 h-5 text-gold-400 fill-gold-400" />
            <Star className="w-5 h-5 text-gold-400 fill-gold-400" />
            <Star className="w-5 h-5 text-gold-400 fill-gold-400" />
            <span className="ml-2 text-white/70">4.9/5 от над 800 жени</span>
          </div>
        </div>
      </div>
    </div>
  );
}
