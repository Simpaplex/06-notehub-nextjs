'use client';

interface ErrorProps {
  error: Error;
}

export default function ErrorNoteDetails({ error }: ErrorProps) {
  return <p>Could not fetch note details. {error.message}</p>;
}
