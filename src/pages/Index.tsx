import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Section = 'home' | 'product' | 'pricing' | 'legal' | 'about' | 'contacts';

const NAV_ITEMS: { id: Section; label: string }[] = [
  { id: 'home', label: 'Главная' },
  { id: 'product', label: 'Продукт' },
  { id: 'pricing', label: 'Тарифы' },
  { id: 'legal', label: 'Юридический модуль' },
  { id: 'about', label: 'О компании' },
  { id: 'contacts', label: 'Контакты' },
];

const COMPETITORS = [
  { name: 'Ясно', model: 'B2C', price: '1 990 ₽/мес.', weak: 'Нет B2B; дорого для студентов', us: '✓' },
  { name: 'Zigmund', model: 'B2C', price: 'от 2 500 ₽/конс.', weak: 'Нет анонимности в корпоративе', us: '✓' },
  { name: 'Alter', model: 'B2B+B2C', price: 'от 99 000 ₽/мес.', weak: 'Нет юр. экспертизы; дорого', us: '✓' },
  { name: 'Inhouse', model: 'Разработка', price: 'от 500 000 ₽', weak: 'Долго; высокие риски', us: '✓' },
];

const TARIFFS = [
  {
    id: 'start',
    name: 'Старт',
    price: '15 000',
    period: 'мес.',
    tag: '',
    desc: 'Малый бизнес до 100 чел., колледжи',
    features: [
      'Telegram-бот с поддержкой',
      '10 консультаций психолога/мес.',
      'База знаний и самопомощь',
      'Юридический пакет документов',
      'Email-поддержка',
    ],
    cta: 'Начать пилот',
    highlight: false,
  },
  {
    id: 'optima',
    name: 'Оптимум',
    price: '49 000',
    period: 'мес.',
    tag: 'Популярный',
    desc: 'Вузы и компании 100–500 чел.',
    features: [
      'Бот + веб-кабинет HR',
      'Неограниченные консультации',
      'Форум взаимоподдержки',
      'Аналитика и отчёты',
      'Юридический модуль полный',
      'Приоритетная поддержка 24/7',
    ],
    cta: 'Получить демо',
    highlight: true,
  },
  {
    id: 'corp',
    name: 'Корпоративный',
    price: 'от 150 000',
    period: 'мес.',
    tag: 'Энтерпрайз',
    desc: 'Крупные компании и федеральные вузы',
    features: [
      'Всё из «Оптимум»',
      'Выделенный психолог',
      'Интеграция с HR-системами',
      'White Label брендирование',
      'Обучение HR-команды',
      'SLA 99,9% + страхование',
    ],
    cta: 'Запросить КП',
    highlight: false,
  },
];

