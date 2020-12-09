const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const cors = require("cors");
const express = require("express");
const expressJwt = require("express-jwt");
//const authenticate = require("./Function/auth");
const jwt = require("jsonwebtoken");
const db = require("./db");

// console.log(
//   jwt.decode(
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJCSnJwLUR1ZEciLCJpYXQiOjE2MDAxODE5MTF9.3mGYzwPRhIqts4Q4B2_tmJfAdT2ptPgO0I0m8SEutd8"
//   )
// );

const port = 9000;
const jwtSecret = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

const app = express();

app.use(
  cors(),
  bodyParser.json(),
  expressJwt({
    secret: jwtSecret,
    credentialsRequired: false,
  })
);
//const context = ({ req }) => { console.log(req.headers.authorization); return { user: authenticate(req.headers.authorization), method: req.method } }//
const context = ({ req }) => ({ user: req.user, method: req.method });

const apolloServer = new ApolloServer({ typeDefs, resolvers, context });
apolloServer.applyMiddleware({ app, path: "/graphql" });

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = db.users.list().find((user) => user.email === email);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign(
    { sub: user.id, companyId: user.companyId },
    jwtSecret
  );
  res.send({ token });
});

app.listen(port, () => console.info(`Server started on port ${port}`));

// export const setBaseUrlAndHeaders = () => {
//   axios.defaults.baseURL = BACKEND_URL + '/v2/';
//   // axios.defaults.timeout = 3000;
//   axios.defaults.headers.common['__retries'] = 1;
//   axios.defaults.headers.common['__retryCount'] = 0;
//   axios.defaults.headers.common['__retryDelay'] = 500;
//   // how many times to retry if response returns
//   //  empty string, array, object
//   axios.defaults.headers.common['__noRespRetries'] = 1;
//   axios.defaults.headers.common['__noRespRetryCount'] = 0;
//   axios.defaults.headers.post['Content-Type'] = 'application/json';

//   axios.interceptors.response.use(respInterceptor, errInterceptor);
// };
