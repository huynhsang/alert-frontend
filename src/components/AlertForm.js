import React from 'react';
import AlertService from '../services/AlertService';

const REASON_MAPPING = {
    'CNC Machine': ['Spindle Error', 'Axis Problem', 'Normal'],
    'Milling Machine': ['Machine Crash', 'Router Fault', 'Normal']
};

const ACTIONS = ['Immediate', 'Later', 'No Action'];

export default class AlertForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: this.props.alert,
            reason: this.props.alert.reason,
            action: this.props.alert.action,
            comment: this.props.alert.comment,
            showAlert: false,
            updateSuccess: false,
        };

        this.submit = this.submit.bind(this);
        this.alertService = new AlertService();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.alert.id !== this.props.alert.id) {
            this.setState({
                alert: this.props.alert,
                reason: this.props.alert.reason,
                action: this.props.alert.action,
                comment: this.props.alert.comment
            });
        }
    }

    handleChange(ev, key) {
        const data = { [key]: ev.target.value };
        this.setState(data);
    }

    submit() {
        const self = this;
        const currentAlert = this.props.alert;
        const {reason, action, comment} = this.state;
        if (!reason || !action || !comment) {
            return self.setState({ showAlert: true, updateSuccess: false });
        }

        const payload = {
            reason: this.state.reason,
            action: this.state.action,
            comment: this.state.comment,
        };

        this.alertService.updateById(currentAlert.id, payload, (err, result) => {
            if (err) {
                return self.setState({ showAlert: true, updateSuccess: false });
            }
            self.setState({ showAlert: true, updateSuccess: true });

        });
    }

    render() {
        const self = this;
        const comment = this.state.comment || '';
        const reason = this.state.reason || '';
        const action = this.state.action || '';
        const { alert, showAlert, updateSuccess } = this.state;
        return (
            <div className="row">
                <div className="col-sm-9">
                    <form onSubmit={self.submit}>
                        <div className="form-group">
                            <label>Equipment</label>
                            <p>{alert.machine}</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="reason">Suspected Reason</label>
                            <select className="form-control" id="reason" value={reason}
                                    onChange={(e) => self.handleChange(e, 'reason')}>
                                <option disabled value=''> Unknown Anomaly</option>
                                {
                                    REASON_MAPPING[alert.machine].map((reason, index) => {
                                        return (
                                            <option key={index} value={reason}>{reason}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="action">Action Required</label>
                            <select className="form-control" id="action" value={action}
                                    onChange={(e) => self.handleChange(e, 'action')}>
                                <option disabled value=''> Select Action</option>
                                {
                                    ACTIONS.map((action, index) => {
                                        return (
                                            <option key={index} value={action}>{action}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="comment">Comments</label>
                            <textarea className="form-control" id="comment" rows="3" value={comment}
                                      onChange={(e) => self.handleChange(e, 'comment')}/>
                        </div>
                        <button type="submit" className="btn btn-update">Update</button>

                        {
                            showAlert ?
                                updateSuccess ?
                                    <div className="alert alert-success">
                                        <strong>Success!</strong> The alert was updated.
                                    </div> :
                                    <div className="alert alert-danger">
                                        <strong>Error!</strong> Something went wrong.
                                    </div>
                                : ''

                        }
                    </form>
                </div>
            </div>
        );
    }
}
