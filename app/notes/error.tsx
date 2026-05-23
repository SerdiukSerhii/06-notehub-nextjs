'use client';

interface ErrorProps {
  error: Error;
}

const ErrorMessage = ({ error }: ErrorProps) => {
  return <p>Could not fetch the list of notes. {error.message}</p>;
};

export default ErrorMessage;
