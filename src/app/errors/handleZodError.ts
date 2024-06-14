import { ZodError, ZodIssue } from 'zod';
import { TErrorSource, TGenericsResponse } from '../interface/interface';

const handleZodError = (err: ZodError): TGenericsResponse => {
  const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;