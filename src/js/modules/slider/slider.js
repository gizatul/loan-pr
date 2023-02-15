export default class Slider { //сразу экспорт класса
    constructor({container = null, 
        btns = null, 
        next = null, 
        prev = null,
        activeClass = '',
        animate,
        autoplay } = {}) { //передаем сразу объект ()   
        this.container = document.querySelector(container);
        try {this.slides = this.container.children;} catch(e){} //children - это каждый отдельный слайд //try_catch используем т.к. выходит ошибка на 2-й странице module. пытаемся выполнить если только получен котейнер
        this.btns = document.querySelectorAll(btns);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1;
    }    
}
// класс будет создавать элементы только при вызове через new
//this - ссылка на экземпляр класса