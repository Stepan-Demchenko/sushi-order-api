import Position from '../models/Position';
import errorHandler from '../utils/errorHandler';
import { Request, Response } from 'express';

export async function getByCategoryId(req: Request, res: Response): Promise<void> {
  try {
    const positions = await Position.find({
      category: req.params.categoryId,
      user: req.body.user.id,
    });
    res.status(200).json(positions);
  } catch (e) {
    errorHandler(res, e);
  }
}

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const position = await new Position({
      name: req.body.name,
      cost: req.body.cost,
      category: req.body.category,
      user: req.body.user.id,
    }).save();
    res.status(201).json(position);
  } catch (e) {
    errorHandler(res, e);
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  try {
    await Position.remove({ _id: req.params.id });
    res.status(200).json({ message: 'OK' });
  } catch (e) {
    errorHandler(res, e);
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  try {
    const position = await Position.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
    res.status(200).json(position);
  } catch (e) {
    errorHandler(res, e);
  }
}
