import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Заявка отправлена:', formData);
    // Здесь будет логика отправки формы
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 via-primary to-navy-800 text-white py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-montserrat font-bold leading-tight">
                Юрист для риэлтора: каждая ваша сделка под защитой
              </h1>
              <p className="text-xl text-navy-100 leading-relaxed">
                Проверю объект, подготовлю документы и сопровожу сделку. Вы получите уверенность и сэкономите время на общении с клиентами.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-navy-50 font-semibold px-8 py-6 text-lg"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Бесплатно проверить договор на риски
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-navy-200 text-sm">риэлторов доверяют нам</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">14</div>
                  <div className="text-navy-200 text-sm">лет опыта</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/img/4273dc70-8183-458c-83a0-954560d4e583.jpg" 
                alt="Адвокат Антон Фисенко" 
                className="rounded-lg shadow-2xl w-full max-w-md mx-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-primary p-4 rounded-lg shadow-lg">
                <div className="font-semibold">Антон Фисенко</div>
                <div className="text-sm text-muted-foreground">Адвокат по недвижимости</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl font-montserrat font-bold mb-8 text-primary">
            Одна ошибка в документах — и вы теряете не только сделку
          </h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Суды с клиентами, испорченная репутация, потерянные комиссионные. Вы тратите время на улаживание конфликтов вместо новых продаж.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <p className="text-lg font-semibold text-red-800">
              Вы не должны быть юристом. Ваша задача — продавать.
            </p>
          </div>
          <div className="bg-white rounded-lg p-8 shadow-md">
            <div className="text-5xl font-bold text-red-600 mb-2">73%</div>
            <p className="text-gray-600">сделок с недвижимостью имеют скрытые риски</p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-montserrat font-bold text-center mb-16 text-primary">
            Ваши сделки с недвижимостью — под полным юридическим контролем
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "FileSearch",
                title: "Проведем аудит объекта до показа",
                description: "Проверяем документы, выявляем обременения, наследственные споры",
                result: "Вы получите полный отчет о рисках за 24 часа",
                impact: "Клиент увидит ваш профессионализм, доверие к вам вырастет"
              },
              {
                icon: "Shield",
                title: "Подготовим \"бронебойные\" договоры",
                description: "ДКП, задаток, аванс — все документы с защитой интересов",
                result: "Договоры без юридических дыр",
                impact: "Претензии исключены, сделка проходит гладко"
              },
              {
                icon: "MessageCircle",
                title: "Возьмем на себя общение с юристом другой стороны",
                description: "Разрешаем все юридические споры без вашего участия",
                result: "Экономия времени и нервов",
                impact: "Вы фокусируетесь на клиенте, а не на конфликтах"
              },
              {
                icon: "Gavel",
                title: "Решим проблему в суде, если дойдет до этого",
                description: "Полное судебное представительство",
                result: "Юридическая защита в любой ситуации",
                impact: "Ваша репутация защищена даже в сложных случаях"
              }
            ].map((item, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 animate-fade-in">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary text-white p-3 rounded-lg group-hover:scale-110 transition-transform">
                      <Icon name={item.icon} size={24} />
                    </div>
                    <CardTitle className="font-montserrat">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{item.description}</p>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="font-semibold text-green-800">{item.result}</p>
                  </div>
                  <p className="text-sm text-primary font-medium">{item.impact}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-montserrat font-bold text-center mb-16 text-primary">
            Прозрачность и результат на каждом этапе
          </h2>
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Вы присылаете документы на объект или договор",
                description: "WhatsApp, Telegram, email — любым удобным способом"
              },
              {
                step: "2", 
                title: "Я провожу экспертизу в течение 1-2 рабочих дней",
                description: "Никакой бюрократии — только результат"
              },
              {
                step: "3",
                title: "Вы получаете подробное заключение",
                description: "\"Зеленый свет\" или четкий план устранения рисков"
              },
              {
                step: "4",
                title: "При необходимости сопровождаем сделку до регистрации",
                description: "Полная поддержка на всех этапах"
              }
            ].map((item, index) => (
              <div key={index} className="flex gap-6 items-start bg-white p-6 rounded-lg shadow-sm">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-montserrat font-bold text-center mb-16 text-primary">
            14 лет я закрываю юридические риски риэлторов Владивостока и Артема
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "Award",
                title: "Статус адвоката",
                description: "Все консультации защищены адвокатской тайной"
              },
              {
                icon: "TrendingUp",
                title: "Опыт в цифрах",
                description: "Более 500 успешно сопровожденных сделок"
              },
              {
                icon: "Target",
                title: "Специализация",
                description: "Фокусируюсь только на недвижимости"
              },
              {
                icon: "CheckCircle",
                title: "Результат",
                description: "Сэкономил клиентам миллионы рублей"
              }
            ].map((item, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="bg-primary text-white p-4 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Icon name={item.icon} size={32} />
                  </div>
                  <CardTitle className="font-montserrat">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
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
            Частые вопросы
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                question: "Сколько это стоит?",
                answer: "Проверка типового ДКП — 3000 руб. Полное сопровождение от 15000 руб."
              },
              {
                question: "Как быстро получу результат?",
                answer: "Экспресс-анализ за 24 часа, подробная экспертиза за 1-2 дня"
              },
              {
                question: "Что если найдете серьезные проблемы?",
                answer: "Даем четкий план решения и берем устранение рисков на себя"
              },
              {
                question: "Работаете с другими городами?",
                answer: "Да, работаем удаленно по всему Приморскому краю"
              }
            ].map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg">
                <AccordionTrigger className="px-6 font-semibold text-left">
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

      {/* Final CTA Section */}
      <section id="contact-form" className="py-20 bg-primary text-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-montserrat font-bold mb-6">
              Готовы работать со спокойной уверенностью?
            </h2>
            <p className="text-xl text-navy-100 mb-4">
              Пришлите документы по вашей текущей сделке. Я проверю их бесплатно и дам рекомендации.
            </p>
            <div className="bg-yellow-500 text-yellow-900 inline-block px-4 py-2 rounded-lg font-semibold">
              Свободных слотов на этой неделе: 3
            </div>
          </div>
          
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-primary">Получить бесплатную проверку</CardTitle>
              <CardDescription className="text-center">
                Гарантируем конфиденциальность. Это не обязывает к дальнейшей работе.
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
                    placeholder="Телефон или Telegram"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="text-lg py-6"
                    required
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Краткое описание ситуации (необязательно)"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="min-h-24"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg">
                  Получить бесплатную проверку
                </Button>
                <div className="text-center">
                  <Button variant="outline" size="lg" className="border-white text-primary hover:bg-white/10">
                    Получить чек-лист проверки документов
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-montserrat font-bold text-xl mb-4">Антон Фисенко</h3>
              <p className="text-navy-200">Адвокат по недвижимости</p>
              <p className="text-navy-200">Владивосток, Приморский край</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-navy-200">
                <p>WhatsApp: +7 (XXX) XXX-XX-XX</p>
                <p>Telegram: @lawyer_fisenko</p>
                <p>Email: fisenko@lawyer.ru</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Гарантии</h4>
              <div className="space-y-2 text-navy-200">
                <p>✓ Адвокатская тайна</p>
                <p>✓ Официальный договор</p>
                <p>✓ Прозрачные цены</p>
              </div>
            </div>
          </div>
          <div className="border-t border-navy-700 mt-8 pt-8 text-center text-navy-300">
            <p>&copy; 2024 Антон Фисенко. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;