import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { Helmet } from 'react-helmet';

type Language = 'ru' | 'en' | 'zh' | 'ko';

const translations: Record<Language, any> = {
  ru: {
    nav: { home: 'Главная', services: 'Услуги', about: 'Обо мне', faq: 'Вопросы', contact: 'Контакты' },
    hero: { 
      title: 'Адвокат Владивосток — 15 лет опыта, 200+ результативных дел', 
      subtitle: 'Юридические услуги: гражданские, уголовные, семейные дела. Честная оценка перспектив. Конфиденциальность гарантирована.', 
      call: 'Позвонить:', 
      consultation: 'Бесплатная консультация',
      support: 'Круглосуточная поддержка'
    },
    guide: { 
      title: 'Гайд от адвоката: «10 ошибок, которые убивают ваше дело»', 
      get: 'Получить гайд', 
      name: 'Ваше имя',
      phone: 'Ваш телефон',
      email: 'Ваш e-mail',
      consent: 'Я согласен на обработку персональных данных'
    }
  },
  en: {
    nav: { home: 'Home', services: 'Services', about: 'About', faq: 'FAQ', contact: 'Contact' },
    hero: { 
      title: 'Vladivostok Lawyer — 15 years experience, 200+ successful cases', 
      subtitle: 'Legal services: civil, criminal, family cases. Honest assessment. Confidentiality guaranteed.', 
      call: 'Call:', 
      consultation: 'Free Consultation',
      support: '24/7 Support'
    },
    guide: { 
      title: 'Lawyer\'s Guide: "10 Mistakes That Kill Your Case"', 
      get: 'Get Guide', 
      name: 'Your name',
      phone: 'Your phone',
      email: 'Your email',
      consent: 'I agree to the processing of personal data'
    }
  },
  zh: {
    nav: { home: '首页', services: '服务', about: '关于', faq: '常见问题', contact: '联系' },
    hero: { 
      title: '海参崴律师 — 15年经验，200+成功案例', 
      subtitle: '法律服务：民事、刑事、家庭案件。诚实评估。保证保密。', 
      call: '电话：', 
      consultation: '免费咨询',
      support: '24小时支持'
    },
    guide: { 
      title: '律师指南："10个毁掉您案件的错误"', 
      get: '获取指南', 
      name: '您的姓名',
      phone: '您的电话',
      email: '您的邮箱',
      consent: '我同意处理个人数据'
    }
  },
  ko: {
    nav: { home: '홈', services: '서비스', about: '소개', faq: 'FAQ', contact: '연락처' },
    hero: { 
      title: '블라디보스토크 변호사 — 15년 경력, 200+건 성공 사례', 
      subtitle: '법률 서비스: 민사, 형사, 가족 사건. 정직한 평가. 기밀 보장.', 
      call: '전화:', 
      consultation: '무료 상담',
      support: '24시간 지원'
    },
    guide: { 
      title: '변호사 가이드: "10가지 사건을 망치는 실수"', 
      get: '가이드 받기', 
      name: '이름',
      phone: '전화번호',
      email: '이메일',
      consent: '개인정보 처리에 동의합니다'
    }
  }
};

const CountUp = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <>{count}</>;
};

