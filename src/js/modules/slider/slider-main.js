import Slider from "./slider";

export default class MainSlider extends Slider { //получаем доступ ко всем св-м и методам класса Slider
    constructor (btns) {
        super(btns); //В конструкторе ключевое слово super() используется как функция, вызывающая родительский конструктор. Её необходимо вызвать до первого обращения к ключевому слову this в теле конструктора. Ключевое слово super также может быть использовано для вызова функций родительского объекта. // в данном случае наследовали this.btns
        this.nextModule = document.querySelectorAll('.nextmodule');
        this.prevModule = document.querySelectorAll('.prevmodule');
    }
    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = this.slides.length;
        }
        // Добавление появления hanson
        try {  //try/catch используем так как в других слайдах нет hanson
            this.hanson.style.opacity = '0';

            if (n === 3) {
                this.hanson.classList.add('animated'); 
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        }catch(e){}
        

        this.slides.forEach(slide => {
            slide.style.display = 'none'; //скрываем все слайды
        });
        this.slides[this.slideIndex - 1].style.display = 'block'; //показываем нужный слайд
    }
    
    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    toggleButtons(buttons, n) {
        buttons.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.plusSlides(n);
            });
        });
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.slides.forEach(slide => {
                    slide.classList.add('animated', 'fadeInUp');
                });
                this.plusSlides(1);
            });
            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex); // при клике будет первый слайд
            });
        });

        this.toggleButtons(this.nextModule, 1);
        this.toggleButtons(this.prevModule, -1);
    }

    render() {
        if (this.container) { //условие для избежания ошибки с container //если есть такой container 
            try { //try/catch т.к. в других слайдах нет hanson
                this.hanson = document.querySelector('.hanson');
            } catch(e){}
            this.showSlides(this.slideIndex);  
            this.bindTriggers();
        }
    }
}