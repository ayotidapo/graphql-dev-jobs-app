import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAJob } from "./request";

export class JobDetail extends Component {
  state = {
    jobId: this.props.match.params.jobId,
    job: { company: {} },
  };
  async componentDidMount() {
    const { jobId } = this.state;
    const job = await getAJob(jobId);
    this.setState({ job });
  }
  render() {
    const { job } = this.state;
    return (
      <div>
        <h1 className='title'>{job.title}</h1>
        <h2 className='subtitle'>
          <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
        </h2>
        <div className='box'>{job.description}</div>
      </div>
    );
  }
}
