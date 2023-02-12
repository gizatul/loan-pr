export default class Slider { //сразу экспорт класса
    constructor(page, btns) {   
        this.page = document.querySelector(page);
        this.slides = this.page.children; //children - это каждый отдельный слайд
        this.btns = document.querySelectorAll(btns);
        this.slideIndex = 1;
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

    render() {
        try { //try/catch т.к. в других слайдах нет hanson
            this.hanson = document.querySelector('.hanson');
        } catch (e){}
        

        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.plusSlides(1);
            });
            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex); // при клике будет первый слайд
            });
            
        });

        this.showSlides(this.slideIndex);
    }
    
}
// класс будет создавать элементы только при вызове через new
//this - ссылка на экземпляр класса