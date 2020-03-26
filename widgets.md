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
Comming soon...
