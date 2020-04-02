# BelongsTo Relation Widget
![BelongsTo Picker](../../images/screenshots/widgets/belongs-to-picker.jpg)

Select box to handle eloquent BelongsTo relation.

## Sample
```php
use Sanjab\Widgets\Relation\BelongsToPickerWidget;

$this->widgets[] = BelongsToPickerWidget::create('category')
        ->format('%name')
        ->ajax(true)
        ->required();
```

You also should define `BelongsTo` relation in your model.
```php
/**
 * Category of blog post.
 *
 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
 */
public function category()
{
    return $this->belongsTo(Category::class);
}
```

## Properties

### withNull
`type: string`

If you fill withNull then select box will contain an option with null value.

Example:
```php
->withNull('Without Category')
```

### query
`type callable`

A callback function to modify query of options.

Example:
```php
use Illuminate\Database\Eloquent\Builder;

->query(function (Builder $query) {
    $query->whereNotNull('parent_id'); // Only categories that has no parent_id
});
```

### searchFields
`type: array`

Array of fields to search when working with [ajax](#ajax). By default [format](#format) will fill this option for you.

Example:
```php
->searchFields(['id', 'name']); // Search in id and name.
```

### format
`type: string | callable`

Format of items to show in select box.

For access to related model you should prepend field name with `%`.

Example:
```php
->format('%id - %name') // Result will be look like "CategoryId - Category Name"
```

You can also set a callback to do that but if you are using [ajax](#ajax) you must provide [searchFields](#searchfields) manually.

Example:
```php
use App\Category;

->format(function (Category $category) {
    return $category->id.' - '.$category->name;
})
->searchFields(['id', 'name'])
```

### orderColumn
`type: string`

To set which column should used to order items in list page.

```php
->orderColumn('name')
```

### ajax
`type: boolean`

Should items inside select box loaded using ajax after user typed something to search.
Recommended if items on related model are too many.

```php
->ajax(true)
```

### creatable
`type: callable`

Can create new item on fly based on searched text.
Recommended only for relation entries has only one required field.

Example:
```php
->creatable(function ($value) {
    return \App\Category::create(['name' => $value]); // Create new item based on searched text and then return it to assign.
})
```

### creatableText:
`type: string`

By default for example if you search sandwitch then creatable option will look like this.
`Create: sandwitch`

You can change Create by this option.

```php
->creatableText('Make') // Creatable Option -> Make: sandwitch
```
