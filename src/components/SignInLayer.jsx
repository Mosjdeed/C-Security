import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Particles from 'react-tsparticles';
import { loadFull } from "tsparticles";
import MainImg from "../assets/forgot-pass-img.png"; 
import LogoImage from "../assets/logo.png"; 


const TextScramble = ({ text }) => {
    const [displayText, setDisplayText] = useState('');
    const chars = '!<>-_\\/[]{}—=+*^?#________';

    useEffect(() => {
        let frame = 0;
        let iteration = 0;
        const finalText = text;
        
        const animate = () => {
            if (iteration >= finalText.length) return;

            setDisplayText(prev => {
                const updated = prev.split('');
                for (let i = iteration; i < finalText.length; i++) {
                    updated[i] = chars[Math.floor(Math.random() * chars.length)];
                }
                updated[iteration] = finalText[iteration];
                return updated.join('');
            });

            if (frame % 3 === 0) {
                iteration++;
            }
            frame++;
            requestAnimationFrame(animate);
        };

        animate();
    }, [text]);

    return <span>{displayText}</span>;
};

const RippleButton = ({ children, className, ...props }) => {
    const createRipple = (e) => {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;
        ripple.className = 'ripple';
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 1000);
    };

    return (
        <button className={`ripple-button ${className}`} {...props} onClick={createRipple}>
            {children}
        </button>
    );
};

const SignInLayer = () => {
    
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
    };

    const particlesInit = async (engine) => {
        await loadFull(engine);
    };

    return (
        <div className="container-fluid min-vh-100">
            {/* Particles Background */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    particles: {
                        number: {
                            value: 50,
                            density: {
                                enable: true,
                                value_area: 800
                            }
                        },
                        color: {
                            value: theme === 'light' ? "#0d6efd" : "#ffffff"
                        },
                        line_linked: {
                            enable: true,
                            color: theme === 'light' ? "#0d6efd" : "#ffffff",
                            opacity: 0.2
                        },
                        move: {
                            enable: true,
                            speed: 1
                        }
                    }
                }}
                className="particles-container"
            />

            {/* Morphing Background Shape */}
            <div className="bg-shape"></div>

            <div className="row min-vh-100">
                {/* Left Side - Illustration */}
                <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center bg-light">
                    <div className="illustration-container">
                    <img  className="img-fluid w-100 p-4 illustration-layer"  src={MainImg} alt = "main" />

                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="col-lg-6 d-flex align-items-center">
                    <div className="w-100 max-w-550 mx-auto px-4 max-h-300">
                        {/* Logo */}
                        <div className="mb-4 logo-animation">
                        <img  className="height-40"  src={LogoImage} alt = "Log" />
                        </div>

                        {/* Header */}
                        <div className="title-animation">
                            <h1 className="h3 fw-bold mb-2">
                                <TextScramble text="Sign In to your Account" />
                            </h1>
                            <p className="text-muted mb-4">Welcome back! please enter your detail</p>
                        </div>

                        {/* Login Form */}
                        <form className="form-animation" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <div className="input-group-custom">
                                    <span className="input-icon">
                                        <Icon icon="material-symbols:mail-outline" />
                                    </span>
                                    <input 
                                        type="email" 
                                        className="form-control-custom" 
                                        placeholder="Email"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="input-group-custom">
                                    <span className="input-icon">
                                        <Icon icon="material-symbols:lock-outline" />
                                    </span>
                                    <input 
                                        type="password" 
                                        className="form-control-custom" 
                                        placeholder="Password"
                                    />
                                    <span className="input-icon-right">
                                        <Icon icon="material-symbols:visibility-outline" />
                                    </span>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div className="form-check-custom">
                                    <input type="checkbox" className="form-check-input-custom" id="remember" />
                                    <label className="form-check-label" htmlFor="remember">
                                        Remember me
                                    </label>
                                </div>
                                <Link to="/forgot-password" className="text-primary text-decoration-none hover-link">
                                    Forgot Password?
                                </Link>
                            </div>

                            <RippleButton 
                                type="submit" 
                                className={`btn-custom-primary w-100 mb-4 ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                            >
                                Sign In
                            </RippleButton>

                            <div className="text-center position-relative mb-4">
                                <div className="divider-text">Or sign in with</div>
                            </div>

                            <div className="d-flex gap-3 mb-4 social-animation">
                                <RippleButton type="button" className="btn-custom-outline w-50">
                                    <Icon icon="logos:facebook" className="me-2" />
                                    Facebook
                                </RippleButton>
                                <RippleButton type="button" className="btn-custom-outline w-50">
                                    <Icon icon="logos:google-icon" className="me-2" />
                                    Google
                                </RippleButton>
                            </div>

                            <div className="text-center fade-in-up">
                                <span className="text-muted">Don't have an account? </span>
                                <Link to="/sign-up" className="text-primary text-decoration-none hover-link">
                                    Sign Up
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Theme Switch Button */}
            <button 
                className="theme-switch"
                onClick={toggleTheme}
                aria-label="Toggle theme"
            >
                {theme === 'light' ? (
                    <Icon icon="material-symbols:dark-mode-outline" width="24" height="24" />
                ) : (
                    <Icon icon="material-symbols:light-mode-outline" width="24" height="24" />
                )}
            </button>
        </div>
    );
};

export default SignInLayer;