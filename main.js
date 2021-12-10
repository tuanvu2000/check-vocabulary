const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const iconMenu = $('.header__menu');
const iconClose = $('.nav__close');
const overlay = $('.overlay');
const navMenu = $('.header__nav');
const navItems = $$('.nav__item');
const dropItem = $$('.item__title');
const dropOption = $('.item__dropdown');
const options = $$('.item__option');

iconMenu.addEventListener('click', function() {
    navMenu.classList.add('show');
    overlay.classList.add('show');
})

iconClose.addEventListener('click', function() {
    navMenu.classList.remove('show');
    overlay.classList.remove('show');
})

overlay.addEventListener('click', function() {
    if (this.matches('.overlay.show')) {
        this.classList.remove('show');
        navMenu.classList.remove('show');
    }
})

navItems.forEach(item => {
    item.onclick = function() {
        const itemActive = this.parentElement.querySelector('.nav__item.active');
        itemActive.classList.remove('active');
        item.classList.add('active');
    }
})

dropItem.forEach(item => {
    item.onclick = function() {
        if (this.nextElementSibling) {
            const drop = this.nextElementSibling;
            drop.classList.toggle('show');
        }
    }
})


const app = {
    currentTopic: 0,
    topics: [
        {
            name: 'Personal',
            units: [
                {
                    number: 1,
                    vocabulary: [
                        {
                            word: 'skill',
                            translate: 'kỹ năng',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'follow',
                            translate: 'theo đuổi',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'culture',
                            translate: 'văn hóa',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'abroad',
                            translate: 'ở nước ngoài',
                            type: 'trạng từ (Adv)'
                        },
                        {
                            word: 'language',
                            translate: 'ngôn ngữ',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'shy',
                            translate: 'nhút nhát',
                            type: 'tính từ (Adj)'
                        },
                        {
                            word: 'foreigner',
                            translate: 'người nước ngoài',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'understand',
                            translate: 'hiểu',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'confident',
                            translate: 'tự tin',
                            type: 'tính từ (Adj)'
                        },
                        {
                            word: 'improve',
                            translate: 'cải thiện',
                            type: 'động từ (V)'
                        },
                    ]
                },
                {
                    number: 2,
                    vocabulary: [
                        {
                            word: 'kindergarten',
                            translate: 'mẫu giáo',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'primary',
                            translate: 'tiểu học',
                            type: 'trạng từ (Adj)'
                        },
                        {
                            word: 'secondary',
                            translate: 'trung học',
                            type: 'trạng từ (Adj)'
                        },
                    ]
                },
                {
                    number: 3,
                    vocabulary: []
                },
                {
                    number: 4,
                    vocabulary: [
                        {
                            word: 'open',
                            translate: 'mở',
                            type: 'động từ (V)'
                        },
                        {
                            word: 'owner',
                            translate: 'người chủ',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'cook',
                            translate: 'người làm bếp',
                            type: 'danh từ (N)'
                        },
                    ]
                },
            ] 
        },
        {
            name: 'Living',
            units: [
                {
                    number: 6,
                    vocabulary: [
                        {
                            word: 'rich',
                            translate: 'giàu',
                            type: 'tính từ (Adj)'
                        },
                        {
                            word: 'cheap',
                            translate: 'rẻ',
                            type: 'tính từ (Adj)'
                        },
                        {
                            word: 'price',
                            translate: 'giá tièn',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'rent',
                            translate: 'tiền thuê nhà',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'expensive',
                            translate: 'đắt',
                            type: 'tính từ (Adj)'
                        },
                    ]
                },
                {
                    number: 7,
                    vocabulary: [
                        {
                            word: 'capital',
                            translate: 'thủ đô',
                            type: 'danh từ (N)'
                        },
                        {
                            word: 'exciting',
                            translate: 'gây hứng thú',
                            type: 'trạng từ (Adj)'
                        },
                        {
                            word: 'skycraper',
                            translate: 'nhà chọc trời',
                            type: 'danh từ (N)'
                        },
                    ]
                },
                {
                    number: 8,
                    vocabulary: []
                },
            ] 
        },
        {
            name: 'Travel',
            units: [
                {
                    number: 11,
                    vocabulary: []
                },
                {
                    number: 12,
                    vocabulary: []
                },
                {
                    number: 13,
                    vocabulary: []
                },
            ] 
        },
    ],
    handle: function() {
        
    },
    render: function() {
        const htmls = `
            <div class="item__option">${123}</div>
        `
        // htmls.join('');
    },
    start: function() {
        this.handle();
    }
};

app.start();
