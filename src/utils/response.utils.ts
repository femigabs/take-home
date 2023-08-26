import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  generateSuccessResponse(data: any, message: string, statusCode = 200) {
    return {
      success: true,
      data,
      message,
      statusCode,
    };
  }

  generateErrorResponse(message: string, statusCode = 400) {
    return {
      success: false,
      data: null,
      message,
      statusCode,
    };
  }
}
