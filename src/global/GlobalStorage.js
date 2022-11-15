export default class GlobalStorage {
    static alerts = []

    static updateAlertItem(alert) {
        for (let i = 0; i < GlobalStorage.alerts.length; i++) {
            if (GlobalStorage.alerts[i].id === alert.id) {
                GlobalStorage.alerts[i] = alert;
                break;
            }
        }
    }
}
