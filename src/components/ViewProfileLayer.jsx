import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import UserImage from "../assets/images.png"; 
import CoverImage from "../assets/user-grid-bg1.png"; 

const ViewProfileLayer = () => {
    const [imagePreview, setImagePreview] = useState('assets/images/user-grid/user-grid-img13.png');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    // Toggle function for password field
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Toggle function for confirm password field
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const readURL = (input) => {
        if (input.target.files && input.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(input.target.files[0]);
        }
    };
    return (
        <div className="row gy-4">
            <div className="col-lg-4">
                <div className="user-grid-card position-relative border radius-16 overflow-hidden bg-base h-100">
                    <img  className="w-100 object-fit-cover"  src={CoverImage} alt = "user" />

                    <div className="pb-24 ms-16 mb-24 me-16  mt--100">
                        <div className="text-center border border-top-0 border-start-0 border-end-0">
                        <img className="border br-white border-width-2-px w-200-px h-200-px rounded-circle object-fit-cover" src={UserImage} alt="user" />

                                
                            <h6 className="mb-0 mt-16">Jacob Jones</h6>
                            <span className="text-secondary-light mb-16">ifrandom@gmail.com</span>
                        </div>
                        <div className="mt-24">
                            <h6 className="text-xl mb-16">Personal Info</h6>
                            <ul>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        Full Name
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : Will Jonto
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Email
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : willjontoax@gmail.com
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Phone Number
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : (1) 2536 2561 2365
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Department
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : Design
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Designation
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : UI UX Designer
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Languages
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : English
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Bio
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : Lorem Ipsum&nbsp;is simply dummy text of the printing and
                                        typesetting industry.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-8">
    <div className="card h-100">
        <div className="card-body p-24">
            <ul
                className="nav border-gradient-tab nav-pills mb-20 d-inline-flex"
                id="pills-tab"
                role="tablist"
            >
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link d-flex align-items-center px-24 active"
                        id="pills-change-passwork-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-change-passwork"
                        type="button"
                        role="tab"
                        aria-controls="pills-change-passwork"
                        aria-selected="true"
                    >
                        Change Password
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div 
                    className="tab-pane fade show active" 
                    id="pills-change-passwork" 
                    role="tabpanel" 
                    aria-labelledby="pills-change-passwork-tab" 
                    tabIndex="0"
                >
                    <div className="mb-20">
                        <label htmlFor="your-password" className="form-label fw-semibold text-primary-light text-sm mb-8">
                            New Password <span className="text-danger-600">*</span>
                        </label>
                        <div className="position-relative">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                className="form-control radius-8"
                                id="your-password"
                                placeholder="Enter New Password*"
                            />
                            <span
                                className={`toggle-password ${passwordVisible ? "ri-eye-off-line" : "ri-eye-line"} cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                                onClick={togglePasswordVisibility}
                            ></span>
                        </div>
                    </div>

                    <div className="mb-20">
                        <label htmlFor="confirm-password" className="form-label fw-semibold text-primary-light text-sm mb-8">
                            Confirm Password <span className="text-danger-600">*</span>
                        </label>
                        <div className="position-relative">
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                className="form-control radius-8"
                                id="confirm-password"
                                placeholder="Confirm Password*"
                            />
                            <span
                                className={`toggle-password ${confirmPasswordVisible ? "ri-eye-off-line" : "ri-eye-line"} cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                                onClick={toggleConfirmPasswordVisibility}
                            ></span>
                        </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-center gap-3">
                        <button
                            type="button"
                            className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
                    </div>

    );
};

export default ViewProfileLayer;