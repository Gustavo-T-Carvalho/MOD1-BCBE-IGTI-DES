import express from "express";
import RequestController from "../controllers/request.controller.js";

const router = express.Router();

router.post("/", RequestController.createRequest);
router.post("/getRequestByClient", RequestController.getRequestByClient);

router.post("/getRequestByProduct", RequestController.getRequestByProduct);
// router.get("/", RequestController.getAccounts);
router.get("/:id", RequestController.getRequest);
router.get("/search/getMostSelledProduct", RequestController.getMostSelledProduct);
router.delete("/:id", RequestController.deleteRequest);
router.put("/updateDelivered", RequestController.updateDelivered);
router.patch("/", RequestController.updateRequest);


export default router;
