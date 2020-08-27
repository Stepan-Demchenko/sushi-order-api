import express from 'express';
import passport from 'passport';
import * as controller from '../controllers/position.controller';

const router = express.Router();
router.get('/:categoryId', passport.authenticate('jwt', { session: false }), controller.getByCategoryId);
router.post('/', passport.authenticate('jwt', { session: false }), controller.create);
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove);

export default router;
