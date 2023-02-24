import app from "../../server";
import supertest from "supertest";

describe("routers are works fine test with server", () => {
  afterAll((done) => {
    app.close(done);
  });
  test("Check combine routes are works fine", (done) => {
    // jest.setTimeout(2000);
    supertest(app)
      .get("/wallets")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe(JSON.stringify({ $metadata: { attempts: 1, totalRetryDelay: 0 } }));
        done();
      });
  });
});
