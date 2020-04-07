# Localization

- [Languages](#languages)
- [Multilingual CRUD](#multilingual-crud)
  - [Example](#example)
- [Multilingual Setting](#multilingual-setting)
  - [Access To setting values](#access-to-setting-values)
  - [Set settings programmatically](#set-settings-programmatically)

You can have multilingual inputs for your models and settings.

Multilingual is based on [Laravel Translatable](https://github.com/Astrotomic/laravel-translatable).

## Languages
To set available languages for translation you should change `locales` in `config/sanjab.php`:

```php
'locales' => [
    'en' => 'English',
    'fr' => 'French',
    'fa' => 'فارسی',
],
```

And also need set laravel translatable configuration.

```bash
php artisan vendor:publish --tag=translatable
```

and in `config/translatable.php`:
```php
'locales' => [
   'en',
   'fr',
   'fa',
],
```

> Note: Difference between `config/translatable.php` and `config/sanjab.php`.
>
> in `config/translatable.php` you should just set locale codes, but in `config/sanjab.php` you should set locale code and locale title in array key and value. ('locale_code' => 'Locale Title').


## Multilingual CRUD

As mentioned in [Laravel Translatable](https://github.com/Astrotomic/laravel-translatable) docs you need two models.

one for non-multilingual attributes and one for multilingual attributes. these have a one-to-many relationship.

### Example

Category.php:
```php
use Astrotomic\Translatable\Translatable;

class Category extends Model
{
    use Translatable;

    protected $fillable = [
        'image',
    ];

    protected $translatedAttributes = [
        'name' ,
        'description',
    ];

    protected $with = ['translations']; // optional

}
```

CategoryTranslation.php:
```php
class CategoryTranslation extends Model
{
    public $timestamps = false;
}
```

Migrations:

```php
Schema::create('categories', function (Blueprint $table) {
    $table->bigIncrements('id');
    $table->string('image')->nullable();
    $table->timestamps();
});

Schema::create('category_translations', function (Blueprint $table) {
    $table->bigIncrements('id');
    $table->unsignedBigInteger('category_id');
    $table->string('locale')->index();

    $table->string('name');
    $table->text('description')->nullable();

    $table->unique(['category_id','locale']);
    $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade')->onUpdate('cascade');
});

```

Now all you need to do on the CRUD controller is specify translated widgets with `translation` property.

CategoryController.php:

```php
class CategoryController extends CrudController
{
    protected static function properties(): CrudProperties
    {
        return CrudProperties::create('categories')
                ->title('Category')
                ->titles('Categories')
                ->model(Category::class)
                ->icon(MaterialIcons::GROUP_WORK);
    }

    protected function init(string $type, Model $item = null): void
    {
        $this->widgets[] = IdWidget::create();

        $this->widgets[] = UppyWidget::image('image');

        $this->widgets[] = TextWidget::create('name')
                                ->rules('required')
                                ->translation(); // multilingal

        $this->widgets[] = TextAreaWidget::create('description')
                                ->translation(); // multilingal
    }
}
```

## Multilingual Setting
In setting controllers you don't need to worry about anything.
Just add translation to multilingual properties.

### Access To setting values

```php
setting('group.name') // Just like a normal setting
```

Access with specific locale, you should pass locale as the third parameter.

```php
setting('group.name', 'Default Value', 'fa') // سلام
setting('group.name', 'Default Value', 'en') // Hello
```

### Set settings programmatically

To set a multilingual setting you should pass locale as the third parameter.

```php
setting('group.name', 'سلام', 'fa')
setting('group.name', 'Hello', 'en')
```
