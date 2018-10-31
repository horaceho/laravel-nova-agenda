## About Laravel Nova Agenda
Laravel Nova Agenda is an event calendar built from Laravel Nova Tool.

![Laravel Nova Agenda](https://raw.githubusercontent.com/horaceho/laravel-nova-agenda/master/resources/images/nova-ant-design-vue.png)

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
This section is a step-by-step guide to build Laravel Nova Agenda. Once Laravel and Laravel Nova are setup up properly, follow the [Laravel Nova documentation](https://nova.laravel.com/docs/) to create a blank tool:
````
php artisan nova:resource-tool horaceho/agenda

Would you like to install the tool's NPM dependencies? (yes/no) [yes]:
> yes
Would you like to compile the tool's assets? (yes/no) [yes]:
> yes
Would you like to update your Composer packages? (yes/no) [yes]:
> yes
````
Update ````app/Providers/NovaServiceProvider````:
````
use Horaceho\Agenda\Agenda;

    public function tools()
    {
        return [
            new Agenda,
        ];
    }
````
Add route to ````nova-components/Agenda/routes/api.php````:
````
use App\Event;

Route::get('/events', function (Request $request) {
    $events = Event::all();
    return response()->json($events);
});
````
Install a calendar module, we pick [Ant Design of Vue](https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce/):
````
npm install ant-design-vue --save
````
Get rid of the ````ajv@^6.0.0```` warning:
````
npm install ajv@^6.0.0 --save
````
Auto-compile the assets:
````
npm run watch
````
Import Calendar in ````nova-components/Agenda/resources/js/tool.js````:
````
import {
    Antd,
    Calendar
} from 'ant-design-vue';

Nova.booting((Vue, router) => {
    Vue.component(Calendar.name, Calendar);
    router.addRoutes([
        {
            name: 'agenda',
            path: '/agenda',
            component: require('./components/Tool'),
        },
    ])
})
````
Display calendar in ````nova-components/Agenda/resources/js/components/Tool.vue````:
````
<template>
    <card class="flex flex-col items-center justify-center" style="min-height: 300px">
        <a-calendar @panelChange="onPanelChange" @select="onSelect" @change="onChange">
            <ul class="" slot="dateCellRender" slot-scope="value">
                <li v-for="event in getDayEvents(value)" :key="event.id">
                    {{ event.title }}
                </li>
            </ul>
        </a-calendar>
    </card>
</template>

<script>
export default {
    methods: {
        onPanelChange(value, mode) {
            console.log("onPanelChange()", value.format(), mode);
        },
        onSelect(value) {
            console.log("onSelect()", value.format());
        },
        onChange(value) {
            console.log("onChange()", value.format());
        },
        getDayEvents(calendar_date) {
            console.log("getEvents()");
            let dayEvents = []
            if (this.events) {
                this.events.forEach((event) => {
                    let event_date = moment(event.start_date)
                    if (moment(event_date).isSame(calendar_date, 'day')) {
                        dayEvents.push(event)
                    }
                })
            }
            return dayEvents
        },
    },
    mounted() {
        console.log('mounted()')
        axios.get('/horaceho/agenda/events').then(response => {
            this.events = response.data
        });
    },
    data() {
        console.log('data()')
        return {
            debug: null,
            events: null
        }
    }
}
</script>

<style>
@import '~ant-design-vue/dist/antd.css';
</style>
````
Now, create a few events to show on the calendar...

## Credit
- [Publishing Your First Laravel Nova Tool](https://tighten.co/blog/publishing-your-first-laravel-nova-tool) by Sara Bine

## License
Laravel Nova Agenda is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).