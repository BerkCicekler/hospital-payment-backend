import { prisma } from '../config/db.js'
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

const register = async (req, res) => {
    const {firstName, surname, email, phone,  password} = req.body;
    
    // if user exist
    const userEmailExist = await prisma.user.findUnique({
        where: {email: email}
    })

    if (userEmailExist) {
        return res
        .status(400)
        .json({error: 'User already exist with this email'});
    }

    // if user exist
    const userPhoneExist = await prisma.user.findUnique({
        where: {phone: phone}
    })

    if (userPhoneExist) {
        return res
        .status(400)
        .json({error: 'User already exist with this phone'});
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await prisma.user.create({
        data: {
            firstName,
            surname,
            email,
            phone,
            password: hashedPassword,
        },
    });

    //Generate JWT token
    const token = generateToken(user.id);

    const userWallet = await prisma.wallet.create({
        data: {
            userId: user.id
        }
    });

    res.status(201).json({
        token: token,
        id: user.id,
        firstName: firstName,
        surname: surname,
        email: email,
        walletBalance: userWallet.balance
        
    })
}

const login = async (req, res) => {

    const {email, password} = req.body;
    // if user exist
    const user = await prisma.user.findUnique({
        where: {email: email},
        include: {
            wallet: {
            select: {
                balance: true
            }
        }
    }
    });

    if (!user) {
        return res
        .status(401)
        .json({error: 'Invalid email or password'});
    }

    //verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res
        .status(401)
        .json({error: 'Invalid email or password'});
    }

    //Generate JWT token
    const token = generateToken(user.id);

    res.status(200).json({
        token: token,
        firstName: user.firstName,
        surname: user.surname,
        email: email,
        balance: user.wallet.balance
    })
}

export { register, login };