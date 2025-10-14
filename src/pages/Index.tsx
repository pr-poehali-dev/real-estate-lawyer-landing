import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { Helmet } from 'react-helmet';

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Заявка отправлена:', formData);
  };

  return (
    <>
      <Helmet>
        <title>Адвокат Владивосток - опытный юрист с 15-летним стажем</title>
        <meta name="description" content="Адвокат во Владивостоке с 15-летним опытом. 800+ выигранных дел, 92% успеха. Консультация от 3500₽. Все районы города. Звоните +7 (908) 449-89-85" />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-navy-900 via-primary to-navy-800 text-white py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h1 className="text-4xl lg:text-5xl font-montserrat font-bold leading-tight">
                  Адвокат Владивосток — 15 лет опыта, 800+ выигранных дел
                </h1>
                <p className="text-xl text-navy-100 leading-relaxed">
                  Юридические услуги во всех районах Владивостока: гражданские, уголовные, семейные дела. Честная оценка перспектив. Конфиденциальность гарантирована.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-primary hover:bg-navy-50 font-semibold px-8 py-6 text-lg"
                    onClick={() => window.location.href = 'tel:+79084498985'}
                  >
                    Позвонить: +7 (908) 449-89-85
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-6 text-lg"
                    onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Бесплатная консультация
                  </Button>
                </div>
                <div className="flex items-center gap-8 pt-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold">800+</div>
                    <div className="text-navy-200 text-sm">выигранных дел</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold">92%</div>
                    <div className="text-navy-200 text-sm">успешных исходов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold">15</div>
                    <div className="text-navy-200 text-sm">лет опыта</div>
                  </div>
                </div>
                <div className="bg-yellow-500 text-yellow-900 px-6 py-3 rounded-lg font-semibold inline-block">
                  🕐 Круглосуточная поддержка для экстренных случаев
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://cdn.poehali.dev/files/ca20d21c-fee1-4043-91fe-63d211328d56.jpeg" 
                  alt="Адвокат Владивосток" 
                  className="rounded-lg shadow-2xl w-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-4xl font-montserrat font-bold text-center mb-16 text-primary">
              Юридические услуги во Владивостоке
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "Users",
                  title: "Семейный адвокат Владивосток",
                  description: "Разводы, раздел имущества, алименты, опека над детьми. Защита ваших интересов в семейных спорах.",
                  price: "от 5 000 ₽"
                },
                {
                  icon: "Gavel",
                  title: "Адвокат по гражданским делам Владивосток",
                  description: "Взыскание долгов, споры по недвижимости, наследственные дела, защита прав потребителей.",
                  price: "от 5 000 ₽"
                },
                {
                  icon: "ShieldAlert",
                  title: "Уголовный адвокат Владивосток",
                  description: "Защита на всех стадиях уголовного процесса. Представительство в судах всех инстанций.",
                  price: "от 7 000 ₽"
                },
                {
                  icon: "Home",
                  title: "Адвокат по недвижимости",
                  description: "Сопровождение сделок, проверка документов, споры с застройщиками, выписка жильцов.",
                  price: "от 5 000 ₽"
                },
                {
                  icon: "Briefcase",
                  title: "Трудовые споры",
                  description: "Незаконное увольнение, невыплата зарплаты, защита прав работников и работодателей.",
                  price: "от 3 500 ₽"
                },
                {
                  icon: "FileText",
                  title: "Консультация юриста Владивосток",
                  description: "Профессиональная правовая помощь, анализ документов, оценка перспектив дела.",
                  price: "от 3 500 ₽"
                }
              ].map((service, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary">
                  <CardHeader>
                    <div className="bg-primary text-white p-4 rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                      <Icon name={service.icon} size={28} />
                    </div>
                    <CardTitle className="font-montserrat text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{service.description}</p>
                    <div className="border-t pt-4">
                      <p className="text-2xl font-bold text-primary">{service.price}</p>
                      <p className="text-sm text-gray-500">за день в суде</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Districts Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-4xl font-montserrat font-bold text-center mb-4 text-primary">
              Работаем во всех районах Владивостока
            </h2>
            <p className="text-center text-xl text-gray-600 mb-16">Адвокат рядом со мной Владивосток — выезд в любой район города</p>
            <div className="grid md:grid-cols-5 gap-6">
              {[
                {
                  name: "Ленинский",
                  description: "Центр города, государственные учреждения",
                  address: "ул. Светланская, 85"
                },
                {
                  name: "Фрунзенский",
                  description: "Престижный район",
                  address: "Выезд в течение часа"
                },
                {
                  name: "Первомайский",
                  description: "Промышленная зона",
                  address: "Выезд в течение часа"
                },
                {
                  name: "Советский",
                  description: "Жилой район",
                  address: "Выезд в течение часа"
                },
                {
                  name: "Первореченский",
                  description: "Удаленный район",
                  address: "Выезд в течение 2 часов"
                }
              ].map((district, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="bg-primary text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <Icon name="MapPin" size={24} />
                    </div>
                    <CardTitle className="text-lg">{district.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">{district.description}</p>
                    <p className="text-xs text-primary font-semibold">{district.address}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-4xl font-montserrat font-bold text-center mb-16 text-primary">
              Почему выбирают нашего адвоката
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: "Award",
                  title: "Статус адвоката",
                  description: "Член Адвокатской палаты Приморского края. Все консультации защищены адвокатской тайной."
                },
                {
                  icon: "Scale",
                  title: "Честная оценка",
                  description: "Не беру заведомо проигрышные дела. Говорю правду о перспективах, а не обещаю невозможное."
                },
                {
                  icon: "Clock",
                  title: "Круглосуточно",
                  description: "Экстренная помощь при задержании, обыске, допросе. Приеду в любое время суток."
                },
                {
                  icon: "DollarSign",
                  title: "Гибкая оплата",
                  description: "Рассрочка платежа. Цены согласно рекомендациям Адвокатской палаты Приморского края."
                },
                {
                  icon: "ShieldCheck",
                  title: "Конфиденциальность",
                  description: "Адвокатская тайна защищена законом. Никто не узнает о вашем обращении."
                },
                {
                  icon: "MessageSquare",
                  title: "На связи 24/7",
                  description: "WhatsApp, Telegram, звонки. Отвечаю в течение 15 минут в рабочее время."
                },
                {
                  icon: "Target",
                  title: "Специализация",
                  description: "Фокус на гражданских, семейных и уголовных делах. Знание всех судов Владивостока."
                },
                {
                  icon: "TrendingUp",
                  title: "Результат",
                  description: "92% выигранных дел. Сэкономил клиентам миллионы рублей в судебных спорах."
                }
              ].map((item, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="bg-primary text-white p-4 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Icon name={item.icon} size={28} />
                    </div>
                    <CardTitle className="font-montserrat text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-4xl font-montserrat font-bold text-center mb-4 text-primary">
              Стоимость услуг адвоката во Владивостоке
            </h2>
            <p className="text-center text-gray-600 mb-16">Цены согласно рекомендациям Адвокатской палаты Приморского края</p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-montserrat">Консультация</CardTitle>
                  <div className="text-4xl font-bold text-primary mt-4">3 500 ₽</div>
                  <p className="text-sm text-gray-500 mt-2">устная или письменная</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-green-600 mt-1" />
                      <span className="text-sm">Анализ ситуации</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-green-600 mt-1" />
                      <span className="text-sm">Оценка перспектив</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-green-600 mt-1" />
                      <span className="text-sm">План действий</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-green-600 mt-1" />
                      <span className="text-sm">Ответы на вопросы</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary shadow-xl scale-105">
                <div className="bg-primary text-white text-center py-2 rounded-t-lg font-semibold">
                  Популярное
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-montserrat">Представительство в суде</CardTitle>
                  <div className="text-4xl font-bold text-primary mt-4">5 000 ₽</div>
                  <p className="text-sm text-gray-500 mt-2">за день заседания</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-green-600 mt-1" />
                      <span className="text-sm">Подготовка позиции</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-green-600 mt-1" />
                      <span className="text-sm">Участие в заседании</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-green-600 mt-1" />
                      <span className="text-sm">Защита интересов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-green-600 mt-1" />
                      <span className="text-sm">Работа с документами</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-montserrat">Полное сопровождение</CardTitle>
                  <div className="text-4xl font-bold text-primary mt-4">От 30 000 ₽</div>
                  <p className="text-sm text-gray-500 mt-2">в зависимости от дела</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-green-600 mt-1" />
                      <span className="text-sm">Все этапы процесса</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-green-600 mt-1" />
                      <span className="text-sm">Подготовка документов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-green-600 mt-1" />
                      <span className="text-sm">Суды всех инстанций</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-green-600 mt-1" />
                      <span className="text-sm">До победного конца</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-12">
              <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-6 max-w-2xl mx-auto">
                <p className="text-lg font-semibold text-yellow-900 mb-2">💰 Рассрочка платежа</p>
                <p className="text-gray-700">Возможность поэтапной оплаты. Обсуждается индивидуально.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-4xl font-montserrat font-bold text-center mb-16 text-primary">
              Отзывы клиентов из разных районов Владивостока
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Мария С.",
                  district: "Фрунзенский район",
                  text: "Помог выиграть спор с застройщиком. Получила компенсацию 450 000 рублей за задержку сдачи квартиры.",
                  case: "Споры с застройщиками"
                },
                {
                  name: "Дмитрий К.",
                  district: "Ленинский район",
                  text: "Развод и раздел имущества прошли максимально быстро. Добился справедливого раздела и сохранил общение с ребенком.",
                  case: "Семейные дела"
                },
                {
                  name: "Анна В.",
                  district: "Первомайский район",
                  text: "Защитил в уголовном деле. Добился переквалификации и условного срока вместо реального. Очень благодарна!",
                  case: "Уголовная защита"
                }
              ].map((review, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                        {review.name[0]}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{review.name}</CardTitle>
                        <p className="text-sm text-gray-500">{review.district}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                    <div className="bg-muted px-3 py-1 rounded inline-block text-sm text-primary font-semibold">
                      {review.case}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-4xl font-montserrat font-bold text-center mb-16 text-primary">
              Часто задаваемые вопросы
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "Сколько стоят услуги адвоката во Владивостоке?",
                  answer: "Консультация — от 3 500 рублей. Представительство в суде — от 5 000 рублей за день заседания. Полное сопровождение дела — от 30 000 рублей в зависимости от сложности. Цены соответствуют рекомендациям Адвокатской палаты Приморского края. Возможна рассрочка платежа."
                },
                {
                  question: "Какие гарантии вы даете?",
                  answer: "Я не даю стопроцентных гарантий — это было бы нечестно. Вместо этого я провожу честный анализ вашего дела и говорю реальные шансы на успех. Все консультации защищены адвокатской тайной. Работаю по официальному договору с прозрачными условиями."
                },
                {
                  question: "Как быстро вы можете приступить к работе?",
                  answer: "Экстренные случаи (задержание, обыск, допрос) — выезжаю в течение часа круглосуточно. Плановые консультации — обычно в тот же день или на следующий день. Первичную оценку ситуации могу дать по телефону бесплатно."
                },
                {
                  question: "В каких районах Владивостока вы работаете?",
                  answer: "Работаю во всех районах Владивостока: Ленинский (офис на Светланской, 85), Фрунзенский, Первомайский, Советский, Первореченский. Выезжаю в любой район города. Также работаю удаленно по всему Приморскому краю."
                },
                {
                  question: "В чем отличие адвоката от юриста?",
                  answer: "Адвокат — это юрист с особым статусом, член Адвокатской палаты. Только адвокат может защищать по уголовным делам. Адвокатская тайна защищена законом — меня не могут допросить о ваших делах. Адвокат несет повышенную ответственность и работает по строгому кодексу этики."
                },
                {
                  question: "Какие способы оплаты вы принимаете?",
                  answer: "Наличные, безналичный расчет, банковский перевод. Возможна рассрочка платежа — условия обсуждаются индивидуально в зависимости от сложности дела. Заключаем официальный договор с четкими условиями оплаты."
                },
                {
                  question: "Как проходит первая консультация?",
                  answer: "Первичная экспресс-консультация по телефону бесплатно (10-15 минут). Полная консультация — 3 500 рублей, длится около часа. На консультации изучаю документы, анализирую ситуацию, оцениваю перспективы, составляю план действий. Можно приехать в офис или провести онлайн."
                }
              ].map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg">
                  <AccordionTrigger className="px-6 font-semibold text-left hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 text-gray-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact-form" className="py-20 bg-primary text-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-montserrat font-bold mb-6">
                Бесплатная экспресс-консультация по телефону
              </h2>
              <p className="text-xl text-navy-100 mb-6">
                Позвоните прямо сейчас или оставьте заявку — перезвоню в течение 15 минут
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button 
                  size="lg"
                  className="bg-white text-primary hover:bg-navy-50 font-bold px-10 py-8 text-2xl"
                  onClick={() => window.location.href = 'tel:+79084498985'}
                >
                  📞 +7 (908) 449-89-85
                </Button>
              </div>
              <div className="flex gap-4 justify-center">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold"
                  onClick={() => window.open('https://wa.me/79084498985', '_blank')}
                >
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  WhatsApp
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold"
                  onClick={() => window.open('https://t.me/+79084498985', '_blank')}
                >
                  <Icon name="Send" size={20} className="mr-2" />
                  Telegram
                </Button>
              </div>
            </div>
            
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center text-primary text-2xl">Или оставьте заявку</CardTitle>
                <CardDescription className="text-center text-lg">
                  Перезвоню в течение 15 минут. Конфиденциальность гарантирована.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="text-lg py-6"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Телефон"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="text-lg py-6"
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Кратко опишите вашу ситуацию (необязательно)"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="min-h-32"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg">
                    Получить консультацию
                  </Button>
                  <p className="text-center text-sm text-gray-500">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-navy-900 text-white py-12">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-montserrat font-bold text-xl mb-4">Адвокат Владивосток</h3>
                <p className="text-navy-200 mb-2">15 лет успешной практики</p>
                <p className="text-navy-200 mb-2">800+ выигранных дел</p>
                <p className="text-navy-200">Член Адвокатской палаты Приморского края</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-lg">Контакты</h4>
                <div className="space-y-3 text-navy-200">
                  <p className="flex items-center gap-2">
                    <Icon name="Phone" size={18} />
                    <a href="tel:+79084498985" className="hover:text-white transition-colors">+7 (908) 449-89-85</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Icon name="MapPin" size={18} />
                    г. Владивосток, ул. Светланская, 85
                  </p>
                  <p className="flex items-center gap-2">
                    <Icon name="Clock" size={18} />
                    Круглосуточно (экстренные случаи)
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-lg">Гарантии и безопасность</h4>
                <div className="space-y-2 text-navy-200">
                  <p className="flex items-center gap-2">
                    <Icon name="ShieldCheck" size={18} />
                    Адвокатская тайна
                  </p>
                  <p className="flex items-center gap-2">
                    <Icon name="FileText" size={18} />
                    Официальный договор
                  </p>
                  <p className="flex items-center gap-2">
                    <Icon name="DollarSign" size={18} />
                    Прозрачные цены
                  </p>
                  <p className="flex items-center gap-2">
                    <Icon name="Award" size={18} />
                    Соответствие кодексу этики
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t border-navy-700 pt-8">
              <div className="grid md:grid-cols-2 gap-4 text-sm text-navy-300">
                <div>
                  <p className="mb-2"><strong>Районы обслуживания:</strong></p>
                  <p>Ленинский • Фрунзенский • Первомайский • Советский • Первореченский</p>
                </div>
                <div>
                  <p className="mb-2"><strong>Специализация:</strong></p>
                  <p>Гражданские дела • Уголовные дела • Семейное право • Недвижимость</p>
                </div>
              </div>
            </div>
            <div className="border-t border-navy-700 mt-8 pt-8 text-center text-navy-300">
              <p>&copy; 2024 Адвокат Владивосток. Все права защищены.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;