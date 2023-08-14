import { useEffect, useState } from "react";
import { Group } from "../model/Group";
import { getGroupsByUser, getGroupsByUserFirst } from "../api/groups";

const useGroupsListFirstTime = () => {

  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupsData = await getGroupsByUserFirst();
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

export default useGroupsListFirstTime;