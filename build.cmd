echo "Starting build pipeline"
pushd test-scheduling
call npm install
call npm test
IF %ERRORLEVEL% == 0 (
    popd
    pushd testschedulingbackend
    call npm install
    call npm test
    popd
)