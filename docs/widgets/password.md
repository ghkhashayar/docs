---
sidebarDepth: 0
---
# Password Widget
![Password widget](../images/screenshots/widgets/password.jpg)

A simple password input.

## Sample
```php
use Sanjab\Widgets\PasswordWidget;

$this->widgets[] = PasswordWidget::create('password')
    ->rules('required|min:8');
```
