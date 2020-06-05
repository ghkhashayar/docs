# Widgets

- [Create a widget](#create-a-widget)
- [Base Properties](#base-properties)
- [Availble widgets](#availble-widgets)
- [Extending widgets](#extending-widgets)
  - [Widget Properties](#widget-properties)
  - [Methods](#methods)
  - [Model Events](#model-events)
  - [Vue component](#vue-component)
  - [Widget custom properties](#widget-custom-properties)

Widgets are classes that handling model field operations like showing field, shown in the table, searching, sorting, etc.

## Create a widget
Most simple widget is a `TextWidget`.
```php
$this->widgets[] = TextWidget::create('field name', 'Label')
                    ->property1(Value 1)
                    ->property2(Value 2);
```

## Base Properties
These properties exist in all widgets.

#### onIndex
`type: boolean`

is this element available on the index.

#### onView
`type: boolean`

is this element available on view.

#### onCreate
`type: boolean`

is this element available on create.

#### onEdit
`type: boolean`

is this element available on edit.

#### onStore
`type: boolean`

should this store on the database.

#### sortable
`type: boolean`

is this widget sortable.

#### searchable
`type: boolean`

is this widget searchable?

#### customStore
`type: callable`

store with a custom method

parameters : ($request, $item).

```php
->customStore(function (Request $request, Model $item) {
    $item->name = 'Test_'.$request->input('name');
});
```

#### customPreStore
`type: callable`

pre-store with a custom method

parameters : ($request, $item).

#### customPostStore
`type: callable`

post store with a custom method

parameters : ($request, $item).

#### customModifyResponse
`type: callable`

custom item response modifier

parameters : ($response, $item).

#### customModifyRequest
`type: callable`

custom request modify

parameters : ($request, $item).

#### value
`type: mixed`

the default value for the input.

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

field default views wrapping group tag on the show page.

#### viewTag
`type: string`

field default tag on the show page.

#### tag
`type: string`

field tag.

#### groupTag
`type: string`

field wrapping group tag.

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

Add custom validation rules to widget just for the create form.

#### editRules
`type: string|array`

Add custom validation rules to widget just for the edit form.

#### translation
`type: boolean`

Is this field is multilingual or not.

```php
$this->widgets[] = TextWidget::create('name')
                    ->translation()
```

## Availble widgets
* [CheckboxWidget](./widgets/checkbox.md)
* [CheckboxWidgetGroup](./widgets/checkbox-group.md)
* [ColorWidget](./widgets/color.md)
* [DateTimeWidget](./widgets/datetime.md)
* [FontAwesomeWidget](./widgets/fontawesome.md)
* [IdWidget](./widgets/id.md)
* [ItemListWidget](./widgets/item-list.md)
* [MapWidget](./widgets/map.md)
* [MoneyWidget](./widgets/money.md)
* [NumberWidget](./widgets/number.md)
* [PasswordWidget](./widgets/password.md)
* [SelectWidget](./widgets/select.md)
* [SeperatorWidget](./widgets/seperator.md)
* [ShowWidget](./widgets/show.md)
* [TagWidget](./widgets/tag.md)
* [TextAreaWidget](./widgets/textarea.md)
* [TextListWidget](./widgets/text-list.md)
* [TextWidget](./widgets/text.md)
* Wysiwyg editors
  * [EditorJsWidget](./widgets/editorjs.md)
  * [QuillWidget](./widgets/quill.md)
* File
  * [Uppy](./widgets/uppy.md)
  * [elFinder](./widgets/elfinder.md)
* Relational
  * [BelongsTo](./widgets/belongs-to-picker.md)
  * [BelongsToMany](./widgets/belongs-to-many-picker.md)
  * [HasMany](./widgets/has-many.md)

## Extending widgets
First, you should prepare your project for [Custom Compile](./compile.md).

Then you should register your widget Vue components in `sanjab.js`:

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

You can set the properties of your widget in init function.

### Widget Properties

#### indexTag
`type: string`

Widget tag in the list. you should register custom Vue components in javascript if needed.

#### viewTag
`type: string`

Widget tag in view page.

#### viewGroupTag
`type: string`

Widget group tag in view page. (Recommended to not change)

#### tag
`type: string`

Widget tag in creates and edit form.

#### groupTag
`type: string`

Widget group tag in creates and edit form. (Recommended to not change)

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

Creating table columns manually if a widget needs more than one column in the list.

##### Table Column Properties

##### key
`type: string`

Key of response to show on a column.

##### sortable
`type: boolean`

Is column sortable.

##### tag
`type: string`

The tag of the column.

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

`param: mixed $search`: search parameters based on widgets or search type.

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

#### store

`param: Illuminate\Http\Request $request`: Request input. (Note: Never use `request()` or `Request::...` to support with translations and 'HasMany / ItemList' widgets)

`param: Illuminate\Database\Eloquent\Model $model`: Model item to save data on that.

Method to save request data to model item.

Example:

```php
// password saving example
public function store(Request $request, Model $item)
{
    if ($request->filled($this->property("name"))) {
        $item->{ $this->property("name") } = bcrypt($request->input($this->property("name")));
    }
}
```

#### preStore

`param: Illuminate\Http\Request $request`: Request input. (Note: Never use `request()` or `Request::...` to support with translations and 'HasMany / ItemList' widgets)

`param: Illuminate\Database\Eloquent\Model $model`: Model item to save data on that.

function before any store will be called.

#### postStore

`param: Illuminate\Http\Request $request`: Request input. (Note: Never use `request()` or `Request::...` to support with translations and 'HasMany / ItemList' widgets)

`param: Illuminate\Database\Eloquent\Model $model`: Model item to save data on that.

store data on the model after the model created on the database. recommended way to store relation based data.

> Note: You should override the store to ignore the default store.

#### modifyRequest

`param: Illuminate\Http\Request $request`: Request input. (Note: Never use `request()` or `Request::...` to support with translations and 'HasMany / ItemList' widgets)

`param: Illuminate\Database\Eloquent\Model $model`: Model item.

To modify request data before storing the model.

Example:
```php
// Example to convert to uppercase
protected function modifyRequest(Request $request, Model $item = null)
{
    if (is_string($request->input($this->property('name')))) {
        $request->merge([$this->property('name') => strtoupper($request->input($this->property('name')))]);
    }
}
```

#### modifyResponse

`param: stdClass $response`: Response object.

`param: Illuminate\Database\Eloquent\Model $model`: Model item.

Convert model data to response data to access on the client-side.

Example:
```php
protected function modifyResponse(stdClass $response, Model $item)
{
    $response->{ $this->property('name') } = $item->{ $this->property('name') };
}
```

#### validationAttributes

`param: Illuminate\Http\Request $request`: Request input.

`param: string $type`: Crud type (create, edit) (always edit for setting controllers).

`param: Illuminate\Database\Eloquent\Model $model`: Model item.

`returns: array`: an array of validation attributes.

Default example:
```php
public function validationAttributes(Request $request, string $type, Model $item = null): array
{
    return [
        $this->name         => $this->title,
        $this->name.'.*'    => $this->title,
    ];
}
```

#### validationRules

`param: Illuminate\Http\Request $request`: Request input.

`param: string $type`: Crud type (create, edit) (always edit for setting controllers).

`param: Illuminate\Database\Eloquent\Model $model`: Model item.

`returns: array`: an array of validation rules.

Default Example:
```php
public function validationRules(Request $request, string $type, Model $item = null): array
{
    return [
        $this->name => $this->property('rules.'.$type, []), // This is all rules that set by user in controller
    ];
}
```

#### validationMessages

`param: Illuminate\Http\Request $request`: Request input.

`param: string $type`: Crud type (create, edit) (always edit for setting controllers).

`param: Illuminate\Database\Eloquent\Model $model`: Model item.

`returns: array`: an array of validation custom messages.

---
### Model Events

* onRetrieved       : Model `retrieved` event
* onCreating        : Model `creating` event
* onCreated         : Model `created` event
* onUpdating        : Model `updating` event
* onUpdated         : Model `updated` event
* onSaving          : Model `saving` event
* onSaved           : Model `saved` event
* onDeleting        : Model `deleting` event when not soft deleting
* onDeleted         : Model `deleted` event when not soft deleted
* onSoftDeleting    : Model `deleting` event when soft deleting
* onSoftDeleted     : Model `creating` event when soft deleted
* onRestoring       : Model `restoring` event when restoring soft delete item
* onRestored        : Model `restored` event when soft deleted item restored

---
### Vue component
You can access all attributes in the Vue component by defining them as `prop`.

Example to access name:
```vue
{% raw  %}<template>
    <div>
        <h1>My widget name is: {{ name }}</h1>
    </div>
</template>
<script>
    export default {
        props: {
            name: {
                type: String,
                default: null
            }
        }
    };
</script> {% endraw  %}
```

To send data to the backend on form submit your component should support `v-model` to set value.

Read more on [Vue.js documents](https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components).

Money widget example:
```vue
<template>
    <div>
        <v-money v-model="mutableValue" class="form-control" v-bind="money" />
    </div>
</template>

<script>
  import {Money} from 'v-money';

    export default {
        props: {
            value: {
                type: [Number, String],
                default: 0,
            },
            decimal: {
                type: String,
                default: '.'
            },
            thousands: {
                type: String,
                default: ','
            },
            prefix: {
                type: String,
                default: ''
            },
            postfix: {
                type: String,
                default: ' $'
            },
            precision: {
                type: Number,
                default: 2
            }
        },
        mounted () {
            if (this.value instanceof Number || this.value instanceof String) {
                this.mutableValue = this.value;
            }
        },
        data () {
            return {
                mutableValue: 0,
                money: {
                    decimal: this.decimal,
                    thousands: this.thousands,
                    prefix: this.prefix,
                    suffix: this.postfix,
                    precision: this.precision,
                    masked: false
                }
            }
        },
        watch: {
            mutableValue(newValue, oldValue) {
                this.$emit('input', newValue);
            },
            value(newValue, oldValue) {
                if (typeof newValue === 'number' || typeof newValue === 'string') {
                    this.mutableValue = newValue;
                }
            }
        },
        components: {'v-money': Money},
    }
</script>
```

---

### Widget custom properties
If you want to use some custom properties on the Vue side then you can easily set them on the server-side like this.

```php
$this->myCustomProperty('my custom property value');

// Or

$this->setProperty('myCustomProperty', 'my value')
```

To read property value:
```php
$this->property('myCustomProperty', 'Default Value');
```

For providing autocompletion for custom properties you need to add php doc for your widget classes.

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

Also, you can define properties as function to modify value before store or have a default value.

Always UPPERCASE attribute example:
```php
/**
* My custom property description.
*
* @param string $value
* @return $this
*/
public function myCustomProperty(string $value = 'DEFAULT')
{
    $this->setProperty('myCustomProperty', strtoupper($value))
    return $this; // Important to return $this.
}

```

To access custom properties on the widget Vue component you should define prop for the custom property.
```vue
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
