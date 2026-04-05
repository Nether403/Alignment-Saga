import { Router, type IRouter } from "express";
import healthRouter from "./health";
import imageGenRouter from "./image-gen";
import assistantRouter from "./assistant";

const router: IRouter = Router();

router.use(healthRouter);
router.use(imageGenRouter);
router.use(assistantRouter);

export default router;
