@echo off
REM Set variables
set stackName=frontend-deployment
echo Triggering initial build for stack %stackName%...

aws codebuild start-build --project-name %stackName%-build --query "build.[id,startTime]" --output text

echo Build triggered. Check AWS Console for progress at:
echo https://ap-south-1.console.aws.amazon.com/codesuite/codebuild/projects/%stackName%-build/build/
pause