import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import PageHeader from "../../components/common/PageHeader";
import Select from 'react-select';

// Fake data for demonstration
const UsersData = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        mobile: "+1234567890",
        roles: ["admin", "manager"]
    },
    {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        mobile: "+1987654321",
        roles: ["hr", "coordinator"]
    },
    {
        id: 3,
        firstName: "Michael",
        lastName: "Johnson",
        email: "michael.johnson@example.com",
        mobile: "+1122334455",
        roles: ["admin", "hr"]
    },
    
    // Add more fake data as needed
];

const ManageUsers = () => {
    const [isModal, setIsModal] = useState(false);
    const [isEditModalData, setIsEditModalData] = useState(null);
    const [modalHeader, setModalHeader] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        roles: []
    });

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);

    // Columns for DataTable
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
            selector: (row) => row.roles.join(", "),
            sortable: true
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button className="btn btn-outline-secondary" onClick={() => handleEditModal(row)}><i className="icofont-edit text-success"></i></button>
                    <button className="btn btn-outline-secondary deleterow" onClick={() => handleDeleteModal(row.id)}><i className="icofont-ui-delete text-danger"></i></button>
                </div>
            ),
            button: true
        }
    ];

    // Function to handle opening edit modal
    const handleEditModal = (rowData) => {
        setIsModal(true);
        setIsEditModalData(rowData);
        setModalHeader('Edit User');
        setFormData({
            firstName: rowData.firstName,
            lastName: rowData.lastName,
            email: rowData.email,
            mobile: rowData.mobile,
            roles: rowData.roles
        });
    };

    // Function to handle opening delete modal
    const handleDeleteModal = (userId) => {
        setDeleteUserId(userId);
        setIsDeleteModalOpen(true);
    };

    // Function to handle deleting a user
    const handleDeleteUser = () => {
        // Implement your delete logic here, for demo just log
        console.log("Deleting user with ID:", deleteUserId);
        // Close delete modal
        setIsDeleteModalOpen(false);
    };

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    // Function to handle role selection
    const handleRoleSelection = (selectedRoles) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            roles: selectedRoles.map(role => role.value)
        }));
    };

    // Function to handle form submission
    const handleSubmit = () => {
        // Add your form submission logic here
        console.log("Form submitted with data:", formData);
        setIsModal(false);
        // Reset form data
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            roles: []
        });
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
                        data={UsersData}
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
                        <input type="tel" className="form-control" id="mobileInput" name="mobile" value={formData.mobile} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rolesInput" className="form-label">Roles</label>
                        <Select
                            id="rolesInput"
                            name="roles"
                            options={[
                                { value: 'admin', label: 'Admin' },
                                { value: 'manager', label: 'Manager' },
                                { value: 'hr', label: 'HR' },
                                { value: 'coordinator', label: 'Coordinator' }
                            ]}
                            isMulti
                            value={formData.roles.map(role => ({ value: role, label: role }))}
                            onChange={(selectedOptions) => handleRoleSelection(selectedOptions)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={() => { setIsModal(false); setIsEditModalData(null); setFormData({ firstName: "", lastName: "", email: "", mobile: "", roles: [] }); }}>Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>{isEditModalData ? 'Save Changes' : 'Add User'}</button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal centered show={isDeleteModalOpen} onHide={() => setIsDeleteModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this user?</p>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
                    <button type="button" className="btn btn-danger" onClick={handleDeleteUser}>Delete</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageUsers;
