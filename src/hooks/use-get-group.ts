import { useEffect, useState } from 'react';
import { getGroupById } from '../api/groups';
import { Group } from '../model/Group';

export const useGetGroup = (id: string) => {
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const groupData = await getGroupById(id);
        setGroup(groupData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchGroup();
  }, [id]);

  return { group };
};
