# Text List Widget
![Text list widget](../images/screenshots/widgets/text-list.jpg)

List of simple text input.

## Sample
```php
use Sanjab\Widgets\TextListWidget;

$this->widgets[] = TextListWidget::create('field', 'Label');
```
## Properties

### unique
`type: bool`

should each item be unique or not. By default it's enabled and you can disable it.
```php
TextListWidget::create('text_list', 'Text List')
                ->unique(false)
```

### inputOptions
`type: array`

array of new item input attributes. You can change input attributes with this.
```php
TextListWidget::create('text_list', 'Text List')
                ->inputOptions(['minlength' => 5, 'maxlength' => 20]);
```

### itemRules
`type: string|array`

rules per text item.
```php
TextListWidget::create('text_list', 'Text List')
        ->rules('max:5')        // maximum 5 items are allowed
        ->itemRules('max:20');  // each text item can maximum have 20 characters.
```
