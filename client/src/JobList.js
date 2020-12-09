import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAllJobs } from "./request";

export class JobList extends Component {
  state = {
    jobs: [],
  };
  async componentDidMount() {
    const jobs = await getAllJobs();
    console.log(jobs)
    this.setState({ jobs });
  }

  renderJob(job) {
    console.log(this.state.jobs)
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
  render() {

    const { jobs } = this.state;
    console.log(jobs)
    return <ul className='box'>{jobs.map(this.renderJob.bind(this))}</ul>;
  }


}




