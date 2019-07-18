
export const config = {
    dev: {
        apiRootURL: 'http://localhost:8090/',
        basename: '/dev',
    },
    prod: {
        apiRootURL: 'https://www.geluxiya.com/',
        basename: '/coco',
    }
}

let host = config.prod.apiRootURL;
if (process.env.NODE_ENV === 'development') {
    host = config.dev.apiRootURL;
}

export const Host = host