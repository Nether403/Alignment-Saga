import { Router, type IRouter } from "express";
import healthRouter from "./health";
import imageGenRouter from "./image-gen";

const router: IRouter = Router();

router.use(healthRouter);
router.use(imageGenRouter);

export default router;
