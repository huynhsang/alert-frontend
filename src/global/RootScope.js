const API_URL = process.env.API_URL;

export default class RootScope {
    static
    get apiURL() {
        return API_URL;
    }
}