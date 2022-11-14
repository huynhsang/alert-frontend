import BasicService from './BasicService';
import RootScope from '../global/RootScope';

export default class AlertService extends BasicService {
    constructor() {
        super();
        this.api = RootScope.apiURL + 'api/alerts';
    }

    findAll(callback) {
        this.get(this.api, callback);
    }

    updateById(id, data, callback) {
        const self = this;
        const url = self.api + '/' + id;
        self.patch(url, data, callback);
    }
}
