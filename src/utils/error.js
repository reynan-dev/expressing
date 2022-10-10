export default function getErrorMessage(error) {
  if (error instanceof Error) return error.message;
  return String(error);
}
