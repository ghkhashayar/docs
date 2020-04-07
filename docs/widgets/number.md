---
sidebarDepth: 0
---
# Number Widget
![Number widget](../images/screenshots/widgets/number.jpg)

A simple input for numbers.

## Sample
```php
use Sanjab\Widgets\NumberWidget;

$this->widgets[] = NumberWidget::create('age', 'Your age')
                            ->required()
                            ->min(18)
                            ->max(120);
```

You also should define `$casts` in your model.
```php
protected $casts = [
    'age' => 'int'
];
```

## Properties

### min
`type: number`

minimum value.

### max
`type: number`

maximum value.

### step
`type: number`

the precision of each step of the number.
