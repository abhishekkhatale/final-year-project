import { createContext, useState, useEffect } from "react";
import run from "../data/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [questions, setQuestions] = useState([]);

  const onSent = async (prompt) => {
    await run(prompt, setQuestions); // Pass state setter
  };

  useEffect(() => {
    const defaultPrompt = `give me 5 questions and 4 options on each q for coding test format 
    [{id:1,question:"question", rightoption:"option",wrongoption1:"option",wrongoption2:"option",wrongoption3:"option"}] 
    dont write any text before or after json format also give it in text format but it will look like json without \`\`\`json and \`\`\``;

    onSent(defaultPrompt);
  }, []);

  const contextValue = {
    questions,
    setQuestions,
    onSent,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
