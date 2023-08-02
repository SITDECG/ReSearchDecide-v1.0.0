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
