import React from 'react';
import Portal from './Portal';
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";


// class Modal extends Component {

const ModalWindow = ({
        title, isOpen, onCancel, children}) => {

        return (
            <React.Fragment>
                {isOpen &&
                <Portal>
                    <Modal

                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={true}
                        onHide={onCancel}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">{title} </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {children}
                        </Modal.Body>
                        <Modal.Footer>

                            {/*<Button id="saveEditOrderButton" className="saveEdit btn btn-primary" onClick={onSubmit}>Сохранить изменения</Button>*/}
                            {/*<Button id="closeEditForm" className="btn btn-secondary" data-dismiss="modal" onClick={onCancel}>Закрыть</Button>*/}
                        </Modal.Footer>
                    </Modal>
                </Portal>
                }
            </React.Fragment>
        );

};


ModalWindow.propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    children: PropTypes.node,
};

ModalWindow.defaultProps = {
    title: 'Modal title',
    isOpen: false,
    onCancel: () => {},
    onSubmit: () => {},
    children: null,
};



export default ModalWindow;