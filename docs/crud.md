# CRUD
![Crud list](/images/screenshots/crud.jpg)
![Crud form](/images/screenshots/crud_form.jpg)

- [Example](#example)
- [Methods](#methods)
- [properties](#properties)
- [init](#init)
- [queryScope](#queryscope)
- [validationRules](#validationrules)
- [validationAttributes](#validationattributes)
- [validationMessages](#validationmessages)
- [validationAfter](#validationafter)
- [modifyRequest](#modifyrequest)
- [modifyResonse](#modifyresonse)
- [Model Events](#model-events)

CRUD Controllers are controllers that handle resources Create/Edit/Update/Delete. CRUD Controllers working with a model and list of the model fields that in sanjab we call them Widget. Each widget handling operation like saving, form field, view field, table field, search, sort and etc.

## Example
Let's create a sample crud controller step by step. Our sample is a simple **Category** resource that contains name, description, and image.

#### Step 1
Create a model and migrations.
```bash
php artisan make:model -m Category
```

#### Step 2
Fill migration and model.
```php
Schema::create('categories', function (Blueprint $table) {
    $table->bigIncrements('id');
    $table->string('name');
    $table->string('image')->nullable();
    $table->text('description')->nullable();
    $table->timestamps();
});
```
Model:
```php
class Category extends Model
{
    protected $fillable = [
        'name',
        'image',
        'description'
    ];
}
```

#### Step 3
Migrate.
```bash
php artisan migrate
```

#### Step 4
Make Sanjab controllers.
```bash
php artisan sanjab:make:crud CategoryController
```

#### Step 5
Change the content of `app/Http/Controllers/Admin/Crud/CategoryController.php`.

```php
<?php

namespace App\Http\Controllers\Admin\Crud;

use Sanjab\Widgets\IdWidget;
use Sanjab\Widgets\TextWidget;
use Sanjab\Helpers\MaterialIcons;
use Sanjab\Helpers\CrudProperties;
use Sanjab\Widgets\TextAreaWidget;
use Sanjab\Widgets\File\UppyWidget;
use Sanjab\Controllers\CrudController;
use Illuminate\Database\Eloquent\Model;

class CategoryController extends CrudController
{
    protected static function properties(): CrudProperties
    {
        return CrudProperties::create('categories')
                ->model(\App\Category::class)
                ->title("Category")
                ->titles("Categories")
                ->icon(MaterialIcons::GROUP_WORK);
    }

    protected function init(string $type, Model $item = null): void
    {
        $this->widgets[] = IdWidget::create();
        $this->widgets[] = TextWidget::create('name')
                            ->required();
        $this->widgets[] = TextAreaWidget::create('description');
        $this->widgets[] = UppyWidget::image('image')
                            ->width(512)
                            ->height(512);
    }
}
```

#### Step 6
Done!

Open `yoursite/admin` and open **Categories** link in sidebar. Your CRUD is ready to use.
If you don't see link make sure your controller has been added to `controllers` in `config/sanjab.php`.


## Methods

## properties
```php
protected static function properties(): CrudProperties
```
This function returns CRUD controller properties. and should return an instance of `Sanjab\Helpers\CrudProperties` with all properties that need to override.
```php
CrudProperties::create(ROUTE)
                ->property1(value 1)
                ->property2(value 2)
```

#### model
`type: string`

Model class name

#### title
`type: string`

 Title of resource (singular)

#### titles
`type: string`

 Title of resource (plural)

#### description
`type: string`

 Description About controller

#### icon
`type: string`

 Material icon name

#### creatable
`type: boolean`

 Has creating form

#### showable
`type: boolean`

 Has resource show action

#### editable
`type: boolean`

 Has resource edit action

#### deletable
`type: boolean`

 Has resource delete action

#### perPages
`type: array`

 Array of possible per-page options (Example: `[5 => 5, 10 => 10, PHP_INT_MAX => "All"]`)

#### perPage
`type: int`

 The default value of `perpages`

#### defaultOrder
`type: string`

 Default order column

#### defaultOrderDirection
`type: string`

 Default order column direction "asc" or "desc"

#### permissionsKey
`type: string`

 Use this when you want to have more than one CRUD controller for a model

#### bulk
`type: boolean`

 Bulk actions are allowed or not

#### globalSearch
`type: boolean`

 Should be shown on global search results or not

#### itemFormat
`type: string`

 Format on global search (Example: `%id - %first_name`) default values are (`title` or `name` or
 `id`)
#### defaultCard
`type: boolean`

 Enable or disable default count card

#### defaultDashboardCard
`type: boolean`

 Enable or disable default count card on the dashboard

#### badge
`type: function`

 Function to create content of menu item badge (Example: `function () {return Model::where('status',
 0)->count();}`)

#### badgeVariant
`type: string`

 Menu item bootstrap badge variant (Examples: 'success', 'danger', ...)

------

## init
```php
protected function init(string $type, Model $item = null): void
```
This function called when using the controller before call action.
You can define controller `Widgets`, `Cards` and `Actions` in this function.

**Parameters**

*$type*

type of action currently loading.

possible values:
- index: The Resource list
- create: Showing the create form or creating the model
- show: Show resource
- edit: Showing edit form or updating model
- action: When calling any actions

*$item*

Model item when showing or editing the resource.

```php
protected function init(string $type, Model $item = null): void
{
    $this->widgets[] = ...;
    $this->cards[] = ...;
    $this->actions[] = ...;
    ...
}
```

## queryScope
```php
protected function queryScope(Builder $query)
```
Modify query before loading resources.
```php
protected function queryScope(Builder $query)
{
    $query->where('confirmed', false); // Loading only non confirmed resources.
}
```

## validationRules
```php
public function validationRules(Request $request, string $type, Model $item = null)
```
Returns array of validation rules.
```php
public function validationRules(Request $request, string $type, Model $item = null)
{
    return [
        'title' => 'required|string'
    ];
}
```

## validationAttributes
```php
public function validationAttributes(Request $request, string $type, Model $item = null)
```
Returns array of validation attribute names.
```php
public function validationAttributes(Request $request, string $type, Model $item = null)
{
    return [
        'title' => 'عنوان'
    ];
}
```

## validationMessages
```php
public function validationMessages(Request $request, string $type, Model $item = null)
```
Returns array of validation messages.
```php
public function validationMessages(Request $request, string $type, Model $item = null)
{
    return [
        'title.required' => 'Title field is a required field'
    ];
}
```

## validationAfter
```php
public function validationAfter(Validator $validator, Request $request, string $type, Model $item = null)
```
Validation [After Validation Hook](https://laravel.com/docs/validation#after-validation-hook).
```php
public function validationAfter(\Illuminate\Validation\Validator $validator, \Illuminate\Http\Request $request, string $type, \Illuminate\Database\Eloquent\Model $item = null)
{
    if (mb_strlen($request->input('name')) % 2 != 0) {
        $validator->errors()->add('name', 'Name length should be even.');
    }
}
```

## modifyRequest
To modify request before save request to model.
```php
protected function modifyRequest(Request $request, Model $item = null)
```

```php
protected function modifyRequest(\Illuminate\Http\Request $request, ?\Illuminate\Database\Eloquent\Model $item = null)
{
    $request->merge(['name' => trim($request->input('name'), '/')]);
}
```
In above example if user input `/test/test/test/` as name will converted to `test/test/test`.

## modifyResonse
```php
    protected function modifyResponse(stdClass $response, Model $item)
```
To show object data on form we convert it to a stdClass object.
You can modify it to what ever you want.
```php
protected function modifyResponse(\stdClass $response, \Illuminate\Database\Eloquent\Model $item)
{
    $response->name = 'Edit: '.$item->name;
}
```
Above example will prepend 'Edit: ' in name field.

## Model Events
You can handle model events with these functions.

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
* onChanging        : Model `changing` event when any change happening to model
* onChanged         : Model `changed` event when any change happend to model

```php
protected function onChanged(\Illuminate\Database\Eloquent\Model $item)
{
    Cache::flush();
}

protected function onSaving(\Illuminate\Database\Eloquent\Model $item)
{
    if (empty($item->name)) {
        $item->name = 'Default';
    }
}
```
The above example will clear cached data when any change happened and also will fill the name field with 'Default' value if the user did not fill the name field.

* [Widgets](./widgets.md)
* [Cards](./cards.md)
