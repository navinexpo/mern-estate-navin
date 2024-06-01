export const errorHandler = (statusCode, message) => {
  //this takes two things
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
