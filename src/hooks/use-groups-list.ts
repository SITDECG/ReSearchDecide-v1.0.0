import { useEffect, useState } from 'react';
import { getGroupsByUser } from '../api/groups';
import { Group } from "../model/Group";

const useGroupsList = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupsData = await getGroupsByUser();
        setGroups(groupsData);
      } catch (error) {
        console.log(error);
        setGroups([]);
      } finally {
        setLoading(false); // Mark the loading process as complete, regardless of success or error.
      }
    };

    fetchGroups().then();
  }, []);

  return { groups, loading };
};

export default useGroupsList;