const SocialModal = ({ show, onClose, onConfirm, type }: { show: boolean; onClose: () => void; onConfirm: () => void; type: string }) => {
  if (!show) return null;

  const messages: Record<string, string> = {
    telegram: 'Перейти в Telegram?',
    'telegram-channel': 'Перейти в Telegram канал?',
    whatsapp: 'Открыть WhatsApp?',
    wechat: 'Открыть WeChat?',
    vk: 'Перейти во ВКонтакте?'
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-2xl font-bold mb-4 text-center">{messages[type] || 'Перейти?'}</h3>
        <div className="flex gap-4">
          <Button onClick={onClose} variant="outline" className="flex-1">Отмена</Button>
          <Button onClick={onConfirm} className="flex-1 bg-primary">Перейти</Button>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    description: ''
  });
  
  const [contactConsent, setContactConsent] = useState(false);
  
  const [language, setLanguage] = useState<Language>('ru');
  const t = translations[language];
  const [showNav, setShowNav] = useState(false);
  const [guideConsent, setGuideConsent] = useState(false);
  const [guideData, setGuideData] = useState({ name: '', phone: '', email: '' });
  const [socialModal, setSocialModal] = useState<{ show: boolean; url: string; type: string }>({ show: false, url: '', type: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Заявка отправлена:', formData);
  };

  const handleSocialClick = (url: string, type: string) => {
    setSocialModal({ show: true, url, type });
  };

  const confirmSocialRedirect = () => {
    window.open(socialModal.url, '_blank');
    setSocialModal({ show: false, url: '', type: '' });
  };

  return (
    <>
      <Helmet>
        <title>Адвокат Владивосток - опытный юрист с 15-летним стажем | Антон Фисенко</title>
        <meta name="description" content="Адвокат Антон Фисенко во Владивостоке с 15-летним опытом. 200+ результативных дел, 92% успеха. Консультация от 3500₽. Звоните +7 (908) 449-89-85" />
        <link rel="canonical" href="https://advokat.monster" />
        <meta name="geo.position" content="43.1150678;131.8855768" />
        <meta name="geo.placename" content="Владивосток" />
        <meta name="geo.region" content="RU-PRI" />
      </Helmet>

      <SocialModal 
        show={socialModal.show} 
        onClose={() => setSocialModal({ show: false, url: '', type: '' })} 
        onConfirm={confirmSocialRedirect}
        type={socialModal.type}
      />
      
      {/* Floating Contact Buttons */}
      <div className="fixed right-4 top-20 z-50 flex flex-col gap-3">
        <button
          onClick={() => handleSocialClick('https://t.me/fisenko_advocate', 'telegram')}
          className="bg-[#0088cc] text-white rounded-full p-3 shadow-2xl hover:scale-110 transition-transform"
          aria-label="Telegram"
        >
          <Icon name="Send" size={20} />
        </button>
        <button
          onClick={() => handleSocialClick('https://wa.me/79084498985', 'whatsapp')}
          className="bg-[#25D366] text-white rounded-full p-3 shadow-2xl hover:scale-110 transition-transform"
          aria-label="WhatsApp"
        >
          <Icon name="MessageCircle" size={20} />
        </button>
        <button
          onClick={() => handleSocialClick('weixin://', 'wechat')}
          className="bg-[#09b83e] text-white rounded-full p-3 shadow-2xl hover:scale-110 transition-transform"
          aria-label="WeChat"
        >
          <Icon name="MessageSquare" size={20} />
        </button>
      </div>
      
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between gap-2">
            {/* Logo/Brand */}
            <div className="flex items-center gap-2">
              <Icon name="Scale" size={20} className="text-primary" />
              <span className="font-bold text-primary text-sm sm:text-base">Антон Фисенко</span>
            </div>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-3 text-sm">
              <a href="#hero" className="font-medium text-gray-700 hover:text-primary transition-colors" onClick={(e) => { e.preventDefault(); document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }); }}>{t.nav.home}</a>
              <a href="#services" className="font-medium text-gray-700 hover:text-primary transition-colors" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}>{t.nav.services}</a>
              <a href="#about" className="font-medium text-gray-700 hover:text-primary transition-colors" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>{t.nav.about}</a>
              <a href="#faq" className="font-medium text-gray-700 hover:text-primary transition-colors" onClick={(e) => { e.preventDefault(); document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }); }}>{t.nav.faq}</a>
              <a href="#contact" className="font-medium text-gray-700 hover:text-primary transition-colors" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>{t.nav.contact}</a>
            </nav>
            
            {/* Language Selector */}
            <div className="flex items-center gap-1">
              <button onClick={() => setLanguage('ru')} className={`px-2 py-1 rounded text-xs font-semibold transition-all ${language === 'ru' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>🇷🇺</button>
              <button onClick={() => setLanguage('en')} className={`px-2 py-1 rounded text-xs font-semibold transition-all ${language === 'en' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>🇬🇧</button>
              <button onClick={() => setLanguage('zh')} className={`px-2 py-1 rounded text-xs font-semibold transition-all ${language === 'zh' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>🇨🇳</button>
              <button onClick={() => setLanguage('ko')} className={`px-2 py-1 rounded text-xs font-semibold transition-all ${language === 'ko' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>🇰🇷</button>
            </div>
            
            {/* Phone */}
            <a href="tel:+79084498985" className="hidden lg:flex items-center gap-2 bg-primary text-white px-3 py-2 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors">
              <Icon name="Phone" size={14} />
              +7 (908) 449-89-85
            </a>
            
            {/* Mobile Menu Toggle */}
            <button onClick={() => setShowNav(!showNav)} className="md:hidden p-2">
              <Icon name="Menu" size={20} className="text-primary" />
            </button>
          </div>
          
          {/* Mobile Menu */}
          {showNav && (
            <nav className="md:hidden mt-3 pb-2 space-y-2">
              <a href="#hero" className="block py-2 text-sm font-medium text-gray-700" onClick={(e) => { e.preventDefault(); setShowNav(false); document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }); }}>{t.nav.home}</a>
              <a href="#services" className="block py-2 text-sm font-medium text-gray-700" onClick={(e) => { e.preventDefault(); setShowNav(false); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}>{t.nav.services}</a>
              <a href="#about" className="block py-2 text-sm font-medium text-gray-700" onClick={(e) => { e.preventDefault(); setShowNav(false); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>{t.nav.about}</a>
              <a href="#faq" className="block py-2 text-sm font-medium text-gray-700" onClick={(e) => { e.preventDefault(); setShowNav(false); document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }); }}>{t.nav.faq}</a>
              <a href="#contact" className="block py-2 text-sm font-medium text-gray-700" onClick={(e) => { e.preventDefault(); setShowNav(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>{t.nav.contact}</a>
              <a href="tel:+79084498985" className="block py-2 text-sm font-semibold text-primary">📞 +7 (908) 449-89-85</a>
            </nav>
          )}
        </div>
      </header>
      
      <div className="min-h-screen bg-white pt-14">
        {/* Hero Section */}
        <section id="hero" className="bg-gradient-to-br from-navy-900 via-primary to-navy-800 text-white py-8 sm:py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-6 items-start">
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-bold leading-tight">
                  {t.hero.title}
                </h1>
                <p className="text-lg sm:text-xl text-navy-100 leading-relaxed">
                  {t.hero.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    size="lg" 
                    className="bg-white text-primary hover:bg-navy-50 font-semibold px-6 py-5 text-base"
                    onClick={() => window.location.href = 'tel:+79084498985'}
                  >
                    {t.hero.call} +7 (908) 449-89-85
                  </Button>
                  <Button 
                    size="lg"
                    className="bg-white text-primary hover:bg-navy-50 font-semibold px-6 py-5 text-base"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {t.hero.consultation}
                  </Button>
                </div>
                <div className="flex items-center gap-4 sm:gap-8 pt-2">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold"><CountUp end={200} />+</div>
                    <div className="text-navy-200 text-xs sm:text-sm">результативных дел</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold"><CountUp end={92} />%</div>
                    <div className="text-navy-200 text-xs sm:text-sm">успешных исходов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold"><CountUp end={15} /></div>
                    <div className="text-navy-200 text-xs sm:text-sm">лет опыта</div>
                  </div>
                </div>
                <Button
                  className="bg-yellow-500 text-yellow-900 hover:bg-yellow-600 font-semibold px-6 py-4 rounded-lg w-full sm:w-auto"
                  onClick={() => handleSocialClick('https://t.me/fisenko_advocate', 'telegram')}
                >
                  🕐 {t.hero.support}
                </Button>
              </div>
              <div className="relative mt-4 lg:mt-0">
                <img 
                  src="https://cdn.poehali.dev/files/ca20d21c-fee1-4043-91fe-63d211328d56.jpeg" 
                  alt="Адвокат Антон Фисенко Владивосток" 
                  className="rounded-lg shadow-2xl w-full h-auto object-cover"
                />
                <div className="mt-4 text-center">
                  <p className="text-xl sm:text-2xl font-bold text-white">Антон Фисенко</p>
                  <p className="text-navy-100 text-sm sm:text-base">Адвокат</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Free Guide Section */}
        <section className="py-8 sm:py-12 bg-gradient-to-br from-yellow-50 to-orange-50 border-y-4 border-yellow-400">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-10">
              <div className="text-center mb-6">
                <div className="inline-block bg-yellow-400 text-yellow-900 px-3 py-2 rounded-full font-bold text-sm mb-3">
                  🎁 БЕСПЛАТНЫЙ ПОДАРОК
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-primary mb-3">
                  {t.guide.title}
                </h2>
                <p className="text-base sm:text-lg text-gray-700">
                  Узнайте, как избежать типичных ошибок в юридических спорах
                </p>
              </div>
              
              <div className="bg-primary/5 border-2 border-primary/20 rounded-xl p-4 sm:p-6 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="Gift" size={28} className="text-primary" />
                  <div>
                    <h3 className="font-bold text-lg text-primary">Получите гайд бесплатно!</h3>
                    <p className="text-sm text-gray-600">Оставьте контакт — отправим PDF</p>
                  </div>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); if (guideConsent) { alert('Спасибо! Гайд отправлен'); setGuideData({ name: '', phone: '', email: '' }); setGuideConsent(false); } }} className="space-y-3">
                  <Input
                    type="text"
                    placeholder={t.guide.name}
                    value={guideData.name}
                    onChange={(e) => setGuideData({ ...guideData, name: e.target.value })}
                    required
                    className="py-5 text-base"
                  />
                  <Input
                    type="tel"
                    placeholder={t.guide.phone}
                    value={guideData.phone}
                    onChange={(e) => setGuideData({ ...guideData, phone: e.target.value })}
                    required
                    className="py-5 text-base"
                  />
                  <Input
                    type="email"
                    placeholder={t.guide.email}
                    value={guideData.email}
                    onChange={(e) => setGuideData({ ...guideData, email: e.target.value })}
                    required
                    className="py-5 text-base"
                  />
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={guideConsent}
                      onChange={(e) => setGuideConsent(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                      required
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      {t.guide.consent}
                    </span>
                  </label>
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={!guideConsent}
                    className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900 font-bold px-6 py-5 text-base shadow-lg disabled:opacity-50 w-full"
                  >
                    <Icon name="Download" size={18} className="mr-2" />
                    {t.guide.get}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-8 sm:py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-center mb-6 text-primary">
              Юридические услуги
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: "Users",
                  title: "Семейный адвокат",
                  description: "Разводы, раздел имущества, алименты",
                  price: "от 5 000 ₽"
                },
                {
                  icon: "Gavel",
                  title: "Гражданские дела",
                  description: "Долги, недвижимость, наследство",
                  price: "от 5 000 ₽"
                },
                {
                  icon: "ShieldAlert",
                  title: "Уголовная защита",
                  description: "Защита на всех стадиях",
                  price: "от 7 000 ₽"
                },
                {
                  icon: "Home",
                  title: "Недвижимость",
                  description: "Сопровождение сделок",
                  price: "от 5 000 ₽"
                },
                {
                  icon: "Briefcase",
                  title: "Трудовые споры",
                  description: "Увольнение, зарплата",
                  price: "от 3 500 ₽"
                },
                {
                  icon: "FileText",
                  title: "Консультация",
                  description: "Анализ документов",
                  price: "от 3 500 ₽"
                }
              ].map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 border hover:border-primary">
                  <CardHeader className="pb-3">
                    <div className="bg-primary text-white p-2 rounded-lg w-10 h-10 flex items-center justify-center mb-2">
                      <Icon name={service.icon} size={20} />
                    </div>
                    <CardTitle className="font-montserrat text-base">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-0">
                    <p className="text-gray-600 text-xs">{service.description}</p>
                    <div className="border-t pt-2">
                      <p className="text-lg font-bold text-primary">{service.price}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 sm:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-montserrat font-bold mb-6 text-primary">Антон Фисенко</h2>
                <p className="text-base sm:text-lg text-gray-700 mb-4">
                  Адвокат с 15-летним опытом работы в различных категориях дел. За годы практики успешно решил более 200 дел, добившись положительных результатов для своих клиентов в 92% случаев.
                </p>
                <p className="text-base sm:text-lg text-gray-700 mb-6">
                  Специализация: семейное право, гражданские и уголовные дела, защита прав в сфере недвижимости и трудовых отношений.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Icon name="Award" size={20} className="text-primary" />
                    <span className="text-sm sm:text-base">Член Адвокатской палаты</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="GraduationCap" size={20} className="text-primary" />
                    <span className="text-sm sm:text-base">Высшее юридическое образование</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Shield" size={20} className="text-primary" />
                    <span className="text-sm sm:text-base">Гарантия конфиденциальности</span>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src="https://cdn.poehali.dev/files/ca20d21c-fee1-4043-91fe-63d211328d56.jpeg"
                  alt="Адвокат Антон Фисенко"
                  className="rounded-lg shadow-xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-12 sm:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-center mb-10 text-primary">Часто задаваемые вопросы</h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg px-4">
                <AccordionTrigger className="text-base sm:text-lg font-semibold">Сколько стоит консультация?</AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base">
                  Первичная консультация — от 3500₽. На консультации мы разберем вашу ситуацию и дадим честную оценку перспектив дела.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border rounded-lg px-4">
                <AccordionTrigger className="text-base sm:text-lg font-semibold">Как быстро можно начать работу?</AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base">
                  В экстренных ситуациях готов приступить в день обращения. Обычно начинаем работу в течение 1-2 дней после консультации.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border rounded-lg px-4">
                <AccordionTrigger className="text-base sm:text-lg font-semibold">Какие гарантии успеха?</AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base">
                  Даю честную оценку перспектив. 92% дел завершаются успешно. Не берусь за безнадежные дела.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 sm:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-center mb-10 text-primary">Связаться со мной</h2>
            <Card className="p-6 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Ваше имя</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="py-5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Телефон</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="py-5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Описание ситуации</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                  />
                </div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={contactConsent}
                    onChange={(e) => setContactConsent(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                    required
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    Я согласен на обработку персональных данных в соответствии с{' '}
                    <a 
                      href="https://www.consultant.ru/document/cons_doc_LAW_61801/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary underline hover:text-primary/80"
                    >
                      ФЗ-152 о персональных данных
                    </a>
                    {' '}и{' '}
                    <a 
                      href="https://www.consultant.ru/document/cons_doc_LAW_8264/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary underline hover:text-primary/80"
                    >
                      договором оферты
                    </a>
                  </span>
                </label>
                <Button type="submit" disabled={!contactConsent} className="w-full py-5 text-base disabled:opacity-50 disabled:cursor-not-allowed">Отправить заявку</Button>
              </form>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-primary text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-lg mb-3">Контакты</h3>
                <p className="text-navy-100 mb-2">Адвокат Антон Фисенко</p>
                <p className="text-navy-100 mb-2">Владивосток, Приморский край</p>
                <p className="text-navy-100">+7 (908) 449-89-85</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3">Социальные сети</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleSocialClick('https://t.me/fisenko_advocate', 'telegram')}
                    className="flex items-center gap-2 text-navy-100 hover:text-white transition-colors"
                  >
                    <Icon name="Send" size={16} /> Telegram (чат)
                  </button>
                  <button
                    onClick={() => handleSocialClick('https://t.me/family_advocate_dv', 'telegram-channel')}
                    className="flex items-center gap-2 text-navy-100 hover:text-white transition-colors"
                  >
                    <Icon name="Radio" size={16} /> Telegram (канал)
                  </button>
                  <button
                    onClick={() => handleSocialClick('https://wa.me/79084498985', 'whatsapp')}
                    className="flex items-center gap-2 text-navy-100 hover:text-white transition-colors"
                  >
                    <Icon name="MessageCircle" size={16} /> WhatsApp
                  </button>
                  <button
                    onClick={() => handleSocialClick('weixin://', 'wechat')}
                    className="flex items-center gap-2 text-navy-100 hover:text-white transition-colors"
                  >
                    <Icon name="MessageSquare" size={16} /> WeChat
                  </button>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3">Режим работы</h3>
                <p className="text-navy-100 mb-2">Пн-Пт: 9:00 - 19:00</p>
                <p className="text-navy-100 mb-2">Сб-Вс: по записи</p>
                <p className="text-yellow-400 font-semibold">🕐 Круглосуточная поддержка</p>
              </div>
            </div>
            <div className="border-t border-navy-700 pt-4 text-center">
              <p className="text-sm text-navy-200">© 2024 Адвокат Антон Фисенко. Все права защищены.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;