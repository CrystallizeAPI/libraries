export const debug = (...args) => {
    if (process.env.DEBUG) {
        console.log(...args);
    }
}
