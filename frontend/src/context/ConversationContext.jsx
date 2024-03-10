import React, { createContext, useContext } from "react";

const ConversationContext = createContext();

const ConversationProvider = ({ children }) => {
  //   const initialState = {
  //     selectedConversation: null,
  //     setSelectedConversation: () => {},
  //     messages: [],
  //     setMessages: () => {},
  //   };

  const initialState = {
    selectedConversation: null,
    setSelectedConversation: (conversation) => {
      setState((prev) => ({ ...prev, selectedConversation: conversation }));
    },
    messages: [],
    setMessages: (newMessages) => {
      setState((prev) => ({ ...prev, messages: newMessages }));
    },
  };

  const [state, setState] = React.useState(initialState);

  return (
    <ConversationContext.Provider value={{ ...state, setState }}>
      {children}
    </ConversationContext.Provider>
  );
};

const useConversation = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error(
      "useConversation must be used within a ConversationProvider"
    );
  }
  return context;
};

export { ConversationProvider, useConversation };
