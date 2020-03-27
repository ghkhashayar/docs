---
nav_order: 100
has_children: true
has_toc: false
---
# Widgets

- [Create a widget](#create-a-widget)
- [Base Properties](#base-properties)
- [Availble widgets](#availble-widgets)
- [Extending widgets](#extending-widgets)
  - [Widget Properties](#widget-properties)
  - [Methods](#methods)
  - [Widget custom properties](#widget-custom-properties)

Widgets are classes that handling model field operations like showing field, show in table, searching, sorting, and etc.

## Create a widget
Most simple widget is a `TextWidget`.
```php
$this->widgets[] = TextWidget::create('field name', 'Label')
                    ->property1(Value 1)
                    ->property2(Value 2);
```

## Base Properties
These properties exists in all widgets.

#### onIndex
`type: boolean`

is this element availble on index.

#### onView
`type: boolean`

is this element availble on view.

#### onCreate
`type: boolean`

is this element availble on create.

#### onEdit
`type: boolean`

is this element availble on edit.

#### onStore
`type: boolean`

should this store in database.

#### sortable
`type: boolean`

is this widget sortable.

#### searchable
`type: boolean`

is this widget searchable.

#### customStore
`type: callable`

store with custom method

parameters : ($request, $item).

```php
->customStore(function (Request $request, Model $item) {
    $item->name = 'Test_'.$request->input('name');
});
```

#### customPreStore
`type: callable`

pre store with custom method

parameters : ($request, $item).

#### customPostStore
`type: callable`

post store with custom method

parameters : ($request, $item).

#### customModifyResponse
`type: callable`

custom item response modifyer

parameters : ($response, $item).

#### customModifyRequest
`type: callable`

custom request modify

parameters : ($request, $item).

#### value
`type: mixed`

default value for input.

#### name
`type: string`

field name.

#### title
`type: string`

field title.

#### description
`type: string`

field description.

#### indexTag
`type: string`

field default tag in table columns.

#### viewGroupTag
`type: string`

field default view wraping group tag in show page.

#### viewTag
`type: string`

field default tag in show page.

#### tag
`type: string`

field tag.

#### groupTag
`type: string`

field wraping group tag.

#### class
`type: string`

class of input field.

#### cols
`type: string`

bootstrap based column width.
```php
$this->widgets[] = TextWidget::create('name')
                    ->cols(4);
$this->widgets[] = TextWidget::create('description')
                    ->cols(8);
```

#### rules
`type: string|array`

Add custom validation rules to widget.
```php
$this->widgets[] = TextWidget::create('name')
                    ->rules('required|string|min:2|max:100');
```

#### createRules
`type: string|array`

Add custom validation rules to widget just for create form.

#### editRules
`type: string|array`

Add custom validation rules to widget just for edit form.

#### translation
`type: bool`

Is this field is a multilingal field or not.

```php
$this->widgets[] = TextWidget::create('name')
                    ->translation()
```

## Availble widgets
* [TextWidget](./widgets/text.md)
* [TextAreaWidget](./widgets/textarea.md)
* [TextListWidget](./widgets/text-list.md)
* [TagWidget](./widgets/tag.md)
* [ShowWidget](./widgets/show.md)
* [SelectWidget](./widgets/select.md)
* [PasswordWidget](./widgets/password.md)
* [NumberWidget](./widgets/number.md)
* [MapWidget](./widgets/map.md)
* [ItemListWidget](./widgets/item-list.md)
* [IdWidget](./widgets/id.md)
* [FontAwesomeWidget](./widgets/fontawesome.md)
* [CheckboxWidget](./widgets/checkbox.md)
* [CheckboxWidgetGroup](./widgets/checkbox-group.md)
* [ColorWidget](./widgets/color.md)
* Wysiwyg editors
  * [EditorJsWidget](./widgets/editorjs.md)
  * [QuillWidget](./widgets/quill.md)
* File
  * [Uppy](./widgets/uppy.md)
  * [elFinder](./widgets/elfinder.md)

## Extending widgets
First you should prepare your project for [Custom Compile](./compile.md).

Then you should register your widget vue components in `sanjab.js`:

```js
require('sanjab');

Vue.component('my-custom-widget', require('./widgets/MyCustomWidget.vue').default);
Vue.component('my-another-custom-widget', require('./widgets/MyAnotherCustomWidget.vue').default);

if (document.querySelector('#sanjab_app')) {
    window.sanjabApp = new Vue({
        el: '#sanjab_app',
    });
}
```

And also any syles in `sanjab.scss` if needed.

Then you should create a class that extends `Sanjab\Widgets\Widget`:

```php
<?php

namespace App\Widgets;

class MyCustomWidget extends Widget
{
    public function init()
    {
        $this->tag("my-custom-widget");
    }
}

```

You can set properties of your widget in init function.

### Widget Properties

#### indexTag
`type: string`

Widget tag in list. you should register custom vue components in javascript if needed.

#### viewTag
`type: string`

Widget tag in view page.

#### viewGroupTag
`type: string`

Widget group tag in view page. (Recommended to not change)

#### tag
`type: string`

Widget tag in create and edit form.

#### groupTag
`type: string`

Widget group tag in create and edit form. (Recommended to not change)

#### class
`type: string`

Any extra class.

### Methods

#### init

Called when widget creating.

#### postInit

Called when widget creating but all other widgets also initialized.

#### tableColumns
`returns: Sanjab\Helpers\TableColumn[]`

Creating table columns manually if a widget need more than one column in list.

##### Table Column Properties

##### key
`type: string`

Key of response to show on column.

##### sortable
`type: boolean`

Is column sortable.

##### tag
`type: string`

Tag of column.

---

#### searchTypes
`returns: Sanjab\Helpers\SearchType[]`

All possible options of searching for advanced search.

Example:
```php
protected function searchTypes(): array
{
    return [
        SearchType::create('empty', 'Empty'),
        SearchType::create('not_empty', 'Not Empty'),
        SearchType::create('equal', 'Equal')
                    ->addWidget(NumberWidget::create('search', 'Widget for Equal')),
        SearchType::create('less', 'Less')
                    ->addWidget(NumberWidget::create('search', 'Input for less')),
        SearchType::create('between', 'Between')
                    ->addWidget(NumberWidget::create('first', 'Between first widget'))
                    ->addWidget(NumberWidget::create('second', 'Between second widget')),
    ];
}
```

First parameter for `SearchType::create` is unique type name using for [search](#search) and second one is title of search type.

#### search
`param: Illuminate\Database\Eloquent\Builder $query`: Query builder to modify.

`param: string|null $type`: Search type based on [searchTypes](#searchtypes). if was null then it's a global search not advanced search.

`param: mixed $search`: search parameters based on widgets of search type.

Customize search queries based on [SearchTypes](#searchtypes).

Example:

```php
protected function search(Builder $query, string $type = null, $search = null)
{
    switch ($type) {
        case 'empty':
            $query->whereNull($this->property('name'))->orWhere($this->property('name'), '=', '');
            break;
        case 'not_empty':
            $query->whereNotNull($this->property('name'))->where($this->property('name'), '!=', '');
            break;
        case 'equal':
            $query->where($this->property('name'), 'LIKE', $search);
            break;
        case 'less':
            $query->where($this->property('name'), '<', $search);
            break;
        case 'between':
            $query->whereBetween($this->property('name'), [min(intval($search['first']), intval($search['second'])), max(intval($search['first']), intval($search['second']))]);
            break;
        default:
            $query->where($this->property('name'), 'LIKE', '%'.$search.'%');
            break;
    }
}
```

#### order

`param: Illuminate\Database\Eloquent\Builder $query`: Query builder to modify.

`param: string $key`: Key of table column based on [TableColumn](#tablecolumns).

`param: string $direction`: Direction of sort. (asc / desc)

Customize sort query based on [TableColumn](#tablecolumns).

Example:
```php
protected function order(Builder $query, string $key, string $direction = 'asc')
{
    $query->orderBy($this->property('name'), $direction);
}
```

---

### Widget custom properties
If you want to use some custom properties on vue side then you can easily set them on server side like this.

```php
$this->myCustomProperty('my custom property value');

// Or

$this->setProperty('myCustomProperty', 'my value')
```

For provide autocompletion for custom properties you need to add php doc for your widget classes.

Example:
```php
/**
 * My Custom widget.
 *
 * @method $this myCustomProperty(string $val)  My custom property description.
 */
class MyCustomWidget extends Widget
```
And in controller:
```php
MyCustomWidget::create(...)
        ->myCustomProperty('my value');
```


To access custom properties on widget vue component you should define prop for custom property.
```js
<template>
    <div>
        <h1>{{ myCustomProperty }}</h1>
    </div>
</template>
<script>
    export default {
        props: {
            myCustomProperty: {
                type: String,
                default: 'Default'
            }
        }
    };
</script>
```
