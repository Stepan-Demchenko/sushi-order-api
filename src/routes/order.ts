import express from 'express';
import passport from 'passport';
import * as controller from '../controllers/orders.controller';

const router = express.Router();
router.post('/', passport.authenticate('jwt', { session: false }), controller.create);
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);

export default router;
