# Checkbox Widget
![Checkbox widget](../images/screenshots/widgets/checkbox.jpg)

A simple checkbox input.

## Sample
```php
use Sanjab\Widgets\CheckboxWidget;

$this->widgets[] = CheckboxWidget::create('published');
```

You also should define `$casts` in you'r model.
```php
protected $casts = [
    'published' => 'bool'
];
```

## Properties


fastChange

`type: boolean`

change checkbox on index. if you enable this you can directly change checkbox value in list.

fastChangeTimestamps

`type: boolean`

changing timestamp update on fast change or not.

fastChangeBefore

`type: callable`

callback before fast change saving in fastchange.
parameters : (Model $item)

fastChangeAfter

`type: callable`

callback call after fast change saved.
parameters: (Model $item)

fastChangeController

`type: string`

controller to use with fast change.
> this will fill automatically by [CrudControllers](../crud.md).

fastChangeControllerAuthorize

`type: callable`

authorize fast change. parameters(Model $item)

```php
->fastChangeControllerAuthorize(function ($item) {
    return Auth::user()->can('change_checkbox', $item);
})
```

fastChangeControllerAction

`type: callable`

controller to use with fast change.
> this will fill automatically by [CrudControllers](../crud.md).

fastChangeControllerItem

`type: Model`

controller action parameter working with fast change.
