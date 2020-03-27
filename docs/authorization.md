# Authorization

- [Creating a Super Admin](#creating-a-super-admin)
- [Seeding Database](#seeding-database)
- [Model Policies](#model-policies)
- [Custom Permissions](#custom-permissions)

Authorization in sanjab is based on [Bouncer](https://github.com/JosephSilber/bouncer).

You can set permissions for roles in Roles panel.

## Creating a Super Admin
Super admin is root admin that can set roles/permissions for other users.
To create a new super admin run following command.
```bash
php artisan sanjab:make:admin
```
Command will ask you email of user to convert an existing user to super admin.

## Seeding Database
You can create roles/permissions with [database seeders](https://laravel.com/docs/seeding). check [Bouncer docs](https://github.com/JosephSilber/bouncer) for more informations.

Example:
```php
use Bouncer;
use Silber\Bouncer\Database\Role;

if (! Role::where('name', 'admin')->exists()) {
    Role::create(['name' => 'admin', 'title' => 'Normal Admin']);
    Bouncer::allow('admin')->to('access_sanjab'); // Allow access to admin panel
    Bouncer::allow('admin')->to('update_setting_general'); // Allow access to general setting
    Bouncer::allow('admin')->to('update_setting_seo'); // allow access to seo setting

    foreach ([
        \App\Category::class,
        \App\Product::class,
        \App\Order::class,
        \App\Comment::class,
    ] as $model) { // Allow manage CRUD with these models (only with default permission keys)
        Bouncer::allow('admin')->toManage($model);
    }
    Bouncer::assign('admin')->to($adminUser);
}

if (! Role::where('name', 'writer')->exists()) {
    Role::create(['name' => 'writer', 'title' => 'Writer']);
    Bouncer::allow('writer')->to('access_sanjab'); // Allow access to admin panel
    Bouncer::allow('writer')->to('create', \App\Article::class); // allow writers to create articles.

    Bouncer::assign('writer')->to($writerUser);
}
```

## Model Policies
Sanjab supports Eloquent [policies](https://laravel.com/docs/authorization#creating-policies) as well.

So you can check permissions runtime.

Example:
```php
class ArticlePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the model.
     *
     * @param  \Illuminate\Foundation\Auth\User $user
     * @param  \App\Article   $article
     * @return mixed
     */
    public function update(User $user, Article $article)
    {
        return $user->isA('super_admin') || $user->id == $article->user_id; // Only super admins can edit all articles. Others only can edit their own articles.
    }
}
```

## Custom Permissions
If you want define your custom permission be editable on roles panel then go to `AppServiceProvider.php` and use following function to submit your custom permission.

```php
use Sanjab;
use Sanjab\Helpers\PermissionItem;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Sanjab::addPermission(
            PermissionItem::create('Permission Group')
                ->addPermission('Permission Title', 'unique_permission_name')
                ->addPermission('Another Permission Title', 'create', \App\YourModel::class)
        );
    }
}
```

You can also set order in check box groups.

#### order
`type: int`

Order in checkbox groups.
