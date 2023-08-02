import { useState } from 'react';
import firebase from 'firebase/app';
import { sendPasswordReset } from "../../../api/user";

type SendPasswordResetState = {
  isLoading: boolean;
  error: string | null;
};

export const useSendPasswordReset = (): [
  (email: string) => Promise<void>,
  SendPasswordResetState
] => {
  const [state, setState] = useState<SendPasswordResetState>({
    isLoading: false,
    error: null,
  });

  const sendPasswordResetEmail = async (email: string): Promise<void> => {
    setState({ isLoading: true, error: null });

    try {
      await sendPasswordReset({ email })
      setState({ isLoading: false, error: null });
    } catch (error) {
      setState({ isLoading: false, error: 'An error occurred. Please try again later.' });
    }
  };

  return [sendPasswordResetEmail, { ...state }];
};
