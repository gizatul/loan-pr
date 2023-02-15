export default class Difference {
    constructor(oldofficer, newofficer, items) {
        try {
            this.oldofficer = document.querySelector(oldofficer);
            this.newofficer = document.querySelector(newofficer);
            this.oldItems = this.oldofficer.querySelectorAll(items);
            this.newItems = this.newofficer.querySelectorAll(items);
            this.oldCounter = 0;
            this.newCounter = 0;
        } catch(e){}
    }
    //Добавление карточки по клику
    bindTriggers (container, counter, items) {
        container.querySelector('.plus').addEventListener('click', () => {
            items[counter].classList.add('animated', 'fadeIn');
            if (counter !== items.length - 2) {
                items[counter].style.display = 'flex';
                counter++;
            } else {
                items[counter].style.display = 'flex';
                items[items.length - 1].remove(); 
            }
        });
    }
    //Предварительное скрытие карточек
    hideItems(items) {
        items.forEach((item, i, arr) => {
            if (i !== arr.length - 1) {
                item.style.display = 'none';
            }
        });
    }
    init() {
        try {
            this.hideItems(this.oldItems);
            this.hideItems(this.newItems);
            this.bindTriggers(this.oldofficer, this.oldCounter, this.oldItems);
            this.bindTriggers(this.newofficer, this.newCounter, this.newItems);
        } catch(e){}
    }
}