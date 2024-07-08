import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Select from 'react-select';
import PageHeader from "../../components/common/PageHeader";

// Fake data for demonstration
const RolesData = [
    {
        id: 1,
        roleName: "Admin",
        permissions: ["Projects", "Tasks", "Timesheet"]
    },
    {
        id: 2,
        roleName: "Manager",
        permissions: ["Leaders", "Our Clients", "Clients"]
    },
    {
        id: 3,
        roleName: "Employee",
        permissions: ["Client Profile", "Employees", "Members"]
    },
    // Add more fake data as needed
];

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

    // Columns for DataTable
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
        setModalHeader('Edit Role');
        setFormData({
            roleName: rowData.roleName,
            permissions: rowData.permissions
        });
    };

    // Function to handle opening delete modal
    const handleDeleteModal = (roleId) => {
        setDeleteRoleId(roleId);
        setIsDeleteModalOpen(true);
    };

    // Function to handle deleting a role
    const handleDeleteRole = () => {
        // Implement your delete logic here, for demo just log
        console.log("Deleting role with ID:", deleteRoleId);
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

    // Function to handle permission selection
    const handlePermissionSelection = (selectedPermissions) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            permissions: selectedPermissions.map(permission => permission.value)
        }));
    };

    // Function to handle form submission
    const handleSubmit = () => {
        // Add your form submission logic here
        console.log("Form submitted with data:", formData);
        setIsModal(false);
        // Reset form data
        setFormData({
            roleName: "",
            permissions: []
        });
    };

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
                        data={RolesData}
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
                            options={[
                                { value: 'Projects', label: 'Projects' },
                                { value: 'Tasks', label: 'Tasks' },
                                { value: 'Timesheet', label: 'Timesheet' },
                                { value: 'Leaders', label: 'Leaders' },
                                { value: 'Our Clients', label: 'Our Clients' },
                                { value: 'Clients', label: 'Clients' },
                                { value: 'Client Profile', label: 'Client Profile' },
                                { value: 'Employees', label: 'Employees' },
                                { value: 'Members', label: 'Members' },
                                { value: 'Holidays', label: 'Holidays' },
                                { value: 'Attendance', label: 'Attendance' }
                            ]}
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
