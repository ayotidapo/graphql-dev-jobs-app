import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAllJobs } from "./request";

export class JobList extends Component {
  state = {
    jobs: [],
  };
  async componentDidMount() {
    const jobs = await getAllJobs();
    this.setState({ jobs });
  }

  render() {
    const { jobs } = this.state;
    return <ul className='box'>{jobs.map(this.renderJob.bind(this))}</ul>;
  }

  renderJob(job) {
    const title = job.company
      ? `${job.title} at ${job.company.name}`
      : job.title;
    return (
      <li className='media' key={job.id}>
        <div className='media-content'>
          <Link to={`/jobs/${job.id}`}>{title}</Link>
        </div>
      </li>
    );
  }
}




