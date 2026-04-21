import { Router, type IRouter } from "express";
import healthRouter from "./health";
import profilesRouter from "./profiles";
import dishesRouter from "./dishes";
import mealPlansRouter from "./meal-plans";
import groceryRouter from "./grocery";
import notificationsRouter from "./notifications";

const router: IRouter = Router();

router.use(healthRouter);
router.use(profilesRouter);
router.use(dishesRouter);
router.use(mealPlansRouter);
router.use(groceryRouter);
router.use(notificationsRouter);

export default router;
