const config = {
    dev: {
        apiRootURL: 'http://localhost:8080/',
        leagcyAPIRootURL: 'http://localhost:9100/managers/api/',
        basename: '/',
        // apiRootURL: 'http://10.10.11.4:8090/',
        // leagcyAPIRootURL: 'http://localhost:9100/managers/api/',
        // basename: '/',
    },
    prod: {
        apiRootURL: 'https://oyster.meican.com/mcadmin/',
        leagcyAPIRootURL: 'https://oyster.meican.com/managers/api/',
        basename: '/meican/banquet',
    }
}

export default config