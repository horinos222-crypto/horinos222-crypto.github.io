const lessons = [
  {
    title: "はじめて英会話",
    category: "はじめて",
    description: "あいさつや身近な単語からスタート。英語にふれるのが初めてのお子さまにおすすめです。",
    age: "小学1〜3年生",
    duration: "25分",
  },
  {
    title: "ゲームで英会話",
    category: "人気コース",
    image: "img/spring1.webp",
    description: "クイズやカードゲームで、楽しみながら英語のフレーズをどんどん使ってみよう。",
    age: "小学1〜6年生",
    duration: "25分",
  },
  {
    title: "ステップアップ英会話",
    category: "チャレンジ",
    description: "好きなことや学校での出来事を英語でお話し。自分の言葉で伝える力を育てます。",
    age: "小学3〜6年生",
    duration: "30分",
  },
];

const testimonials = [
  {
    quote: "最初は緊張していましたが、先生が優しく話しかけてくれて、今では毎週のレッスンを楽しみにしています！",
    name: "小学2年生のお母さま",
    avatar: "https://placehold.jp/150x150.png?text=User",
  },
  {
    quote: "ゲームの中で英語を使うので、勉強という感じがなく自然に続けられています。習ったフレーズを家でも話してくれます。",
    name: "小学4年生のお父さま",
    avatar: "https://placehold.jp/150x150.png?text=User",
  },
  {
    quote: "人前で話すのが苦手な子でしたが、先生がたくさんほめてくれるおかげで、自分から英語を話すようになりました。",
    name: "小学5年生のお母さま",
    avatar: "https://placehold.jp/150x150.png?text=User",
  },
];

const faqs = [
  {
    question: "英語がまったく初めてでも大丈夫ですか？",
    answer: "もちろん大丈夫です。先生がゆっくり進めながら、ジェスチャーやイラストも使ってサポートします。まずは楽しく英語にふれるところから始めましょう。",
  },
  {
    question: "レッスンに必要なものはありますか？",
    answer: "インターネットにつながるパソコン、タブレット、またはスマートフォンをご用意ください。レッスンに使う教材はスクールでご案内します。",
  },
  {
    question: "保護者がそばについている必要はありますか？",
    answer: "初めてのレッスンでは、近くで見守っていただくとお子さまも安心です。慣れてきたら、お子さまのペースに合わせてご参加ください。",
  },
  {
    question: "無料体験レッスンでは何をしますか？",
    answer: "先生との簡単なあいさつや、ゲームを使ったミニレッスンを行います。お子さまに合った学び方もご案内しますので、気軽にお試しください。",
  },
];

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function renderLessons(container) {
  container.innerHTML = lessons.map((lesson, index) => `
    <button class="lesson-card" type="button" data-lesson-index="${index}" aria-label="レッスン詳細を表示: ${escapeHTML(lesson.title)}">
      <div class="lesson-image">
        <img src="${escapeHTML(lesson.image || "https://placehold.jp/600x400.png?text=Item")}" alt="" loading="lazy">
        <span class="lesson-tag">${escapeHTML(lesson.category)}</span>
      </div>
      <div class="lesson-content">
        <h3>${escapeHTML(lesson.title)}</h3>
        <p>${escapeHTML(lesson.description)}</p>
        <div class="lesson-meta">
          <span>${escapeHTML(lesson.age)}</span>
          <span>${escapeHTML(lesson.duration)} / 回</span>
        </div>
      </div>
    </button>
  `).join("");
}

function renderTestimonials(container) {
  container.innerHTML = testimonials.map((testimonial) => `
    <article class="voice-card">
      <div class="voice-rating" aria-label="5つ星の評価">★★★★★</div>
      <blockquote>「${escapeHTML(testimonial.quote)}」</blockquote>
      <div class="voice-person">
        <img src="${escapeHTML(testimonial.avatar)}" alt="" loading="lazy">
        <div><strong>${escapeHTML(testimonial.name)}</strong><span>えいごのたね受講生の保護者</span></div>
      </div>
    </article>
  `).join("");
}

