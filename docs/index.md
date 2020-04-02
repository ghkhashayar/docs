---
title: Sanjab
editLink: false
prev: false
next: false
sidebarDepth: 0
---


<div align="center">
    <h1>Sanjab <img src="/images/logo.svg" width="32" height="32" /></h1>
</div>
---

<swiper class="swiper" :options="{
        grabCursor: true,
        spaceBetween: 30,
        effect: 'fade',
        loop: true,
        preloadImages: false,
        lazy: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        autoplay: {
            delay: 4000,
        },
    }">
    <swiper-slide>
        <img data-src="/images/screenshots/crud.jpg" class="swiper-lazy" />
    </swiper-slide>
    <swiper-slide>
        <img data-src="/images/screenshots/crud_form.jpg" class="swiper-lazy" />
    </swiper-slide>
    <swiper-slide>
        <img data-src="/images/screenshots/login.jpg" class="swiper-lazy" />
    </swiper-slide>
    <swiper-slide>
        <img data-src="/images/screenshots/settings.jpg" class="swiper-lazy" />
    </swiper-slide>
    <swiper-slide>
        <img data-src="/images/screenshots/ticket.jpg" class="swiper-lazy" />
    </swiper-slide>
    <swiper-slide>
        <img data-src="/images/screenshots/ticket_messages.jpg" class="swiper-lazy" />
    </swiper-slide>
    <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
    <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
</swiper>

---

<h2 align="center">Yet another admin package for <a href="https://laravel.com/">Laravel</a>.</h2>

Sanjab let you create an extendiable admin panel as fast as possible with pure code.

Spend less time on admin side and focus on client side instead.

::: tip
This project is in the early stages and **is NOT ready** for **production** usage yet. Use it with your own risk.
:::
---

* [Installation](./install.md)
* [Configuration](./install.md#Configuration)
* [Crud Controllers](./crud.md)
* [Setting Controllers](./setting.md)
* [Widgets](./widgets.md)
* [Cards](./cards.md)
* [Authorization](./authorization.md)
* [Localization](./localization.md)

## Features
* CRUD controllers that working with eloquent models.
* Customizable CRUD buttons.
* Multiple input types and cards.
* Extendiable for custom input type, cards and ... based on vue.js.
* Just pure customizable code. no generator interface / magic at all.
* Setting support with no pain.
* Role/Permission support based on [bouncer](https://github.com/JosephSilber/bouncer).
* Model policy support.
* Multilingal inputs support based on [laravel translatable](https://github.com/Astrotomic/laravel-translatable).
* Realtime notification tracking with toast and/or sound notification support.

