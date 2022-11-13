const { request } = require('express')
const express = require('express')
const { v4: uuidv4 } = require('uuid')

app = express()

app.use(express.json())

const customers = []

function verifyAccountExists(req, res, next) {
    const { cpf } = req.params

    const customer = customers.find(customer => customer.cpf === cpf)

    if (!customer) {
        return res.status(404).json({ error: "Customer not found" })
    }

    request.customer = customer

    return next()
}

function getBalance(statement) {
    const balance = statement.reduce((acc, operation) => {
        if (operation.type == 'credit') {
            return acc + operation.amount
        } else {
            return acc - operation.amount
        }
    }, 0)
    return balance
}

app.get('/customer/:cpf', verifyAccountExists, (req, res) => {
    const { customer } = req
    return res.status(200).json(customer)
})

app.get('/statement/:cpf', verifyAccountExists, (req, res) => {
    const { customer } = req
    return res.status(200).json(customer.statement)
})

app.get('/statement/:cpf/:date', verifyAccountExists, (req, res) => {
    const { customer } = req
    const { date } = req.params

    const dateformat = new Date(date + " 00:00")

    const statement = customer.statement.filter(statement =>
        statement.created_at.toDateString() === new Date(dateformat).toDateString())

    return res.status(200).json(statement)
})

app.get('/balance/:cpf', verifyAccountExists, (req, res) => {
    const { customer } = req

    const balance = getBalance(customer.statement)

    return res.status(200).json({balance: balance})
})

app.post('/account', (req, res) => {

    const { cpf, name } = req.body
    const id = uuidv4()

    const customerAlreadyExists = customers.some(customer => customer.cpf === cpf)
    if (customerAlreadyExists) {
        res.status(400).json({ error: "This cpf is already in use" })
    }

    customers.push({
        id,
        cpf,
        name,
        statement: []
    })

    return res.status(201).json({ success: "Account created" })
})

app.post('/deposit/:cpf', verifyAccountExists, (req, res) => {
    const { description, amount } = req.body
    const { customer } = req

    const operation = {
        description,
        amount,
        created_at: new Date(),
        type: 'credit'
    }

    customer.statement.push(operation)
    return res.status(201).json({ success: 'Operation created' })
})

app.post('/withdraw/:cpf', verifyAccountExists, (req, res) => {
    const { amount } = req.body
    const { customer } = req
    const balance = getBalance(customer.statement)

    if (balance < amount) {
        return res.status(400).json({ error: 'Insufficient funds' })
    }

    const operation = {
        amount,
        created_at: new Date(),
        type: 'debit'
    }

    customer.statement.push(operation)
    return res.status(201).json({ success: 'Withdraw was done' })
})

app.put('/account/:cpf', verifyAccountExists, (req, res) => {
    const { name } = req.body
    const { customer } = req

    customer.name = name

    return res.status(201).json({ success: 'Customer updated' })
})

app.delete('/account/:cpf', verifyAccountExists, (req, res) => {
    const { customer } = req

    customers.splice(customer, 1)

    return res.status(200).json({ success: 'Customer removed' })

})


app.listen(8080)
