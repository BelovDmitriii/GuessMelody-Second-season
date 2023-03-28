import request from 'axios';
import { HTTP_CODE } from '../consts/consts';
import { toast } from 'react-toastify';
import { ErrorType } from '../types/errors';

export const errorHandle = (error: ErrorType): void => {
  if(!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if(response) {
    switch(response.status) {
      case HTTP_CODE.BAD_REQUEST:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        toast.info(response.data.error);
        break;
      case HTTP_CODE.NOT_FOUND:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        toast.info(response.data.error);
        break;
      case HTTP_CODE.UNAUTHORIZED:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        toast.info(response.data.error);
        break;
    }
  }
};
