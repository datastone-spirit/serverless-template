#!/usr/bin/env sh
# set -e will cause the script to exit if any command fails
set -e

echo "Building the project..."

python3.11 -u src/build.py

echo "Project built successfully!"