import Position from '../models/Position';
import errorHandler from '../utils/errorHandler';

export async function getByCategoryId(req, res): Promise<void> {
  try {
    const positions = await Position.find({
      category: req.params.categoryId,
      user: req.user.id,
    });
    res.status(200).json(positions);
  } catch (e) {
    errorHandler(res, e);
  }
}

export async function create(req, res): Promise<void> {
  try {
    const position = await new Position({
      name: req.body.name,
      cost: req.body.cost,
      category: req.body.category,
      user: req.user.id,
    }).save();
    res.status(201).json(position);
  } catch (e) {
    errorHandler(res, e);
  }
}

export async function remove(req, res): Promise<void> {
  try {
    await Position.remove({ _id: req.params.id });
    res.status(200).json({ message: 'OK' });
  } catch (e) {
    errorHandler(res, e);
  }
}

export async function update(req, res): Promise<void> {
  try {
    const position = await Position.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
    res.status(200).json(position);
  } catch (e) {
    errorHandler(res, e);
  }
}
