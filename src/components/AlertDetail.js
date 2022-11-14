import WaveSurferItem from './WaveSurferItem';
import React from 'react';
import AlertService from '../services/AlertService';
import AlertForm from './AlertForm';

export default class AlertDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: this.props.alert
        }

        // Create refs
        this.reasonRef = React.createRef();
        this.actionRef = React.createRef();
        this.commentRef = React.createRef();

        this.submit = this.submit.bind(this);

        this.alertService = new AlertService();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.alert.id !== this.props.alert.id) {
            this.setState({alert: this.props.alert})
        }
    }

    submit() {
        const currentAlert = this.props.alert;
        const payload = {
            reason: this.reasonRef.current,
            action: this.actionRef.current,
            comment: this.commentRef.current
        };

        this.alertService.updateById(currentAlert.id, payload, (err, result) => {
            if (err) {
                return self.setState({ err });
            }
            self.setState({ alert: result });
        });
    }

    render() {
        const alert = this.state.alert;
        return (
            <div className="col-sm-9 alert-detail">
                <div className="row info">
                    <h3>Alert ID #{alert.id}</h3>
                    <p>Detected at {alert.detectionTime}</p>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="row">
                            <WaveSurferItem label="Anomaly"
                                            sourcePath={alert.anomalyOutputPath}/>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="row">
                            <WaveSurferItem label="Normal" sourcePath={alert.normalOutputPath}/>
                        </div>
                    </div>
                </div>

                <AlertForm alert={alert} />
            </div>
        )
    }
}
