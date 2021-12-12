const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const iconMenu = $('.header__menu');
const iconClose = $('.nav__close');
const overlay = $('.overlay');
const navMenu = $('.header__nav');
const navItems = $$('.nav__item');
const dropItem = $$('.item__title');
const dropOptions = $$('.item__dropdown');
const contentBlock = $('.content__block');
const form = $('.content__form');
const submit = $('.test__submit');
const grade = $('.test__grade');

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

const app = {
    currentTopic: '',
    currentIndex: 0,
    arrVocabulary: [],
    arrRandom: [],
    maxVocabulary: 10,
    gradeCheck: 0,
    typeTest: 0,
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
        const _this = this;
        var drop;
        
        // Xử lý khi click vào lựa chọn
        dropItem.forEach(item => {
            item.onclick = function() {
                this.classList.toggle('show')
                // Đóng mở dropdown
                if (this.nextElementSibling) {
                    drop = this.nextElementSibling;
                    drop.classList.toggle('show');
                }
            };
        });

        // Khi click vào option thì lưu lại giá trị để tìm
        document.onclick = function(event) {
            if (event.target.nextElementSibling) {

                const siblingEl = event.target.nextElementSibling;
                if(siblingEl.matches('.item__dropdown.show')) {

                    const options = siblingEl.querySelectorAll('.item__option');
                    options.forEach(option => {
                        option.onclick = function() {
                            _this.currentTopic = this.innerText;
                            _this.currentIndex = this.dataset.index;
                            contentBlock.classList.add('none');
                            _this.loadContent(_this.currentTopic, _this.currentIndex)
                        }
                    });
                }
            }
        };

        // Xử lý khi click vào btn submit và kiểm tra input
        submit.onclick = function(event) {
            event.preventDefault();
            const findValue = event.target.parentElement.querySelectorAll('.test__input')
            findValue.forEach((input, index) => {
                const value = input.value.toLowerCase();
                const typeValue = _this.typeTest === 0 ? 'translate' : 'word';
                const valueCheck = _this.arrVocabulary[index][typeValue];
                if (value.trim() === valueCheck) {
                    _this.gradeCheck++;
                } else {
                    input.parentElement.classList.add('incorrect')
                }
            })
            
            event.target.classList.add('hide')
            grade.innerText = `TỔNG SỐ CÂU ĐÚNG: ${_this.gradeCheck}/${_this.arrVocabulary.length}`;
            form.appendChild(grade);
        }

        // Xử lý khi click vào nav để lựa chọn loại kiểm tra
        navItems.forEach((item, index) => {
            item.onclick = function() {
                const itemActive = this.parentElement.querySelector('.nav__item.active');
                itemActive.classList.remove('active');
                item.classList.add('active');
                _this.typeTest = index;
            }
        })
        
        

      
    },
    loadContent: function(selector, index) {
        var htmls = '';
        var index = this.currentIndex.split('|');
        var indexTopic = index[0];
        var indexUnit = Number(index[1]);
        var units = this.topics[indexTopic].units;
        var arrUnits = [];
        
        if (this.topics[indexTopic].name === selector) {
            for (var unit of units) {
                unit.vocabulary.forEach(word => {
                    arrUnits.push(word)
                })
            }
            htmls = this.renderTest(arrUnits);
        } 
        else {
            for (var unit of units) {
                if (unit.number === (indexTopic*5 + indexUnit + 1)) {
                    htmls += this.renderTest(unit.vocabulary)
                }
            }
        }
        form.innerHTML = htmls;
        form.appendChild(submit);
    },
    renderTopic: function() {
        var htmls = '';
        this.topics.map((topic, index) => {
            htmls += `
                <div class="item__option" data-index="${index}">${topic.name}</div>
            `;
        })
        
        dropOptions[0].innerHTML = htmls;
    },
    renderUnit: function() {
        var htmls = '';
        this.topics.forEach((topic, indexa) => {
            topic.units.map((unit, indexb) => {
                htmls += `
                    <div class="item__option" data-index="${indexa+'|'+indexb}">${unit.number}</div>
                `
            })
        })
    
        dropOptions[1].innerHTML = htmls;
    },
    renderTest: function(selector) {
        var output = '';
        var arrRandom = [];
        var numRandom;
        var typeWord = this.typeTest === 0 ? 'word' : 'translate';
        for (var key of selector) {
            if (this.arrVocabulary.length < this.maxVocabulary) {
                this.arrVocabulary.push(key);
                output += `
                    <div class="test__group">
                        <p class="test__word">${key[typeWord]}</p>
                        <input type="text" name="" class="test__input">
                    </div>
                `
            }
        }
        do {
            numRandom = Math.floor(Math.random() * selector.length);
            this.arrRandom.push(selector[numRandom]);
            arrRandom.push(numRandom)
            this.arrVocabulary.push(selector[numRandom]);
            if (this.arrVocabulary.length === this.maxVocabulary) {
                break;
            }

        } while (arrRandom.indexOf(numRandom) === -1)
        console.log(arrRandom)
        return output;
    },
    start: function() {
        // Xử lý các sự kiện
        this.handle();
        
        // hiển thị các topic ra màn hình UI
        this.renderTopic();
        this.renderUnit();

    }
};

app.start();