import React, { createContext, useEffect, useState } from 'react';
import FirebaseApi from '../Api Utils/FireBaseApi';

export const MembersContext = createContext();

const MembersContextProvider = (props) => {
  const [members, setMembers] = useState([]);
  const [updateMembersList, setUpdateMembersList] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState({})
  const [displayMode, setDisplayMode] = useState('members');

  useEffect(() => {
    const getAllMembersData = async () => {
      const membersDataArr = await FirebaseApi.getAllMembersData();
      setMembers(membersDataArr);
      setUpdateMembersList(false);
    };

    getAllMembersData();
  }, [updateMembersList]);

  return (
    <MembersContext.Provider 
        value={{members, setUpdateMembersList, memberToEdit, setMemberToEdit, displayMode, setDisplayMode}}>
      {props.children}
    </MembersContext.Provider>
  );
};

export default MembersContextProvider;