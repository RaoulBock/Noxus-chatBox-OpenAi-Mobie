import React from "react";
import { APP_PAGES } from "./settings";

export const AppContext = React.createContext({
  navPage: "",
  setNavPage: (val) => {}
});

const AppProvider = ({ children }) => {
  const [navPage, setNavPage] = React.useState(APP_PAGES.APP.HOME);
  const [prompt, setPrompt] = React.useState("");
  const [promptResponse, setPromptResponse] = React.useState("");

  return (
    <AppContext.Provider
      value={{
        navPage,
        setNavPage,
        prompt,
        setPrompt,
        promptResponse,
        setPromptResponse
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
