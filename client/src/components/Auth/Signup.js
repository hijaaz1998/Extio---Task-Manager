import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import axiosInstance from "../../api/axiosEndpoint";

function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobile: '',
        termsAccepted: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate form
        const { firstName, lastName, email, password, confirmPassword, mobile, termsAccepted } = formData;
        if (!firstName || !lastName || !email || !password || !confirmPassword || !mobile) {
            toast.error('Please fill in all fields.');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }
        if (!termsAccepted) {
            toast.error('You must accept the terms and conditions.');
            return;
        }
        try {
            const response = await axiosInstance.post('/user/create', {data: formData});
            if(response.data.success){
                toast.success(response.data.message);
            }

            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                mobile: '',
                termsAccepted: false
            })
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message);
                console.log(error.message);
            }
        }
    };

    return (
        <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
            <div className="w-100 p-3 p-md-5 card border-0 bg-dark text-light" style={{ maxWidth: "32rem" }}>
                <form className="row g-1 p-3 p-md-4" onSubmit={handleSubmit}>
                    <div className="col-12 text-center mb-1 mb-lg-5">
                        <h1>Create your account</h1>
                        <span>Free access to our dashboard.</span>
                    </div>
                    <div className="col-6">
                        <div className="mb-2">
                            <label className="form-label">First name</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="John"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-2">
                            <label className="form-label">Last name</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Parker"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-2">
                            <label className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                placeholder="name@example.com"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-2">
                            <label className="form-label">Mobile</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="123-456-7890"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-2">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                placeholder="8+ characters required"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-2">
                            <label className="form-label">Confirm password</label>
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                placeholder="8+ characters required"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="termsAccepted"
                                checked={formData.termsAccepted}
                                onChange={handleChange}
                                id="flexCheckDefault"
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                I accept the <a href="#!" title="Terms and Conditions" className="text-secondary">Terms and Conditions</a>
                            </label>
                        </div>
                    </div>
                    <div className="col-12 text-center mt-4">
                        <button type="submit" className="btn btn-lg btn-block btn-light lift text-uppercase">SIGN UP</button>
                    </div>
                    <div className="col-12 text-center mt-4">
                        <span className="text-muted">Already have an account? <Link to="sign-in" title="Sign in" className="text-secondary">Sign in here</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
