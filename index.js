const jsonData = [{
    id: 1,
    title: 'Google',
    state: 'purple',
    rating: 5, // рейтинг
    review: 4, // отзывы
    reply: 3, // неотвеченные
    update: 2 // обновления
}, {
    id: 2,
    title: 'Yandex',
    state: 'gray',
    rating: 4,
    review: 3,
    reply: 2,
    update: 1
}, {
    id: 3,
    title: 'Rambler',
    state: 'orange',
    rating: 3,
    review: 2,
    reply: 1,
    update: 0
}, {
    id: 4,
    title: '2gis',
    state: 'gray',
    rating: 2,
    review: 1,
    reply: 0,
    update: 0
}, {
    id: 5,
    title: 'Waze',
    state: 'gray',
    rating: 1,
    review: 0,
    reply: 0,
    update: 0
}];

const wrapCards = document.querySelector('.wrap-cards');
const dashboardRating = document.querySelector('.wrap-mark .rating');
const dashboardReview = document.querySelector('.wrap-mark .review');
const dashboardReplay = document.querySelector('.wrap-mark .reply');
const dashboardUpdate = document.querySelector('.wrap-mark .update');
const dashboards = {
    rating: dashboardRating,
    review: dashboardReview,
    reply: dashboardReplay,
    update: dashboardUpdate
};

/**
 * Обновляет глобальные счётчики
 * @param dashboard
 * @param counts
 */
const setCount = (dashboard, counts) => {
    const indicators = Object.keys(dashboard);
    indicators.map(item => dashboard[item].innerHTML = counts[item])
};

/**
 * удаление DOM Element
 * @param el
 */

const deleteDomElement = el => {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
};
/**
 * сортируем массив
 * сначала все фиолетовые, потом все оранжевые, потом все серые
 * @param arr
 * @return {DependencyReference[]|void|*}
 */
const getSortArray = arr => arr.sort((b, a) => {
    if (a.state > b.state) {
        return 1;
    }
    if (a.state < b.state) {
        return -1;
    }
    return 0
});
/**
 * шаблон карты
 * @param item
 * @return {HTMLElement}
 */
const getCard = item => {
    const card = document.createElement('div');
    card.classList.add('wrap-card', `${item.state}`);
    card.innerHTML = `
<div class="wrap-row-card">
    <div class="wrap-row">
        <div class="card-header">
            <div class="column-header">
                <h3 class="title">${item.title}</h3>
                <span class="dot">•</span>
                <p>все 30 заведений настроены</p>
            </div>
            <div class="column-header">
                <div class="wrap-switch-dots">
                    <span>•</span>
                    <span>•</span>
                    <span>•</span>
                </div>
            </div>
        </div>
        <div class="card-content">
            <div class="wrap-content-btn">
                <button class="btn-synchronized active">Синхронизировано</button>
                <button class="btn-infa">Инфа</button>
                <button class="btn-price">Прайс</button>
                <button class="btn-photo">Фото</button>
                <button class="btn-stocks">Акции</button>
            </div>
        </div>
        <div class="card-footer">
            <div class="card-footer-column">
                <div class="footer-rating">
                    <div class="bg-rating-icon"></div>
                    <p>${item.rating} из 5</p>
                </div>
                <span class="dot">•</span>
                <div class="footer-review">
                    <p>${item.review} отзывов,</p>
                </div>
                <div class="footer-not-answered">
                    <p>&nbsp;${item.reply} неотвеченных</p>
                </div>
            </div>
            <div class="card-footer-column">
                <div class="footer-updates">
                    <p>${item.update} обновления</p>
                </div>
            </div>
        </div>
    </div>
</div>`;

    return card;
};
/**
 *  генерирует все блоки по массиву jsonData с учетом сортировки
 *  и устанавливает счетчики
 * @param data
 */
const initStart = data => {
    const globalCounters = {
        rating: 0,
        review: 0,
        reply: 0,
        update: 0
    };
    const sortByState = getSortArray(data);

    deleteDomElement(wrapCards);

    const counters = sortByState.reduce((acc, item) => {

        const card = getCard(item);
        wrapCards.appendChild(card);
        acc.rating += item.rating;
        acc.review += item.review;
        acc.reply += item.reply;
        acc.update += item.update;

        return acc;
    }, globalCounters);

    setCount(dashboards, counters);
};

initStart(jsonData);

(function () {
    var states = ['purple', 'orange', 'gray'];

    function r(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function getRandomObject() {
        var obj = jsonData[Math.floor(Math.random() * jsonData.length)];
        Object.assign(obj, {
            state: states[Math.floor(Math.random() * states.length)],
            rating: r(1, 5),
            review: r(0, 200),
            reply: r(0, 20),
            update: r(0, 5)
        });

        return obj;
    }


    setInterval(function () {
        var obj = getRandomObject();
        update(obj);
    }, r(10, 30) * 1000);


    function update(obj) {
        /**
         * обновляем jsonData
         * @type {*|Array}
         */
        const data = jsonData.reduce((acc, item) => {
            item.id === obj.id ? acc.push(obj) : acc.push(item);

            return acc;
        }, []);

        initStart(data);
        console.log(obj)
    }
}());