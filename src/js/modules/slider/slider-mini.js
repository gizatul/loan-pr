import Slider from "./slider";
export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
        this.paused = false;
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);   
            //Скрытие стрелки и тайтла на неактивных карточках
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });
        if (this.slides[0].tagName != 'BUTTON') {
            this.slides[0].classList.add(this.activeClass);
        }
        
        //Появление стрелки и тайтла на активных карточках
        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }
    nextSlide() {
        if (this.slides[1].tagName === 'BUTTON' && this.slides[2].tagName === "BUTTON") {
            this.container.appendChild(this.slides[0]); //Slide
            this.container.appendChild(this.slides[0]); //btn
            this.container.appendChild(this.slides[0]); //btn
            this.decorizeSlides();
        } else if (this.slides[1].tagName === 'BUTTON'){
            this.container.appendChild(this.slides[0]); //Slide
            this.container.appendChild(this.slides[0]); //btn
            this.decorizeSlides();
        } else {
            this.container.appendChild(this.slides[0]); //при нажатии на след. первый элемент будет отправлен в конец
            this.decorizeSlides();
        }
    }

    activateAnimation() {
        if (this.autoplay) {
            this.paused = setInterval(() => this.nextSlide(), 5000);
        }
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());
        this.prev.addEventListener('click', () => {
            for (let i = this.slides.length - 1; i > 0; i--) { //запуск цикла с конца массива
                if (this.slides[i].tagName !== "BUTTON") { //если последний элемент не кнопка, т.е. кнопка пропускается и идет цикл с дивов
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]); //при нажатии на пред. последний элемент будет отправлен в начало //Метод Node.insertBefore() добавляет элемент в список дочерних элементов родителя перед указанным элементом.
                    this.decorizeSlides();
                    break;
                }
            }
            
        });
    }
    init() {
        try {
            this.container.style.cssText =`
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
            `;
            this.bindTriggers();
            this.decorizeSlides();
            //реализация остановки слайдера по наведению мыши
            this.activateAnimation();
            [this.container, this.next, this.prev].forEach(elem => {
                elem.addEventListener('mouseenter', () => { //когда наводим мышь на контейнера слайдов
                    clearInterval(this.paused); //очищаем setInterval
                });
            });
            
            [this.container, this.next, this.prev].forEach(elem => {
                elem.addEventListener('mouseleave', () => { //когда убираем мышь с контейнера слайдов
                    this.activateAnimation(); //запускаем анимацию
                });
            });
        } catch(e){}
    }
}