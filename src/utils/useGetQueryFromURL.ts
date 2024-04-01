import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useGetQueryFromURL = (keys: string | string[]) => {
  const [result, setResult] = useState<any>({});

  const { search } = useLocation();

  useEffect(() => {
    const getterQuery = new URLSearchParams(search);
    let newResult: any = {};

    if (typeof keys === 'string') {
      newResult[keys] = getterQuery.get(keys);
    }

    if (Array.isArray(keys)) {
      keys.forEach((key) => {
        newResult[key] = getterQuery.get(key);
      });
    }

    setResult(newResult);
  }, [search, JSON.stringify(keys)]);

  return result;
};
