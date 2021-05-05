import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "apollo-boost";
import gql from "graphql-tag";
const graphQlUrl = `http://localhost:4000`;

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

const jobDetailFragment = gql`
  fragment JobDetail on Job {
    id
    title
    company {
      id
      name
    }
    description
  }
`;

const getJobQuery = gql`
  query getJob($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

const createJobMutation = gql`
  mutation createAJob($input: CreateJobInput) {
    job: createJob(inputt: $input) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

const loginMutation = gql`
  mutation loginUser($input: LoginInput) {
    token: login(input: $input)
  }
`;

const getAllJobsQuery = gql`
  query AllJobs {
    jobs {
      id
      title
      description
    }
  }
`;

const getACompanyQuery = gql`
  query getACompany($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
        description
      }
    }
  }
`;

export const createJob = async (body) => {
  const variables = {
    input: body,
  };

  const {
    data: { job },
  } = await client.mutate({
    mutation: createJobMutation,
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
  try {
    const {
      data: { jobs },
    } = await client.query({ query: getAllJobsQuery, fetchPolicy: "no-cache" });
    return jobs;
  } catch (e) {
    console.log(`Error:${e}`);
  }
};

export const getAJob = async (id) => {
  const {
    data: { job },
  } = await client.query({ query: getJobQuery, variables: { id } }); //await client.query({ query,fetchPolicy:'no-cache', variables: { id } });
  return job;
};

export const getACompany = async (id) => {
  const {
    data: { company },
  } = await client.query({ query: getACompanyQuery, variables: { id } });
  return company;
};

export const loginUser = async (body) => {
  //try {
  const {
    data: { token },
  } = await client.mutate({
    mutation: loginMutation,
    variables: { input: body },
  });
  localStorage.setItem("accessTokenKey", token);
  return token;
  // } catch (error) {
  //   console.log(error.graphQLErrors.map((x) => x.message).join(','))
  //   return 'Unathourised'
  // }
};

//
//
//
//disable cache for entire-app
// const defaultOptions: DefaultOptions = {
//   watchQuery: {
//     fetchPolicy: 'no-cache',
//     errorPolicy: 'ignore',
//   },
//   query: {
//     fetchPolicy: 'no-cache',
//     errorPolicy: 'all',
//   },
// }

// const client = new ApolloClient({
// link: concat(authMiddleware, httpLink),
// cache: new InMemoryCache(),
// defaultOptions: defaultOptions,

// });
