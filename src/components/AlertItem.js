import React from 'react';

const ALERT_TYPES = ['Mild', 'Moderate', 'Severe'];

export default class AlertItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const alert = this.props.alert || {};
        const reason = alert.reason || 'Unknown Anomaly';
        return (
            <div className="card">
                <div>
                    <p className="left">ID #{alert.id}</p>
                    <p className="right type">{ALERT_TYPES[alert.type - 1]}</p>
                </div>
                <p className="clear-both"><b>{reason}</b></p>
                <p>Detected at: {alert.detectionTime}</p>
                <p className="blue">{alert.machine}</p>
            </div>
        );
    }
}
