# Custom compile

Sanjab is based on [vue.js](https://vuejs.org) and some awesome libraries added to it to make it powerfull. but still not enough. You may need special javascript libraries or maybe you want to edit styles. to do that you need little knowledge about [laravel mix](http://laravel.com/docs/mix) and then compile sanjab yourself with your customizations.

## Step 1
Install npm packages including laravel mix.

```bash
npm install
```

## Step 2
Install the sanjab npm package.

```bash
npm install sanjab --save-dev
```

> You should install the same version of the composer package if you don't have latest version.

```bash
npm install sanjab@VERSION --save-dev
```

## Step 3
Create JS and SCSS file.

> You also can create/compile one of javascript or SCSS only.

`resources/js/sanjab.js`:
```js
require('sanjab');

// Your plugins and components here

if (document.querySelector('#sanjab_app')) {
    window.sanjabApp = new Vue({
        el: '#sanjab_app',
    });
}
```

`resources/sass/sanjab.scss`:
```scss
@import '~sanjab/resources/assets/css/sanjab.css';

// Custom styles here
```

> Alternativly you can use `@import '~sanjab/resources/sass/sanjab.scss';`.

## Step 4
Add resource files to `webpack.mix.js`:

```js
mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .js('resources/js/sanjab.js', 'public/vendor/sanjab/js') // Add this
    .sass('resources/sass/sanjab.scss', 'public/vendor/sanjab/css'); // and this
```

## Step 5
Compile!

```bash
npm run dev
```

or

```bash
npm run watch
```

You are ready to customize compiled files.

Example:

`resources/js/sanjab.js`:
```js
require('sanjab');

if (document.querySelector('#sanjab_app')) {
    alert("Hello World!");
    window.sanjabApp = new Vue({
        el: '#sanjab_app',
    });
}
```

`resources/sass/sanjab.scss`:
```scss
@import '~sanjab/resources/assets/css/sanjab.css';

body {
    background: cyan;
}
```
