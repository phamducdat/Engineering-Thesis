#!/bin/bash

# Get the latest tag from Git
latest_tag=$(git describe --abbrev=0 --tags)

# Extract the version number from the latest tag
version=$(echo $latest_tag | grep -oP '\d+\.\d+\.\d+')

# Increment the patch version
patch=$(echo $version | awk -F. '{$NF = $NF + 1;} 1' | sed 's/ /./g')

# Get the commit message
commit_message=$(git log --format=%B -n 1 HEAD)

# Check if the commit message follows the Angular commit convention
if [[ $commit_message =~ ^(\w+)(\(\w+\))?:\s(.*)$ ]]; then
  commit_type="${BASH_REMATCH[1]}"
  scope="${BASH_REMATCH[2]}"
  subject="${BASH_REMATCH[3]}"

  # Generate the new tag based on the commit type
  case $commit_type in
    feat) tag="${patch}";;
    fix) tag="${patch}";;
    chore) tag="${version}";;
    *) tag="${latest_tag}";;
  esac

  # Create the new tag
  git tag -a "${tag}" -m "${commit_message}"
  git push --tags
fi
