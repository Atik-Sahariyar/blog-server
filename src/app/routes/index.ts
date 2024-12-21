import { Router } from 'express';
import { blogRoutes } from '../mdules/blogs/blog.route';
import { authRoutes } from '../mdules/Auth/auth.route';
import { userRoutes } from '../mdules/user/user.route';


const router = Router();

const moduleRoutes = [
  authRoutes,
  userRoutes,
  blogRoutes,
];

moduleRoutes.forEach((route) => router.use(route));

export default router;
