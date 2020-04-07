---
sidebarDepth: 0
---
# Show Widget

A simple just for view field value. This recommended using with [Eloquent Mutators](https://laravel.com/docs/eloquent-mutators#accessors-and-mutators).

## Sample
```php
use Sanjab\Widgets\ShowWidget;

$this->widgets[] = ShowWidget::create('name', 'Full name');
```

and in your model.
```php
public function getNameAttribute()
{
    return $this->first_name.' '.$this->last_name;
}
```
