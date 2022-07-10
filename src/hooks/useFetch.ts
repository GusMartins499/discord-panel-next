import { useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import axios, { AxiosRequestConfig } from 'axios';

interface IUseFetchProps {
  url: string;
  options?: AxiosRequestConfig;
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}

const useFetch = async ({
  url, options, onSuccess, onError,
}: IUseFetchProps): Promise<any> => {
  const session = await getSession();

  if (session) {
    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        ...options,
      });
      onSuccess(data);
    } catch (error) {
      onError(error);
    }
  }
  return null;
};
export { useFetch };
