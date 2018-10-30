## About Laravel Nova Agenda
Laravel Nova Agenda is an event calendar built from Laravel Nova Tool.

## Getting Start
Create a new Laravel application with Laravel Nova following the instructions on offical websites:
- [Laravel](https://laravel.com/docs/master)
- [Laravel Nova](https://nova.laravel.com/docs/)

Create a simple Event model:
````
php artisan make:model Event --migration
````
Add Event fields to ````create_events_table.php```` migration file:
````
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->increments('id');
            $table->text('title');
            $table->dateTime('start_date')->nullable();
            $table->dateTime('end_date')->nullable();
            $table->timestamps();
        });
    }
````
Perform the migration:
````
php artisan migrate
````
Update fields to ````App\Nova\Event.php```` resource:
````
    public function fields(Request $request)
    {
        return [
            ID::make()->sortable(),
            Text::make('Title')->rules('required'),
            DateTime::make('From', 'start_date'),
            DateTime::make('To', 'end_date'),
        ];
    }
````
Define ````$dates```` in ````App\Event.php```` model:
````
class Event extends Model
{
    protected $dates = [
        'start_date',
        'end_date',
    ];
}
````

## Making Of
This section is a step-by-step guide to build Laravel Nova Agenda.

## Credit
- [Publishing Your First Laravel Nova Tool](https://tighten.co/blog/publishing-your-first-laravel-nova-tool) by Sara Bine

## License
Laravel Nova Agenda is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).