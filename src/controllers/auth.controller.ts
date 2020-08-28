import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import errorHandler from '../utils/errorHandler';
import { Request, Response } from 'express';

export async function login(req: Request, res: Response): Promise<void> {
  const candidate = await User.findOne({
    email: req.body.email,
  });
  if (candidate) {
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
    if (passwordResult) {
      const token = jwt.sign(
        {
          email: candidate.email,
          userId: candidate._id,
        },
        'dev-jwt',
        { expiresIn: 60 * 60 },
      );
      res.status(200).json({
        token: `Bearer ${token}`,
      });
    } else {
      res.status(401).json({
        message: 'Invalid password or email',
      });
    }
  } else {
    res.status(404).json({
      message: 'Can`t find user',
    });
  }
}

export async function register(req: Request, res: Response): Promise<void> {
  const candidate = await User.findOne({ email: req.body.email });
  if (candidate) {
    res.status(409).json({
      message: 'User already exist',
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
    });
    try {
      await user.save();
      const newCandidate = await User.findOne({ email: req.body.email });
      const token = jwt.sign(
        {
          email: newCandidate.email,
          userId: newCandidate._id,
        },
        'dev-jwt',
        { expiresIn: 60 * 60 },
      );

      res.status(201).json({
        token: `Bearer ${token}`,
      });
    } catch (e) {
      errorHandler(res, e);
    }
  }
}
