import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { isAdmin } from '../middlewares/db-validators.js'
import { getRoom, getRooms, deleteRooms, updateRooms, createRooms, getOccupiedRooms, getAllRooms } from "../controllers/rooms.controller.js";

const router = Router()

router.get('/rooms', authRequired, getRooms)
router.get('/rooms/:id', authRequired, getRoom)
router.post('/rooms', authRequired, createRooms)
router.delete('/rooms/:id', authRequired, deleteRooms)
router.put('/rooms/:id', authRequired, updateRooms)
router.get('/occupied', authRequired, isAdmin, getOccupiedRooms)
router.get('/all-rooms', authRequired, getAllRooms)


export default router