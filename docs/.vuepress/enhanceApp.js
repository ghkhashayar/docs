import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default ({ Vue, options, router, siteData, isServer }) => {
    Vue.component('swiper', Swiper);
    Vue.component('swiper-slide', SwiperSlide);
};
