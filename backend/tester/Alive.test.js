import Chai from "chai"
import ChaiHTTP from "chai-http"
import {describe, it} from 'mocha'
import app from '../src/server.js'


Chai.should()
Chai.use(ChaiHTTP)
const expect = Chai.expect

const testingAliveRoute = () => {
    describe('Test route that exist', () => {
        it('should expect 200 OK', (done) => {
            Chai.request(app)
                .get('/')
                .end((req, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.equal('This API is alive!')
                    done()
                })
        })
    })
}

describe('test for API alive route', () => {
    testingAliveRoute()
})