# Tag Widget
![Tag widget](../images/screenshots/widgets/tag.jpg)

Tag input widget.

## Sample
```php
use Sanjab\Widgets\TagWidget;

$this->widgets[] = TagWidget::create('tags', 'Post Tags')
                    ->required();
```

## Properties

### asArray
`type: boolean`

You also can store tags as array in database. just enabled this option.

```php
TagWidget::create('tags', 'Post Tags')
        ->asArray(true)
```

### tagRules
`type: string|array`

Per tag validation rules.
```php
TagWidget::create('text_list', 'Text List')
        ->rules('max:5')        // maximum 5 tags allowed
        ->tagRules('max:20');  // each tag can maximum have 20 characters.
```

## Add autocomplete items
You can add autocomplete options with `addOption` method.

```php
TagWidget::create('tags', 'Post Tags')
            ->addOption('Test1')
            ->addOption('Test2')
            ->addOption('Test3');
```

You can also add multiple autocomplete options with `addOptions` method.

```php
TagWidget::create('tags', 'Post Tags')
        ->addOptions(Tag::all()->pluck('name')->toArray());
```
