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
