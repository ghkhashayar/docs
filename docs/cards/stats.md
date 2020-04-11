---
sidebarDepth: 0
---
# Stats Card
![Stats Card](../images/screenshots/cards/stats.jpg)


A simple card showing a number.

## Sample
```php
use Sanjab\Cards\StatsCard;

$this->cards[] = StatsCard::create('Products')
    ->value(function () {
        return Product::count();
    });
```

## Properties

### footerTitle
`type: string`

A title in footer.

### footerIcon
`type: string`

A material icon in the footer.

### link
`type: string`

Url of card

### value
`type: callable|mixed`

Value showing in the card.

> Highly recommended to use callback instead of raw value in order to prevent extra database queries.
```php
->value(function () {
    return Product::count();
})
```

### icon
`type: string`

Card icon

### variant
`type: string`

Card bootstrap variant (Examples: 'success', 'danger', ...).
