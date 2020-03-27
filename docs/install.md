# Installation

## Requirements
* PHP 7.1.3+
* Laravel 6.0
* Composer
* NPM and Laravel Mix (optional)

## Install using composer

1. Open your laravel project directory in terminal.


2. Use composer command to install sanjab on your project.
```bash
composer require sanjabteam/sanjab
```


3. Install sanjab using the following command.

```bash
php artisan sanjab:install
```

> Checkout Sanjab\Models\SanjabUser trait added to the User model.

```php
use Sanjab\Models\SanjabUser;

class User extends Authenticatable
{
    use Notifiable, SanjabUser;
```


4. Migrate database.

```bash
php artisan migrate
```


5. Create new user.

```bash
php artisan tinker
Psy Shell v0.9.9 (PHP 7.2.12 — cli) by Justin Hileman
>>> User::create(['email' => 'test@test.com', 'name' => 'sanjab', 'password' => bcrypt("123456")])
```


6. Use the following command to convert created user to sanjab super admin.

```bash
php artisan sanjab:make:admin --user=test@test.com
```
> --user is user email. if you want to use something else as username input you need to change the config in config/sanjab.php

```php 'login' => [...]```


7. Open `yourwebsite.local/admin` to login to the admin panel.


8. Congratulations! you installed sanjab admin panel successfully!

## Configuration

Open `config/sanjab.php` to change config values.

### route
Sanjab panel route prefix.

### controllers
All sanjab controllers should be here.
if you want to delete a controller or change class name you should update this too.
note that artisan commands like `sanjab:make:crud` will add controller automatically to this.

### locales
Locales availble for multilingal inputs.
Keys are iso code and values are label of language.
```php
[
    'en' => 'English',
    'fr' => 'French',
    'fa' => 'فارسی',
    ...
]
```

### login
By default sanjab uses email as login form input. but if you want use something else you can change this config.

For example if you want mobile instead of email change like this.

```php
'login' => [
    'username'  => 'mobile',
    'title'     => 'Mobile',
]
```

Also you can enable/disable recaptcha in login form.
```php

'login' => [
    'recaptcha' => false
]
```

### recaptcha
Before using recaptcha you should get your recaptcha `sitekey` and `secretkey` from [Google Recaptcha](https://www.google.com/recaptcha).
then you should define these in your `.env` file.
```env
RECAPTCHA_SITE_KEY=YOUR SITE KEY HERE
RECAPTCHA_SECRET_KEY=YOUR SECRET KEY HERE
```

By default you don't need to pass recaptcha. if you want to disable this feature change `ignore_on_debug` to `false`.
```php
'recaptcha' => [
    'ignore_on_debug' => false
]
```

### theme
Theme settings are here.
* color: Theme color scheme based on material colors.
Possible values are:'red','pink','purple','deep-purple','indigo','blue', 'light-blue','cyan','teal','green','light-green','lime','yellow', 'amber','orange','deep-orange','brown','grey','blue-grey'
.
* footer_note: Note in admin footer.
* footer_links: External links in footer.
```php
'footer_links' => [
    ['title' => 'LINK TITLE', 'link' => 'LINK URL'],
]
```

### elfinder
[Elfinder](https://github.com/Studio-42/elFinder) file manager.

* enabled: Should filemanager availble in sidebar
* disks: Array of [disks](https://laravel.com/docs/filesystem) that should be availble in filemanager.
```php
'disks' => [
    'public' => 'Uploads',
    'disk_name' => 'Disk label'
]
```
