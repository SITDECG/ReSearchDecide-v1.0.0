import { useState } from 'react';
import { logIn } from '../../../api/user';
import { LoginFormValues } from "../../../components/forms/LogInForm";

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
      setState({ isLoading: false, error: error?.message });
    }
  };

  return [handleLogIn, { ...state }];
};
