# creditbybranch
------------------------
PLEASE NOTE: This script uses the Insights API which is not for the use of exact financial reporting. It is for best estimates and approximations of credit usage.

## Installation
* Make sure you have Node.js installed on the machine you are running the script on first

Clone the repository and navigate to the folder with the creditusageperbranch.js file in it.
Run the following commands to install necessary dependencies:
```
npm install axios
npm install async
```

------------------------
## Update Script
Open the creditusageperbranch.js file and replace the {INSERT-PROJECT-SLUG} and {INSERT-API-TOKEN} portions of the API endpoint and api key variables to your project and your API key. Save the file.
It should look something like this:

```
const endpoint = 'https://circleci.com/api/v2/insights/pages/github/organization_name/project_name/summary';
const circleciToken = 'Basic CCIPRJ_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
```

-------------------------
## Execute
Run the following command in the folder with the creditusageperbranch.js script in it:
```node creditusageperbranch.js```
