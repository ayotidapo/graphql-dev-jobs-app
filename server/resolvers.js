const db = require("./db");

const Query = {
  job: (_root, { id }) => db.jobs.get(id),
  jobs: () => db.jobs.list(),
  company: (_root, { id }) => db.companies.get(id),
};

const Mutation = {
  createJob(_root, { inputt }, { user }) {
    // console.log(user);
    // if (!user) {
    //   throw new Error(`Unauthorised`);
    // }
    const jobId = db.jobs.create({ ...inputt, companyId: user.companyId });
    return db.jobs.get(jobId);
  },
};

const Company = {
  jobs: (company) =>
    db.jobs.list().filter((job) => job.companyId === company._id),
};

const Job = {
  company: (job) => db.companies.get(job.companyId),
};

module.exports = { Query, Mutation, Company, Job };
