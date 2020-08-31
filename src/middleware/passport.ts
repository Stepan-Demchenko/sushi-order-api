import { ExtractJwt, Strategy as JwtStrategy, VerifiedCallback } from 'passport-jwt';
import { model } from 'mongoose';
import key from '../config/keys';
import { PassportStatic } from 'passport';

const User = model('User');
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: key.jwtKey,
};

export function middleware(passport: PassportStatic): void {
  passport.use(
    new JwtStrategy(options, async (payload, done: VerifiedCallback) => {
      try {
        const user = await User.findById(payload.userId).select('email id');

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (e) {
        console.warn(e);
      }
    }),
  );
}
