import React, { Component } from "react";
import { JobList } from "./JobList";
import { getAllJobs } from './request'

export class JobBoard extends Component {
  state = {
    jobs: []
  }
  async componentDidMount() {
    try {
      const jobs = await getAllJobs()
      this.setState({ jobs })
    } catch (e) {
      const error = e.graphQLErrors.map(x => x.message).join(',')
      console.log(error)
    }

  }
  render() {
    const { jobs } = this.state
    return (
      <div>
        <h1 className='title'>Job List</h1>
        <JobList jobs={jobs} />
      </div>
    );
  }
}
