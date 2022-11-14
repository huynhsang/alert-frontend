import React from 'react';
import RootScope from '../global/RootScope';

export default class WaveSurferItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wavesurfer: null
        }

        this.audioRef = React.createRef();
    }

    componentDidMount() {
        this.initWaveSurfer();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.sourcePath !== this.props.sourcePath) {
            this.state.wavesurfer.destroy();
            this.audioRef.current.load();
            this.initWaveSurfer();
        }
    }

    initWaveSurfer() {
        const label = this.props.label || '';
        const wavesurfer = WaveSurfer.create({
            container: `#${label}-waveform`,
            waveColor: '#D2EDD4',
            progressColor: '#46B54D'
        });

        wavesurfer.on('ready', function () {
            const spectrogram = Object.create(WaveSurfer.Spectrogram);
            spectrogram.init({
                wavesurfer: wavesurfer,
                container: `#${label}-wave-spectrogram`,
                fftSamples: 1024,
                frequencyMin: 0,
                frequencyMax: 8000,
                labels: true
            });
        });

        wavesurfer.load(this.getSource());
        this.setState({wavesurfer})
    }

    getSource() {
        const sourcePath = this.props.sourcePath || '';
        return `${RootScope.apiURL}files/${sourcePath}`;
    }

    render() {
        const label = this.props.label || '';
        const source = this.getSource();
        return (
            <div className="audio">
                <p>{label} Machine Output</p>
                <audio ref={this.audioRef} controls>
                    <source src={source} type="audio/x-wav"/>
                    Your browser does not support the audio element.
                </audio>

                <div id={`${label}-waveform`} className="waveform"/>
                <div id={`${label}-wave-spectrogram`} className="wave-spectrogram"/>
            </div>
        )
    }
}
