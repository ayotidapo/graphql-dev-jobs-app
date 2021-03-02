
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const auth = require("./Function/auth");
const connectDB = require('./DBconfig/db');
const jwt = require("jsonwebtoken");
const db = require("./db");
const dotenv = require("dotenv");

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}



connectDB(process.env.MONGO_URI)

const { authenticate } = auth

const context = ({ req }) => ({ user: authenticate(req.headers.authorization), method: req.method })//


const apolloServer = new ApolloServer({ typeDefs, resolvers, context });

apolloServer.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});


// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   const user = db.users.list().find((user) => user.email === email);
//   if (!(user && user.password === password)) {
//     res.sendStatus(401);
//     return;
//   }
//   const token = jwt.sign(
//     { sub: user.id, companyId: user.companyId },
//     jwtSecret
//   );
//   res.send({ token });
// });



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
