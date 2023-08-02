import React from 'react';
import { Alert } from 'native-base';

interface ErrorMessageProps {
  error: Error | null | string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;

  return (
      <Alert status="error">
        <Alert.Icon/>
        { error }
      </Alert>
  );
};

export default ErrorMessage;
