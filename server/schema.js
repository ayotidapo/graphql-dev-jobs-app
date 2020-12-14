const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    job(id: ID!): Job
    jobs: [Job]
    company(id: ID!): Company
    
  }

  type Mutation {
    createJob(inputt: CreateJobInput): Job 
    login(input: LoginInput):String
    createUser(input: LoginInput):User
  }

  type User {
    email: String
    password: String
    
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

  input LoginInput {
    email: String
    password: String
  }
`;

module.exports = typeDefs;
