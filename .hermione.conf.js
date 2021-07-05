module.exports = {
    baseUrl: "http://localhost:8000",
    gridUrl: "http://127.0.0.1:4444/wd/hub",

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: "chrome",
            },
        },
    },
    plugins: {
        // "html-reporter/hermione": {
        //     path: "hermione/html-reports",
        // },
        "url-decorator": {
            query: {
                enable_exp: "1",
            },
        },
        //"selenium-standalone-runner": true,
    },
};
