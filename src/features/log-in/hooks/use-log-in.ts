// useLogIn.tsx

import { useState } from 'react';
import { logIn } from '../../../api/user';
import { LoginFormValues } from "../../../components/forms/LogInForm";
import ERROR_MESSAGES from "../../../constants/errorMessages";

type LogInState = {
  isLoading: boolean;
  error: string | null;
};

export const useLogIn = (): [(values: LoginFormValues) => Promise<void>, LogInState] => {
  const [state, setState] = useState<LogInState>({
    isLoading: false,
    error: null,
  });

  const handleLogIn = async (values: LoginFormValues): Promise<void> => {
    console.log(values);
    setState({ isLoading: true, error: null });

    try {
      await logIn(values);
      setState({ isLoading: false, error: null });
    } catch (error: Error | any) {
      // Comprobamos el tipo de error y establecemos el mensaje personalizado en base a eso
      let errorMessage = ERROR_MESSAGES.DEFAULT;

      if (error.code === 'auth/user-not-found') {
        errorMessage = ERROR_MESSAGES.USER_NOT_FOUND;
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = ERROR_MESSAGES.WRONG_PASSWORD;
      }

      setState({ isLoading: false, error: errorMessage });
    }
  };

  return [handleLogIn, { ...state }];
};
