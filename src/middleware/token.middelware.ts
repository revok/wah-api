import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

/**
 * Check if the user has provided a valid JWT Token and reject call if necessary.
 */
const withAuth = function(request: Request, response: Response, next: any) {
  const token = request.cookies.token || request.headers.authorization;

  if (!token) {
    response.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, process.env.SECRET, function(err: any, decoded: any) {
      if (err) {
        response.status(401).send('Unauthorized: Invalid token');
      } else {
        next();
      }
    });
  }
}

export default withAuth;