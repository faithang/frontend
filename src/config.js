const env = process.env.NODE_ENV || "development"

const config = {
    test: {
        API_ENDPOINT: "http://localhost:9000/api/todos"
    },
    development: {
        API_ENDPOINT: "http://localhost:9000/api/todos"
    },
    production: {
        API_ENDPOINT: "https://asia-southeast1-geekout-api-demo.cloudfunctions.net/default/api/todosfirebase"
    },
}[env];

export default config;