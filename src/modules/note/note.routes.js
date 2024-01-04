import express from 'express';
const router = express.Router()
import * as note from './note.controller.js' 

router.route('/note').post( note.addNote).put(note.updateNote).delete(note.deleteNote).get(note.getAllNotes)

router.get('/notesByUser', note.getAllByUser)

export default router;