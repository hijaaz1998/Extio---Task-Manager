import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import PageHeader from "../../components/common/PageHeader";
import Select from 'react-select';
import axiosInstance from "../../api/axiosEndpoint"; 
import toast from 'react-hot-toast';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const [isEditModalData, setIsEditModalData] = useState(null);
    const [modalHeader, setModalHeader] = useState(null);
    const [rolesData, setRolesData] = useState([]);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        roles: []
    });

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);

    const columns = [
        {
            name: "First Name",
            selector: (row) => row.firstName,
            sortable: true
        },
        {
            name: "Last Name",
            selector: (row) => row.lastName,
            sortable: true
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true
        },
        {
            name: "Mobile",
            selector: (row) => row.mobile,
            sortable: true
        },
        {
            name: "Roles",
            selector: (row) => row.roles.map(role => role.roleName).join(", "),
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

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get('/user/users');
            if (response.data.success) {
                setUsers(response.data.users);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message);
                console.log(error.message);
            }
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await axiosInstance.get('/role');
            if (response.data.success) {
                setRolesData(response.data.roles);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message);
                console.log(error.message);
            }
        }
    };

    const handleEditModal = (rowData) => {
        setIsModal(true);
        setIsEditModalData(rowData._id);
        setModalHeader('Edit User');
        setFormData({
            firstName: rowData.firstName,
            lastName: rowData.lastName,
            email: rowData.email,
            mobile: rowData.mobile,
            roles: rowData.roles
        });
    };

    const handleDeleteModal = (userId) => {
        setDeleteUserId(userId);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteUser = async () => {
        try {
            const response = await axiosInstance.delete(`/user/user/${deleteUserId}`);
            if (response.data.success) {
                toast.success(response.data.message);
                fetchUsers();
            }

            setIsDeleteModalOpen(false);
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

    const handleRoleSelection = (selectedRoles) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            roles: selectedRoles.map(role => ({
                _id: role.value,
                roleName: role.label
            }))
        }));
    };

    const handleSubmit = async () => {
        try {    
            if(validateForm()){
                const method = isEditModalData ? 'PUT' : 'POST';
                const url = isEditModalData ? `/user/user/${isEditModalData}` : `/user/create`;

                console.log('t',method)
                console.log('t',url)
                console.log(formData)
    
                const response = await axiosInstance({
                    method: method,
                    url: url,
                    data: formData,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('after')
                if (response.data.success) {
                    toast.success(response.data.message);
                    fetchUsers();
                }
    
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    mobile: "",
                    roles: []
                });
                setIsModal(false);
            }       
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message);
                console.log(error.message);
            }
        }
    };

    const validateForm = () => {
        if (formData.firstName.trim() === "") {
            toast.error("First Name cannot be empty");
            return false;
        }

        if (formData.lastName.trim() === "") {
            toast.error("Last Name cannot be empty");
            return false;
        }

        if (formData.email.trim() === "") {
            toast.error("Email cannot be empty");
            return false;
        }

        if (formData.mobile === "") {
            toast.error("Mobile cannot be empty");
            return false;
        }

        if (formData.roles.length === 0) {
            toast.error("Please select at least one role");
            return false;
        }
        return true;
    };

    return (
        <div className="container-xxl">
            <PageHeader headerTitle="Manage Users" renderRight={() => (
                <div className="col-auto d-flex w-sm-100">
                    <button className="btn btn-dark btn-set-task w-sm-100" onClick={() => { setIsModal(true); setModalHeader('Add User'); }}>
                        <i className="icofont-plus-circle me-2 fs-6"></i>Add User
                    </button>
                </div>
            )} />
            <div className="row clearfix g-3">
                <div className="col-sm-12">
                    <DataTable
                        title="Users"
                        columns={columns}
                        data={users}
                        pagination
                        selectableRows={false}
                        className="table myDataTable table-hover align-middle mb-0 d-row nowrap dataTable no-footer dtr-inline"
                        highlightOnHover={true}
                    />
                </div>
            </div>
            <Modal centered show={isModal} onHide={() => { setIsModal(false); setIsEditModalData(null); setFormData({ firstName: "", lastName: "", email: "", mobile: "", roles: [] }); }}>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">{modalHeader}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="firstNameInput" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="firstNameInput" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastNameInput" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lastNameInput" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="emailInput" className="form-label">Email</label>
                        <input type="email" className="form-control" id="emailInput" name="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mobileInput" className="form-label">Mobile</label>
                        <input type="text" className="form-control" id="mobileInput" name="mobile" value={formData.mobile} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rolesSelect" className="form-label">Roles</label>
                        <Select
                            id="rolesSelect"
                            isMulti
                            options={rolesData.map(role => ({ value: role._id, label: role.roleName }))}
                            value={formData.roles.map(role => ({ value: role._id, label: role.roleName }))}
                            onChange={handleRoleSelection}
                            closeMenuOnSelect={false}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={() => { setIsModal(false); setIsEditModalData(null); setFormData({ firstName: "", lastName: "", email: "", mobile: "", roles: [] }); }}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>{isEditModalData ? 'Save Changes' : 'Add User'}</button>
                </Modal.Footer>
            </Modal>
            <Modal show={isDeleteModalOpen} onHide={() => setIsDeleteModalOpen(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
                    <button type="button" className="btn btn-danger" onClick={handleDeleteUser}>Delete</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageUsers;
