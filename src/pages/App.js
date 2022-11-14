import React from 'react';
import AlertService from '../services/AlertService';
import AlertItem from '../components/AlertItem';
import AlertDetail from '../components/AlertDetail';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alerts: [],
            selected: null
        };
        this.alertService = new AlertService();
        this.getAlerts();
    }

    getAlerts() {
        const self = this;
        this.alertService.findAll((err, alerts) => {
            if (err) {
                return self.setState({ err });
            }
            const updateState = { alerts };
            if (alerts.length > 0) {
                updateState.selected = alerts[0];
            }
            self.setState(updateState);
        });
    }

    selectAlert(alert) {
        if (!this.state.selected || this.state.selected.id !== alert.id) {
            this.setState({ selected: alert });
        }
    }

    render() {
        const self = this;
        const { selected, alerts } = self.state;
        return (
            <div className="App">
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">Logo</a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav">
                                <li><a href="#">DASHBOARD</a></li>
                                <li className="active"><a href="#">ALERTS</a></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="#"><span className="glyphicon glyphicon-cog"></span></a></li>
                                <li><a href="#"><span className="glyphicon glyphicon-user"></span></a></li>
                                <li><a href="#"><span className="glyphicon glyphicon-bell"></span></a></li>
                                <li className="vertical-line">|</li>
                                <li><a href="#">Welcome Admin</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="container-fluid app-body">
                    <div className="row machine-section">
                        <select name="machine" id="machine">
                            <option value="CNC Machine">CNC Machine</option>
                            <option value="Milling Machine">Milling Machine</option>
                        </select>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 sidenav">
                            <div className="back-row">
                                <p><span className="glyphicon glyphicon-triangle-left"/>Back</p>
                            </div>
                            <div className="statistic-row">
                                <p>{alerts.length} Alerts <span>0 New</span></p>
                            </div>
                            {
                                alerts.map((alert, index) => {
                                    let className = "alert-item";
                                    if (alert.id === selected.id) {
                                        className = "alert-item selected";
                                    }
                                    return (
                                        <div className={className} key={index} onClick={() => self.selectAlert(alert)}>
                                            <AlertItem alert={alert}/>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        {
                            selected ? <AlertDetail alert={selected}/> : ''
                        }
                    </div>
                </div>
            </div>
        );
    }
}
