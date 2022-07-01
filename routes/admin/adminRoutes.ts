import { Router,IRouter } from "express";
import schema from '../../joiSchemas/schema'
import validate from '../../middlewares/validate'
import verify from "../../middlewares/verify";
import { upload } from "../../middlewares/upload";
import Admin from './index'
import verifyAdmin from "../../middlewares/verifyAdmin";


const router: IRouter = Router();
const val = new schema();

router.post('/createadmin',validate(val.signup),verifyAdmin,Admin.createAdmin);
router.post('/addevent',upload.single('file'),Admin.addevent);
router.post('/login',validate(val.login),Admin.login);
router.get('/getimg/:id',Admin.getImg);
router.get('/temp',Admin.temp);
router.post('/verifyadmin',verifyAdmin,Admin.verifyAdmin);
router.post('/deleteevent',Admin.deleteEvent);

export default router;