const ROADMAP = [
  { month: 'Месяц 1', title: 'Юридическая база', tasks: ['Регистрация ООО/ИП', 'Разработка договоров и политик', 'Прототип бота', 'Поиск пилотных клиентов'] },
  { month: 'Месяц 2', title: 'MVP', tasks: ['Telegram-бот + веб-кабинет', 'Набор пула психологов', 'Подписание 3 пилотных договоров'] },
  { month: 'Месяц 3', title: 'Пилот', tasks: ['Запуск у 3 клиентов', 'Сбор обратной связи', 'Юридический мониторинг'] },
  { month: 'Месяц 4', title: 'Запуск', tasks: ['Активные продажи', 'Конференции и мероприятия', 'Реферальная программа'] },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: '', org: '', email: '', size: '' });
  const [demoSent, setDemoSent] = useState(false);

  const nav = (s: Section) => { setActiveSection(s); setMenuOpen(false); window.scrollTo(0, 0); };

  return (
    <div className="min-h-screen bg-background">

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => nav('home')} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-navy flex items-center justify-center">
              <span className="text-gold text-sm font-display font-bold">С</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl font-semibold text-navy">Слушай</span>
              <span className="font-body text-xs font-bold text-gold tracking-widest uppercase">PRO</span>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => nav(item.id)}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden sm:block btn-primary py-2 px-5 text-xs" onClick={() => nav('contacts')}>
              Получить демо
            </button>
            <button className="lg:hidden p-2 text-navy" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-border">
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => nav(item.id)}
                className="block w-full text-left px-6 py-3.5 text-sm font-body font-medium text-navy hover:bg-secondary border-b border-border last:border-0">
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">

        {/* ════════════════ HOME ════════════════ */}
        {activeSection === 'home' && (
          <div>
            {/* Hero */}
            <section className="geometric-bg min-h-[90vh] flex items-center">
              <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 w-full">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 border border-gold/30 bg-gold/10 px-4 py-2 mb-8">
                    <Icon name="TrendingUp" size={12} className="text-gold" />
                    <span className="font-body text-xs text-gold tracking-widest uppercase font-medium">
                      Рынок ментального здоровья · Рост 25% в год
                    </span>
                  </div>
                  <h1 className="font-display text-5xl lg:text-7xl font-semibold text-white leading-[1.05] mb-6">
                    Психологическая<br />
                    поддержка сотрудников<br />
                    <em className="text-gold not-italic">без юридических рисков.</em>
                  </h1>
                  <span className="gold-line mb-6" />
                  <p className="font-body text-base text-blue-100 leading-relaxed max-w-xl mb-10">
                    B2B-платформа для вузов и компаний. Анонимные консультации
                    с психологами, юридически защищённый продукт, готовый к запуску
                    за 2 недели. От&nbsp;15&nbsp;000&nbsp;₽/месяц.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="btn-gold" onClick={() => nav('contacts')}>Получить демо</button>
                    <button className="btn-outline border-white text-white hover:bg-white hover:text-navy" onClick={() => nav('pricing')}>
                      Посмотреть тарифы
                    </button>
                  </div>
                </div>

                {/* Hero metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-20">
                  {[
                    { val: '30+', label: 'млрд руб.', sub: 'объём рынка РФ' },
                    { val: '700+', label: 'вузов', sub: 'потенциальных клиентов' },
                    { val: '0 ₽', label: 'для пользователя', sub: 'платит организация' },
                    { val: '152-ФЗ', label: 'соответствие', sub: 'юридическая защита' },
                  ].map(m => (
                    <div key={m.val} className="bg-white/5 border border-white/10 p-5">
                      <p className="font-display text-3xl font-bold text-gold">{m.val}</p>
                      <p className="font-body text-xs text-white font-medium mt-1">{m.label}</p>
                      <p className="font-body text-xs text-blue-300 mt-0.5">{m.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Problem */}
            <section className="max-w-7xl mx-auto px-6 py-20">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-gold mb-3">Проблема</p>
                  <h2 className="font-display text-4xl text-navy mb-6">Рынок фрагментирован. Клиенты беззащитны.</h2>
                  <div className="space-y-4">
                    {[
                      { icon: 'XCircle', text: 'Существующие сервисы стоят 2 000–5 000 ₽/мес. на пользователя — студентам недоступно' },
                      { icon: 'XCircle', text: 'Вузы тратят деньги на разовые лекции, но нет системного решения' },
                      { icon: 'XCircle', text: 'Юридические риски 152-ФЗ отпугивают потенциальных игроков от создания своего продукта' },
                      { icon: 'XCircle', text: 'У конкурентов нет юридической экспертизы — клиенты несут все риски сами' },
                    ].map((p, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <Icon name="XCircle" size={16} className="text-destructive flex-shrink-0 mt-0.5" />
                        <p className="font-body text-sm text-foreground leading-relaxed">{p.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-gold mb-3">Наше решение</p>
                  {[
                    { icon: 'CheckCircle', text: 'B2B-модель: платит организация, пользователь получает бесплатно' },
                    { icon: 'CheckCircle', text: 'Юридическая экспертиза внутри команды — снимаем все правовые риски клиента' },
                    { icon: 'CheckCircle', text: 'Запуск за 2 недели — готовое решение без разработки с нуля' },
                    { icon: 'CheckCircle', text: 'SaaS-модель: масштабируется от 50 до 10 000 пользователей без роста затрат' },
                  ].map((p, i) => (
                    <div key={i} className="flex gap-3 items-start p-4 bg-white border border-border">
                      <Icon name="CheckCircle" size={16} className="text-gold flex-shrink-0 mt-0.5" />
                      <p className="font-body text-sm text-foreground leading-relaxed">{p.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Clients */}
            <section className="bg-secondary">
              <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                  <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-gold mb-3">Клиенты</p>
                  <h2 className="font-display text-4xl text-navy">Кому подходит «Слушай PRO»</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    { icon: 'GraduationCap', title: 'Государственные вузы', size: '700+ вузов', pay: 'Гранты и программы развития', badge: 'Средняя' },
                    { icon: 'Building2', title: 'Частные вузы', size: '200+ вузов', pay: 'Конкурентное преимущество за студентов', badge: 'Высокая' },
                    { icon: 'Briefcase', title: 'Крупные компании', size: '5 000+ компаний 1000+ чел.', pay: 'EAP — в тренде у HR', badge: 'Высокая' },
                    { icon: 'Store', title: 'Средний бизнес', size: '100 000+ компаний', pay: 'Нет бюджета на штатного психолога', badge: 'Средняя' },
                    { icon: 'BookMarked', title: 'Бизнес-школы', size: '500+ школ и колледжей', pay: 'Студенты ожидают сервис', badge: 'Высокая' },
                    { icon: 'TrendingUp', title: 'Стартапы и IT-компании', size: 'Выгорание — главная проблема', pay: 'Wellbeing в культуре компании', badge: 'Высокая' },
                  ].map(c => (
                    <div key={c.title} className="card-hover p-6 bg-white border border-border">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 bg-secondary flex items-center justify-center">
                          <Icon name={c.icon as 'GraduationCap'} size={18} className="text-navy" />
                        </div>
                        <span className={`text-xs font-body font-medium px-2 py-1 border ${c.badge === 'Высокая' ? 'border-gold/40 text-navy bg-gold/10' : 'border-border text-muted-foreground'}`}>
                          Готовность: {c.badge}
                        </span>
                      </div>
                      <h3 className="font-display text-xl text-navy mb-1">{c.title}</h3>
                      <p className="font-body text-xs text-muted-foreground mb-2">{c.size}</p>
                      <p className="font-body text-xs text-foreground">{c.pay}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Band */}
            <section className="bg-navy">
              <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div>
                  <h2 className="font-display text-3xl text-white mb-2">Готовы запустить пилот?</h2>
                  <p className="font-body text-sm text-blue-300">Первые 3 клиента получают специальные условия — 20 000 ₽/мес.</p>
                </div>
                <div className="flex gap-4">
                  <button className="btn-gold" onClick={() => nav('contacts')}>Стать пилотным клиентом</button>
                  <button className="btn-outline border-white text-white hover:bg-white hover:text-navy" onClick={() => nav('pricing')}>Тарифы</button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ════════════════ PRODUCT ════════════════ */}
        {activeSection === 'product' && (
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="mb-14">
              <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-gold mb-3">Продукт</p>
              <h1 className="font-display text-5xl text-navy mb-4">Что входит в платформу</h1>
              <span className="gold-line" />
            </div>

            {/* Modules */}
            <div className="grid lg:grid-cols-2 gap-6 mb-16">
              {[
                {
                  icon: 'Bot',
                  title: 'Telegram-бот',
                  desc: 'Основная точка входа для пользователя. Анонимная запись к психологу, самодиагностика, уведомления. Uptime 99,9%.',
                  tags: ['Анонимность', 'Доступен 24/7', 'Простой интерфейс'],
                },
                {
                  icon: 'LayoutDashboard',
                  title: 'Веб-кабинет HR',
                  desc: 'Административная панель для HR-специалиста: аналитика, управление расписанием психологов, сводные отчёты (анонимно).',
                  tags: ['Аналитика', 'Отчёты', 'Управление'],
                },
                {
                  icon: 'Users',
                  title: 'Сеть психологов',
                  desc: 'Верифицированные специалисты с подтверждёнными дипломами. Строгий отбор, гибкий график, почасовая оплата.',
                  tags: ['Верификация', 'Гибкий график', 'Качество'],
                },
                {
                  icon: 'MessageSquare',
                  title: 'Форум взаимоподдержки',
                  desc: 'Модерируемое сообщество пользователей. Тематические треды, техники самопомощи, взаимная поддержка.',
                  tags: ['Модерация', 'Сообщество', 'Самопомощь'],
                },
                {
                  icon: 'BookOpen',
                  title: 'База знаний',
                  desc: 'Статьи, техники снижения стресса, правовые справочники. Контент создаётся командой и верифицированными психологами.',
                  tags: ['Контент', 'Правовые материалы', 'Обновляется'],
                },
                {
                  icon: 'Scale',
                  title: 'Юридический модуль',
                  desc: 'Готовые договоры, политики, согласия. Соответствие 152-ФЗ. Алгоритм при кризисных ситуациях. Разработано юристами.',
                  tags: ['152-ФЗ', 'Договоры', 'Защита клиента'],
                },
              ].map(m => (
                <div key={m.title} className="card-hover p-8 border border-border bg-white group">
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center mb-5 group-hover:bg-navy transition-colors">
                    <Icon name={m.icon as 'Bot'} size={22} className="text-navy group-hover:text-gold transition-colors" />
                  </div>
                  <h3 className="font-display text-2xl text-navy mb-3">{m.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">{m.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {m.tags.map(t => (
                      <span key={t} className="text-xs font-body border border-border px-2 py-1 text-muted-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Competitors table */}
            <div className="mb-6">
              <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-gold mb-3">Анализ рынка</p>
              <h2 className="font-display text-4xl text-navy mb-8">Почему клиенты выберут нас</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border border-border bg-white">
                <thead>
                  <tr className="bg-navy">
                    <th className="px-5 py-4 text-left font-body text-xs font-medium uppercase tracking-widest text-gold">Сервис</th>
                    <th className="px-5 py-4 text-left font-body text-xs font-medium uppercase tracking-widest text-gold">Модель</th>
                    <th className="px-5 py-4 text-left font-body text-xs font-medium uppercase tracking-widest text-gold">Цена</th>
                    <th className="px-5 py-4 text-left font-body text-xs font-medium uppercase tracking-widest text-gold">Слабое место</th>
                    <th className="px-5 py-4 text-center font-body text-xs font-medium uppercase tracking-widest text-gold">Слушай PRO</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPETITORS.map((c, i) => (
                    <tr key={c.name} className={i % 2 === 0 ? 'bg-white' : 'bg-secondary'}>
                      <td className="px-5 py-4 font-body font-semibold text-sm text-navy">{c.name}</td>
                      <td className="px-5 py-4 font-body text-sm text-muted-foreground">{c.model}</td>
                      <td className="px-5 py-4 font-body text-sm text-foreground">{c.price}</td>
                      <td className="px-5 py-4 font-body text-sm text-muted-foreground">{c.weak}</td>
                      <td className="px-5 py-4 text-center font-body text-sm font-bold text-gold">Выигрываем</td>
                    </tr>
                  ))}
                  <tr className="bg-navy">
                    <td className="px-5 py-4 font-display text-xl text-gold font-semibold" colSpan={4}>Слушай PRO</td>
                    <td className="px-5 py-4 text-center font-body text-sm text-white">Наш продукт</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* ROI */}
            <div className="mt-14 grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 bg-navy p-8">
                <p className="font-display text-2xl text-white mb-2">ROI для клиента</p>
                <p className="font-body text-sm text-blue-300 mb-6">Почему инвестиция в «Слушай PRO» окупается</p>
                <span className="gold-line mb-6" />
                <p className="font-body text-xs text-blue-200 leading-relaxed">
                  Один выгоревший сотрудник стоит компании 3–6 месячных зарплат на замену и найм.
                  При 100 сотрудниках даже снижение текучки на 1 человека в год покрывает год подписки «Оптимум».
                </p>
              </div>
              <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
                {[
                  { icon: 'TrendingDown', title: 'Снижение больничных', val: '−18%', desc: 'в среднем у клиентов EAP-программ' },
                  { icon: 'UserMinus', title: 'Снижение текучки', val: '−12%', desc: 'за счёт программ поддержки сотрудников' },
                  { icon: 'BarChart2', title: 'Рост вовлечённости', val: '+23%', desc: 'eNPS при наличии программ wellbeing' },
                  { icon: 'ShieldCheck', title: 'Юридические риски', val: '0', desc: 'штрафов РКН при нашем сопровождении' },
                ].map(r => (
                  <div key={r.title} className="p-6 border border-border bg-white">
                    <Icon name={r.icon as 'TrendingDown'} size={18} className="text-gold mb-3" />
                    <p className="font-display text-3xl font-bold text-navy mb-1">{r.val}</p>
                    <p className="font-body font-semibold text-sm text-navy mb-1">{r.title}</p>
                    <p className="font-body text-xs text-muted-foreground">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════════════════ PRICING ════════════════ */}
        {activeSection === 'pricing' && (
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="mb-14 text-center">
              <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-gold mb-3">Тарифы</p>
              <h1 className="font-display text-5xl text-navy mb-4">Прозрачное ценообразование</h1>
              <p className="font-body text-sm text-muted-foreground max-w-xl mx-auto">
                Подписка для организации — пользователи получают доступ бесплатно.
                Без скрытых платежей. Договор с первого дня.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-14">
              {TARIFFS.map(t => (
                <div key={t.id} className={`relative flex flex-col border ${t.highlight ? 'border-gold bg-navy' : 'border-border bg-white'}`}>
                  {t.tag && (
                    <div className={`absolute -top-3 left-6 px-3 py-1 text-xs font-body font-bold uppercase tracking-widest ${t.highlight ? 'bg-gold text-navy' : 'bg-navy text-gold'}`}>
                      {t.tag}
                    </div>
                  )}
                  <div className={`p-8 border-b ${t.highlight ? 'border-white/10' : 'border-border'}`}>
                    <p className={`font-body text-xs font-medium uppercase tracking-widest mb-2 ${t.highlight ? 'text-gold' : 'text-muted-foreground'}`}>{t.name}</p>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className={`font-display text-4xl font-bold ${t.highlight ? 'text-white' : 'text-navy'}`}>{t.price}</span>
                      <span className={`font-body text-sm ${t.highlight ? 'text-blue-300' : 'text-muted-foreground'}`}>₽/{t.period}</span>
                    </div>
                    <p className={`font-body text-xs ${t.highlight ? 'text-blue-300' : 'text-muted-foreground'}`}>{t.desc}</p>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <ul className="space-y-3 flex-1">
                      {t.features.map(f => (
                        <li key={f} className="flex items-start gap-3">
                          <Icon name="Check" size={14} className={`flex-shrink-0 mt-0.5 ${t.highlight ? 'text-gold' : 'text-navy'}`} />
                          <span className={`font-body text-sm ${t.highlight ? 'text-blue-100' : 'text-foreground'}`}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`mt-8 w-full ${t.highlight ? 'btn-gold' : 'btn-primary'}`}
                      onClick={() => nav('contacts')}
                    >
                      {t.cta}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Grant tariff */}
            <div className="border border-dashed border-gold/40 p-7 bg-cream flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-10">
              <Icon name="HandHeart" size={28} className="text-gold flex-shrink-0" />
              <div className="flex-1">
                <p className="font-body font-semibold text-navy mb-1">Грантовый тариф — 0–10 000 ₽/мес.</p>
                <p className="font-body text-sm text-muted-foreground">
                  Для государственных вузов с ограниченным бюджетом. Льготный тариф с возможностью
                  софинансирования или пилотный проект без оплаты на 3 месяца.
                </p>
              </div>
              <button className="btn-outline flex-shrink-0" onClick={() => nav('contacts')}>Узнать условия</button>
            </div>

            {/* Add-ons */}
            <div>
              <h2 className="font-display text-3xl text-navy mb-6">Дополнительные услуги</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: 'FileSearch', title: 'Юридический аудит', price: '50 000–150 000 ₽', desc: 'Проверка на соответствие 152-ФЗ' },
                  { icon: 'GraduationCap', title: 'Обучение HR', price: '30 000 ₽/группа', desc: 'Курс по распознаванию выгорания' },
                  { icon: 'Palette', title: 'White Label', price: '+50% к тарифу', desc: 'Брендирование под клиента' },
                  { icon: 'BarChart2', title: 'Аналитика', price: 'В топ-тарифе', desc: 'Агрегированные отчёты (анонимно)' },
                ].map(a => (
                  <div key={a.title} className="p-5 border border-border bg-white">
                    <Icon name={a.icon as 'FileSearch'} size={18} className="text-gold mb-3" />
                    <p className="font-body font-semibold text-sm text-navy mb-1">{a.title}</p>
                    <p className="font-body text-xs text-gold font-medium mb-2">{a.price}</p>
                    <p className="font-body text-xs text-muted-foreground">{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════════════════ LEGAL ════════════════ */}
        {activeSection === 'legal' && (
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="mb-14">
              <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-gold mb-3">Юридический модуль</p>
              <h1 className="font-display text-5xl text-navy mb-4">Наш главный козырь</h1>
              <span className="gold-line mb-6" />
              <p className="font-body text-base text-muted-foreground max-w-2xl leading-relaxed">
                В отличие от всех конкурентов, юридическая экспертиза — внутри нашей команды.
                Клиент получает готовый продукт без юридических рисков.
              </p>
            </div>

            {/* Selling message */}
            <div className="bg-navy p-10 mb-12">
              <div className="flex gap-5 items-start">
                <Icon name="Quote" size={32} className="text-gold flex-shrink-0" />
                <div>
                  <p className="font-display text-2xl text-white leading-relaxed mb-4">
                    «Вы получаете готовый сервис психологической поддержки,
                    который не принесёт вам судебных рисков. Мы берём на себя
                    всю юридическую сторону — от договоров до защиты персональных данных.»
                  </p>
                  <p className="font-body text-sm text-gold">Продающее сообщение для клиента</p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="font-display text-3xl text-navy mb-6">Что входит в юридический пакет</h2>
                <div className="space-y-4">
                  {[
                    { icon: 'FileText', title: 'Пользовательское соглашение', desc: 'Защищает клиента от претензий пользователей. Разграничение ответственности прописано явно.' },
                    { icon: 'Lock', title: 'Политика обработки ПДн', desc: 'Соответствует 152-ФЗ. Проходит проверку Роскомнадзора. Регулярный аудит.' },
                    { icon: 'CheckSquare', title: 'Электронные согласия', desc: 'Форма информированного согласия с возможностью отзыва. Логирование всех действий.' },
                    { icon: 'AlertTriangle', title: 'Протокол кризисных ситуаций', desc: 'Алгоритм при угрозе жизни согласован с психологами и юристами. Единственное основание снятия анонимности.' },
                    { icon: 'FileCheck', title: 'Договор с клиентом (B2B)', desc: 'Готовый шаблон договора на оказание услуг. Разграничение ответственности сторон.' },
                    { icon: 'Shield', title: 'Страхование ответственности', desc: 'Опционально. Повышает доверие клиента и снижает его собственные риски.' },
                  ].map(d => (
                    <div key={d.title} className="flex gap-4 p-5 border border-border bg-white card-hover">
                      <div className="w-10 h-10 bg-secondary flex items-center justify-center flex-shrink-0">
                        <Icon name={d.icon as 'FileText'} size={18} className="text-navy" />
                      </div>
                      <div>
                        <p className="font-body font-semibold text-sm text-navy mb-1">{d.title}</p>
                        <p className="font-body text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="font-display text-3xl text-navy mb-6">Проблемы клиентов, которые мы решаем</h2>
                {[
                  { problem: 'Не понимают, как оформить работу с психологом юридически', solution: 'Готовые шаблоны договоров, согласий, политик — подключаются сразу' },
                  { problem: 'Боятся штрафов РКН за утечку данных', solution: 'Документы разработаны под руководством преподавателей юрфака, соответствуют 152-ФЗ' },
                  { problem: 'Не знают, как разграничить ответственность при кризисной ситуации', solution: 'Чёткий алгоритм действий прописан в пользовательском соглашении' },
                  { problem: 'Хотят внедрить поддержку, но нет юридического отдела', solution: 'Мы берём юридическое сопровождение на себя' },
                ].map((item, i) => (
                  <div key={i} className="border border-border bg-white overflow-hidden">
                    <div className="px-5 py-4 bg-secondary border-b border-border">
                      <div className="flex gap-2 items-start">
                        <Icon name="AlertCircle" size={14} className="text-destructive flex-shrink-0 mt-0.5" />
                        <p className="font-body text-xs text-muted-foreground">{item.problem}</p>
                      </div>
                    </div>
                    <div className="px-5 py-4">
                      <div className="flex gap-2 items-start">
                        <Icon name="CheckCircle" size={14} className="text-gold flex-shrink-0 mt-0.5" />
                        <p className="font-body text-sm text-navy font-medium">{item.solution}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="bg-secondary border border-border p-6 mt-4">
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-3">Соответствие</p>
                  <div className="flex flex-wrap gap-2">
                    {['152-ФЗ «О персональных данных»', 'ФЗ «Об образовании» (ред. 2025)', 'ТК РФ', 'ФЗ «Об адвокатской деятельности»', 'GDPR-совместимость'].map(l => (
                      <span key={l} className="font-body text-xs border border-navy/20 bg-white px-3 py-1.5 text-navy">{l}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════ ABOUT ════════════════ */}
        {activeSection === 'about' && (
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="mb-14">
              <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-gold mb-3">О компании</p>
              <h1 className="font-display text-5xl text-navy mb-4">Команда и стратегия</h1>
              <span className="gold-line" />
            </div>

            {/* Strategy */}
            <div className="grid lg:grid-cols-3 gap-6 mb-16">
              {[
                { icon: 'Target', title: 'Качество — приоритет №1', desc: 'В B2B-сегменте репутация решает всё. Один инцидент с утечкой данных — и клиенты уходят. Качество — база для масштабирования.', num: '01' },
                { icon: 'Handshake', title: 'Удержание клиентов — №2', desc: 'Для SaaS-бизнеса важнее не разовая продажа, а долгосрочная подписка. Инвестируем в онбординг и поддержку.', num: '02' },
                { icon: 'DollarSign', title: 'Прибыль — приоритет №3', desc: 'Первый год — инвестиционный. Реинвестируем прибыль в разработку и маркетинг. Окупаемость — к концу 2-го года.', num: '03' },
              ].map(s => (
                <div key={s.num} className="p-8 border border-border bg-white">
                  <p className="font-display text-6xl font-bold text-secondary text-right mb-4">{s.num}</p>
                  <div className="w-10 h-10 bg-secondary flex items-center justify-center mb-4">
                    <Icon name={s.icon as 'Target'} size={18} className="text-navy" />
                  </div>
                  <h3 className="font-display text-xl text-navy mb-3">{s.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            {/* Team */}
            <h2 className="font-display text-4xl text-navy mb-8">Команда проекта</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
              {[
                { role: 'Руководитель проекта', who: 'Студент 3–4 курса', resp: 'Общее управление, стратегия, продажи B2B', icon: 'Crown' },
                { role: 'Юридический директор', who: 'Студент-юрист 3–4 курса', resp: 'Договоры, политики, согласование с РКН, страхование', icon: 'Scale' },
                { role: 'Продуктовый менеджер', who: 'Аналитический склад ума', resp: 'Проектирование функционала, CJM, сбор требований', icon: 'Layers' },
                { role: 'Технический разработчик', who: 'IT-направление / аутсорс', resp: 'Разработка и поддержка бота и веб-кабинета', icon: 'Code2' },
                { role: 'HR / Менеджер психологов', who: 'Студент-психолог или управленец', resp: 'Поиск, отбор, обучение психологов', icon: 'HeartHandshake' },
                { role: 'Маркетолог / SMM', who: 'Навыки продвижения', resp: 'Привлечение B2B-клиентов, контент, презентации', icon: 'Megaphone' },
              ].map(t => (
                <div key={t.role} className="p-6 border border-border bg-white">
                  <div className="w-10 h-10 bg-secondary flex items-center justify-center mb-4">
                    <Icon name={t.icon as 'Crown'} size={18} className="text-navy" />
                  </div>
                  <p className="font-body text-xs font-medium uppercase tracking-widest text-gold mb-1">{t.role}</p>
                  <p className="font-body font-semibold text-sm text-navy mb-2">{t.who}</p>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">{t.resp}</p>
                </div>
              ))}
            </div>

            {/* Roadmap */}
            <h2 className="font-display text-4xl text-navy mb-8">Дорожная карта — 4 месяца</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
              {ROADMAP.map((r, i) => (
                <div key={r.month} className="relative">
                  <div className={`p-6 border h-full ${i === 0 ? 'border-gold bg-navy' : 'border-border bg-white'}`}>
                    <p className={`font-body text-xs font-medium uppercase tracking-widest mb-1 ${i === 0 ? 'text-gold' : 'text-muted-foreground'}`}>{r.month}</p>
                    <h3 className={`font-display text-xl mb-4 ${i === 0 ? 'text-white' : 'text-navy'}`}>{r.title}</h3>
                    <ul className="space-y-2">
                      {r.tasks.map(task => (
                        <li key={task} className="flex gap-2 items-start">
                          <Icon name="ChevronRight" size={12} className={`flex-shrink-0 mt-1 ${i === 0 ? 'text-gold' : 'text-navy'}`} />
                          <span className={`font-body text-xs leading-relaxed ${i === 0 ? 'text-blue-200' : 'text-muted-foreground'}`}>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Finance */}
            <h2 className="font-display text-4xl text-navy mb-8">Финансовая модель</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <p className="font-body text-xs font-medium uppercase tracking-widest text-gold mb-4">Прогноз выручки</p>
                <div className="border border-border overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-secondary">
                        <th className="px-4 py-3 text-left font-body text-xs text-muted-foreground">Период</th>
                        <th className="px-4 py-3 text-left font-body text-xs text-muted-foreground">Клиенты</th>
                        <th className="px-4 py-3 text-left font-body text-xs text-muted-foreground">Выручка</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { period: 'Мес. 1–3 (пилот)', clients: '3', revenue: '60 000 ₽' },
                        { period: 'Мес. 4–6', clients: '8', revenue: '360 000 ₽' },
                        { period: 'Мес. 7–12', clients: '15', revenue: '825 000 ₽' },
                        { period: 'Год 2', clients: '30–50', revenue: '2,1–3,5 млн ₽' },
                      ].map((row, i) => (
                        <tr key={row.period} className={i % 2 === 0 ? 'bg-white' : 'bg-secondary'}>
                          <td className="px-4 py-3 font-body text-sm text-navy">{row.period}</td>
                          <td className="px-4 py-3 font-body text-sm text-muted-foreground">{row.clients}</td>
                          <td className="px-4 py-3 font-body font-semibold text-sm text-navy">{row.revenue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <p className="font-body text-xs font-medium uppercase tracking-widest text-gold mb-4">Стартовые затраты</p>
                <div className="border border-border overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-secondary">
                        <th className="px-4 py-3 text-left font-body text-xs text-muted-foreground">Статья</th>
                        <th className="px-4 py-3 text-left font-body text-xs text-muted-foreground">Сумма</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { item: 'Разработка MVP', cost: '100 000 ₽' },
                        { item: 'Юридическое оформление', cost: '0 ₽ (команда)' },
                        { item: 'Регистрация ИП/ООО', cost: '5 000 ₽' },
                        { item: 'Маркетинг (мес. 1)', cost: '50 000 ₽' },
                        { item: 'Оборудование и ПО', cost: '15 000 ₽' },
                      ].map((row, i) => (
                        <tr key={row.item} className={i % 2 === 0 ? 'bg-white' : 'bg-secondary'}>
                          <td className="px-4 py-3 font-body text-sm text-navy">{row.item}</td>
                          <td className="px-4 py-3 font-body font-semibold text-sm text-navy">{row.cost}</td>
                        </tr>
                      ))}
                      <tr className="bg-navy">
                        <td className="px-4 py-3 font-body font-bold text-sm text-white">Итого</td>
                        <td className="px-4 py-3 font-body font-bold text-sm text-gold">170 000 ₽</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════ CONTACTS ════════════════ */}
        {activeSection === 'contacts' && (
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="mb-14">
              <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-gold mb-3">Контакты</p>
              <h1 className="font-display text-5xl text-navy mb-4">Запросить демо</h1>
              <span className="gold-line mb-6" />
              <p className="font-body text-base text-muted-foreground max-w-xl">
                Оставьте заявку — свяжемся в течение рабочего дня, проведём демонстрацию
                и предложим индивидуальные условия.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                {demoSent ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 bg-gold/15 flex items-center justify-center mb-5">
                      <Icon name="CheckCircle" size={32} className="text-gold" />
                    </div>
                    <h2 className="font-display text-3xl text-navy mb-3">Заявка отправлена</h2>
                    <p className="font-body text-sm text-muted-foreground max-w-sm">
                      Спасибо! Мы свяжемся с вами в течение рабочего дня для согласования демонстрации.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-body font-medium uppercase tracking-widest text-muted-foreground mb-2">Ваше имя *</label>
                        <input
                          type="text"
                          className="w-full border border-border bg-white px-4 py-3 text-sm font-body text-navy focus:outline-none focus:border-navy"
                          placeholder="Иван Иванов"
                          value={demoForm.name}
                          onChange={e => setDemoForm(p => ({ ...p, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-body font-medium uppercase tracking-widest text-muted-foreground mb-2">Email *</label>
                        <input
                          type="email"
                          className="w-full border border-border bg-white px-4 py-3 text-sm font-body text-navy focus:outline-none focus:border-navy"
                          placeholder="ivan@company.ru"
                          value={demoForm.email}
                          onChange={e => setDemoForm(p => ({ ...p, email: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-body font-medium uppercase tracking-widest text-muted-foreground mb-2">Организация *</label>
                      <input
                        type="text"
                        className="w-full border border-border bg-white px-4 py-3 text-sm font-body text-navy focus:outline-none focus:border-navy"
                        placeholder="Название вуза или компании"
                        value={demoForm.org}
                        onChange={e => setDemoForm(p => ({ ...p, org: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-body font-medium uppercase tracking-widest text-muted-foreground mb-2">Размер организации</label>
                      <select
                        className="w-full border border-border bg-white px-4 py-3 text-sm font-body text-navy focus:outline-none focus:border-navy"
                        value={demoForm.size}
                        onChange={e => setDemoForm(p => ({ ...p, size: e.target.value }))}
                      >
                        <option value="">Выберите размер</option>
                        <option>До 100 человек</option>
                        <option>100–500 человек</option>
                        <option>500–1000 человек</option>
                        <option>Более 1000 человек</option>
                      </select>
                    </div>
                    <button
                      className={`btn-primary w-full py-4 ${(!demoForm.name || !demoForm.email || !demoForm.org) ? 'opacity-40 cursor-not-allowed' : ''}`}
                      disabled={!demoForm.name || !demoForm.email || !demoForm.org}
                      onClick={() => setDemoSent(true)}
                    >
                      Отправить заявку на демо
                    </button>
                    <p className="font-body text-xs text-muted-foreground text-center">
                      Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                    </p>
                  </div>
                )}
              </div>

              <div className="lg:col-span-2 space-y-5">
                <div className="bg-navy p-7">
                  <p className="font-display text-2xl text-white mb-5">Пилотный клиент</p>
                  <p className="font-body text-sm text-blue-200 leading-relaxed mb-6">
                    Первые 3 организации-партнёра получают специальные условия: 3 месяца за 20 000 ₽/мес.
                    и помощь с юридическим оформлением.
                  </p>
                  <div className="space-y-3">
                    {['Сниженная цена на 3 месяца', 'Юридический аудит включён', 'Персональный менеджер', 'Приоритетная разработка фич'].map(b => (
                      <div key={b} className="flex gap-2 items-center">
                        <Icon name="Check" size={13} className="text-gold flex-shrink-0" />
                        <span className="font-body text-sm text-blue-100">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 border border-border bg-secondary space-y-4">
                  {[
                    { icon: 'Clock', label: 'Ответим в течение', val: '1 рабочего дня' },
                    { icon: 'CalendarCheck', label: 'Демо-звонок', val: '30–45 минут' },
                    { icon: 'FileText', label: 'Договор', val: 'С первого дня' },
                  ].map(c => (
                    <div key={c.label} className="flex items-center gap-3">
                      <Icon name={c.icon as 'Clock'} size={16} className="text-gold flex-shrink-0" />
                      <div>
                        <p className="font-body text-xs text-muted-foreground">{c.label}</p>
                        <p className="font-body text-sm font-semibold text-navy">{c.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-navy mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-5 gap-8 mb-10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gold/20 flex items-center justify-center">
                  <span className="text-gold text-sm font-display font-bold">С</span>
                </div>
                <span className="font-display text-xl text-white">Слушай</span>
                <span className="font-body text-xs font-bold text-gold tracking-widest uppercase">PRO</span>
              </div>
              <p className="font-body text-xs text-blue-300 leading-relaxed max-w-xs">
                B2B-платформа психологической поддержки для вузов и компаний.
                Юридически защищённое решение. Запуск за 2 недели.
              </p>
            </div>
            {[
              { title: 'Продукт', links: ['Главная', 'Продукт', 'Тарифы', 'Юридический модуль'] },
              { title: 'Компания', links: ['О компании', 'Команда', 'Дорожная карта', 'Контакты'] },
              { title: 'Правовая база', links: ['152-ФЗ', 'Политика ПДн', 'Пользовательское соглашение'] },
            ].map(col => (
              <div key={col.title}>
                <p className="font-body text-xs font-medium uppercase tracking-widest text-gold mb-4">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map(link => (
                    <li key={link}>
                      <span className="font-body text-xs text-blue-300 cursor-pointer hover:text-white transition-colors">{link}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="section-divider opacity-20 mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-blue-400">© 2026 «Слушай PRO» · B2B-платформа ментального здоровья · 152-ФЗ</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={12} className="text-gold" />
                <span className="font-body text-xs text-blue-400">Юридическая защита клиентов</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
