import express from 'express';
const router = express.Router()
import * as user from './user.controller.js'

router.route('/user').post(user.signUp).get(user.signIn).put(user.updateUser).delete(user.deleteUser)

router.get('/searchByName',user.searchByName)

router.get('/searchByAge',user.searchByAge)

router.get('/older',user.oldUsers)

router.get('/searchById',user.searchById)

router.get('/users',user.allUsers)

export default router;