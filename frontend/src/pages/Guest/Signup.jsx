import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Signup.scss';
import Cookies from 'js-cookie';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const inputRefs = useRef([]);
  
  // Form data state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Set the current step based on the URL path
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/signup/credentials')) {
      setCurrentStep(1);
    } else if (path.includes('/signup/information')) {
      setCurrentStep(2);
    } else if (path.includes('/signup/verification')) {
      setCurrentStep(3);
    } else if (path.includes('/signup/completed')) {
      setCurrentStep(4);
    }
    
    // Load saved form data from cookies first, then localStorage as fallback
    const cookieData = Cookies.get('signup_form_data');
    if (cookieData) {
      try {
        setFormData(JSON.parse(cookieData));
      } catch (e) {
        console.error('Error parsing cookie data:', e);
        // Try localStorage as fallback
        const savedFormData = localStorage.getItem('signup_form_data');
        if (savedFormData) {
          setFormData(JSON.parse(savedFormData));
        }
      }
    } else {
      // Try localStorage as fallback
      const savedFormData = localStorage.getItem('signup_form_data');
      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
      }
    }
  }, [location.pathname]);

  // Focus on the first input when verification component mounts
  useEffect(() => {
    if (currentStep === 3 && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    // Handle responsive styles
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentStep]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVerificationInputChange = (index, e) => {
    const value = e.target.value;
    
    // Only allow numbers
    if (value && !/^[0-9]$/.test(value)) {
      return;
    }

    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);

    // Move focus to next input if current one is filled
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current is empty
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    
    // Handle arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    // Check if pasted content contains 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const newVerificationCode = pastedData.split('');
      setVerificationCode(newVerificationCode);
      
      // Focus on the last input
      inputRefs.current[5].focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    
    const code = verificationCode.join('');
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsSubmitting(true);
    
    // Update registration progress in both cookie and localStorage
    Cookies.set('registration_progress', 'completed', { expires: 7 });
    localStorage.setItem('registration_progress', 'completed');
    
    // Mock verification process
    setTimeout(() => {
      // For demo, we'll accept any 6-digit code
      // Navigate to completion
      navigate('/signup/completed');
    }, 1500);
  };

  const handleResendCode = () => {
    setError('');
    // Mock resend code functionality
    alert('A new verification code has been sent to your email');
  };

  const handleCredentialsSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Store email and form data in both cookie and localStorage
    Cookies.set('signup_email', formData.email, { expires: 7 });
    Cookies.set('signup_form_data', JSON.stringify(formData), { expires: 7 });
    Cookies.set('registration_progress', 'credentials', { expires: 7 });
    
    localStorage.setItem('signup_email', formData.email);
    localStorage.setItem('signup_form_data', JSON.stringify(formData));
    localStorage.setItem('registration_progress', 'credentials');
    
    // Navigate to next step
    navigate('/signup/information');
  };
  
  const handleInformationSubmit = (e) => {
    e.preventDefault();
    
    // Store form data in both cookie and localStorage
    Cookies.set('signup_form_data', JSON.stringify(formData), { expires: 7 });
    Cookies.set('registration_progress', 'information', { expires: 7 });
    
    localStorage.setItem('signup_form_data', JSON.stringify(formData));
    localStorage.setItem('registration_progress', 'information');
    
    // Navigate to next step
    navigate('/signup/verification');
  };

  const handleBack = () => {
    if (currentStep === 2) {
      navigate('/signup/credentials');
    } else if (currentStep === 3) {
      navigate('/signup/information');
    }
  };

  // Render progress bar
  const renderProgress = () => (
    <div className="progress-steps">
      <div className={`progress-step ${currentStep > 1 ? 'completed' : currentStep === 1 ? 'active' : ''}`}>
        <div className="step-circle">
          {currentStep > 1 ? '✓' : '1'}
        </div>
        <div className="step-label">Credentials</div>
      </div>
      <div className={`progress-step ${currentStep > 2 ? 'completed' : currentStep === 2 ? 'active' : ''}`}>
        <div className="step-circle">
          {currentStep > 2 ? '✓' : '2'}
        </div>
        <div className="step-label">Information</div>
      </div>
      <div className={`progress-step ${currentStep > 3 ? 'completed' : currentStep === 3 ? 'active' : ''}`}>
        <div className="step-circle">
          {currentStep > 3 ? '✓' : '3'}
        </div>
        <div className="step-label">Verification</div>
      </div>
      <div className={`progress-step ${currentStep === 4 ? 'active' : ''}`}>
        <div className="step-circle">4</div>
        <div className="step-label">Completed</div>
      </div>
    </div>
  );

  // Render credentials step
  const renderCredentials = () => (
    <div className="credentials-container">
      <h2>Create Account</h2>
      <p>Enter your details to get started</p>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleCredentialsSubmit}>
        <div className="form-group">
          <input 
            type="text" 
            name="fullName"
            placeholder="Full Name" 
            value={formData.fullName}
            onChange={handleInputChange}
            required 
          />
        </div>
        
        <div className="form-group">
          <input 
            type="email"
            name="email" 
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <input 
            type="password"
            name="password" 
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <input 
            type="password"
            name="confirmPassword" 
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange} 
            required 
          />
        </div>
        
        <button 
          type="submit" 
          className="next-button"
        >
          Next
        </button>
      </form>
      
      <div className="login-prompt">
        Already have an account? <Link to="/login" className="login-link">Sign in</Link>
      </div>
    </div>
  );

  // Render information step
  const renderInformation = () => (
    <div className="information-container">
      <h2>Personal Information</h2>
      <p>Tell us a bit about yourself</p>
      
      <form onSubmit={handleInformationSubmit}>
        <div className="form-group">
          <select 
            name="gender" 
            value={formData.gender || ''}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <input 
            type="date"
            name="dob" 
            placeholder="Date of Birth"
            value={formData.dob || ''}
            onChange={handleInputChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <input 
            type="tel"
            name="phone" 
            placeholder="Phone Number"
            value={formData.phone || ''}
            onChange={handleInputChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <textarea 
            name="bio"
            placeholder="Brief Bio (Optional)"
            value={formData.bio || ''}
            onChange={handleInputChange} 
            rows="3"
          ></textarea>
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="back-button"
            onClick={handleBack}
          >
            Back
          </button>
          <button 
            type="submit" 
            className="next-button"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );

  // Render verification step
  const renderVerification = () => (
    <div className="verification-container">
      <h2>Verify Your Email</h2>
      
      <div className="email-icon">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="60" height="60" rx="30" fill="#E53935" fillOpacity="0.1"/>
          <path d="M40 22.5H20C18.625 22.5 17.5125 23.625 17.5125 25L17.5 37.5C17.5 38.875 18.625 40 20 40H40C41.375 40 42.5 38.875 42.5 37.5V25C42.5 23.625 41.375 22.5 40 22.5ZM40 27.5L30 32.5L20 27.5V25L30 30L40 25V27.5Z" fill="#E53935"/>
        </svg>
      </div>
      
      <p className="verification-text">Enter the 6-digit code sent to your email.</p>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleVerify}>
        <div className="verification-inputs">
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleVerificationInputChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              aria-label={`Digit ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="back-button"
            onClick={handleBack}
          >
            Back
          </button>
          <button 
            type="submit" 
            className="verify-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Verifying...' : 'Verify'}
          </button>
        </div>
      </form>
      
      <div className="resend-code">
        <button className="resend-link" onClick={handleResendCode}>
          Didn't receive a code? Resend
        </button>
      </div>
      
      <div className="login-prompt">
        Already have an account? <Link to="/login" className="login-link">Sign in</Link>
      </div>
    </div>
  );

  // Render completion step
  const renderCompletion = () => (
    <div className="completion-container">
      <h2>Registration Complete</h2>
      <p>Your account has been successfully created!</p>
      <button 
        className="login-button"
        onClick={() => {
          // Clear signup data from both cookies and localStorage
          Cookies.remove('signup_email');
          Cookies.remove('registration_progress');
          Cookies.remove('signup_form_data');
          
          localStorage.removeItem('signup_email');
          localStorage.removeItem('registration_progress');
          localStorage.removeItem('signup_form_data');
          
          // Navigate to login
          navigate('/login');
        }}
      >
        Sign In
      </button>
    </div>
  );

  // Render main content based on current step
  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return renderCredentials();
      case 2:
        return renderInformation();
      case 3:
        return renderVerification();
      case 4:
        return renderCompletion();
      default:
        return null;
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="brand-header">
        <div className="brand">
          <span className="brand-name">Techno</span>
          <span className="brand-highlight">Match</span>
        </div>
        <div className="nav-links">
          <Link to="/" className="home-link">Home</Link>
        </div>
      </div>

      <div className="signup-container">
        {renderProgress()}
        <div className="signup-card">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Signup; 