const expess = require('express')

const route = expess.Router()


const endpoint = require("../entpoints/enpoints")

const endpt = new endpoint()

const Test = require("../logic/test")

const tests = new Test()


route.post(endpt.create, async (req, res) => {

    const output = await tests.test(req.body)

    res.status(200).json({ data: output, status: 200, message: "Create Successfully" })

})


module.exports = route