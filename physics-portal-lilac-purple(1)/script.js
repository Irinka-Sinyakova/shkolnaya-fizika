// =======================================================================
// 1. БАЗА ДАННЫХ ПУБЛИКАЦИЙ ПО ШКОЛЬНОЙ ФИЗИКЕ
// =======================================================================
const initialArticles = [
    {
        id: 1,
        title: "Три закона Ньютона: основа классической механики",
        date: "15 сентября 2026",
        isoDate: "2026-09-15",
        text: "Законы Ньютона объясняют, как и почему движутся тела вокруг нас. Первый закон (инерции) гласит, что тело сохраняет состояние покоя или равномерного прямолинейного движения, пока на него не подействуют другие тела. Второй закон связывает силу, массу и ускорение (F = ma), а третий утверждает, что сила действия всегда равна по модулю и противоположна по направлению силе противодействия.",
        tags: "#механика #ньютон #9класс"
    },
    {
        id: 2,
        title: "Электрический ток и закон Ома простыми словами",
        date: "10 сентября 2026",
        isoDate: "2026-09-10",
        text: "Электрический ток — это упорядоченное движение заряженных частиц. Чтобы лучше понять закон Ома, представьте воду, текущую по трубе: напряжение — это напор воды, сила тока — объем протекающей воды за секунду, а сопротивление — ширина трубы или препятствия в ней. Чем выше напряжение и меньше сопротивление, тем сильнее ток в цепи.",
        tags: "#электричество #законома #8класс"
    },
    {
        id: 3,
        title: "Оптика: почему небо голубое, а закат красный?",
        date: "05 сентября 2026",
        isoDate: "2026-09-05",
        text: "Солнечный свет кажется нам белым, но на самом деле он состоит из всех цветов радуги. Проходя через атмосферу Земли, короткие синие и голубые волны света рассеиваются молекулами воздуха гораздо сильнее, чем длинные красные волны. Именно поэтому днем мы видим небо голубым, а на закате, когда свет проходит более толстый слой атмосферы, до нас доходят преимущественно красные лучи.",
        tags: "#оптика #свет #11класс"
    }
];

// =======================================================================
// 2. ДИНАМИЧЕСКИЙ РЕНДЕРИНГ СТАТЕЙ И ИНТЕРАКТИВНЫЕ КНОПКИ
// =======================================================================
const postsContainer = document.getElementById('postsContainer');

function renderArticles(articlesArray) {
    postsContainer.innerHTML = '';

    if (articlesArray.length === 0) {
        postsContainer.innerHTML = '<p class="no-results">Ничего не найдено 😢</p>';
        return;
    }

    articlesArray.forEach(article => {
        const articleHtml = `
            <article>
                <header>
                    <h3>${article.title}</h3>
                    <p>Опубликовано: <time datetime="${article.isoDate}">${article.date}</time></p>
                </header>
                <p class="article-text short">${article.text}</p>
                <button class="read-more-btn">Читать далее</button>
                <footer>
                    <span>Теги: ${article.tags}</span>
                    <button class="like-btn">❤ Лайк (<span class="like-count">0</span>)</button>
                </footer>
            </article>
        `;
        postsContainer.insertAdjacentHTML('beforeend', articleHtml);
    });

    attachReadMoreEvents();
    attachLikeEvents();
}

function attachReadMoreEvents() {
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    readMoreButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const textBlock = btn.previousElementSibling;
            textBlock.classList.toggle('short');

            if (textBlock.classList.contains('short')) {
                btn.textContent = 'Читать далее';
            } else {
                btn.textContent = 'Свернуть';
            }
        });
    });
}

function attachLikeEvents() {
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const countSpan = button.querySelector('.like-count');
            let currentLikes = parseInt(countSpan.textContent);
            currentLikes++;
            countSpan.textContent = currentLikes;

            button.style.background = '#e11d48';
            button.style.color = 'white';
        });
    });
}

renderArticles(initialArticles);

// =======================================================================
// 3. ЖИВОЙ ПОИСК (ПО ЗАГОЛОВКУ, ТЕКСТУ И ТЕГАМ)
// =======================================================================
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', function(event) {
    const searchText = event.target.value.toLowerCase().trim();

    const filteredArticles = initialArticles.filter(article => {
        const inTitle = article.title.toLowerCase().includes(searchText);
        const inText = article.text.toLowerCase().includes(searchText);
        const inTags = article.tags.toLowerCase().includes(searchText);

        return inTitle || inText || inTags;
    });

    renderArticles(filteredArticles);
});

// =======================================================================
// 4. ПЕРЕКЛЮЧАТЕЛЬ ТЕМНОЙ ТЕМЫ
// =======================================================================
const themeButton = document.getElementById('themeBtn');

themeButton.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
        themeButton.textContent = '☀ Светлая тема';
    } else {
        themeButton.textContent = '🌙 Темная тема';
    }
});
