import { useEffect, useState } from 'react';
import { getMemberByUserId } from '../../../api/user'; 
import { Member } from '../../../model/Member';

export const useMemberVote = (userId: string, id: string) => {
  const [vote, setVote] = useState<Member | null>();

  useEffect(() => {
    const fetchMemberVote = async () => {
      const memberVote = await getMemberByUserId(userId, id);
      setVote(memberVote);
    };

    fetchMemberVote();
  }, [userId]);

  return { vote };
};

