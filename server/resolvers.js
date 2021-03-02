const db = require("./db");
const Gig = require('./models/Gig');
const auth = require("./Function/auth");
const User = require('./models/User');

const Query = {
  job: (_root, { id }) => db.jobs.get(id),
  jobs: () => Gig.find(),
  company: (_root, { id }) => db.companies.get(id),
};

const Mutation = {
  createJob(_root, { inputt }, { user }) {
    console.log(user);
    if (!user) {
      throw new Error(`Unauthorised`);
    }
    const jobId = db.jobs.create({ ...inputt, companyId: user.companyId });
    return db.jobs.get(jobId);
  },

  async login(_root, { input }) {
    const { email, password } = input
    let user = await User.findOne({ email, password })

    if (!user) {
      throw new Error('Unauthorised!')
    }

    const { genToken } = auth
    const payload = {
      userId: user._id
    }
    return genToken(payload)
  },

  async createUser(_root, { input }) {
    const { email, password } = input
    const user = new User({
      email,
      password
    });
    await user.save();
    return user
  }
};

const Company = {
  jobs: (company) =>
    db.jobs.list().filter((job) => job.companyId === company.id),
};

const Job = {
  company: (job) => db.companies.get(job.companyId),
};

module.exports = { Query, Mutation, Company, Job };
