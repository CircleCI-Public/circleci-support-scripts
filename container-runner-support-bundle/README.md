# CircleCI Container Runner Support Bundle
This directory contains a support bundle for troubleshooting. It allows users to collect and sanitize information about a specific install, to send to support for additional debugging.

The manifests defined in this directory are client-side, and install no resources on the cluster.

## Prerequisites

1. First, make sure [Container Runner](https://circleci.com/docs/container-runner-installation/) is deployed and you have access to the cluster/namespace through `kubectl`.
2. Next, [install krew](https://krew.sigs.k8s.io/docs/user-guide/setup/install/).
3. Install preflight and support bundle to your local development machine.

```bash
kubectl krew install preflight
kubectl krew install support-bundle
```

## Collecting Support Information (Development)

### Collecting Information
When ready, run the support bundle from the current directory and wait for it to finish.

```bash
# Within the circleci-container-runner-help/support directory
kubectl support-bundle support-bundle.yaml
```

A sanitized .tar.gz file will be created in the current directory - this can be sent to the support team for further debugging.
