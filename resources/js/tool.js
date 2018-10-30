Nova.booting((Vue, router) => {
    router.addRoutes([
        {
            name: 'agenda',
            path: '/agenda',
            component: require('./components/Tool'),
        },
    ])
})
