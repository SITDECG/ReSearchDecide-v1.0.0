import { useEffect, useState } from "react";
import { User } from "../model/User";
import { getDBUserList } from "../api/user";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getDBUserList();
        console.log(usersData);
        setUsers(usersData);
      } catch (error) {
        console.log(error);
        setUsers([]);
      }

    };

    fetchUsers().then();
  }, []);

  return users;
};