import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Select from 'react-select';
import PageHeader from "../../components/common/PageHeader";
import menuData from '../../components/Data/permissions.json';
import axiosInstance from "../../api/axiosEndpoint"; 
import toast from 'react-hot-toast';

const API_URL = "/role";

const ManageRoles = () => {

    const [isModal, setIsModal] = useState(false);
    const [isEditModalData, setIsEditModalData] = useState(null);
    const [modalHeader, setModalHeader] = useState(null);
    const [formData, setFormData] = useState({
        roleName: "",
        permissions: []
    });

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteRoleId, setDeleteRoleId] = useState(null);

    const [rolesData, setRolesData] = useState([]);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await axiosInstance.get(API_URL);
            if(response.data.success){
                setRolesData(response.data.roles);
            }
            console.log("rolesData",rolesData)
        } catch (error) {
            if(error.response && error.response.data){
                toast.error(error.response.data.message)
            } else {
                toast.error(error.message)
                console.log(error.message)
            }
        }
    };

    const handleEditModal = (rowData) => {
        setIsModal(true);
        setIsEditModalData(rowData);
        setModalHeader('Edit Role');
        setFormData({
            roleName: rowData.roleName,
            permissions: rowData.permissions
        });
    };

    const handleDeleteModal = (roleId) => {
        setDeleteRoleId(roleId);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteRole = async () => {
        try {
            const response = await axiosInstance.delete(`${API_URL}/${deleteRoleId}`);
            if(response.data.success){
                toast.success(response.data.message)
            }
            setFormData({
                roleName: "",
                permissions: []
            });
            setIsDeleteModalOpen(false);
            fetchRoles();
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message);
                console.log(error.message);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handlePermissionSelection = (selectedPermissions) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            permissions: selectedPermissions.map(permission => permission.value)
        }));
    };

    const handleSubmit = async () => {
        try {
            if (formData.roleName.trim() === "") {
                toast.error("Role Name cannot be empty");
                return;
            }

            if (formData.permissions.length === 0) {
                toast.error("Please select at least one permission");
                return;
            }

            const method = isEditModalData ? 'PUT' : 'POST';
            const url = isEditModalData ? `${API_URL}/${isEditModalData._id}` : API_URL;

            const response = await axiosInstance({
                method: method,
                url: url,
                data: formData,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                toast.success(response.data.message);
            }

            setFormData({
                roleName: "",
                permissions: []
            });
            setIsModal(false);
            fetchRoles();
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message);
                console.log(error.message);
            }
        }
    };

    const columns = [
        {
            name: "Role Name",
            selector: (row) => row.roleName,
            sortable: true
        },
        {
            name: "Permissions",
            selector: (row) => row.permissions.join(", "),
            sortable: true
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button className="btn btn-outline-secondary" onClick={() => handleEditModal(row)}><i className="icofont-edit text-success"></i></button>
                    <button className="btn btn-outline-secondary deleterow" onClick={() => handleDeleteModal(row._id)}><i className="icofont-ui-delete text-danger"></i></button>
                </div>
            ),
            button: true
        }
    ];

    return (
        <div className="container-xxl">
            <PageHeader headerTitle="Manage Roles" renderRight={() => (
                <div className="col-auto d-flex w-sm-100">
                    <button className="btn btn-dark btn-set-task w-sm-100" onClick={() => { setIsModal(true); setModalHeader('Add Role'); }}>
                        <i className="icofont-plus-circle me-2 fs-6"></i>Add Role
                    </button>
                </div>
            )} />
            <div className="row clearfix g-3">
                <div className="col-sm-12">
                    <DataTable
                        title="Roles"
                        columns={columns}
                        data={rolesData} // Use rolesData state here
                        pagination
                        selectableRows={false}
                        className="table myDataTable table-hover align-middle mb-0 d-row nowrap dataTable no-footer dtr-inline"
                        highlightOnHover={true}
                    />
                </div>
            </div>
            <Modal centered show={isModal} onHide={() => { setIsModal(false); setIsEditModalData(null); setFormData({ roleName: "", permissions: [] }); }}>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">{modalHeader}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="roleNameInput" className="form-label">Role Name</label>
                        <input type="text" className="form-control" id="roleNameInput" name="roleName" value={formData.roleName} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="permissionsInput" className="form-label">Permissions</label>
                        <Select
                            id="permissionsInput"
                            name="permissions"
                            options={menuData.map(item => ({ value: item.name, label: item.name }))}
                            isMulti
                            value={formData.permissions.map(permission => ({ value: permission, label: permission }))}
                            onChange={(selectedOptions) => handlePermissionSelection(selectedOptions)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={() => { setIsModal(false); setIsEditModalData(null); setFormData({ roleName: "", permissions: [] }); }}>Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>{isEditModalData ? 'Save Changes' : 'Add Role'}</button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal centered show={isDeleteModalOpen} onHide={() => setIsDeleteModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Delete Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this role?</p>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
                    <button type="button" className="btn btn-danger" onClick={handleDeleteRole}>Delete</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageRoles;
