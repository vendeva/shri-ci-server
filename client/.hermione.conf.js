module.exports = {
    sets: {
        desktop: {
            files: "tests/desktop",
            browsers: ["chrome_desktop"],
        },
        mobile: {
            files: "tests/mobile",
            browsers: ["chrome_mobile"],
        },
    },

    browsers: {
        chrome_desktop: {
            desiredCapabilities: {
                browserName: "chrome",
            },
            retry: 3,
            windowSize: {
                width: 1024,
                height: 640,
            },
            screenshotDelay: 2000,
        },
        chrome_mobile: {
            desiredCapabilities: {
                browserName: "chrome",
            },
            retry: 3,
            windowSize: {
                width: 360,
                height: 640,
            },
            screenshotDelay: 2000,
            resetCursor: false,
        },
    },
};
