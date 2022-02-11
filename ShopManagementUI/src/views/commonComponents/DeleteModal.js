import React from 'react';
import {
    CButton,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CModalFooter
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

/**
 * isDelete
 * toggleDeleteModal
 * deleteOpp
 * 
 */

const DeleteModal = (props) => {
    return (
        <CModal
            style={{ marginLeft: "100px", marginTop: "100px" }}
            show={props.isDelete}
            onClose={() => props.toggleDeleteModal(!props.isDelete)}
            color="danger"
        >
            <CModalHeader closeButton>
                <CModalTitle>Delete Confirmation</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <h6>Are you sure, you want to delete it? You can not revert this.</h6>
            </CModalBody>
            <CModalFooter>
                <CButton type="button" color="danger" size="sm" onClick={(e) => {
                    e.preventDefault();
                    props.deleteOpp();
                    props.toggleDeleteModal(!props.isDelete);
                }}><FontAwesomeIcon icon={faTrash} /> Delete</CButton>
                <CButton color="secondary" size="sm" onClick={() => { props.toggleDeleteModal(!props.isDelete) }}> 
                    <FontAwesomeIcon icon={faTimes} /> Cancel
                </CButton>
            </CModalFooter>
        </CModal>
    );
}

export default DeleteModal;