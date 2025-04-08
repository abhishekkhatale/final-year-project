import { useEffect } from "react";

const AiMentor = () => {
  useEffect(() => {
    // Inject Botpress Webchat core script
    const injectScript = document.createElement("script");
    injectScript.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    injectScript.async = true;
    document.body.appendChild(injectScript);

    // Inject your specific chatbot config
    const configScript = document.createElement("script");
    configScript.src = "https://files.bpcontent.cloud/2025/03/20/17/20250320175513-HI6PF48W.js";
    configScript.async = true;
    document.body.appendChild(configScript);

    // Cleanup scripts on unmount
    return () => {
      document.body.removeChild(injectScript);
      document.body.removeChild(configScript);
    };
  }, []);

  return null; // No visible component, the chatbot loads externally
};

export default AiMentor;
