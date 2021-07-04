import app from '../app';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import { FIXTURE_STATUS } from '../constants/fixture';


chai.use(chaiHttp);
const expect = chai.expect;



describe("Gomoney project Admin testCase", async () => {


    let admintoken:any = null;
    before("Authenticate admin before runnng test", async ()=>{

                let res = await chai
                            .request(app)
                            .post("/gomoney/api/v1/admin/login")
                            .send({email: "jeon316@gmail.com" , password: "dada12345"})
                admintoken = res.body.data.token
     

    })


    //Admin authentication
    describe("Register", async () => {
        it("Should return an admin already exists", async () => {
          let res = await chai
                      .request(app)
                      .post("/gomoney/api/v1/admin/register")
                      .send({ firstname: "Dan", lastname: "Brown", email: "jeon316@gmail.com" , password: "dada12345"})
  
            expect(res.status).to.equal(409)
        });
      })


    



    //Fixture
    describe("POST fixture", async () => {
      it("Should return create new fixture", async () => {
        let res = await chai
                    .request(app)
                    .post("/gomoney/api/v1/admin/fixture/add")
                    .send({ team1: "60df4ce12cf37a561c60dbe2" , team2: "60df4c762cf37a561c60dbda", fixture_date:"2025-12-08", fixture_status: FIXTURE_STATUS.COMPLETED})
                    .set({ "Authorization": `Bearer ${admintoken}` })

          expect(res.status).to.equal(201)
      });
    })


    
    describe("GET fixture", async () => {
      it("Should return one single fixture resource", async () => {
        let res = await chai
                    .request(app)
                    .get("/gomoney/api/v1/admin/fixture/view/60dfd72094516f4ca4f59fa5")
                    .set({ "Authorization": `Bearer ${admintoken}` })

          expect(res.status).to.equal(200)
      });
    })


    
    describe("GET fixtures", async () => {
      it("Should return all fixtures", async () => {
        let res = await chai
                    .request(app)
                    .get("/gomoney/api/v1/admin/fixture/view")
                    .set({ "Authorization": `Bearer ${admintoken}` })

          expect(res.status).to.equal(200)
      });
    })

    


    //Team
    describe("GET team", async () => {
      it("Should return a team", async () => {
        let res = await chai
                    .request(app)
                    .get("/gomoney/api/v1/admin/team/view/60df4bc42cf37a561c60dbca")
                    .set({ "Authorization": `Bearer ${admintoken}` })

          expect(res.status).to.equal(200)
      });
    })



    describe("GET teams", async () => {
      it("Should return all teams", async () => {
        let res = await chai
                    .request(app)
                    .get("/gomoney/api/v1/admin/team/view")
                    .set({ "Authorization": `Bearer ${admintoken}` })

          expect(res.status).to.equal(200)
      });
    })
  

})