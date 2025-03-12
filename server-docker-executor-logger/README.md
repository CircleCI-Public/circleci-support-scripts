# [SERVER] Docker Executor Logs Collection Script

This script collects logs and status information from Nomad Client where the Docker Executor are running. This is specifically for **CircleCI Server** installations. It periodically fetches statuses, allocation details, container statuses, and logs, saving them locally for troubleshooting and analysis.

## Prerequisites

- `kubectl` installed and configured to access your Kubernetes cluster.
- Appropriate permissions to execute commands within the `circleci-server` namespace.

## When to Run the Script

To ensure comprehensive log collection, run this script **before triggering your CircleCI build**. Allow the script to run continuously during the build execution. Once the build completes or fails, wait until you see the script output `"..."`, indicating it is in a sleep state and preparing for the next log collection cycle. At this point, you can safely stop the script by pressing `Ctrl+C`.

**Recommended Workflow:**

1. Start the script.
2. Trigger your CircleCI build.
3. Allow the build to run to completion or failure.
4. Wait until the script outputs `"..."`.
5. Press `Ctrl+C` to stop the script.

## How to Run the Script

### Option 1: Download and Run Locally

1. Download the script from GitHub:

```bash
curl -O https://raw.githubusercontent.com/CircleCI-Public/circleci-support-scripts/main/server-docker-executor-logger/collect_docker_logs.sh
```

2. Make the script executable:

```bash
chmod +x collect_docker_logs.sh
```

3. Execute the script:

```bash
./collect_docker_logs.sh
```

### Option 2: Run Directly via Curl

You can directly execute the script without downloading it first:

```bash
curl -s https://raw.githubusercontent.com/CircleCI-Public/circleci-support-scripts/main/server-docker-executor-logger/collect_docker_logs.sh | bash
```

## What the Script Does

- Creates a directory named `ba-logs` to store logs.
- Periodically (every second) retrieves:
  -  Docker statuses.
  - Standard error logs from Nomad jobs.
  - Docker container statuses (`docker ps -a`) for each Nomad allocation.
  - Docker container logs for each container running within Nomad allocations.
- Automatically cleans up logs older than 1 day to conserve disk space.

## Directory Structure

Logs are stored in the following structure:

```
ba-logs/
└── <timestamp>/
    └── <job-name>/
        ├── status.txt
        ├── stderr.txt
        ├── docker-ps.txt
        └── <container-id>.txt
```

## Stopping the Script

To stop the script, wait until you see the `...` output. This indicates the script is currently sleeping and preparing for the next log collection cycle. At this point, press `Ctrl+C` to safely terminate the script.

### Common Warnings (Safe to Ignore)

You may occasionally see output similar to the following:

```
failed to exec into task: task "838b68f8-f736-5ab2-b5e8-0f377f9a7a93" is not running.
command terminated with exit code 1
...
failed to exec into task: task "838b68f8-f736-5ab2-b5e8-0f377f9a7a93" is not running.
command terminated with exit code 1
...
```

These messages indicate that the script attempted to collect logs from a task or container that is no longer running. This is expected behavior and can safely be ignored.

## Troubleshooting

- Ensure your Kubernetes context is correctly set (`kubectl config current-context`).
- Verify you have permissions to execute commands in the `circleci-server` namespace.
