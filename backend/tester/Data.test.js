import Chai from 'chai'
import ChaiHTTP from "chai-http";
import {describe, it} from 'mocha'
import app from '../src/server.js'
import TodoData from "../src/data/todoData";

Chai.should()
Chai.use(ChaiHTTP)
const expect = Chai.expect
const dataBase = TodoData

const newUser = {
    id: dataBase.length,
    name: "Susume",
    task: "Diska"
}

const updatedUser = {
    id: dataBase.length,
    name: newUser.name,
    newName: "Xiangling",
    task: "Diska"
}

const getAllTodos = () => {
    describe('Test to get array of all data (GET)', () => {
        it('should expect array of data to be returned', (done) => {
            Chai.request(app)
                .get('/getAllTodos')
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
                .get('/getUserNames/name')
                .end((error, res) => {
                    expect(res.status).to.equal(200)
                    const body = res.body
                    expect(body).to.be.an('array')
                    expect(body.length).to.equal(4)
                    expect(body.length).to.not.equal(5)
                    expect(body.length).to.not.equal(3)
                    const user = body[0]
                    expect(user).to.be.an('object')
                    expect(user.name).to.equal('Kaeya')
                    done()
                })
        })
    })
}

const getUserByName = (id, name, task) => {
    describe('Test to get data by name (GET)', () => {
        it('should expect object to return', (done) => {
            Chai.request(app)
                .get(`/getUserByName/${name}`)
                .end((error, res) => {
                    expect(res.status).to.equal(200)

                    const body = res.body
                    expect(body).to.be.an('object')
                    expect(body.name).to.equal(name)
                    expect(body.task).to.equal(task)
                    expect(body.id).to.equal(id)
                    done()
                })
        })
    })
}

const checkIfUserDoNotExist = (name) => {
    describe('Test to get a correct response with non existing name (GET)', () => {
        it('should respond that name dont exist', (done) => {
            Chai.request(app)
                .get(`/getUserByName/${name}`)
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
                .post('/createTodo')
                .send(newUser)
                .end((error, res) => {
                    expect(res.status).to.equal(201)
                    const body = res.body[4]
                    expect(body.id).to.equal(newUser.id)
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
                .get(`/getUserByName/${name}`)
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
                .put(`/updateDataByName`)
                .send(updatedUser)
                .end((error, res) => {
                    expect(res.status).to.equal(202)
                    const body = res.body
                    expect(body).to.be.an('object')
                    expect(body.id).to.equal(updatedUser.id)
                    expect(body.name).to.equal(updatedUser.newName)
                    expect(body.task).to.equal(updatedUser.task)
                    done()
                })
        })
    })
}

const deleteDataByName = () => {
    describe('Test for delete updated data (DELETE)', () => {
        it('should respond that name was deleted from database', (done) => {
            Chai.request(app)
                .delete(`/deleteDataByName/${updatedUser.newName}`)
                .end((error, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.text).to.equal(`User: "${updatedUser.newName}" was deleted from this database!`)
                    done()
                })
        })
    })
}

const deleteDataThatDontExist = () => {
    describe('Test for delete updated data (DELETE)', () => {
        it('should respond that name dont exist in database', (done) => {
            Chai.request(app)
                .delete(`/deletedatabyname/${newUser.name}`)
                .end((error, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.text).to.equal(`User: "${newUser.name}" don't exist in this database!`)
                    done()
                })
        })
    })
}


describe('test for existing data routes', () => {
    getAllTodos()
    getUserNames()
    getUserByName()
    checkIfUserDoNotExist(newUser.name)
    createTodo()
    checkIfUserExist(newUser.name)
    updateUserByName()
    deleteDataByName(updatedUser.newName)
    deleteDataThatDontExist(updatedUser.name)
})