echo "Starting frontend build and testing..."
cd \test-scheduling
npm install && npm run-script build
exit %ERRORLEVEL%