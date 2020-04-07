# Setting
![Settings](/images/screenshots/settings.jpg)

- [Example](#example)
- [Using saved settings](#using-saved-settings)
- [Set values programmically](#set-values-programmically)
- [Alias functions](#alias-functions)
- [Methods](#methods)
- [properties](#properties)
- [init](#init)
- [validationRules](#validationrules)
- [validationAttributes](#validationattributes)
- [validationMessages](#validationmessages)
- [validationAfter](#validationafter)
- [modifyRequest](#modifyrequest)
- [modifyResonse](#modifyresonse)
- [Model Events](#model-events)

Setting Controllers using to save website settings. settings controllers working with a group name and list of the field that called a widget.

## Example
Let's create a setting controller step by step and use saved settings somewhere.
Our example is a simple setting that holding settings about SEO like website title, description, keywords, and og:image meta.

#### Step 1
Make sure you migrated the sanjab settings table.
```bash
php artisan migrate
```

#### Step 2
Make a sanjab setting controller.
```bash
php artisan sanjab:make:setting SeoSettingController
```

#### Step 3
Change the content of `app/Http/Controllers/Admin/Setting/SeoSettingController.php`
```php
<?php

namespace App\Http\Controllers\Admin\Setting;

use Sanjab\Widgets\TextWidget;
use Sanjab\Widgets\TextAreaWidget;
use Sanjab\Widgets\File\UppyWidget;
use Sanjab\Helpers\SettingProperties;
use Sanjab\Controllers\SettingController;

class SeoSettingController extends SettingController
{
    protected static function properties(): SettingProperties
    {
        return SettingProperties::create('seo')
            ->title('Seo Settings');
    }

    protected function init(): void
    {
        $this->widgets[] = TextWidget::create('title');
        $this->widgets[] = TextAreaWidget::create('description');
        $this->widgets[] = UppyWidget::image('image');
    }
}
```

#### Step 4
Done!

Open `yoursite/admin` and open **Seo Settings** in **Settings** link in sidebar. Your Setting is ready to use.
If you don't see link make sure your controller has been added to `controllers` in `config/sanjab.php`.

Fill your settings to use it.

## Using saved settings
Each setting controllers has a group or key that you can access settings like this.
```php
setting('group.field_name')
```
For our example:
```php
setting('seo.title');
setting('seo.description');
Storage::url(setting('seo.image'));
```

## Set values programmically
You can set setting with `set_setting` function.
```php
set_setting('seo.title', 'edited title');
setting('seo.title'); // edited title
```

## Alias functions
if `setting` or `set_setting` function defined before you can use `sanjab_setting` to get setting and `sanjab_set_setting` to set setting instead.

## Methods

## properties
```php
protected static function properties(): SettingProperties
```
This function returns Setting controller properties. and should return an instance of `Sanjab\Helpers\SettingProperties` with all properties that need to override.
```php
SettingProperties::create(KEY)
                ->property1(value 1)
                ->property2(value 2)
```

#### key
`type: string`

Route and group key of settings.

#### title
`type: string`

Title of setting.

#### description
`type: string`

Short description of the setting.

#### icon
`type: string`

Icon of setting.

#### globalSearch
`type: boolean`

Should be present in global search or not.

#### badge
`type: function`

Function to create content of menu item badge (Example: `function () {return Model::where('status',
 0)->count();}`)

#### badgeVariant
`type: string`

Menu badge bootstrap variant. (Example: success, danger, ...)

------

## init
```php
protected function init(): void
```
This function called when using the controller before call action.
You can define controller `Widgets` in this function.

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
