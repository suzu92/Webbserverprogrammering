import Chai from 'chai'
import ChaiHTTP from "chai-http";
import {describe, it} from 'mocha'
import app from '../src/server.js'

Chai.should()
Chai.use(ChaiHTTP)
const expect = Chai.expect

const newUser = {
    name: "Susume",
    task: "Diska"
}

const updatedUser = {
    name: "Suzume",
    newName: "Xiangling",
    task: "Diska"
}

const allData = () => {
    describe('Test to get array of all data (GET)', () => {
        it('should expect array of data to be returned', (done) => {
            Chai.request(app)
                .get('/alldata')
                .end((error, res) => {
                    expect(res.status).to.equal(200)

                    const body = res.body
                    expect(body).to.be.an('array')
                    expect(body.length).to.equal(4)
                    expect(body.length).to.not.equal(3)
                    expect(body.length).to.not.equal(5)

                    const user = body[0]
                    expect(user).to.be.an('object')
                    expect(user.name).to.equal('Kaeya')
                    expect(user.task).to.equal('Dammsuga')
                    done()
                })
        })
    })
}

const getUserNames = () => {
    describe('Test to get array of names (GET)', () => {
        it('should expect array of names to return', (done) => {
            Chai.request(app)
                .get('/getusernames/name')
                .end((error, res) => {
                    expect(res.status).to.equal(200)

                    const body = res.body
                    expect(body).to.be.an('array')
                    expect(body.length).to.equal(4)
                    expect(body.length).to.not.equal(3)
                    expect(body.length).to.not.equal(5)

                    let user = body[0]
                    expect(user).to.be.an('object')
                    expect(user.name).to.equal('Kaeya')

                    user = body[1]
                    expect(user.name).to.equal('Sucrose')
                    done()
                })
        })
    })
}

const getUserByName = () => {
    const name = 'Kaeya'
    describe('Test to get data by name (GET)', () => {
        it('should expect object to return', (done) => {
            Chai.request(app)
                .get(`/getuserbyname/${name}`)
                .end((error, res) => {
                    expect(res.status).to.equal(200)

                    const body = res.body
                    expect(body).to.be.an('object')
                    expect(body.name).to.equal('Kaeya')
                    expect(body.task).to.equal('Dammsuga')
                    done()
                })
        })
    })
}

const checkIfUserDoNotExist = (name) => {
    describe('Test to get a correct response with non existing name (GET)', () => {
        it('should respond that name dont exist', (done) => {
            Chai.request(app)
                .get(`/getuserbyname/${name}`)
                .end((error, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.equal(`Could not find "${name}" in the database`)
                    done()
                })
        })
    })
}

const createTodo = () => {
    describe('Test to create new data (POST)', () => {
        it('should expect new data to be created', (done) => {
            Chai.request(app)
                .post('/createtodo')
                .send(newUser)
                .end((error, res) => {
                    expect(res.status).to.equal(201)
                    const body = res.body
                    expect(body.name).to.equal(newUser.name)
                    expect(body.task).to.equal(newUser.task)
                    done()
                })
        })
    })
}

const checkIfUserExist = (name) => {
    describe('Test to check that created data exist', () => {
        it('should expect an object with data to be returned', (done) => {
            Chai.request(app)
                .get(`/getuserbyname/${name}`)
                .end((error, res) => {
                    expect(res.status).to.equal(200)
                    const body = res.body
                    expect(body).to.be.an('object')
                    expect(body.name).to.equal(newUser.name)
                    expect(body.task).to.equal(newUser.task)
                    done()
                })
        })
    })
}

const updateUserByName = () => {
    describe('Test for update data by name (PUT)', () => {
        it('should get updated data', (done) => {
            Chai.request(app)
                .put(`/updatedatabyname`)
                .send(updatedUser)
                .end((error, res) => {
                    expect(res.status).to.equal(202)
                    const body = res.body
                    expect(body).to.be.an('object')
                    expect(body.name).to.equal(updatedUser.newName)
                    expect(body.task).to.equal(updatedUser.task)
                    done()
                })
        })
    })
}

const deletedatabyname = (name) => {
    describe('Test for delete updated data (DELETE)', () => {
        it('should respond that name was deleted from database', (done) => {
            Chai.request(app)
                .delete(`/deletedatabyname/${name}`)
                .end((error, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.text).to.equal(`User: "${ name }" was deleted from this database!`)
                    done()
                })
        })
    })
}

const deletedataThatDontExist = (name) => {
    describe('Test for delete updated data (DELETE)', () => {
        it('should respond that name dont exist in database', (done) => {
            Chai.request(app)
                .delete(`/deletedatabyname/${name}`)
                .end((error, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.text).to.equal(`User: "${ name }" don't exist in this database!`)
                    done()
                })
        })
    })
}


describe('test for existing data routes', () => {
    allData()
    getUserNames()
    getUserByName()
    checkIfUserDoNotExist(newUser.name)
    createTodo()
    checkIfUserExist(newUser.name)
    updateUserByName()
    deletedatabyname(updatedUser.newName)
    deletedataThatDontExist(updatedUser.name)
})