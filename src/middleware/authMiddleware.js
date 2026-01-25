import jwt from 'jsonwebtoken';
import { prisma } from '../config/db.js';

//Read the token from the request
// check if token is valid
export const authMiddleware = async (req, res, next) => {
    console.log("Auth middleware reached");
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({error: "Not authorized"})
    }

    try {
        // Verify token and extract the user Id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            },
              include: {
                wallet: {
                select: {
                    balance: true
                }
                }
            }
        });

        if (!user) {
            return res.status(401).json({error: "User no longer exist"})
        }

        req.user = user;
        next();
    }catch(err) {
        return res.status(401).json({error: err})
    }

}
