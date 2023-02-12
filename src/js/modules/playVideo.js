export default class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                //Решение проблемы с возпроизведением видео на фоне 
                if (document.querySelector('iframe#frame')) {   //если уже мы вызывали плеер,т.е. возник селектор iframe#frame 
                    this.overlay.style.display ='flex'; // то показываем модальное окно
                } else { // но если видео нет
                    const path = btn.getAttribute('data-url');
                    this.createPlayer(path); // то создаем его
                }
            });
        });
    }

    bindCloseBtn() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display ='none';
            this.player.stopVideo(); //при закрытии останавливаем видео 
        });
    }
    // Создание плеера по док-ции ютуба
    createPlayer(url) {
        this.player = new YT.Player('frame', { //YT-будет подтягиваться с серверов ютуба. //frame - уникальный id блока на нашей странице который будем замещать плеером
            height: '100%', //высота плеера
            width: '100%', //ширина плеера
            videoId: `${url}` //сюда будем подгружать уникальный ID видео который на ютубе
        });
        this.overlay.style.display ='flex'; //показываем подложку с элементом видео
    }

    init() { //инициализация всего функционала
        const tag = document.createElement('script'); //создает тег скрипт

        tag.src = "https://www.youtube.com/iframe_api"; //внутри помещает ссылку
        const firstScriptTag = document.getElementsByTagName('script')[0]; //yghzvj на странице находим первый скрипт, кот-й у нас есть
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); //обращаемся к главному родителю на странице и перед первым скриптом помещаем скрипт ютуба
        this.bindTriggers();
        this.bindCloseBtn();
    }
}