import React, { Component } from 'react';
import Dashboard from '../template/Dashboard.js';

import { loadStaff } from './Userfunctions.js';

class AdminPage extends Component {
    constructor(){
        super();
        this.state = {
            staff: [],
            jobs: []
        };
    }

    async componentWillMount() {
        //Get List of staff
        await loadStaff().then(res => {
            console.log(res);
            this.setState({
                staff: res
            }, () => {
                console.log('sstate',this.state);
            });
        });

        //Get list of all jobs (In queue, In Progress, Completed)

    }

    render() {
        console.log(this.state)
        return (
            <div>
                <Dashboard 
                staff={this.state.staff} 
                availableJobs={false}
                inProgressJobs={false}
                CompletedJobs={false}
                />
            </div>
        )
    }
}

export default AdminPage;
