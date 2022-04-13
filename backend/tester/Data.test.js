import Chai from 'chai'
import ChaiHTTP from "chai-http";
import {describe, it} from 'mocha'
import app from '../src/server.js'
import TodoData from "../src/data/todoData";

Chai.should()
Chai.use(ChaiHTTP)
const expect = Chai.expect
const dataBase = TodoData

const randomString = Math.random().toString(36).substring(7)
console.log(randomString)

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

const testNonExistingRouteExpect = () => {
    describe('Testing a route that does not exist with expect', () => {
        it('should expect 404 not found', (done) => {
            Chai.request(app)
                .get(`/${randomString}`)
                .end((request, response) => {
                        expect(response.status).to.equal(404)
                        done()
                    }
                )
        })
    })
}

const getAllTodos = () => {
    describe('Testing to get an array of users (GET)', () => {
        it('should expect a array of users to be returned', function (done) {
            Chai.request(app)
                .get('/getAllTodos')
                .end((error, response) => {
                    response.should.have.a.status(200)
                    response.body.should.have.a('array')
                    response.body.length.should.equal(4)
                    response.body.length.should.not.equals(5)
                    response.body.length.should.not.equals(3)
                    done()
                })
        });
    })
}


const getAllTodosExpect = () => {
    describe('Testing to get an array of users (GET) with expect', () => {
        it('should expect a array of users to be returned with expect', function (done) {
            Chai.request(app)
                .get('/getAllTodos')
                .end((error, response) => {
                    expect(response.status).to.equal(200)

                    const body = response.body

                    expect(body).to.be.an('array')
                    expect(body.length).to.equal(4)
                    expect(body.length).to.not.equal(5)
                    expect(body.length).to.not.equal(3)

                    const user = body[1]

                    expect(user).to.be.an('object');
                    expect(user.name).to.equal('Carin');
                    expect(user.id).to.equal(1);
                    expect(user.task).to.equal('Go to the gym');

                    done()
                })
        });
    })
}

const getUserNamesExpect = () => {
    describe('Testing to get an array of users names (GET) with expect', () => {
        it('should expect a array of user names with expect', function (done) {
            Chai.request(app)
                .get('/getUserNames/name')
                .end((error, response) => {
                    expect(response.status).to.equal(200)

                    const body = response.body

                    expect(body).to.be.an('array')
                    expect(body.length).to.equal(4)
                    expect(body.length).to.not.equal(5)
                    expect(body.length).to.not.equal(3)

                    const user = body[1]

                    expect(user).to.be.an('object');
                    expect(user.name).to.equal('Carin');

                    done()
                })
        });
    })
}

const checkIfUserDoNotExistExpect = (name) => {
    describe('Testing message on user that does not exists with expect', () => {
        it('should return a string', (done) => {
            Chai.request(app)
                .get(`/getUserByName/${name}`)
                .end((error, response) => {
                    expect(response.status).to.equal(200)
                    expect(response.text).to.equal(`Could not find "${name}" in database`)
                    done()
                })
        })
    })
}

const checkIfUserExist = (name) => {
    describe('Testing to check that created data exist', () => {
        it('should expect an object with data to be returned', (done) => {
            Chai.request(app)
                .get(`/getUserByName/${name}`)
                .end((error, response) => {
                    expect(response.status).to.equal(200)

                    const body = response.body
                    expect(body).to.be.an('array')
                    expect(body.name).to.equal(updatedUser.name)
                    expect(body.task).to.equal(updatedUser.task)
                    done()
                })
        })
    })
}


const createTodoExpect = () => {
    describe('Testing and create a user with a task (POST) with expect', () => {
        it('should expect a user to be created with a task', function (done) {
            Chai.request(app)
                .post('/createTodo/')
                .send(newUser)
                .end((error, response) => {
                    expect(response.status).to.equal(201)


                    const body = response.body[4]
                    expect(body.id).to.equal(newUser.id)
                    expect(body.name).to.equal(newUser.name)
                    expect(body.task).to.equal(newUser.task)
                    done()
                })

        });
    })
}


const getUserByNameExpect = (id, name, task) => {
    describe('Testing to get an user object (GET) with expect', () => {
        it('should expect a user to be created with a task', function (done) {
            Chai.request(app)
                .get(`/getUserByName/${name}`)
                .end((error, response) => {
                    expect(response.status).to.equal(200)

                    const body = response.body
                    expect(body).to.be.an('object')
                    expect(body.name).to.equal(name)
                    expect(body.task).to.equal(task)
                    expect(body.id).to.equal(id)
                    done()
                })
        });
    })
}

const updateUserByNameDontExistExpect = () => {
    describe('Testing to update a user (PUT) with expect', () => {
        it('should expect a error string', (done) => {
            Chai.request(app)
                .put(`/updateTodoDataByName/`)
                .send(updatedUser)
                .end((error, response) => {
                    expect(response.status).to.equal(202)
                    expect(response.text).to.equal(`Could not find "${newUser.name}" in database`)
                    done()

                })
        })
    })
}

const updateUserByNameExpect = () => {
    describe('Testing and create a user with a task (POST)with expect', () => {
        it('should expect a user to be created with a task', function (done) {
            Chai.request(app)
                .put('/updateTodoDataByName/')
                .send(updatedUser)
                .end((error, response) => {
                    expect(response.status).to.equal(202)

                    const body = response.body
                    expect(body).to.be.an('object')
                    expect(body.id).to.equal(updatedUser.id)
                    expect(body.name).to.equal(updatedUser.newName)
                    expect(body.task).to.equal(updatedUser.task)
                    done()
                })
        });
    })
}

const deleteUserByNameUserDontExistExpect = () => {
    describe('Testing to delete a user by name that do not exist in db (DELETE) with expect', () => {
        it('should expect a string with fail message', (done) => {
            Chai.request(app)
                .del(`/deleteTodoDataByName/${newUser.name}`)
                .end((error, response) => {
                    expect(response.status).to.equal(200)
                    expect(response.text).to.equal(`User with name : "${newUser.name}"does not exist!`)
                    done()

                })
        })
    })
}

const deleteUserByNameExpect = () => {
    describe('Testing and delete a user with a task (DELETE) with Expect', () => {
        it('should expect a user to be deleted with the task', function (done) {
            Chai.request(app)
                .del(`/deleteTodoDataByName/${updatedUser.newName}`)
                .end((error, response) => {
                    expect(response.status).to.equal(200)
                    expect(response.text).to.equal(`User with name : "${updatedUser.newName}"was deleted!`)
                    done()
                })
        });
    })
}


describe('TESTING USER API ALIVE ROUTES', () => {
    testNonExistingRouteExpect()
    getAllTodos()
    getAllTodosExpect()
    getUserNamesExpect()
    checkIfUserDoNotExistExpect(newUser.name)
    updateUserByNameDontExistExpect()
    createTodoExpect()
    getUserByNameExpect(newUser.id, newUser.name, newUser.task)
    updateUserByNameExpect(updatedUser.name)
    checkIfUserDoNotExistExpect(newUser.name)
    deleteUserByNameUserDontExistExpect(newUser.name)
    deleteUserByNameExpect(updatedUser.name)
    deleteUserByNameUserDontExistExpect(updatedUser.name)

})