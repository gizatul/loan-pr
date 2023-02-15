export default class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this); //жесткая привязка м помощью bind контекста к классу
    }
    bindTriggers() {
        this.btns.forEach((btn, i) => { //i - номер кнопки
            try {
                const blockedElem = btn.closest('.module__video-item').nextElementSibling;
                
                if (i % 2 == 0) {
                    blockedElem.setAttribute('data-disabled', true); //назначение каждой второй карточке даты-атрибута со значение true
                }
            } catch(e){}

            btn.addEventListener('click', () => {
                if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') { //если у селектора нет даты атрибута, то следует ф-я ниже //!btn.closest('.module__video-item') -проверка на сущ-е дабы избежать ошибки с плеером на главной странице
                    this.activeBtn = btn;
                    //Решение проблемы с возпроизведением видео на фоне 
                    if (document.querySelector('iframe#frame')) {   //если уже мы вызывали плеер,т.е. возник селектор iframe#frame 
                        this.overlay.style.display ='flex'; // то показываем модальное окно
                        if (this.path !== btn.getAttribute('data-url')) {
                            this.path = btn.getAttribute('data-url');
                            this.player.loadVideoById({ //loadVideoById - API-метод ютуба, позволяющий указать id video
                                videoId: this.path,
                            });
                        }
                    } else { // но если видео нет
                        this.path = btn.getAttribute('data-url'); //обращение к пути объекта
                        this.createPlayer(this.path); // то создаем его
                    }
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
            videoId: `${url}`, //сюда будем подгружать уникальный ID видео который на ютубе
            events: {
                'onStateChange': this.onPlayerStateChange, //нужно жестко перепривязать контекст this от new YT.Player на  общий this. это делается выше, где переменные
            },
        });
        this.overlay.style.display ='flex'; //показываем подложку с элементом видео
    }
    //Ф-я по изменению стилистики (разблока карточки)
    onPlayerStateChange(state) { //срабатывает каждый раз когда изменяется состояние плеера //Ф-ю взяли из YoutubeAPI
        try {
            const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling, //получаем след соседний блок
                  playBtn = this.activeBtn.querySelector('svg').cloneNode(true); //Метод Node.cloneNode() возвращает дубликат узла, из которого этот метод был вызван. // true указываем для клонирования детей элемента
            
            if (state.data === 0) { //описание исп-я data указно в документации YoutubePlayer //0-значит видео завершено
                if (blockedElem.querySelector('.play__circle').classList.contains('closed')) { //устранения ошибки с повторным просмотром видео
                    blockedElem.querySelector('.play__circle').classList.remove('closed');
                    blockedElem.querySelector('svg').remove(); // удаление замочка
                    blockedElem.querySelector('.play__circle').appendChild(playBtn); //размещение клона стрелки из пред. карточки
                    blockedElem.querySelector('.play__text').textContent = 'play video'; //замена текста
                    blockedElem.querySelector('.play__text').classList.remove('attention'); //убираем стиль текста
                    blockedElem.style.opacity = 1; //изменение стиля карточки
                    blockedElem.style.filter = 'none'; //выкл фильтра

                    blockedElem.setAttribute('data-disabled', 'false');
                }
            }
        } catch(e){}
    }

    init() { //инициализация всего функционала
        if (this.btns.length > 0) {
            const tag = document.createElement('script'); //создает тег скрипт

            tag.src = "https://www.youtube.com/iframe_api"; //внутри помещает ссылку
            const firstScriptTag = document.getElementsByTagName('script')[0]; //yghzvj на странице находим первый скрипт, кот-й у нас есть
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); //обращаемся к главному родителю на странице и перед первым скриптом помещаем скрипт ютуба
            this.bindTriggers();
            this.bindCloseBtn();
        }
    }
}