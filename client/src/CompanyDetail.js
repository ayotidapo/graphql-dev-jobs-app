import React, { Component } from 'react';
import { getACompany } from './request'
export class CompanyDetail extends Component {



  state = { company: { jobs: [] } };


  async componentDidMount() {
    const { companyId } = this.props.match.params;
    const company = await getACompany(companyId)

    this.setState({ company })
  }

  render() {
    const { company } = this.state;
    console.log(company.jobs)
    return (
      <div>
        <h1 className="title">{company.name}</h1>
        <div className="box">{company.description}</div>
        <h2>Jobs</h2>
        <ul className='box'>
          {company.jobs.map((job) => <li className='media hand' key={job.id} onClick={() => this.props.history.push(`/jobs/${job.id}`)} >{job.title}</li>)}
        </ul>

      </div>
    );
  }
}
