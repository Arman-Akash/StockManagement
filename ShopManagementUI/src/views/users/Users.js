import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from '@coreui/react';
import { faSave, faTimes, faUserEdit } from '@fortawesome/free-solid-svg-icons';
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Formik & Yup lib
import { Form, Formik } from "formik";
import React, { useState } from 'react';
import * as Yup from "yup";
import * as axios from '../../axios/axiosLib';
import * as dataApi from '../../customHooks/UseDataApi';
import * as initialState from '../../functionalLib/initialState';
import AddButton from '../commonComponents/AddButton';
import DeleteIcon from '../commonComponents/DeleteIcon';
import DeleteModal from '../commonComponents/DeleteModal';
import SAInput from '../FormLib/saInput';
import * as keys from '../../axios/keys';
import * as storage from '../../axios/storage';
import SAReactAutoSelect from '../FormLib/SAReactAutoSelect';
import SACheckBox from '../FormLib/saCheckBoxTest'
import { Roles } from '../../staticData';

const Users = () => {
    var user = storage.loadState(keys.LOGGED_IN_USER);

    const [isAddModalOpen, toggleAddModal] = useState(false);
    const [isDelete, toggleDeleteModal] = useState(false);
    const [isEditUser, toggleEditModal] = useState(false);
    let [createUserObj, setCreateUserObj] = useState({
        data: {
            id: '',
            username: '',
            password: '',
            confrimPassword: '',
            branchId: 0,
            permissions: ''
        }
    });

    const fields = ['username','branchName', { label: 'Role', key: 'permissions' }, 'actions'];
    let users = dataApi.useDataApi(`api/Account`, initialState.initialCollections);
    let branches = dataApi.useDataApi(`api/Branch`, initialState.initialCollections);


    let [userId, setUserId] = useState();

    // if (!(user.username.toLowerCase() == "dg" || user.username == "admin")) {
    //     return <Redirect to='/403' />
    // }
    return (
        <CCard>
            <CCardBody>
                <CCol md='6'>
                    <AddButton
                        onClick={() => {
                            toggleAddModal(!isAddModalOpen);
                            setCreateUserObj({
                                ...createUserObj,
                                data: {
                                    id: '',
                                    username: '',
                                    password: '',
                                    confrimPassword: '',
                                    roleId: []
                                }
                            });
                        }} />
                    <CDataTable
                        items={users.data.data}
                        fields={fields}
                        tableFilter
                        border
                        pagination
                        striped
                        scopedSlots={{
                            'actions':
                                (item) => (
                                    <td>
                                        <FontAwesomeIcon
                                            title="Permission"
                                            className="text-warning"
                                            icon={faUserEdit}
                                            onClick={() => {
                                                var roleIds = [];
                                                item.roles.forEach(e => {
                                                    roleIds.push(e.roleId);
                                                })
                                                setCreateUserObj({
                                                    ...createUserObj,
                                                    data: {
                                                        id: item.id,
                                                        username: item.username,
                                                        permissions: item.permissions,
                                                        branchId : item.branchId,
                                                        password: '',
                                                        confrimPassword: '',
                                                        roleId: roleIds,
                                                        isActive: item.isActive
                                                    }
                                                });
                                                setUserId(item.id)
                                                toggleEditModal(!isEditUser);
                                            }}
                                        />
                                        <DeleteIcon
                                            onClick={() => {
                                                setCreateUserObj({
                                                    ...createUserObj,
                                                    data: {
                                                        id: item.id,
                                                    }
                                                });
                                                toggleDeleteModal(true);
                                            }}
                                            style={{
                                                marginLeft: '5%'
                                            }} />
                                    </td>
                                )
                        }}
                    />
                </CCol>

                {/* Create New User */}
                <CModal
                    style={{ marginLeft: "0px", marginTop: "100px" }}
                    show={isAddModalOpen}
                    onClose={() => toggleAddModal(!isAddModalOpen)}
                    color="primary"
                >
                    <Formik
                        enableReinitialize
                        initialValues={{
                            id: createUserObj.data.id,
                            username: createUserObj.data.username,
                            branchId: createUserObj.data.branchId,
                            permissions: createUserObj.data.permissions,
                            password: createUserObj.data.password,
                            confrimPassword: createUserObj.data.confrimPassword,
                            roleId: createUserObj.data.roleId
                        }}
                        validationSchema={
                            Yup.object({
                                username: Yup.string()
                                    .required("Required"),
                                password: Yup.string()
                                    .required("required"),
                                confrimPassword: Yup.string()
                                    .oneOf([Yup.ref('password'), null], 'Password did not match')
                            })
                        }
                        onSubmit={(values, { resetForm }) => {
                            var roles = []
                            for (var i = 0; i < values.roleId.length; i++) {
                                roles.push({
                                    roleId: values.roleId[i]
                                })
                            }
                            axios.fetchPostData('api/account/createuser', values, () => {
                                users.refresh();
                            });
                            resetForm();
                            toggleAddModal(false);
                        }}
                    >
                        {
                            formProps => {
                                return (
                                    <>
                                        <CModalHeader closeButton>
                                            <CModalTitle>Create New User</CModalTitle>
                                        </CModalHeader>
                                        <Form>
                                            <CModalBody>
                                                <CCol md="12">
                                                    <SAInput
                                                        id="username"
                                                        name="username"
                                                        type="text"
                                                        label="Username"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="7"
                                                        labelClassName="float-right"
                                                        isRequired="true"
                                                    />
                                                </CCol>
                                                <CCol md="12">
                                                    <SAReactAutoSelect
                                                        id="branchId"
                                                        name="branchId"
                                                        label="Branch"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="7"
                                                        labelClassName="float-right"
                                                        formProps={formProps}
                                                        options={branches.data?.data?.map(e => {
                                                            return { label: e.name, value: e.id }
                                                        })}
                                                    />
                                                </CCol>
                                                <CCol md="12">
                                                    <SAReactAutoSelect
                                                        id="permissions"
                                                        name="permissions"
                                                        label="Role"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="7"
                                                        labelClassName="float-right"
                                                        formProps={formProps}
                                                        options={[
                                                            { label: Roles.Admin, value: Roles.Admin },
                                                            { label: Roles.Warehouse, value: Roles.Warehouse },
                                                            { label: Roles.Outlet, value: Roles.Outlet }
                                                        ]}
                                                    />
                                                </CCol>
                                                <CCol md="12">
                                                    <SAInput
                                                        name="password"
                                                        type="password"
                                                        label="Password"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="7"
                                                        labelClassName="float-right"
                                                        isRequired="true"
                                                    />
                                                </CCol>
                                                <CCol md="12">
                                                    <SAInput
                                                        name="confrimPassword"
                                                        type="password"
                                                        label="Confirm Password"
                                                        isInline="true"
                                                        lSize="4"
                                                        rSize="7"
                                                        labelClassName="float-right"
                                                        isRequired="true"
                                                    />
                                                </CCol>
                                            </CModalBody>
                                            <CModalFooter>
                                                <CButton type="submit" color="success" size="sm"><FontAwesomeIcon icon={faSave} /> Save</CButton>
                                                <CButton color="secondary" size="sm" onClick={() => { toggleAddModal(!isAddModalOpen) }}><FontAwesomeIcon icon={faTimes} /> Cancel</CButton>
                                            </CModalFooter>
                                        </Form>
                                    </>
                                );
                            }
                        }
                    </Formik>
                </CModal>

                {/* edit Modal */}
                <CModal
                    style={{ marginLeft: "0px", marginTop: "80px" }}
                    show={isEditUser}
                    onClose={() => toggleEditModal(!isEditUser)}
                    color="primary"
                >
                    <Formik
                        enableReinitialize
                        initialValues={createUserObj.data}
                        validationSchema={
                            Yup.object({
                                username: Yup.string()
                                    .required("Required"),
                                // password: Yup.string()
                                //     .required("required"),
                                // confrimPassword: Yup.string()
                                //     .oneOf([Yup.ref('password'), null], 'Password did not match'),
                                isActive: Yup.string()
                                    .required()
                            })
                        }
                        onSubmit={(values, { resetForm }) => {
                            var roles = []
                            for (var i = 0; i < values.roleId.length; i++) {
                                roles.push({
                                    roleId: values.roleId[i]
                                })
                            }
                            values.roles = roles;
                            axios.fetchPutData(`api/account/updateUser/${values.id}`, values, () => {
                                users.refresh();
                            });
                            resetForm();
                            toggleEditModal(false);
                        }}
                    >
                        {
                            formProps => {
                                return (
                                    <>
                                        <CModalHeader closeButton>
                                            <CModalTitle>Edit User</CModalTitle>
                                        </CModalHeader>
                                        <CModalBody>
                                            <Form>
                                                <CModalBody>
                                                    <CCol md="12">
                                                        <SAInput
                                                            name="username"
                                                            type="text"
                                                            label="Username"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="7"
                                                            labelClassName="float-right"
                                                            isRequired="true"
                                                        />
                                                    </CCol>
                                                    <CCol md="12">
                                                        <SAReactAutoSelect
                                                            id="branchId"
                                                            name="branchId"
                                                            label="Branch"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="7"
                                                            labelClassName="float-right"
                                                            formProps={formProps}
                                                            options={branches.data?.data?.map(e => {
                                                                return { label: e.name, value: e.id }
                                                            })}
                                                        />
                                                    </CCol>
                                                    <CCol md="12">
                                                        <SAReactAutoSelect
                                                            id="permissions"
                                                            name="permissions"
                                                            label="Role"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="7"
                                                            labelClassName="float-right"
                                                            formProps={formProps}
                                                            options={[
                                                                { label: Roles.Admin, value: Roles.Admin },
                                                                { label: Roles.Warehouse, value: Roles.Warehouse },
                                                                { label: Roles.Outlet, value: Roles.Outlet }
                                                            ]}
                                                        />
                                                    </CCol>
                                                    <CCol md="12">
                                                        <SACheckBox
                                                            id="isActive"
                                                            name="isActive"
                                                            label="Active"
                                                            isRequired="true"
                                                            lSize="4"
                                                            rSize="8"
                                                            isInline="true"
                                                            formProps={formProps}
                                                            labelClassName="float-right"
                                                            className="ml-0"
                                                        />
                                                    </CCol>
                                                    <hr />
                                                    <CCol md="12" className="text-center mb-2">
                                                        <span style={{ color: "#999", fontSize: "12px" }}>*Leave the password field empty if you keep it unchanged</span>
                                                    </CCol>
                                                    <CCol md="12">
                                                        <SAInput
                                                            name="password"
                                                            type="password"
                                                            label="Password"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="7"
                                                            labelClassName="float-right"
                                                            isRequired="true"
                                                        />
                                                    </CCol>
                                                    <CCol md="12">
                                                        <SAInput
                                                            name="confrimPassword"
                                                            type="password"
                                                            label="Confirm Password"
                                                            isInline="true"
                                                            lSize="4"
                                                            rSize="7"
                                                            labelClassName="float-right"
                                                            isRequired="true"
                                                        />
                                                    </CCol>
                                                </CModalBody>
                                                <CModalFooter>
                                                    <CButton type="submit" color="success" size="sm"><FontAwesomeIcon icon={faSave} /> Save</CButton>
                                                    <CButton color="secondary" size="sm" onClick={() => toggleEditModal(!isEditUser)}><FontAwesomeIcon icon={faTimes} /> Cancel</CButton>
                                                </CModalFooter>
                                            </Form>
                                        </CModalBody>
                                    </>
                                );
                            }
                        }
                    </Formik>
                </CModal>
                {/*Delete Modal section*/}
                <DeleteModal
                    isDelete={isDelete}
                    toggleDeleteModal={toggleDeleteModal}
                    deleteOpp={() => {
                        axios.fetchDeleteData(`api/Account/${createUserObj.data.id}`, () => {
                            users.refresh();
                        });
                    }}
                />
            </CCardBody>
        </CCard>
    )
}
export default Users
