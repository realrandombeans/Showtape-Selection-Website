@echo off
start cmd /k "http-server"
ping 127.0.0.1 -n 2 > nul
start "" "http://localhost:8080"
