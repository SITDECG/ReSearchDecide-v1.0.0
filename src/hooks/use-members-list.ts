import { useEffect, useState } from 'react';
import { getGroupMembers } from '../api/groups';
import { Member } from '../model/Member';

export const useMembersList = (groupId: string): [Member[], () => void] => {
  const [members, setMembers] = useState<Member[]>([]);

  const fetchGroupMembers = async () => {
    try {
      const members = await getGroupMembers(groupId);
      setMembers(members);
    } catch (error) {
      console.error('Error fetching group members:', error);
      setMembers([]);
    }
  };

  useEffect(() => {
    fetchGroupMembers().then();
  }, [groupId]);

  const refreshMembers = async () => {
    await fetchGroupMembers();
  };

  return [members, refreshMembers];
};


// import { useEffect, useState } from 'react';
// import { getGroupMembersListener } from '../api/groups'; // Path to the file where getGroupMembers is defined
// import { Member } from '../model/Member';

// export const useMembersList = (groupId: string): [Member[], () => void] => {
//   const [members, setMembers] = useState<Member[]>([]);

//   useEffect(() => {
//     // Set up the real-time listener using getGroupMembers function
//     const unsubscribe = getGroupMembersListener (groupId, (newMembers) => {
//       setMembers((prevMembers) => [...prevMembers, ...newMembers]);
//       console.log('new members: ',newMembers);
//     });

//     // Return a cleanup function to unsubscribe from the listener
//     return () => unsubscribe();
//   }, [groupId]);

//   // Refresh function can still be used, if needed
//   const refreshMembers = async () => {
//     await getGroupMembersListener (groupId, (newMembers) => {
//       setMembers(newMembers);
//     });
//   };

//   return [members, refreshMembers];
// };
