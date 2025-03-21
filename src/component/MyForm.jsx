import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const MyForm = () => {
  const [token, setToken] = useState("");
  const [language, setLanguage] = useState("en");
  const captchaRef = useRef(null);

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "hi", name: "Hindi" },
    { code: "bn", name: "Bengali" }
  ];

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
      <div style={{ marginBottom: '20px' }}>
        <h2>Accessible Captcha Form</h2>
        
        {/* Language Selection */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="language" style={{ marginRight: '10px' }}>
            Select Language:
          </label>
          <select 
            id="language" 
            value={language} 
            onChange={handleLanguageChange}
            style={{ padding: '5px' }}
            aria-label="Select language for captcha"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <p style={{ 
          color: '#666', 
          fontSize: '14px', 
          marginBottom: '15px' 
        }}>
          For audio verification, click the headphone icon in the bottom right corner of the CAPTCHA.
        </p>
      </div>
      
      <div role="region" aria-label="captcha verification">
        <ReCAPTCHA
          ref={captchaRef}
          sitekey="6LfmZ_sqAAAAAOOWcmv-Es9xdRW-SQKhoe1jyWof"
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
