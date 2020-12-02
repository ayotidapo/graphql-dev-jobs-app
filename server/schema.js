const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    job(id: ID!): Job
    jobs: [Job]
    company(id: ID!): Company
  }

  type Mutation {
    createJob(inputt: CreateJobInput): Job
  }

  type Company {
    id: ID!
    name: String
    description: String
    jobs: [Job]
  }

  type Job {
    id: ID!
    title: String
    description: String
    company: Company
  }

  input CreateJobInput {
    title: String
    description: String
  }
`;

module.exports = typeDefs;
