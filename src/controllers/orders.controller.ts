import errorHandler from '../utils/errorHandler';
import Order from '../models/Order';

export async function getAll(req, res): Promise<void> {
  const query = {
    user: req.user.id,
  };

  if (req.query.start) {
    query.date = {
      //боьше или равно
      $gte: req.query.start,
    };
  }
  if (req.query.end) {
    if (!query.date) {
      query.date = {};
    }
    query.date['$lte'] = req.query.end;
  }

  if (req.query.order) {
    query.order = +req.query.order;
  }
  try {
    const orders = await Order.find(query)
      .sort({ date: -1 })
      .skip(+req.query.offset)
      .limit(+req.query.limit);
    res.status(200).json(orders);
  } catch (e) {
    errorHandler(res, e);
  }
}

export async function create(req: Request, res): Promise<void> {
  try {
    const lastOrder = await Order.findOne({ user: req.user.id }).sort({ date: -1 });
    const maxOrder = lastOrder ? lastOrder.order : 0;
    await new Order({
      list: req.body.list,
      user: req.user.id,
      order: maxOrder + 1,
    }).save();
    res.status(201).json({
      message: 'Ok',
    });
  } catch (e) {
    errorHandler(res, e);
  }
}
