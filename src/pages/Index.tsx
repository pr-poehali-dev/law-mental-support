import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const ADJECTIVES = ['Северный', 'Тихий', 'Мудрый', 'Строгий', 'Честный', 'Верный', 'Смелый', 'Чёткий', 'Ясный', 'Твёрдый'];
const NOUNS = ['Арктур', 'Меридиан', 'Кодекс', 'Параграф', 'Артикль', 'Статут', 'Протокол', 'Вердикт', 'Манускрипт', 'Документ'];

function generatePseudonym(): string {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const num = Math.floor(Math.random() * 900) + 100;
  return `${adj}${noun}${num}`;
}

type Section = 'home' | 'about' | 'psychology' | 'legal' | 'knowledge' | 'rules';

const NAV_ITEMS: { id: Section; label: string }[] = [
  { id: 'home', label: 'Главная' },
  { id: 'about', label: 'О проекте' },
  { id: 'psychology', label: 'Психологическая поддержка' },
  { id: 'legal', label: 'Юридическая консультация' },
  { id: 'knowledge', label: 'База знаний' },
  { id: 'rules', label: 'Правила и согласия' },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [pseudonym, setPseudonym] = useState<string | null>(null);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [consentStep, setConsentStep] = useState(1);
  const [consents, setConsents] = useState({ data: false, anon: false, terms: false });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('slushay_pseudonym');
    if (stored) {
      setPseudonym(stored);
    }
  }, []);

  const handleSectionClick = (section: Section) => {
    if ((section === 'psychology' || section === 'legal') && !pseudonym) {
      setShowConsentModal(true);
    } else {
      setActiveSection(section);
      setMenuOpen(false);
    }
  };

  const handleConsent = () => {
    if (!consents.data || !consents.anon || !consents.terms) return;
    const p = generatePseudonym();
    localStorage.setItem('slushay_pseudonym', p);
    setPseudonym(p);
    setShowConsentModal(false);
    setConsentStep(1);
    setActiveSection('psychology');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => setActiveSection('home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 bg-navy flex items-center justify-center">
              <span className="text-gold text-sm font-display font-bold">С</span>
            </div>
            <span className="font-display text-xl font-semibold text-navy tracking-wide">
              Слушай
            </span>
            <span className="text-xs font-body text-muted-foreground ml-1 hidden sm:block tracking-widest uppercase">
              Jurist Edition
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {pseudonym && (
              <div className="pseudonym-badge hidden sm:flex">
                <Icon name="UserCheck" size={12} />
                {pseudonym}
              </div>
            )}
            {/* Mobile burger */}
            <button
              className="lg:hidden p-2 text-navy"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-border">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                className="block w-full text-left px-6 py-3.5 text-sm font-body font-medium text-navy hover:bg-secondary border-b border-border last:border-0"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">
        {/* ── HOME ── */}
        {activeSection === 'home' && (
          <div>
            {/* Hero */}
            <section className="geometric-bg min-h-[88vh] flex items-center">
              <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center relative z-10">
                <div>
                  <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-gold mb-6 animate-fade-in animate-stagger-1">
                    Юридический факультет · Проект поддержки
                  </p>
                  <h1 className="font-display text-5xl lg:text-7xl font-semibold text-white leading-[1.05] mb-6 animate-slide-up animate-stagger-2">
                    Слушай.
                    <br />
                    <em className="text-gold not-italic">Помоги.</em>
                    <br />
                    Защити.
                  </h1>
                  <span className="gold-line mb-6 animate-fade-in animate-stagger-3" />
                  <p className="font-body text-base text-blue-100 leading-relaxed max-w-md animate-fade-in animate-stagger-3">
                    Анонимная мультиформатная платформа психологической
                    и юридической поддержки студентов. Безопасно.
                    Конфиденциально. В соответствии с 152-ФЗ.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-10 animate-fade-in animate-stagger-4">
                    <button
                      className="btn-gold"
                      onClick={() => handleSectionClick('psychology')}
                    >
                      Получить поддержку
                    </button>
                    <button
                      className="btn-outline border-white text-white hover:bg-white hover:text-navy"
                      onClick={() => setActiveSection('about')}
                    >
                      О проекте
                    </button>
                  </div>
                </div>

                <div className="hidden lg:flex flex-col gap-5 animate-fade-in animate-stagger-5">
                  {[
                    { icon: 'ShieldCheck', label: 'Полная анонимность', desc: 'Псевдоним генерируется автоматически. Никаких личных данных.' },
                    { icon: 'Scale', label: 'Правовая защита', desc: 'Все процессы соответствуют 152-ФЗ и ФЗ «Об образовании».' },
                    { icon: 'Clock', label: 'Доступность 24/7', desc: 'Помощь доступна в любое время через платформу.' },
                  ].map((item) => (
                    <div key={item.icon} className="flex gap-4 items-start p-5 bg-white/5 border border-white/10 backdrop-blur-sm">
                      <div className="w-10 h-10 bg-gold/20 flex items-center justify-center flex-shrink-0">
                        <Icon name={item.icon as any} size={18} className="text-gold" />
                      </div>
                      <div>
                        <p className="font-body font-semibold text-white text-sm mb-1">{item.label}</p>
                        <p className="font-body text-xs text-blue-200 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="bg-white border-b border-border">
              <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { num: '60%', label: 'студентов испытывают симптомы выгорания' },
                  { num: '15%', label: 'обращаются за помощью к специалисту' },
                  { num: '152-ФЗ', label: 'полное соответствие законодательству' },
                  { num: '24/7', label: 'доступность платформы поддержки' },
                ].map((s) => (
                  <div key={s.num} className="text-center lg:text-left">
                    <p className="font-display text-4xl font-bold text-navy mb-2">{s.num}</p>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed">{s.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Services */}
            <section className="max-w-7xl mx-auto px-6 py-20">
              <div className="mb-12">
                <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-gold mb-3">Направления</p>
                <h2 className="font-display text-4xl text-navy">Чем мы можем помочь</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: 'Brain',
                    title: 'Психологическая поддержка',
                    desc: 'Анонимные обращения к психологу, инструменты самопомощи, чат-поддержка. Снижение стресса и преодоление выгорания.',
                    section: 'psychology' as Section,
                    tag: 'Анонимно',
                  },
                  {
                    icon: 'Gavel',
                    title: 'Юридическая консультация',
                    desc: 'Правовые консультации от студентов-юристов под руководством практикующих специалистов. Безопасно и конфиденциально.',
                    section: 'legal' as Section,
                    tag: 'Конфиденциально',
                  },
                  {
                    icon: 'BookOpen',
                    title: 'База знаний',
                    desc: 'Статьи, методики самопомощи, правовые справочники. Информация всегда под рукой.',
                    section: 'knowledge' as Section,
                    tag: 'Открытый доступ',
                  },
                ].map((card) => (
                  <div key={card.icon} className="card-hover p-8 border border-border bg-white group cursor-pointer" onClick={() => handleSectionClick(card.section)}>
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 bg-secondary flex items-center justify-center group-hover:bg-navy transition-colors">
                        <Icon name={card.icon as any} size={22} className="text-navy group-hover:text-gold transition-colors" />
                      </div>
                      <span className="text-xs font-body font-medium text-gold tracking-widest uppercase border border-gold/30 px-2 py-1">
                        {card.tag}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl text-navy mb-3">{card.title}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">{card.desc}</p>
                    <div className="flex items-center gap-2 text-navy group-hover:text-gold transition-colors">
                      <span className="text-xs font-body font-medium tracking-widest uppercase">Подробнее</span>
                      <Icon name="ArrowRight" size={14} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="bg-secondary">
              <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div>
                  <h2 className="font-display text-3xl text-navy mb-2">Готовы начать?</h2>
                  <p className="font-body text-sm text-muted-foreground">Получите поддержку анонимно — регистрация не требуется.</p>
                </div>
                <button className="btn-primary flex-shrink-0" onClick={() => handleSectionClick('psychology')}>
                  Начать анонимно
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ── ABOUT ── */}
        {activeSection === 'about' && (
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="mb-12">
              <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-gold mb-3">О нас</p>
              <h1 className="font-display text-5xl text-navy mb-4">О проекте «Слушай»</h1>
              <span className="gold-line" />
            </div>
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <p className="font-body text-base text-foreground leading-relaxed">
                  «Слушай» — первый правозащитный проект юридического факультета в сфере ментального здоровья. Платформа объединяет психологическую поддержку и юридическое консультирование в едином безопасном цифровом пространстве.
                </p>
                <div className="border-l-2 border-gold pl-6 py-2">
                  <p className="font-display text-xl text-navy italic">
                    «Более 60% студентов юрфака испытывают симптомы выгорания, но лишь 15% обращаются к специалистам. Мы меняем это.»
                  </p>
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  Проект реализован в соответствии с изменениями в Федеральный закон «Об образовании» 2025 года, рекомендующими вузам создавать системы психологической поддержки. Вся обработка данных соответствует требованиям 152-ФЗ «О персональных данных».
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { icon: 'Target', title: 'Миссия', desc: 'Снизить барьеры для обращения за помощью через анонимность и доступность 24/7.' },
                    { icon: 'Users', title: 'Команда', desc: 'Студенты-юристы под руководством практикующих специалистов и штатного психолога.' },
                    { icon: 'Award', title: 'Признание', desc: 'Визитная карточка факультета и база для научных исследований.' },
                    { icon: 'FileText', title: 'Правовая база', desc: 'Все процессы задокументированы и соответствуют действующему законодательству.' },
                  ].map((item) => (
                    <div key={item.icon} className="flex gap-4">
                      <div className="w-10 h-10 bg-secondary flex items-center justify-center flex-shrink-0">
                        <Icon name={item.icon as any} size={18} className="text-navy" />
                      </div>
                      <div>
                        <p className="font-body font-semibold text-sm text-navy mb-1">{item.title}</p>
                        <p className="font-body text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-navy p-8">
                  <p className="font-display text-2xl text-white mb-6">Целевая аудитория</p>
                  {[
                    { label: 'Студенты', desc: 'Психологическая помощь и правовая информация' },
                    { label: 'Штатный психолог', desc: 'Снижение нагрузки через автоматизацию' },
                    { label: 'Участники команды', desc: 'Практический опыт в правовом сопровождении' },
                    { label: 'Деканат', desc: 'Соответствие требованиям законодательства' },
                  ].map((t, i) => (
                    <div key={i} className="border-b border-white/10 py-4 last:border-0">
                      <p className="font-body font-medium text-gold text-sm mb-1">{t.label}</p>
                      <p className="font-body text-xs text-blue-200">{t.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="p-6 border border-gold/30 bg-cream">
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-3">Правовая основа</p>
                  <p className="font-body text-sm text-navy leading-relaxed">ФЗ «Об образовании» (ред. 2025) · 152-ФЗ «О персональных данных»</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── PSYCHOLOGY ── */}
        {activeSection === 'psychology' && (
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="mb-12">
              <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-gold mb-3">Раздел</p>
              <h1 className="font-display text-5xl text-navy mb-4">Психологическая поддержка</h1>
              <span className="gold-line mb-6" />
              {pseudonym && (
                <div className="mt-4 flex items-center gap-3">
                  <div className="pseudonym-badge">
                    <Icon name="ShieldCheck" size={12} />
                    Вы вошли как: <strong>{pseudonym}</strong>
                  </div>
                </div>
              )}
            </div>
            <div className="grid lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: 'MessageCircle',
                  title: 'Анонимный чат',
                  desc: 'Напишите психологу напрямую. Ответ поступает в течение рабочего дня.',
                  badge: 'Скоро',
                },
                {
                  icon: 'Calendar',
                  title: 'Запись на приём',
                  desc: 'Запись к штатному психологу факультета. Удобный выбор времени.',
                  badge: 'Скоро',
                },
                {
                  icon: 'HeartHandshake',
                  title: 'Самопомощь',
                  desc: 'Техники снижения стресса, дыхательные практики, дневник состояния.',
                  badge: 'Доступно',
                },
              ].map((card) => (
                <div key={card.icon} className="card-hover p-8 border border-border bg-white">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 bg-secondary flex items-center justify-center">
                      <Icon name={card.icon as any} size={22} className="text-navy" />
                    </div>
                    <span className={`text-xs font-body font-medium tracking-widest uppercase px-2 py-1 ${card.badge === 'Доступно' ? 'bg-gold/15 text-navy border border-gold/40' : 'bg-secondary text-muted-foreground border border-border'}`}>
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl text-navy mb-3">{card.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">{card.desc}</p>
                  <button className={`btn-primary w-full ${card.badge !== 'Доступно' ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={card.badge !== 'Доступно'}>
                    {card.badge === 'Доступно' ? 'Открыть' : 'В разработке'}
                  </button>
                </div>
              ))}
            </div>
            <div className="bg-navy p-8 flex flex-col lg:flex-row items-start gap-6">
              <Icon name="AlertTriangle" size={24} className="text-gold flex-shrink-0 mt-1" />
              <div>
                <p className="font-body font-semibold text-white mb-2">Экстренная ситуация?</p>
                <p className="font-body text-sm text-blue-200 leading-relaxed">
                  Если вы находитесь в кризисной ситуации или существует угроза жизни — обратитесь на телефон доверия:
                  <strong className="text-gold"> 8-800-2000-122</strong> (бесплатно, круглосуточно).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── LEGAL ── */}
        {activeSection === 'legal' && (
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="mb-12">
              <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-gold mb-3">Раздел</p>
              <h1 className="font-display text-5xl text-navy mb-4">Юридическая консультация</h1>
              <span className="gold-line mb-6" />
              {pseudonym && (
                <div className="pseudonym-badge mt-4">
                  <Icon name="ShieldCheck" size={12} />
                  Вы вошли как: <strong>{pseudonym}</strong>
                </div>
              )}
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="font-body text-base text-foreground leading-relaxed">
                  Студенты-юристы под руководством практикующих специалистов оказывают правовую помощь по вопросам, связанным с учебным процессом, трудовыми отношениями и защитой персональных данных.
                </p>
                {[
                  { icon: 'FileCheck', title: 'Учебные споры', desc: 'Помощь при академических конфликтах, отчислении, переводе.' },
                  { icon: 'Lock', title: 'Персональные данные', desc: 'Защита прав при нарушении конфиденциальности.' },
                  { icon: 'Briefcase', title: 'Трудовые вопросы', desc: 'Консультации по трудоустройству и стажировкам.' },
                  { icon: 'FileText', title: 'Документы и согласия', desc: 'Разработка и проверка правовых документов.' },
                ].map((item) => (
                  <div key={item.icon} className="flex gap-4 p-5 border border-border bg-white card-hover">
                    <div className="w-10 h-10 bg-secondary flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon as any} size={18} className="text-navy" />
                    </div>
                    <div>
                      <p className="font-body font-semibold text-sm text-navy mb-1">{item.title}</p>
                      <p className="font-body text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                <div className="bg-secondary p-8">
                  <h3 className="font-display text-2xl text-navy mb-6">Подать обращение</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-body font-medium uppercase tracking-widest text-muted-foreground mb-2">Категория вопроса</label>
                      <select className="w-full border border-border bg-white px-4 py-3 text-sm font-body text-navy focus:outline-none focus:border-navy">
                        <option>Учебные споры</option>
                        <option>Персональные данные</option>
                        <option>Трудовые вопросы</option>
                        <option>Иное</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-body font-medium uppercase tracking-widest text-muted-foreground mb-2">Описание ситуации</label>
                      <textarea
                        rows={5}
                        className="w-full border border-border bg-white px-4 py-3 text-sm font-body text-navy focus:outline-none focus:border-navy resize-none"
                        placeholder="Опишите вашу ситуацию. Ваш псевдоним будет прикреплён автоматически."
                      />
                    </div>
                    <button className="btn-primary w-full">Отправить обращение</button>
                  </div>
                </div>
                <div className="border border-gold/30 p-5 bg-cream">
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    <strong className="text-navy">Важно:</strong> Консультации носят информационный характер и не являются юридической помощью в смысле ФЗ «Об адвокатской деятельности».
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── KNOWLEDGE ── */}
        {activeSection === 'knowledge' && (
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="mb-12">
              <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-gold mb-3">Раздел</p>
              <h1 className="font-display text-5xl text-navy mb-4">База знаний</h1>
              <span className="gold-line" />
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Categories */}
              <div className="lg:col-span-1 space-y-2">
                {[
                  { icon: 'Brain', label: 'Психологическое здоровье', count: 12 },
                  { icon: 'Scale', label: 'Правовые основы', count: 8 },
                  { icon: 'BookOpen', label: 'Методики самопомощи', count: 15 },
                  { icon: 'Shield', label: 'Персональные данные', count: 5 },
                  { icon: 'GraduationCap', label: 'Академические права', count: 9 },
                ].map((cat) => (
                  <button key={cat.label} className="w-full flex items-center justify-between px-5 py-4 border border-border bg-white hover:border-navy hover:bg-secondary transition-all text-left">
                    <div className="flex items-center gap-3">
                      <Icon name={cat.icon as any} size={16} className="text-navy" />
                      <span className="font-body text-sm font-medium text-navy">{cat.label}</span>
                    </div>
                    <span className="text-xs font-body text-muted-foreground">{cat.count}</span>
                  </button>
                ))}
              </div>
              {/* Articles */}
              <div className="lg:col-span-2 space-y-4">
                {[
                  { tag: 'Психология', title: 'Как распознать академическое выгорание: 10 признаков', date: '20 марта 2026' },
                  { tag: 'Право', title: 'Ваши права при отчислении: пошаговое руководство', date: '18 марта 2026' },
                  { tag: 'Самопомощь', title: 'Техника «5-4-3-2-1» для снижения тревоги перед экзаменом', date: '15 марта 2026' },
                  { tag: 'Данные', title: '152-ФЗ простым языком: что вуз может хранить о вас', date: '12 марта 2026' },
                  { tag: 'Психология', title: 'Перфекционизм студента-юриста: когда стремление к идеалу вредит', date: '8 марта 2026' },
                ].map((article, i) => (
                  <div key={i} className="card-hover p-6 border border-border bg-white cursor-pointer group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <span className="text-xs font-body font-medium uppercase tracking-widest text-gold mb-3 block">{article.tag}</span>
                        <h3 className="font-display text-xl text-navy group-hover:text-gold transition-colors mb-2">{article.title}</h3>
                        <p className="font-body text-xs text-muted-foreground">{article.date}</p>
                      </div>
                      <Icon name="ArrowRight" size={18} className="text-muted-foreground group-hover:text-gold transition-colors flex-shrink-0 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── RULES ── */}
        {activeSection === 'rules' && (
          <div className="max-w-4xl mx-auto px-6 py-20">
            <div className="mb-12">
              <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-gold mb-3">Документы</p>
              <h1 className="font-display text-5xl text-navy mb-4">Правила и согласия</h1>
              <span className="gold-line" />
            </div>
            <div className="space-y-6">
              {[
                {
                  icon: 'FileText',
                  title: 'Политика конфиденциальности',
                  desc: 'Описание принципов обработки и защиты персональных данных пользователей платформы в соответствии с 152-ФЗ.',
                },
                {
                  icon: 'CheckSquare',
                  title: 'Согласие на обработку персональных данных',
                  desc: 'Форма информированного согласия на сбор и обработку данных, предоставляемых при использовании сервисов платформы.',
                },
                {
                  icon: 'ShieldCheck',
                  title: 'Политика анонимности',
                  desc: 'Принципы обеспечения анонимности, описание системы псевдонимов и условия снятия анонимности в экстренных случаях.',
                },
                {
                  icon: 'Scale',
                  title: 'Пользовательское соглашение',
                  desc: 'Правила использования платформы, разграничение ответственности, порядок разрешения споров.',
                },
                {
                  icon: 'AlertCircle',
                  title: 'Протокол экстренных ситуаций',
                  desc: 'Порядок действий при угрозе жизни пользователя. Единственное основание для снятия анонимности.',
                },
              ].map((doc, i) => (
                <div key={i} className="flex gap-5 p-7 border border-border bg-white card-hover">
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center flex-shrink-0">
                    <Icon name={doc.icon as any} size={22} className="text-navy" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl text-navy mb-2">{doc.title}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{doc.desc}</p>
                    <button className="btn-outline text-xs px-4 py-2">Читать документ</button>
                  </div>
                  <div className="flex-shrink-0 self-start">
                    <span className="text-xs font-body text-muted-foreground border border-border px-2 py-1">PDF</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 p-7 bg-navy">
              <div className="flex gap-4 items-start">
                <Icon name="Info" size={20} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-body font-semibold text-white mb-2">Лог обработки данных</p>
                  <p className="font-body text-sm text-blue-200 leading-relaxed">
                    Все действия с данными пользователей фиксируются в соответствии с требованиями 152-ФЗ.
                    Журнал доступен уполномоченным лицам по официальному запросу.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-navy mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gold/20 flex items-center justify-center">
                  <span className="text-gold text-sm font-display font-bold">С</span>
                </div>
                <span className="font-display text-xl text-white">Слушай</span>
              </div>
              <p className="font-body text-xs text-blue-300 leading-relaxed">
                Платформа психологической и юридической поддержки студентов юридического факультета.
              </p>
            </div>
            {[
              {
                title: 'Разделы',
                links: ['Главная', 'О проекте', 'Психологическая поддержка', 'Юридическая консультация'],
              },
              {
                title: 'Ресурсы',
                links: ['База знаний', 'Правила и согласия', 'Политика конфиденциальности'],
              },
              {
                title: 'Контакты',
                links: ['Деканат юрфака', 'Телефон доверия: 8-800-2000-122'],
              },
            ].map((col) => (
              <div key={col.title}>
                <p className="font-body text-xs font-medium uppercase tracking-widest text-gold mb-4">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
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
            <p className="font-body text-xs text-blue-400">
              © 2026 «Слушай» · Jurist Edition · Все данные защищены в соответствии с 152-ФЗ
            </p>
            <div className="flex items-center gap-2">
              <Icon name="Shield" size={12} className="text-gold" />
              <span className="font-body text-xs text-blue-400">Анонимность гарантирована</span>
            </div>
          </div>
        </div>
      </footer>

      {/* CONSENT MODAL */}
      {showConsentModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowConsentModal(false)}>
          <div className="bg-white w-full max-w-lg mx-4 animate-slide-up">
            {/* Header */}
            <div className="bg-navy px-8 py-6 flex items-start justify-between">
              <div>
                <p className="font-body text-xs text-gold uppercase tracking-widest mb-1">Шаг {consentStep} из 2</p>
                <h2 className="font-display text-2xl text-white">
                  {consentStep === 1 ? 'Согласие на обработку данных' : 'Ваш анонимный псевдоним'}
                </h2>
              </div>
              <button onClick={() => setShowConsentModal(false)} className="text-white/50 hover:text-white transition-colors mt-1">
                <Icon name="X" size={18} />
              </button>
            </div>

            <div className="px-8 py-8">
              {consentStep === 1 ? (
                <div className="space-y-5">
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    Перед использованием сервисов платформы необходимо ознакомиться с условиями и дать согласие в соответствии с требованиями 152-ФЗ.
                  </p>
                  <div className="space-y-4">
                    {[
                      {
                        key: 'data' as const,
                        title: 'Обработка обезличенных данных',
                        desc: 'Согласен на сбор и обработку обезличенных данных (без привязки к личности) для улучшения качества поддержки.',
                      },
                      {
                        key: 'anon' as const,
                        title: 'Условия анонимности',
                        desc: 'Ознакомлен с протоколом экстренных ситуаций: анонимность может быть снята только при прямой угрозе жизни.',
                      },
                      {
                        key: 'terms' as const,
                        title: 'Пользовательское соглашение',
                        desc: 'Принимаю правила платформы и подтверждаю, что являюсь студентом юридического факультета.',
                      },
                    ].map((item) => (
                      <label key={item.key} className="flex gap-4 cursor-pointer p-4 border border-border hover:border-navy transition-colors">
                        <input
                          type="checkbox"
                          checked={consents[item.key]}
                          onChange={(e) => setConsents((prev) => ({ ...prev, [item.key]: e.target.checked }))}
                          className="mt-0.5 accent-navy flex-shrink-0 w-4 h-4"
                        />
                        <div>
                          <p className="font-body font-semibold text-sm text-navy mb-1">{item.title}</p>
                          <p className="font-body text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  <button
                    className={`btn-primary w-full ${(!consents.data || !consents.anon || !consents.terms) ? 'opacity-40 cursor-not-allowed' : ''}`}
                    disabled={!consents.data || !consents.anon || !consents.terms}
                    onClick={() => setConsentStep(2)}
                  >
                    Продолжить
                  </button>
                </div>
              ) : (
                <div className="space-y-6 text-center">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-secondary flex items-center justify-center">
                      <Icon name="UserCheck" size={28} className="text-navy" />
                    </div>
                  </div>
                  <div>
                    <p className="font-body text-sm text-muted-foreground mb-4">
                      Для обеспечения анонимности системой сгенерирован уникальный псевдоним:
                    </p>
                    <div className="pseudonym-badge justify-center text-lg py-3 px-6 font-semibold">
                      {generatePseudonym()}
                    </div>
                    <p className="font-body text-xs text-muted-foreground mt-3">
                      Псевдоним сохранён в вашем браузере и не передаётся третьим лицам.
                    </p>
                  </div>
                  <button className="btn-gold w-full" onClick={handleConsent}>
                    Начать работу с платформой
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
