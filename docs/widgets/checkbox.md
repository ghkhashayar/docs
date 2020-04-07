---
sidebarDepth: 0
---
# Checkbox Widget
![Checkbox widget](../images/screenshots/widgets/checkbox.jpg)

A simple checkbox input.

## Sample
```php
use Sanjab\Widgets\CheckboxWidget;

$this->widgets[] = CheckboxWidget::create('published');
```

You also should define `$casts` in your model.
```php
protected $casts = [
    'published' => 'bool'
];
```

## Properties


### fastChange

`type: boolean`

change checkbox on the index. if you enable this you can directly change checkbox value on the list.

### fastChangeTimestamps

`type: boolean`

Should fast change touch the updated_at column or not.

### fastChangeBefore

`type: callable`

callback before fast change saving in fast change.
parameters : (Model $item)

### fastChangeAfter

`type: callable`

callback call after fast change saved.
parameters: (Model $item)

### fastChangeController

`type: string`

controller to use with fast change.
> this will fill automatically by [CrudControllers](../crud.md).

### fastChangeControllerAuthorize

`type: callable`

authorize fast change. parameters(Model $item)

```php
->fastChangeControllerAuthorize(function ($item) {
    return Auth::user()->can('change_checkbox', $item);
})
```

### fastChangeControllerAction

`type: callable`

controller to use with fast change.
> this will fill automatically by [CrudControllers](../crud.md).

### fastChangeControllerItem

`type: Model`

controller action parameter working with fast change.
