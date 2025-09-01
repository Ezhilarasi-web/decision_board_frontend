@echo off
REM filepath: c:\Users\PratyushPromeetGhosh\Desktop\Projects\decision_boards\decision-boards\deploy-stack.bat
REM Set variables
set stackName=frontend-deployment
set templateFile=cloudformation\frontend-deployment.yaml
set parametersFile=cloudformation\parameters.json

echo Deploying CloudFormation stack...
aws cloudformation deploy ^
  --template-file %templateFile% ^
  --stack-name %stackName% ^
  --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM ^
  --parameter-overrides file://cloudformation/parameters.json

echo.
echo Fetching CloudFront URL...
FOR /F "tokens=* USEBACKQ" %%F IN (`aws cloudformation describe-stacks --stack-name %stackName% --query "Stacks[0].Outputs[?OutputKey=='WebsiteUrl'].OutputValue" --output text`) DO (
  set websiteUrl=%%F
)

echo.
echo Deployment complete! Your website will be available at:
echo %websiteUrl%
echo Make sure to copy down the link above, and trigger your first build using trigger-aws-build.bat
pause