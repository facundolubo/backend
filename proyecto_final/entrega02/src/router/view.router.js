import { Router } from 'express'

const router = Router()

// I need to handle de view

router.get('/', (req, res) => {
    res.render('home', {})
})

export default router