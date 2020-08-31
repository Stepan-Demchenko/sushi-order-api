import { Category } from '../models/Category';
import errorHandler from '../utils/errorHandler';
import { Request, Response } from 'express';

export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const categories = await Category.find({ user: req.body.user.id });
    res.status(200).json(categories);
  } catch (e) {
    errorHandler(res, e);
  }
}

export async function getById(req: Request, res: Response): Promise<void> {
  try {
    const category = await Category.findById({ _id: req.params.id });
    res.status(200).json(category);
  } catch (e) {
    errorHandler(res, e);
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  try {
    await Category.remove({ _id: req.params.id });
    res.status(200).json({ message: 'Removed' });
  } catch (e) {
    errorHandler(res, e);
  }
}

export async function create(req: Request, res: Response): Promise<void> {
  const category = new Category({
    name: req.body.name,
    user: req.body.user.id,
    imageSrc: req.file ? req.file.path : '',
  });

  try {
    await category.save();
    res.status(200).json({
      message: 'OK',
    });
  } catch (e) {
    errorHandler(res, e);
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const updated = {
    name: req.body.name,
    user: req.body.user.id,
    imageSrc: req.file ? req.file.path : '',
  };
  try {
    const position = await Category.findOneAndUpdate({ _id: req.params.id }, { $set: updated }, { new: true });
    res.status(200).json(position);
  } catch (e) {
    errorHandler(res, e);
  }
}
