import React from 'react';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
        this.submit = this.submit.bind(this);
    }

    closeModal(e) {
        e.stopPropagation();
        this.props.closeModal();
    }

    submit() {
        const post = {title: this.refs.title.value}
        if (this.refs.id) {
            post.id = this.refs.id.value;
        }
        this.props.submitFn(post);
    }

    render() {
        const self = this;
        const {displayModal} = self.props;
        const post = self.props.modalData || {};
        const modal = displayModal ?
            <div className="modal" onClick={ self.closeModal }>
                <div className="modal-content" onClick={ e => e.stopPropagation() }>
                    <span className="close" onClick={ self.closeModal }>&times;</span>
                    <div className="modal-flex">
                        <form onSubmit={self.submit}>
                            {
                                post.id ?
                                    <div className="form-group">
                                        <label>ID:</label>
                                        <input type="text" className="form-control" defaultValue={post.id} ref="id" disabled={true}/>
                                    </div> : ""
                            }

                            <div className="form-group">
                                <label>Title:</label>
                                <input type="text" className="form-control" defaultValue={post.title} ref="title"/>
                            </div>
                            <button type="submit" className="btn">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div> : "";
        return ( modal )
    }
}