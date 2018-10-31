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