function renderFAQs(container) {
  container.innerHTML = faqs.map((faq, index) => {
    const answerId = `faq-answer-${index + 1}`;
    return `
      <article class="faq-item">
        <button class="faq-question" type="button" aria-expanded="false" aria-controls="${answerId}">
          <span class="faq-q-mark" aria-hidden="true">Q</span>
          <span>${escapeHTML(faq.question)}</span>
          <span class="faq-toggle-icon" aria-hidden="true">+</span>
        </button>
        <div class="faq-answer" id="${answerId}" role="region" aria-hidden="true">
          <div class="faq-answer-inner">
            <span class="faq-a-mark" aria-hidden="true">A</span>
            <p>${escapeHTML(faq.answer)}</p>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function initializeAnimations() {
  const { gsap, ScrollTrigger } = window;

  if (!gsap || !ScrollTrigger || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".hero-title-line",
    { autoAlpha: 0, y: 24 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.18,
      ease: "power2.out",
      delay: 0.15,
    },
  );

  document.querySelectorAll(".feature-grid, .lesson-grid, .voice-grid").forEach((group) => {
    const cards = group.querySelectorAll(".feature-card, .lesson-card, .voice-card");

    if (!cards.length) {
      return;
    }

    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 28 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.14,
        ease: "power2.out",
        scrollTrigger: {
          trigger: group,
          start: "top 82%",
          end: "+=360",
          scrub: 0.6,
        },
      },
    );
  });
}

function initializePage() {
  const lessonList = document.querySelector("#lesson-list");
  const lessonLightbox = document.querySelector(".lesson-lightbox");
  const lightboxImage = document.querySelector(".lightbox-image");
  const lightboxTag = document.querySelector(".lightbox-tag");
  const lightboxTitle = document.querySelector("#lightbox-title");
  const lightboxDescription = document.querySelector(".lightbox-description");
  const lightboxAge = document.querySelector(".lightbox-age");
  const lightboxDuration = document.querySelector(".lightbox-duration");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxCta = document.querySelector(".lightbox-cta");
  const voiceList = document.querySelector("#voice-list");
  const faqList = document.querySelector("#faq-list");
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-navigation");

  if (
    !lessonList || !lessonLightbox || !lightboxImage || !lightboxTag
    || !lightboxTitle || !lightboxDescription || !lightboxAge || !lightboxDuration
    || !lightboxClose || !lightboxCta || !voiceList || !faqList || !menuToggle || !navigation
  ) {
    throw new Error("ページの描画に必要な要素が見つかりません。");
  }

  renderLessons(lessonList);
  renderTestimonials(voiceList);
  renderFAQs(faqList);
  initializeAnimations();

  let activeLessonButton = null;

  lessonList.addEventListener("click", (event) => {
    const button = event.target instanceof Element
      ? event.target.closest(".lesson-card")
      : null;

    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    const lessonIndex = Number(button.dataset.lessonIndex);
    const lesson = lessons[lessonIndex];

    if (!lesson) {
      throw new Error("選択したレッスンが見つかりません。");
    }

    activeLessonButton = button;
    lightboxImage.src = lesson.image || "https://placehold.jp/800x500.png?text=Item";
    lightboxImage.alt = `${lesson.title}のレッスンイメージ`;
    lightboxTag.textContent = lesson.category;
    lightboxTitle.textContent = lesson.title;
    lightboxDescription.textContent = lesson.description;
    lightboxAge.textContent = lesson.age;
    lightboxDuration.textContent = `${lesson.duration} / 回`;
    lessonLightbox.showModal();
  });

  lightboxClose.addEventListener("click", () => {
    lessonLightbox.close();
  });

  lightboxCta.addEventListener("click", () => {
    lessonLightbox.close();
  });

  lessonLightbox.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      lessonLightbox.close();
    }
  });

  lessonLightbox.addEventListener("click", (event) => {
    if (event.target === lessonLightbox) {
      lessonLightbox.close();
    }
  });

  lessonLightbox.addEventListener("close", () => {
    activeLessonButton?.focus();
    activeLessonButton = null;
  });

  faqList.addEventListener("click", (event) => {
    const button = event.target instanceof Element
      ? event.target.closest(".faq-question")
      : null;

    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    const item = button.closest(".faq-item");
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    const answerId = button.getAttribute("aria-controls");
    const answer = answerId ? document.getElementById(answerId) : null;

    if (!item || !answer) {
      throw new Error("FAQ項目が見つかりません。");
    }

    button.setAttribute("aria-expanded", String(!isExpanded));
    item.classList.toggle("is-open", !isExpanded);
    answer.setAttribute("aria-hidden", String(isExpanded));
  });

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "メニューを開く" : "メニューを閉じる");
    navigation.classList.toggle("is-open", !isExpanded);
  });

  navigation.addEventListener("click", (event) => {
    if (!(event.target instanceof Element) || !event.target.closest("a")) {
      return;
    }

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "メニューを開く");
    navigation.classList.remove("is-open");
  });
}

initializePage();
