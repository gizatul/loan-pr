export default class ShowInfo {
    constructor(triggers) {
        this.btnsPlus = document.querySelectorAll(triggers);
    }

    init() {
        this.btnsPlus.forEach(btn => {
            btn.addEventListener('click', () => {
                const sibling = btn.closest('.module__info-show').nextElementSibling;
                sibling.classList.add('animated');
                if (sibling.style.display != 'block') {
                    sibling.style.display = 'block';
                    sibling.classList.add('fadeInDown');
                    sibling.classList.remove('fadeOutUp');
                } else {
                    
                    sibling.classList.remove('fadeInDown');
                    sibling.classList.add('fadeOutUp');
                    setTimeout(() => {
                        sibling.style.display = 'none';
                    }, 600);
                }
            });
        });
    }
}