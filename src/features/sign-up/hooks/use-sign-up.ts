import { useState } from 'react'
import { signUp } from '../../../api/user'
import { SignUpFormValues } from "../../../components/forms/SignUpForm";

type SignUpState = {
  isLoading: boolean
  error: string | null;
}

export const useSignUp = (): [(values: SignUpFormValues) => Promise<void>, SignUpState] => {
  const [state, setState] = useState({
    isLoading: false,
    error: null,
  })

  const handleSignUp = async (values: SignUpFormValues): Promise<void> => {
    setState({ isLoading: true, error: null })

    try {
      await signUp(values)
      setState({ isLoading: false, error: null })
    } catch (error: Error | any) {
      setState({ isLoading: false, error: error?.message })
    }
  }

  return [handleSignUp, { ...state }]
}
