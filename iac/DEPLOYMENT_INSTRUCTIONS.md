# Deployment Instructions

This document outlines the steps to deploy this application to AWS CloudFront.

## Prerequisites

- Node.js (v18 or higher)
- AWS CLI configured with appropriate credentials
- IAM access for all cloud services involved (CodeBuild, CodeStar/CodeConnections, CloudFormation, CloudFront, S3 and CloudWatch)
- Sufficient permissions for the target repository (on GitLab, usually Maintainer or higher)

## Deployment

### Pre-Deployment Checklist

1. You have the requisite IAM roles, including `AWSCodeStarFullAccess` or other sufficient CodeConnections access, and your AWS CLI is configured correctly.
2. You have configured the parameters in `cloudformation/parameters.json` according to your requirements.
3. You have set the `stackName` variable in `deploy-stack.bat` and `trigger-aws-build.bat` to a unique string, so as to avoid overriding an existing stack.
4. You have access to the Connection to which you have linked. Configure Connections in `CodeBuild > Settings > Connections` and check which ones you can access by running:
   ```bash
   aws codestar-connections list-connections --query "Connections[*].{Name:ConnectionName,ARN:ConnectionArn,Status:ConnectionStatus}" --output table
   ```
   from your machine.
5. You have appropriate rights to the repository in question (on GitLab typically, Maintainer or higher).
   
> **NOTE:** If you are using GitHub or a different platform, or the application URL does not begin with `https://gitlab.com/ganitinc/productlets/` make sure to modify `frontend-deployment.yaml` and `parameters.json` accordingly.

5. More advanced users may wish to modify `frontend-deployment.yaml` to right-size the resources allocated, adjust certain website parameters, or provision other services (e.g. Route 53 for hosting via a ganitinc subdomain).

> **NOTE:** It is safe to re-run this script to update past stacks of the same name.

### Run the Deployment Script

1. Run the following deployment script from Windows:
```bash
.\deploy-stack.bat
```

This script will:
- Create/update the CloudFormation stack
- Create a webhook which (on push) builds the target branch and uploads build artifacts to S3
- Configure CloudFront distribution
- Invalidate CloudFront cache

> **NOTE:** This script will NOT automatically trigger the first build upon deployment - do this manually via `trigger-aws-build.bat` (Windows-only).

### Post-Deployment Verification

1. Wait for CloudFront distribution to complete deployment (can take 5-15 minutes)
2. Verify the application loads at your CloudFront domain
3. Test all major application features
4. Check browser console for any errors
5. Verify all assets (images, CSS, JS) are loading correctly

## Deleting Resources Created By Failed Runs

If you need to delete resources created by a failed run:

1. Use the CloudFormation console to delete the stack (triggering automatic deletion of most resources created by it).
2. Manually delete the S3 bucket created by the failed run.

> **NOTE:** If you simply wish to rollback a failed deployment to an earlier version, you can accomplish this through the CloudFormation console as well. Alternatively, roll back the S3 bucket directly.