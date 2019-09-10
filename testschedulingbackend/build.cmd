echo "Building backend and testing..."
cd \testschedulingbackend
npm install && npm run-script mocha
exit %ERRORLEVEL%