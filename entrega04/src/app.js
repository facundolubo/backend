import express from 'express'

const users =[{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }, { id: 3, name: 'Jack Doe' }]

const app = express()

app.get('/users/:id', (req, res) => {
    const result = users.find(user => user.id === parseInt(req.params.id))
    if (result) res.status(200).json({status: 'ok', data: result})
    else res.status(404).json({status: 'error', message: 'User not found'})
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})