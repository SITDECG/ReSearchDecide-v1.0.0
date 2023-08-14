import React, { createContext, useContext, useState, useEffect } from 'react';
import { Group } from "../model/Group";
import useGroupsList from '../hooks/use-groups-list';
import firebase from "firebase/app";
import useGroupsListFirstTime from "../hooks/use-groups-list-first"; // Importa tu hook de Firebase

type GroupsContextType = {
  groups: Group[];
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
  loading: boolean;
};

const GroupsContext = createContext<GroupsContextType | undefined>(undefined);

export const GroupContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {

  const { groups: firebaseGroups, loading } = useGroupsList();
  console.log('firebaseGroups', firebaseGroups);

  const [groups, setGroups] = useState<Group[]>(firebaseGroups);

  useEffect(() => {
    setGroups(firebaseGroups); // Actualizar grupos con firebaseGroups
  }, [firebaseGroups]);

  return (
      <GroupsContext.Provider value={ { groups, setGroups, loading } }>
        { children }
      </GroupsContext.Provider>
  );
};

export const useGroupsContext = (): GroupsContextType => {
  const context = useContext(GroupsContext);
  if (!context) {
    throw new Error("useGroupsContext must be used within a GroupContextProvider");
  }
  return context;
};
