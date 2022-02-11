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
import { faThumbsUp, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

/**
 * isDelete
 * toggleDeleteModal
 * deleteOpp
 * 
 */

const ApproveModal = (props) => {
    return (
        <CModal
            style={{ marginLeft: "100px", marginTop: "100px" }}
            show={props.isApprove}
            onClose={() => props.toggleApproveModal(!props.isApprove)}
            color="danger"
        >
            <CModalHeader closeButton>
                <CModalTitle>Approve Confirmation</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <h6>Are you sure, you want to Approve it? You can not revert this.</h6>
            </CModalBody>
            <CModalFooter>
                <CButton type="button" color="success" onClick={(e) => {
                    e.preventDefault();
                   // props.deleteOpp();
                    props.toggleApproveModal(!props.isApprove);
                }}><FontAwesomeIcon icon={faThumbsUp} /> Approve</CButton>
                <CButton color="secondary" onClick={() => { props.toggleApproveModal(!props.isApprove) }}> 
                    <FontAwesomeIcon icon={faTimes} /> Cancel
                </CButton>
            </CModalFooter>
        </CModal>
    );
}

export default ApproveModal;