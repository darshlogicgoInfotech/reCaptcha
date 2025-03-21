import React, { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const MyForm = () => {
  const [token, setToken] = useState("");

  return (
    <form>
      <HCaptcha   
        sitekey="feba7428-13c0-43ee-852a-f91e7dc86794"
        data-language="ET"
        onVerify={(token) => setToken(token)}
      />
      <button type="submit" disabled={!token}>Submit</button>
    </form>
  );  
};

export default MyForm;
