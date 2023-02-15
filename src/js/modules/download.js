export default class Download {
    constructor(trigger) {
        this.btns = document.querySelectorAll(trigger);
        this.path = 'assets/img/mainbg.jpg'; //путь скачивания

    }
    //Ф-я скачивания

    downloadItem(path) {
        const link = document.createElement('a'); //искуственная ссылка
        
        link.setAttribute('href', path); //добавляем ссылку на скачивание
        link.setAttribute('download', 'our_picture'); //установка атрибута download в html для того чтобы сработало скачивание //our_picture - название скачиваемого файла

        link.style.display = 'none'; //скрываем элемент
        document.body.appendChild(link); //размещаем на странице

        link.click(); //программно вызываем клик .click();

        document.body.removeChild(link); //удалем элемент со страницы
    }

    init() {
        this.btns.forEach(item => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', (e) => {
                e.stopPropagation(); //запрет всплытия
                this.downloadItem(this.path); //запускаем ф-ю скачивания по определенному пути(this.path)
            });
        });
    }
}