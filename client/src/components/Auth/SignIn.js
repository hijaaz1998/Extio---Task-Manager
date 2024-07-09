import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import toast from 'react-hot-toast';
import axiosInstance from "../../api/axiosEndpoint";
import GoogleImg from "../../assets/images/google.svg";
import { useDispatch } from 'react-redux';
import { login } from "../../redux/slices/userSlice";

function SignIn() {

    const dispatch = useDispatch();

    const history = useHistory();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
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
        const { email, password } = formData;

        if (!email || !password) {
            toast.error('Please fill in all fields.');
            return;
        }

        try {
            const response = await axiosInstance.post('/user/login', { email, password });
            if (response.data.success) {
                toast.success(response.data.message);
                dispatch(login(response.data.user));
                localStorage.setItem('token',response.data.token)
                console.log(response.data)
                history.push('/');
            } else {
                toast.error(response.data.message);
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

    return (
        <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
            <div className="w-100 p-3 p-md-5 card border-0 bg-dark text-light" style={{ maxWidth: "32rem" }}>
                <form className="row g-1 p-3 p-md-4" onSubmit={handleSubmit}>
                    <div className="col-12 text-center mb-1 mb-lg-5">
                        <h1>Sign in</h1>
                        <span>Free access to our dashboard.</span>
                    </div>
                    <div className="col-12 text-center mb-4">
                        <a className="btn btn-lg btn-outline-secondary btn-block" href="#!">
                            <span className="d-flex justify-content-center align-items-center">
                                <img className="avatar xs me-2" src={GoogleImg} alt="Image Description" />
                                Sign in with Google
                            </span>
                        </a>
                        <span className="dividers text-muted mt-4">OR</span>
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
                            <div className="form-label">
                                <span className="d-flex justify-content-between align-items-center">
                                    Password
                                    <Link className="text-secondary" to="password-reset">Forgot Password?</Link>
                                </span>
                            </div>
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                placeholder="***************"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                id="flexCheckDefault"
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <div className="col-12 text-center mt-4">
                        <button type="submit" className="btn btn-lg btn-block btn-light lift text-uppercase">SIGN IN</button>
                    </div>
                    <div className="col-12 text-center mt-4">
                        <span className="text-muted">Don't have an account yet? <Link to="sign-up" className="text-secondary">Sign up here</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
