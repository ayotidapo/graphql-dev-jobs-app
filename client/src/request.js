import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "apollo-boost";
import gql from "graphql-tag";
const graphQlUrl = `http://localhost:9000/graphql`;

const authLink = new ApolloLink((operation, forward) => {
  if (localStorage.accessToken)
    operation.setContext({
      headers: {
        authorization: `Bearer ${localStorage.accessToken}`,
      },
    });
  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, new HttpLink({ uri: graphQlUrl })]),
  cache: new InMemoryCache(),
});

const getJobQuery = gql`
  query getJob($id: ID!) {
    job(id: $id) {
      id
      title
      description
      company {
        id
        name
      }
    }
  }
`;

export const createJob = async (body) => {
  const mutation = gql`
    mutation createAJob($input: CreateJobInput) {
      job: createJob(inputt: $input) {
        id
        title
        description
        company {
          id
        }
      }
    }
  `;

  const variables = {
    input: body,
  };

  const {
    data: { job },
  } = await client.mutate({
    mutation,
    variables,
    update: (cache, mutationData) => {
      const { data } = mutationData;
      cache.writeQuery({
        query: getJobQuery,
        variables: { id: data.job.id },
        data,
      });
    },
  });
  return job;
};

export const getAllJobs = async () => {
  const query = gql`
    query {
      jobs {
        id
        title
        description
      }
    }
  `;

  const {
    data: { jobs },
  } = await client.query({ query });
  return jobs;
};

export const getAJob = async (id) => {
  const query = getJobQuery;

  const {
    data: { job },
  } = await client.query({ query, variables: { id } });
  return job;
};
