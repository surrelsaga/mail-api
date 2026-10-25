/*
    THE POINT IS TO MAKE THE EXCEPTION JSON SHAPE CONSISTENT
    Before: (404, 409)
    {
        message: string
        error: string
        statusCode: number
    }
            (400) -> this is a validation error from dtos
    {
        message: string[] <- reproduce: send {} for POST
        error: string
        statusCode: number
    }

    After (consistent) shape:
    {
    "statusCode": 404,
    "message": ["Contact 999 not found"], // basically even for 1 error, it still store in an array
    "path": "/contacts/999", // new
    "timestamp": "2026-10-25T08:30:00.000Z" // new
    }
*/


import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import type { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        // host gives access to the underlying express req/res
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        const status = exception.getStatus();

        // getResponse() is a string, or an object whose message is a string or string[]
        const body = exception.getResponse();
        const message = typeof body === 'string' ? body : (body as { message: string | string[] }).message;

        response.status(status).json({
            statusCode: status,
            message: Array.isArray(message) ? message : [message],
            path: request.url,
            timestamp: new Date().toISOString(),
        });
    }
}
