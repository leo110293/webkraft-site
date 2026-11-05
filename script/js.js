document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const logo = document.querySelector('.logo');
  const menuToggle = document.querySelector('.nav-toggle');
  const navigation = document.querySelector('.nav');
  const backToTop = document.querySelector('.back-to-top');
  const lightbox = document.querySelector('.image-lightbox');
  const portfolioGallery = document.getElementById('portfolioGallery');
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  const updateHeader = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
    if (backToTop) backToTop.classList.toggle('is-visible', window.scrollY > 320);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (logo) {
    logo.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.reload();
    });
  }

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      window.scrollTo({ top: 0, behavior });
    });
  }

  if (lightbox instanceof HTMLDialogElement) {
    const lightboxImage = lightbox.querySelector('.image-lightbox__image');
    const lightboxCaption = lightbox.querySelector('.image-lightbox__caption');
    const closeButton = lightbox.querySelector('.image-lightbox__close');

    document.querySelectorAll('.service-image[data-lightbox-src]').forEach((button) => {
      button.addEventListener('click', () => {
        const source = button.getAttribute('data-lightbox-src');
        const alt = button.getAttribute('data-lightbox-alt');
        if (!source || !lightboxImage || !lightboxCaption) return;

        lightboxImage.src = source;
        lightboxImage.alt = alt || '';
        lightboxCaption.textContent = alt || '';
        lightbox.showModal();
      });
    });

    closeButton?.addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        lightbox.close();
      }
    });
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) lightbox.close();
    });
  }

  if (portfolioGallery instanceof HTMLDialogElement) {
    const galleryTitle = document.getElementById('portfolioGalleryTitle');
    const galleryStage = document.getElementById('portfolioGalleryStage');
    const galleryCount = document.getElementById('portfolioGalleryCount');
    const closeButton = portfolioGallery.querySelector('.portfolio-gallery__close');
    const previousButton = portfolioGallery.querySelector('[data-gallery-previous]');
    const nextButton = portfolioGallery.querySelector('[data-gallery-next]');
    const galleries = {
      cafe: {
        title: 'Сайт кофейни',
        slides: [
          { brand: 'ЗЕРНО / COFFEE', image: './images/photo-service-landing.jpg', imageAlt: 'Бариста готовит кофе', accent: '#d8a65b', layout: 'classic', eyebrow: 'Кофе, который задаёт настроение', headline: 'Ваше место для хороших встреч.', description: 'Свежая обжарка, любимые напитки и тёплая атмосфера каждый день.', cta: 'Смотреть меню', features: [['Авторский кофе', 'Зёрна свежей обжарки'], ['Завтраки', 'Каждый день с 8:00'], ['Наш адрес', 'Загляните в гости']] },
          { brand: 'КОФЕ / ДВОР', image: './images/portfolio-cafe-2.jpg', imageAlt: 'Друзья делятся чашками кофе', accent: '#e88955', layout: 'editorial', eyebrow: 'Своя кофейня в центре города', headline: 'Хороший день начинается здесь.', description: 'Любимый кофе, выпечка из печи и знакомая улыбка за стойкой.', cta: 'Найти кофейню', features: [['Кофе с собой', 'Быстро и удобно'], ['Своя пекарня', 'Выпечка весь день'], ['События', 'Встречаемся по выходным']] },
          { brand: 'ТИХИЙ / ЧАС', image: './images/portfolio-cafe-3.jpg', imageAlt: 'Уютный ресторанный зал с деревянными столами', accent: '#d8b27a', layout: 'classic', eyebrow: 'Место, куда хочется вернуться', headline: 'Пауза со вкусом.', description: 'Спокойное пространство для неспешных завтраков, встреч и любимого кофе.', cta: 'Открыть меню', features: [['Завтраки', 'Каждое утро'], ['Сезонное меню', 'Готовим с заботой'], ['Бронь столика', 'Пара кликов']] },
          { brand: 'ТРИ / ЧАШКИ', image: './images/portfolio-cafe-4.jpg', imageAlt: 'Три чашки кофейных напитков', accent: '#c9825b', layout: 'editorial', eyebrow: 'Кофе объединяет', headline: 'Встретимся за чашкой?', description: 'Латте, фильтр или что-то новое — найдётся напиток под любое настроение.', cta: 'Выбрать напиток', features: [['Кофейная карта', 'Классика и новинки'], ['Зёрна домой', 'Свежая обжарка'], ['Бонусы', 'Для постоянных гостей']] }
        ]
      },
      auto: {
        title: 'Сайт автомастерской',
        slides: [
          { brand: 'АВТО / ЛАБ', image: './images/portfolio-auto-1.jpg', imageAlt: 'Детали автомобильного двигателя', accent: '#d6f45b', layout: 'classic', eyebrow: 'Сервис, которому доверяют', headline: 'Ваш автомобиль в надёжных руках.', description: 'Точная диагностика, понятная смета и гарантия на выполненные работы.', cta: 'Записаться в сервис', features: [['Диагностика', 'Найдём причину'], ['Ремонт', 'Опытные мастера'], ['Гарантия', 'На все виды работ']] },
          { brand: 'ГАРАЖ / 27', image: './images/portfolio-auto-2.jpg', imageAlt: 'Классический автомобиль у городского здания', accent: '#74c8d6', layout: 'editorial', eyebrow: 'Автосервис и детейлинг', headline: 'Забота о машине без лишних слов.', description: 'Обслуживание, ремонт и уход — в одном месте и по записи.', cta: 'Выбрать услугу', features: [['ТО и ремонт', 'По регламенту'], ['Детейлинг', 'Бережный уход'], ['Подменный авто', 'Не меняйте планы']] },
          { brand: 'МОТОР / СЕРВИС', image: './images/portfolio-auto-3.jpg', imageAlt: 'Автомобиль крупным планом', accent: '#e0a85e', layout: 'classic', eyebrow: 'Профессиональный сервис', headline: 'Уверенность на каждом километре.', description: 'Комплексное обслуживание и понятные рекомендации для вашего автомобиля.', cta: 'Записаться на осмотр', features: [['Диагностика', 'Современное оборудование'], ['Запчасти', 'Подбираем под задачу'], ['Сроки', 'Согласуем заранее']] },
          { brand: 'ДРАЙВ / ГАРАЖ', image: './images/portfolio-auto-4.jpg', imageAlt: 'Спортивный автомобиль на дороге', accent: '#85a9ed', layout: 'editorial', eyebrow: 'Мастерская для тех, кто любит дорогу', headline: 'Больше времени за рулём.', description: 'Помогаем поддерживать автомобиль в отличной форме — от ТО до сложного ремонта.', cta: 'Узнать об услугах', features: [['Механика', 'Опытная команда'], ['Комфорт', 'Зона ожидания'], ['Запись', 'В удобное время']] }
        ]
      },
      fitness: {
        title: 'Сайт фитнес-клуба',
        slides: [
          { brand: 'ПУЛЬС / CLUB', image: './images/portfolio-fitness-1.jpg', imageAlt: 'Тренажёрный зал с гантелями', accent: '#8eb8ff', layout: 'classic', eyebrow: 'Твой ритм. Твоя сила.', headline: 'Сильнее с каждой тренировкой.', description: 'Современный зал, тренеры рядом и пространство для твоих целей.', cta: 'Выбрать абонемент', features: [['Тренажёрный зал', 'Открыт с 7:00'], ['Групповые занятия', 'Найди свой формат'], ['Персональный тренер', 'Тренируйся с умом']] },
          { brand: 'ФОРМА / STUDIO', image: './images/portfolio-fitness-2.jpg', imageAlt: 'Тренировка со штангой в фитнес-клубе', accent: '#ff806e', layout: 'editorial', eyebrow: 'Фитнес в своём темпе', headline: 'Найди форму, которая нравится.', description: 'Силовые, функциональные и групповые тренировки для разного уровня.', cta: 'Посмотреть расписание', features: [['Тренировки', 'Для любого уровня'], ['Команда', 'Тренеры-практики'], ['Результат', 'Цель за целью']] },
          { brand: 'ЭНЕРГИЯ / CLUB', image: './images/portfolio-fitness-3.jpg', imageAlt: 'Фитнес-тренировка в современном зале', accent: '#d5ef58', layout: 'classic', eyebrow: 'Начни с малого — двигайся к большему', headline: 'Твоя энергия. Твои правила.', description: 'Тренажёрный зал и поддержка тренеров для устойчивого прогресса без гонки.', cta: 'Попробовать тренировку', features: [['Первый визит', 'Знакомство с клубом'], ['Программы', 'Под разные цели'], ['Тренеры', 'Помогаем начать']] },
          { brand: 'ДВИЖЕНИЕ / LAB', image: './images/portfolio-fitness-4.jpg', imageAlt: 'Функциональная тренировка в спортивном зале', accent: '#83b6c8', layout: 'editorial', eyebrow: 'Найди свой формат движения', headline: 'Сильнее вместе.', description: 'Групповые тренировки, персональные планы и сообщество, которое заряжает.', cta: 'Выбрать занятие', features: [['Расписание', 'Удобно на неделе'], ['Группы', 'Поддержка команды'], ['Тренеры', 'Внимание к технике']] }
        ]
      },
      plumbing: {
        title: 'Интернет-магазин сантехники',
        slides: [
          { brand: 'ДОМ / ВОДА', image: './images/portfolio-plumbing-product.jpg', imageAlt: 'Современная ванная комната с ванной и раковиной', accent: '#5bbcaf', layout: 'classic', eyebrow: 'Продуманные решения для дома', headline: 'Ванная, в которой всё на своём месте.', description: 'Сантехника, смесители и товары для ремонта с доставкой до двери.', cta: 'Перейти в каталог', features: [['Сантехника', 'Для ванной и кухни'], ['Смесители', 'Надёжные решения'], ['Доставка', 'Бережно и в срок']] },
          { brand: 'ТЁПЛЫЙ / ДОМ', image: './images/portfolio-plumbing-2.jpg', imageAlt: 'Светлая современная ванная комната', accent: '#a4bf85', layout: 'editorial', eyebrow: 'Всё для ремонта в одном месте', headline: 'Создайте ванную под себя.', description: 'Поможем подобрать товары, рассчитать комплект и оформить заказ.', cta: 'Подобрать товары', features: [['Каталог', 'Проверенные бренды'], ['Подбор', 'Помощь специалиста'], ['Оплата', 'Удобные способы']] },
          { brand: 'ВОДА / МАРКЕТ', image: './images/portfolio-plumbing-3.jpg', imageAlt: 'Современный интерьер ванной комнаты', accent: '#77b9ae', layout: 'classic', eyebrow: 'Идеи и товары для ванной', headline: 'Начните обновление с деталей.', description: 'Подберите сантехнику и отделку в едином стиле — от смесителя до ванны.', cta: 'Собрать комплект', features: [['Каталог', 'Удобные категории'], ['Фильтры', 'Быстрый выбор'], ['Доставка', 'До двери']] },
          { brand: 'ЛИНИЯ / ВАННЫ', image: './images/portfolio-plumbing-4.jpg', imageAlt: 'Светлая ванная комната с современной отделкой', accent: '#c6a889', layout: 'editorial', eyebrow: 'Комфорт начинается дома', headline: 'Пространство для новых ритуалов.', description: 'Практичные решения и вдохновение для ремонта ванной и кухни.', cta: 'Смотреть коллекции', features: [['Коллекции', 'Сочетайте предметы'], ['Советы', 'Помогаем с выбором'], ['Покупка', 'Понятно и удобно']] }
        ]
      },
      landing: {
        title: 'Лендинг',
        slides: [
          { brand: 'СЕЗОН / ВКУСА', image: './images/portfolio-landing-1.jpg', imageAlt: 'Атмосферный ресторанный зал', accent: '#d5a35b', layout: 'classic', eyebrow: 'Ресторан современной кухни', headline: 'Вкус, который остаётся в памяти.', description: 'Сезонные продукты, авторские блюда и вечер, который хочется повторить.', cta: 'Забронировать стол', features: [['Меню', 'Обновляем по сезону'], ['Шеф', 'Авторская кухня'], ['Адрес', 'В центре города']] },
          { brand: 'ГОРОД / КОФЕ', image: './images/portfolio-landing-2.jpg', imageAlt: 'Уютная кофейня с посадочными местами', accent: '#c68157', layout: 'editorial', eyebrow: 'Кофейня рядом с тобой', headline: 'Твой маленький перерыв.', description: 'Кофе, свежая выпечка и уютный зал — загляни по пути или задержись подольше.', cta: 'Посмотреть меню', features: [['Кофе', 'Свежая обжарка'], ['Выпечка', 'Каждое утро'], ['Навигация', 'Мы рядом']] },
          { brand: 'НОВАЯ / ФОРМА', image: './images/portfolio-landing-3.jpg', imageAlt: 'Витрина магазина одежды', accent: '#abc0f3', layout: 'classic', eyebrow: 'Коллекция городских вещей', headline: 'Одежда, которая выбирает тебя.', description: 'Лаконичные силуэты, комфортные материалы и вещи на каждый день.', cta: 'Открыть коллекцию', features: [['Новинки', 'Первыми в каталоге'], ['Размеры', 'Понятная таблица'], ['Доставка', 'Удобный возврат']] },
          { brand: 'КОФЕ / ДОМА', image: './images/portfolio-landing-4.jpg', imageAlt: 'Кофейные напитки для концепции лендинга', accent: '#e0a26a', layout: 'editorial', eyebrow: 'Кофе для твоего ритма', headline: 'Три чашки — три повода.', description: 'Познакомься с меню, выбери любимый вкус и закажи напиток по пути.', cta: 'Выбрать кофе', features: [['Эспрессо', 'Яркий и насыщенный'], ['Молочные', 'Нежные сочетания'], ['С собой', 'Заказ без ожидания']] }
        ]
      },
      corporate: {
        title: 'Корпоративный сайт',
        slides: [
          { brand: 'ПРОСТРАНСТВО / БЮРО', image: './images/portfolio-corporate-1.jpg', imageAlt: 'Современное офисное пространство', accent: '#82a8dc', layout: 'classic', eyebrow: 'Архитектурная компания', headline: 'Создаём места для жизни и работы.', description: 'Проектируем пространства, в которых продумана каждая деталь — от идеи до реализации.', cta: 'Обсудить проект', features: [['Услуги', 'Полный цикл'], ['Проекты', 'Избранные работы'], ['Команда', 'Опытные специалисты']] },
          { brand: 'СЕВЕР / КОМАНДА', image: './images/portfolio-corporate-2.jpg', imageAlt: 'Переговорная комната в современном офисе', accent: '#9ab68b', layout: 'editorial', eyebrow: 'Технологии для бизнеса', headline: 'Сложные задачи — понятные решения.', description: 'Помогаем компаниям выстраивать цифровые процессы и развивать продукты.', cta: 'Наши решения', features: [['Экспертиза', 'В разных отраслях'], ['Подход', 'Под цели бизнеса'], ['Поддержка', 'На каждом этапе']] },
          { brand: 'ГОРИЗОНТ / GROUP', image: './images/portfolio-corporate-3.jpg', imageAlt: 'Современная архитектура бизнес-центра', accent: '#dbb46b', layout: 'classic', eyebrow: 'Надёжный партнёр для роста', headline: 'Думаем о будущем вместе.', description: 'Объединяем экспертизу, людей и ресурсы, чтобы запускать важные перемены.', cta: 'Узнать о компании', features: [['Направления', 'Комплексный подход'], ['Опыт', 'Реальные результаты'], ['Партнёрам', 'Открыты к диалогу']] },
          { brand: 'ЛЮДИ / ДЕЛА', image: './images/portfolio-corporate-4.jpg', imageAlt: 'Коллеги работают вместе над проектом', accent: '#c99272', layout: 'editorial', eyebrow: 'Команда, которая рядом', headline: 'Сильные проекты начинаются с людей.', description: 'Познакомьтесь с командой, ценностями и тем, как мы помогаем клиентам.', cta: 'Познакомиться', features: [['Команда', 'Наши специалисты'], ['Ценности', 'Как мы работаем'], ['Карьера', 'Присоединяйтесь']] }
        ]
      }
    };

    let activeGallery = null;
    let activeSlide = 0;

    const createTextElement = (tagName, className, text) => {
      const element = document.createElement(tagName);
      element.className = className;
      element.textContent = text;
      return element;
    };

    const renderSlide = () => {
      if (!activeGallery || !galleryTitle || !galleryStage || !galleryCount) return;

      const slide = activeGallery.slides[activeSlide];
      const preview = document.createElement('div');
      preview.className = `portfolio-preview portfolio-preview--${slide.layout}`;
      preview.style.setProperty('--preview-accent', slide.accent);

      const bar = document.createElement('div');
      bar.className = 'portfolio-preview__bar';
      bar.append(createTextElement('span', 'portfolio-preview__brand', slide.brand));
      const navigation = document.createElement('div');
      navigation.className = 'portfolio-preview__nav';
      ['О проекте', 'Услуги', 'Контакты'].forEach((label) => {
        navigation.append(createTextElement('span', '', label));
      });
      bar.append(navigation);

      const hero = document.createElement('div');
      hero.className = 'portfolio-preview__hero';
      const copy = document.createElement('div');
      copy.className = 'portfolio-preview__copy';
      copy.append(
        createTextElement('p', 'portfolio-preview__eyebrow', slide.eyebrow),
        createTextElement('h3', '', slide.headline),
        createTextElement('p', '', slide.description),
        createTextElement('span', 'portfolio-preview__cta', slide.cta)
      );
      const photo = document.createElement('img');
      photo.className = 'portfolio-preview__photo';
      photo.src = slide.image;
      photo.alt = slide.imageAlt;
      photo.loading = 'lazy';
      hero.append(copy, photo);

      const features = document.createElement('div');
      features.className = 'portfolio-preview__features';
      slide.features.forEach(([title, detail]) => {
        const feature = document.createElement('div');
        feature.className = 'portfolio-preview__feature';
        feature.append(createTextElement('strong', '', title), createTextElement('span', '', detail));
        features.append(feature);
      });

      preview.append(bar, hero, features);
      galleryTitle.textContent = activeGallery.title;
      galleryCount.textContent = `${activeSlide + 1} / ${activeGallery.slides.length}`;
      galleryStage.replaceChildren(preview);
    };

    const moveSlide = (direction) => {
      if (!activeGallery) return;
      activeSlide = (activeSlide + direction + activeGallery.slides.length) % activeGallery.slides.length;
      renderSlide();
    };

    document.querySelectorAll('.work__image-link[data-gallery]').forEach((button) => {
      button.addEventListener('click', () => {
        const selectedGallery = galleries[button.dataset.gallery];
        if (!selectedGallery) return;
        activeGallery = selectedGallery;
        activeSlide = 0;
        renderSlide();
        portfolioGallery.showModal();
      });
    });

    previousButton?.addEventListener('click', () => moveSlide(-1));
    nextButton?.addEventListener('click', () => moveSlide(1));
    closeButton?.addEventListener('click', () => portfolioGallery.close());
    portfolioGallery.addEventListener('click', (event) => {
      if (event.target === portfolioGallery) portfolioGallery.close();
    });
    portfolioGallery.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        portfolioGallery.close();
        return;
      }
      if (event.key === 'ArrowLeft') moveSlide(-1);
      if (event.key === 'ArrowRight') moveSlide(1);
    });
  }

  if (menuToggle && navigation) {
    const closeMenu = () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Открыть меню');
      navigation.classList.remove('is-open');
    };

    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Открыть меню' : 'Закрыть меню');
      navigation.classList.toggle('is-open', !isOpen);
    });

    navigation.addEventListener('click', (event) => {
      if (event.target instanceof Element && event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });

    document.addEventListener('click', (event) => {
      if (event.target instanceof Node && !navigation.contains(event.target) && !menuToggle.contains(event.target)) {
        closeMenu();
      }
    });
  }

  const revealTargets = document.querySelectorAll(
    '.section__intro, .card, .work, .tool-card, .step, .form, .hero__stats, .contact__copy'
  );
  revealTargets.forEach((element) => {
    const siblings = element.parentElement ? Array.from(element.parentElement.children) : [];
    const index = siblings.indexOf(element);
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 75}ms`);
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

    revealTargets.forEach((element) => revealObserver.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
  }

  const sections = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const activeLink = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
        document.querySelectorAll('.nav a[aria-current="location"]').forEach((link) => {
          link.removeAttribute('aria-current');
        });
        if (activeLink) activeLink.setAttribute('aria-current', 'location');
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
      card.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
    });
  });

  if (form && formNote) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const submitButton = form.querySelector('button[type="submit"]');
      if (!(submitButton instanceof HTMLButtonElement)) return;

      submitButton.disabled = true;
      formNote.textContent = 'Отправляем заявку…';
      let failureMessage = 'Не удалось отправить заявку. Попробуйте позже или напишите на WebKraft064@gmail.com.';

      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries()))
      })
        .then(async (response) => {
          let result;
          try {
            result = await response.json();
          } catch {
            throw new Error('Invalid server response');
          }
          if (!response.ok) {
            if (typeof result.message === 'string') failureMessage = result.message;
            throw new Error('Request failed');
          }
          if (typeof result.message !== 'string') throw new Error('Invalid server response');
          form.reset();
          formNote.textContent = result.message;
        })
        .catch(() => { formNote.textContent = failureMessage; })
        .finally(() => {
          submitButton.disabled = false;
        });
    });
  }
});
