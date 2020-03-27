# Number Widget
![Number widget](../images/screenshots/widgets/number.jpg)

A simple number input.

## Sample
```php
use Sanjab\Widgets\NumberWidget;

$this->widgets[] = NumberWidget::create('age', 'Your age')
                            ->required()
                            ->min(18)
                            ->max(120);
```

You also should define `$casts` in you'r model.
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

prection or each step of number.
