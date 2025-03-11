#!/bin/bash

mkdir -p ba-logs

nomad_server_pod_name=$(kubectl get pods -l app=nomad-server -n circleci-server -o jsonpath='{.items[0].metadata.name}')

while :; do
    kubectl exec $nomad_server_pod_name -n circleci-server -- nomad status | tail -n +2 | awk '{ print $1 }' | while read -r job; do
        date=$(date +%s)
        mkdir -p "ba-logs/${date}/${job}"

        # shellcheck disable=SC2024
        kubectl exec $nomad_server_pod_name -n circleci-server -- nomad status "${job}" &>"ba-logs/${date}/${job}/status.txt"
        # shellcheck disable=SC2024
        kubectl exec $nomad_server_pod_name -n circleci-server -- nomad logs -stderr -job "${job}" &>"ba-logs/${date}/${job}/stderr.txt"

        kubectl exec $nomad_server_pod_name -n circleci-server -- nomad status "${job}" | tail -n +18 | awk "{ print \$1 }" | while read -r job_alloc; do
            kubectl exec $nomad_server_pod_name -n circleci-server -- nomad alloc exec "${job_alloc}" docker ps -a &>"ba-logs/${date}/${job}/docker-ps.txt"
            
            kubectl exec $nomad_server_pod_name -n circleci-server -- nomad alloc exec "${job_alloc}" docker ps -a | tail -n +2 | awk "{ print \$1 }" | while read -r containerid; do
                kubectl exec $nomad_server_pod_name -n circleci-server -- nomad alloc exec "${job_alloc}" docker logs $containerid &>"ba-logs/${date}/${job}/${containerid}.txt"
            done
        done
    done

    find ba-logs -type f -mtime +1 -exec rm {} \;
    find ba-logs -mindepth 1 -type d -exec bash -c 'rmdir "$1" &> /dev/null || true' shell {} \;
    echo "..."
    sleep 1
done
