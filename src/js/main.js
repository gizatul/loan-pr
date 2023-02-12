import Slider from "./modules/slider";
import VideoPlayer from "./modules/playVideo";

window.addEventListener('DOMContentLoaded', () => {
    const slider = new Slider('.page', '.next'); //экземпляр класс
    slider.render();

    const videoPlayer = new VideoPlayer('.showup .play', '.overlay');
    videoPlayer.init();
});