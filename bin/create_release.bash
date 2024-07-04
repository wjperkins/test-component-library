#!/usr/bin/env bash

set -euo pipefail

echo "Starting script to create a release..."

if ! command -v gh >/dev/null 2>&1; then
    echo "❌ Please install gh (GitHub CLI) to create a release - see https://cli.github.com/"
    exit 1
fi

if ! git diff --quiet || ! git diff --quiet --cached; then
    echo ""
    echo "❌ Uncommitted changes found. Please commit current changes to proceed."
    git status
    exit 1
fi

echo ""
echo "Checking out main branch..."
git checkout main

# Pull the latest changes
echo ""
echo "Pulling latest changes..."
git fetch origin 'refs/tags/*:refs/tags/*'
git pull

current_version=$(grep '"version"' ../package.json | cut -d '"' -f 4)

# Get the changes since the last tagged release
echo "Grabbing Git Log..."
git_log=$(git log "$(git tag -l "1*" --sort=-version:refname | head -n 1)..HEAD" --pretty=format:"* %s")
echo "Changes since the last tagged release:"
echo "$git_log"

# Ask the user for the version number
echo ""
echo "Review these to determine what new version number to use - following the SemVer guidelines. (https://semver.org/)"
echo "Current version: $current_version"
read -rp "❓ Enter the version number (e.g. $current_version): " version_number

# Check if the version number is valid
echo ""
# Regex to check if the version number is valid - example 0.0.1
if [[ $version_number =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Version number: $version_number"
else
    echo "❌ Invalid version number. Please use semantic versioning - following the SemVer guidelines. (https://semver.org/)."
    exit 1
fi

# Allow the user a chance to abort
echo ""
read -rp "❓ Continuing will update the version number and create a tagged release - continue? [y/n]" continue_input
if [ "$continue_input" == "${continue_input#[Yy]}" ] ;then
    echo Exiting...
    exit 1
fi

echo ""
branch_name="bump-version-v${version_number//./-}"
echo "Checking out branch $branch_name"
git checkout -b "$branch_name"

echo ""
echo "Bumping version from $current_version to $version_number"
npm --no-git-tag-version version "$version_number"

echo ""
echo "Committing changes..."
git commit -am "Bump Avori Component Library version to $version_number" --no-verify

echo ""
echo "Pushing changes to remote..."
git push --set-upstream origin "$branch_name"

echo "Creating PR - this will be merged automatically as part of the deployment process."
pr_url=$(gh pr create -f --label "bump-version")
gh pr merge --auto --squash "$pr_url"

echo ""
echo "✅ Finished setting up release - check progress here: https://github.com/wjperkins/test-component-library/actions/workflows/ci.yml"