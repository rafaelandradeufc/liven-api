import { Router } from "express";
import AddressController from "../controllers/AddressController";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";
import auth from "../middlewares/auth";

const routes = Router();

//AUTH

routes.post("/login", AuthController.login);

// USER
routes.post("/user", UserController.create);
routes.get("/user",[auth], UserController.find);
routes.get("/user/:id",[auth], UserController.findById);
routes.put("/user/:id",[auth], UserController.update);
routes.delete("/user/:id",[auth], UserController.delete);
routes.post("/user/:userId/address/:addressId",[auth], UserController.associateAddressWithUser);

// ADDRESS
routes.post("/address",[auth], AddressController.create);
routes.get("/address",[auth], AddressController.find);
routes.get("/address/:id",[auth], AddressController.findById);
routes.put("/address/:id",[auth], AddressController.update);
routes.delete("/address/:id",[auth], AddressController.delete);

export default routes;