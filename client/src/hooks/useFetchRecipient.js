import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";
export const useFetchRecipientUser = (chat, user) => {
  const [recipentUser, setRecipentUser] = useState(null);
  const [error, setError] = useState(null);

  const recipentId = chat?.members?.find((id) => id !== user?._id);

  useEffect(() => {
    const getUser = async () => {
      if (!recipentId) return null;

      const response = await getRequest(`${baseUrl}/users/find/${recipentId}`);

      if (response.error) {
        return setError(error);
      }
      setRecipentUser(response);
    };
    getUser();
  }, [recipentId]);
  
  return { recipentUser };
};
