import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1]; 
  console.log(token)
  if (!token) {

    res.status(403).json({ error: 'No token provided' });
    return;
  }

  jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
    if (err) {
      
      return res.status(401).json({ error: 'Unauthorized' });
    }

    
    req.user = { id: decoded.id };  
    next();
  });
};

export default verifyToken;
