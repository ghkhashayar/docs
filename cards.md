---
nav_order: 101
has_children: true
has_toc: false
---
# Cards

- [Create a card](#create-a-card)
- [Base properties](#base-properties)
- [Availble cards](#availble-cards)

Cards are classes that showing any block in dashboard or crud.

## Create a card
Most simple card is a `StatsCard`.
```php
use Sanjab\Cards\StatsCard;

$this->cards[] = StatsCard::create('Products')
    ->value(function () {
        return Product::count();
    });
```

## Base properties

#### tag
Card tag.

#### cols
Bootstrap column based size.

#### title
Title of card.

#### order
Order of card in cards.

## Availble cards
* [StatsCard](./cards/stats.md)
