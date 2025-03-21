import React, { useState, useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const MyForm = () => {
  const [token, setToken] = useState("");
  const [language, setLanguage] = useState("en");
  const [useAudio, setUseAudio] = useState(false);
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

  const resetCaptcha = () => {
    if (captchaRef.current) {
      captchaRef.current.resetCaptcha();
    }
    setToken("");
  };

  const toggleAudioMode = () => {
    setUseAudio(!useAudio);
    resetCaptcha();
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
            onChange={(e) => setLanguage(e.target.value)}
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

        {/* Accessibility Options */}
        <div style={{ marginBottom: '15px' }}>
          <button
            type="button"
            onClick={toggleAudioMode}
            style={{
              padding: '8px 16px',
              backgroundColor: useAudio ? '#4CAF50' : '#f0f0f0',
              color: useAudio ? 'white' : 'black',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            aria-pressed={useAudio}
          >
            <span role="img" aria-label="headphones icon" style={{ fontSize: '20px' }}>
              🎧
            </span>
            {useAudio ? 'Audio Mode Active' : 'Enable Audio Mode'}
          </button>
          <p style={{ 
            color: '#666', 
            fontSize: '14px', 
            marginTop: '8px' 
          }}>
            {useAudio 
              ? "Audio mode is enabled. You will receive an audio challenge." 
              : "Click the button above to enable audio verification for accessibility."}
          </p>
        </div>
      </div>
      
      <div role="region" aria-label="captcha verification">
        <HCaptcha
          ref={captchaRef}
          sitekey="b4d4f3a0-a8e0-4880-955c-6b8a4b98d028"
          onVerify={setToken}
          languageOverride={language}
          theme="light"
          size="normal"
          a11yChallenge={useAudio}
          tabindex="0"
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
