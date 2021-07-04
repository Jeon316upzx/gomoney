import app from '../app';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import { FIXTURE_STATUS } from '../constants/fixture';


chai.use(chaiHttp);
const expect = chai.expect;



describe("Gomoney project Client testCase", async () => {


    let token:any = null;
    before("Authenticate client before runnng test", async ()=>{

                let res = await chai
                            .request(app)
                            .post("/gomoney/api/v1/auth/login")
                            .send({email: "jeon316@gmail.com" , password: "dada12345"})
                token = res.body.data.token
     

    })


    //Client authentication
    describe("Register", async () => {
        it("Should return an account already exists", async () => {
          let res = await chai
                      .request(app)
                      .post("/gomoney/api/v1/auth/register")
                      .send({ firstname: "Mazi", lastname: "Uwa", email: "jeon316@gmail.com" , password: "dada12345"})
  
            expect(res.status).to.equal(409)
        });
      })


    //Fixture    
    describe("GET pending fixtures", async () => {
      it("Should return all pending fixtures", async () => {
        let res = await chai
                    .request(app)
                    .get("/gomoney/api/v1/fixtures/pending")
                    .set({ "Authorization": `Bearer ${token}` })

          expect(res.status).to.equal(200)
      });
    })


    describe("GET completed fixtures", async () => {
        it("Should return all completed fixtures", async () => {
          let res = await chai
                      .request(app)
                      .get("/gomoney/api/v1/fixtures/completed")
                      .set({ "Authorization": `Bearer ${token}` })
  
            expect(res.status).to.equal(200)
        });
      })

    


    //Team
    describe("GET team", async () => {
      it("Should return a team", async () => {
        let res = await chai
                    .request(app)
                    .get("/gomoney/api/v1/teams/view/60df4bc42cf37a561c60dbca")
                    .set({ "Authorization": `Bearer ${token}` })

          expect(res.status).to.equal(200)
      });
    })



    describe("GET teams", async () => {
      it("Should return all teams", async () => {
        let res = await chai
                    .request(app)
                    .get("/gomoney/api/v1/teams/view")
                    .set({ "Authorization": `Bearer ${token}` })

          expect(res.status).to.equal(200)
      });
    })
  

})