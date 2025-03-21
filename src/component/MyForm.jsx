import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const MyForm = () => {
  const [token, setToken] = useState("");
  const [language, setLanguage] = useState("en");
  const captchaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (token) {
      console.log('Form submitted with token:', token);
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    // Reset captcha when language changes
    if (captchaRef.current) {
      captchaRef.current.reset();
      setToken("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      maxWidth: '400px', 
      margin: '20px auto', 
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>      
      <div role="region" aria-label="captcha verification">
        <ReCAPTCHA
          ref={captchaRef}
          sitekey="6Lciq_sqAAAAACCjCZFUl4vq294MRJKJ2DpYNtmJ"
          onChange={setToken}
          hl={language}
          theme="light"
          aria-label="Human verification captcha"
        />
      </div>
      
      <button 
        type="submit" 
        disabled={!token}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: token ? '#4CAF50' : '#cccccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: token ? 'pointer' : 'not-allowed'
        }}
        aria-disabled={!token}
      >
        Submit Form
      </button>
    </form>
  );  
};

export default MyForm;
