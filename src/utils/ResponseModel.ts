interface SuccessResponse {
    success: boolean;
    data?: any;
    message?: string;
  }
  
  interface ErrorResponse {
    success: boolean;
    message: string;
  }
  
  export const successResponse = (res: any, data: any, message: string = 'Request successful') => {
    res.status(200).json({ success: true, data, message } as SuccessResponse);
  };
  
  export const errorResponse = (res: any, message: string = 'Request failed', statusCode: number = 500) => {
    res.status(statusCode).json({ success: false, message } as ErrorResponse);
  };
  