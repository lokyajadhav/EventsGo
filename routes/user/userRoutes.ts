import { Router,IRouter } from "express";
import schema from '../../joiSchemas/schema'
import validate from "../../middlewares/validate";
import verify from "../../middlewares/verify";
import user from './index'
import Admin from "../admin";
import verifyAdmin from "../../middlewares/verifyAdmin";

const router: IRouter = Router();
const val = new schema();

router.post('/addevent',validate(val.changeEvent),verify,user.addEvent);
router.post('/isAttended',verifyAdmin,user.changeIsAttended);
router.post('/isCancelled',verify,user.changeIsCancelled);
router.post('/ongoingevents',user.getOnGoingEvents);
router.post('/pastevents',user.getPastEvents);
router.post('/upcomingevents',user.getUpcomingEvents);
router.post('/getevent',user.getEventDetails);
router.post('/signup',validate(val.signup),user.signUp);
router.post('/sendmail',user.sendMail);
router.post('/changepassword',user.changepassword);
router.post('/verifyotp',user.verifyotp);
router.post('/login',validate(val.login),user.login)
router.post('/verifyuser',verify,Admin.verifyAdmin);
router.post('/userdetails',verify,user.getUserDetails);
router.post('/userProfiledetails',verify,user.getUserProfileDetails);


export default router;
