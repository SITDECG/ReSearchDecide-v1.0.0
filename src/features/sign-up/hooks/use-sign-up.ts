// useSignUp.ts

import { useState } from 'react';
import { signUp } from '../../../api/user';
import { SignUpFormValues } from '../../../components/forms/SignUpForm';
import ERROR_MESSAGES from '../../../constants/errorMessages';

type SignUpState = {
  isLoading: boolean;
  error: string | null;
};

export const useSignUp = (): [(values: SignUpFormValues) => Promise<void>, SignUpState] => {
  const [state, setState] = useState<SignUpState>({
    isLoading: false,
    error: null,
  });

  const handleSignUp = async (values: SignUpFormValues): Promise<void> => {
    setState({ isLoading: true, error: null });

    try {
      await signUp(values);
      setState({ isLoading: false, error: null });
    } catch (error: Error | any) {
      if (error?.code === 'auth/email-already-in-use') {
        setState({ isLoading: false, error: ERROR_MESSAGES.EMAIL_IN_USE });
      } else {
        setState({ isLoading: false, error: ERROR_MESSAGES.DEFAULT });
      }
    }
  };

  return [handleSignUp, { ...state }];
};
