# Cards

- [Create a card](#create-a-card)
- [Base properties](#base-properties)
- [Availble cards](#availble-cards)

Cards are classes that showing any block in dashboard or crud.

## Create a card
The most simple card is a `StatsCard`.
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
Title of the card.

#### order
Order of card in cards.

## Availble cards
* [StatsCard](./cards/stats.md)
* [SelectiveCard](./cards/selective.md)
* [BarChartCard](./cards/bar-chart.md)
* [BubbleChartCard](./cards/bubble-chart.md)
* [DoughnutChartCard](./cards/doughnut-chart.md)
* [HorizontalBarChartCard](./cards/horizontal-bar-chart.md)
* [LineChartCard](./cards/line-chart.md)
* [PieChartCard](./cards/pie-chart.md)
* [PolarAreaChartCard](./cards/polar-area-chart.md)
* [RadarChartCard](./cards/radar-chart.md)
* [ScatterChartCard](./cards/scatter-chart.md)
