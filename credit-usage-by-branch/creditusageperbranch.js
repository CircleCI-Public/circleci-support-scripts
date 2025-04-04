const axios = require('axios');
const async = require('async');

// CircleCI API endpoint to get job summary for a project
const endpoint = 'https://circleci.com/api/v2/insights/pages/{INSERT_PROJECT_SLUG}/summary';
const circleciToken = 'Basic {INSERT_TOKEN_HERE}';

const getBranches= async (url,circleciToken) => {

    try {
        const config = {
            method: 'GET',
            url: url,
            qs: {
                'reporting-window': 'last-30-days'
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': circleciToken}
        };

        const response = await axios(config);
        console.log('All Branches: ', response.data.all_branches);
        const branches = response.data.all_branches;
        return branches;

    } catch(e) {
        console.error('Error Getting Branches: ', e);
    }
};

const getCredits= async (url,allBranches) => {
    var newURL = url + '?';
    for (let i = 0; i < allBranches.length; i++){
        newURL = newURL + 'branches=' + allBranches[i] + '&';
    }
    console.log('NewURL:', newURL);
    try {
        const config = {
            method: 'GET',
            url: newURL,
            qs: {
                'reporting-window': 'last-30-days' //change reporting window to required timing
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': circleciToken}
        };

        const response = await axios(config);
        console.log(response.data.project_workflow_branch_data);
        const credits = response.data.project_workflow_branch_data;
        return credits;

    } catch(e) {
        console.error('Error Getting Credits: ', e);
    }
};

const executeFunctions = async ()  => {
 try {
    // Wait for the first API call to complete
    const allBranches = await getBranches(endpoint);
    
    // Optionally use the first API call's result in the second call
    console.log('List of Branches:', allBranches);
    
    // Now execute the second API call
    await getCredits(endpoint, allBranches);
  } catch (error) {
    console.error('An error occurred while executing API calls:', error);
  }
}

executeFunctions(endpoint);