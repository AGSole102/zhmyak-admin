import { useState, useEffect } from 'react';
import axios from '../../axiosinstance';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async (signal) => {
    try {
      setLoading(true);
      const response = await axios.get('/users/all', {
        params: { provider: 'postgres' },
        signal
      });
      setUsers(response.data);
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleUserBan = async (user) => {
    try {
      const endpoint = user.active ? 
        `/users/${user.uid}/ban` : 
        `/users/${user.uid}/unban`;
      
      await axios.post(endpoint, null, {
        params: { provider: 'postgres' }
      });
      
      // Обновляем локальное состояние без дополнительного запроса
      setUsers(prevUsers => 
        prevUsers.map(u => 
          u.uid === user.uid 
            ? { ...u, active: !u.active }
            : u
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchUsers(abortController.signal);
    return () => abortController.abort();
  }, []);

  return {
    users,
    loading,
    error,
    toggleUserBan,
    refreshUsers: () => fetchUsers()
  };
}; 