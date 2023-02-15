import MainSlider from "./modules/slider/slider-main";
import MiniSlider from "./modules/slider/slider-mini";
import VideoPlayer from "./modules/playVideo";
import Difference from "./modules/difference";
import Forms from "./modules/forms";
import ShowInfo from "./modules/showInfo";
import Download from "./modules/download";

window.addEventListener('DOMContentLoaded', () => {
    const mainSlider = new MainSlider({ 
        btns: '.next',
        container: '.page'
    }); 
    mainSlider.render();

    const modulePageSlider = new MainSlider({
        container: '.moduleapp',
        btns: '.next',
    });
    modulePageSlider.render();

    const showUpSlider = new MiniSlider({
        prev: '.showup__prev', 
        next: '.showup__next',
        container: '.showup__content-slider',
        activeClass: 'card-active',
        animate: true,
    });
    showUpSlider.init();

    const modulesSlider = new MiniSlider({
        prev: '.modules__info-btns .slick-prev',
        next: '.modules__info-btns .slick-next', 
        container: '.modules__content-slider',
        activeClass: 'card-active',
        animate: true,
        autoplay: true,
    });
    modulesSlider.init();

    const feedSlider = new MiniSlider({
        prev: '.feed__slider .slick-prev',
        next: '.feed__slider .slick-next', 
        container: '.feed__slider',
        activeClass: 'feed__item-active',
    });
    feedSlider.init();

    new VideoPlayer('.showup .play', '.overlay').init();
    new VideoPlayer('.module .play', '.overlay').init();

    new Difference('.officerold', '.officernew', '.officer__card-item').init();

    new Forms('form').init();

    new ShowInfo('.module__info-show .plus').init();

    new Download('.download').init();
});