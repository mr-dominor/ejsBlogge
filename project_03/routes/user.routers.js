import express from "express";
import {getAllUsers, addNewUser, findOne, delteOne, findUpdate} from "../controllers/user.controllers.js"

const router = express.Router();

router.route('/')
  .get(getAllUsers)
  .post(addNewUser)
router.route('/:id')
   .get(findOne)
   .delete(delteOne)
   .patch(findUpdate)

export {router}