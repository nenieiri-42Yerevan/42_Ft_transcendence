import {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";

import React from 'react'
import axios from 'axios';
export const ChatContext = createContext();

export const filterItems = ((query, data, userInfo) => {
  let arr:any[] = [];
  data.map((elem, index) => {
    const info = elem.users.find(el => ( el.id != userInfo.user.id ));
    if (info)
    {
      arr.push(info);
    }
  })
  return (arr.filter((elem) => elem.username.includes(query)));
})

export const ChatContextProvider = ({ children }) => {
  const INITIAL_STATE = {
    info: {},
    chat: [],
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_INFO":
        return {
          ...state,
          info: action.payload,
        };
      case "CHANGE_CHAT":
        const chatId = action.payload.id;
        const existingChat = state.chat.find(chat => chat.id === chatId);
        if (existingChat) {
          return state;
        } else {
          return {
            ...state,
            chat: [...state.chat, action.payload],
          };
        }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};