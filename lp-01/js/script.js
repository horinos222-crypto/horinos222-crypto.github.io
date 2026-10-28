// Edit these arrays to update the experiences, guest reviews, and FAQ.
const stayItems = [
    {
        category: "HOT SPRING",
        title: "源泉かけ流しの湯",
        description: "好きな時間に湯浴みを。山あいの静けさと、源泉のぬくもりを味わえます。",
        imageAlt: "温泉施設のイメージ"
    },
    {
        category: "GARDEN",
        title: "季節をめぐる桜庭園",
        description: "春の桜をはじめ、庭に咲く四季折々の花をゆっくりお楽しみください。",
        imageAlt: "桜庭園のイメージ"
    },
    {
        category: "FARM EXPERIENCE",
        title: "里山の農作業体験",
        description: "畑で土にふれ、季節の作物を収穫。初めての方も気軽にご参加いただけます。",
        imageAlt: "農作業体験のイメージ"
    }
];

const guestReviews = [
    {
        name: "東京都・30代",
        stay: "春にご宿泊",
        comment: "庭の花を眺めて温泉に入り、久しぶりに何もしない時間を過ごせました。宿の方とのお話もあたたかく、また季節を変えて訪れたいです。"
    },
    {
        name: "宮城県・40代",
        stay: "夏にご宿泊",
        comment: "家族で畑の作業を体験しました。土にふれるのが初めての子どもも大喜び。土地の暮らしを感じられる、忘れられない旅になりました。"
    },
    {
        name: "神奈川県・50代",
        stay: "秋にご宿泊",
        comment: "静かな環境とやさしい温泉に癒やされました。窓から見える里山の景色も美しく、日々の忙しさを忘れてゆったり過ごせました。"
    }
];

const frequentlyAskedQuestions = [
    {
        question: "農作業体験は初めてでも参加できますか？",
        answer: "はい、初めての方にも気軽にご参加いただけます。季節や天候によって体験内容が変わりますので、ご希望の方は宿泊のご相談時にお知らせください。"
    },
    {
        question: "温泉はいつ利用できますか？",
        answer: "ご滞在中にご利用いただけます。ご利用時間や入浴方法など、詳しくはご予約時にご案内いたします。"
    },
    {
        question: "庭の花が見ごろの時期を教えてください。",
        answer: "花の種類や開花時期は、その年の気候によって異なります。お越しになる季節の見どころについては、事前にお問い合わせください。"
    },
    {
        question: "宿泊について事前に相談できますか？",
        answer: "もちろんです。ご希望の日程や人数、ご滞在中に体験したいことなどを、ページ下部の相談ボタンからお気軽にご連絡ください。"
    }
];

const stayList = document.querySelector("#stay-list");
const reviewList = document.querySelector("#review-list");
const faqList = document.querySelector("#faq-list");

function renderStayItems() {
    stayItems.forEach((item) => {
        const card = document.createElement("article");
        card.className = "stay-card";

        const image = document.createElement("img");
        image.src = "https://placehold.jp/600x400.png?text=Item";
        image.alt = item.imageAlt;
        image.loading = "lazy";

        const body = document.createElement("div");
        body.className = "stay-card-body";

        const category = document.createElement("p");
        category.className = "stay-card-category";
        category.textContent = item.category;

        const title = document.createElement("h3");
        title.textContent = item.title;

        const description = document.createElement("p");
        description.textContent = item.description;

        body.append(category, title, description);
        card.append(image, body);
        stayList.append(card);
    });
}

function renderReviews() {
    guestReviews.forEach((review) => {
        const card = document.createElement("article");
        card.className = "review-card";

        const avatar = document.createElement("img");
        avatar.className = "review-avatar";
        avatar.src = "https://placehold.jp/150x150.png?text=User";
        avatar.alt = "";
        avatar.loading = "lazy";

        const body = document.createElement("div");
        const meta = document.createElement("div");
        meta.className = "review-meta";

        const name = document.createElement("span");
        name.className = "review-name";
        name.textContent = review.name;

        const stay = document.createElement("span");
        stay.className = "review-stay";
        stay.textContent = review.stay;

        const comment = document.createElement("p");
        comment.className = "review-text";
        comment.textContent = review.comment;

        meta.append(name, stay);
        body.append(meta, comment);
        card.append(avatar, body);
        reviewList.append(card);
    });
}

function renderFaq() {
    frequentlyAskedQuestions.forEach((item, index) => {
        const entry = document.createElement("section");
        entry.className = "faq-item";

        const question = document.createElement("button");
        question.className = "faq-question";
        question.type = "button";
        question.id = `faq-question-${index + 1}`;
        question.setAttribute("aria-expanded", "false");
        question.setAttribute("aria-controls", `faq-answer-${index + 1}`);

        const label = document.createElement("span");
        label.className = "faq-question-label";

        const number = document.createElement("span");
        number.textContent = "Q";

        const text = document.createElement("span");
        text.textContent = item.question;

        const icon = document.createElement("span");
        icon.className = "faq-toggle";
        icon.setAttribute("aria-hidden", "true");

        label.append(number, text);
        question.append(label, icon);

        const answer = document.createElement("div");
        answer.className = "faq-answer";
        answer.id = `faq-answer-${index + 1}`;
        answer.setAttribute("role", "region");
        answer.setAttribute("aria-labelledby", question.id);
        answer.inert = true;

        const answerInner = document.createElement("div");
        answerInner.className = "faq-answer-inner";

        const answerText = document.createElement("p");
        answerText.textContent = item.answer;

        answerInner.append(answerText);
        answer.append(answerInner);
        question.addEventListener("click", () => {
            const isOpen = question.getAttribute("aria-expanded") === "true";
            question.setAttribute("aria-expanded", String(!isOpen));
            answer.inert = isOpen;
            entry.classList.toggle("is-open", !isOpen);
        });

        entry.append(question, answer);
        faqList.append(entry);
    });
}

function setupMobileNavigation() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector("#primary-nav");

    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "メニューを開く" : "メニューを閉じる");
        navigation.classList.toggle("is-open", !isOpen);
    });

    navigation.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "メニューを開く");
            navigation.classList.remove("is-open");
        }
    });
}

renderStayItems();
renderReviews();
renderFaq();
setupMobileNavigation();