#!/bin/bash

# Helper function to show usage
show_usage() {
  echo "Usage: ./sync-branches.sh [options]"
  echo ""
  echo "Options:"
  echo "  --to-nexus    Sync changes from current branch to nexus branch"
  echo "  --from-nexus  Sync changes from nexus branch to current branch"
  echo "  --help        Show this help message"
  echo ""
  echo "Example:"
  echo "  ./sync-branches.sh --to-nexus    # Sync changes to nexus branch"
}

# Check arguments
if [ "$#" -ne 1 ]; then
  show_usage
  exit 1
fi

# Store current branch
CURRENT_BRANCH=$(git branch --show-current)

if [ "$1" == "--help" ]; then
  show_usage
  exit 0
elif [ "$1" == "--to-nexus" ]; then
  # Sync changes to nexus branch
  echo "Syncing changes from $CURRENT_BRANCH to nexus branch"
  
  # Check if there are uncommitted changes
  if [ -n "$(git status --porcelain)" ]; then
    echo "Error: You have uncommitted changes. Please commit or stash them first."
    exit 1
  fi
  
  # Save current branch and switch to nexus
  git checkout nexus || { echo "Failed to switch to nexus branch"; exit 1; }
  
  # Merge changes from the original branch
  git merge $CURRENT_BRANCH || { 
    echo "Merge conflict detected. Please resolve conflicts manually."
    echo "After resolving conflicts, run:"
    echo "  git add <resolved-files>"
    echo "  git commit -m \"Merge $CURRENT_BRANCH into nexus\""
    exit 1
  }
  
  echo "Successfully merged changes from $CURRENT_BRANCH to nexus"
  echo "Current branch is now 'nexus'"
  echo ""
  echo "To switch back to $CURRENT_BRANCH, run:"
  echo "  git checkout $CURRENT_BRANCH"
  
elif [ "$1" == "--from-nexus" ]; then
  # Sync changes from nexus branch
  echo "Syncing changes from nexus branch to $CURRENT_BRANCH"
  
  # Check if there are uncommitted changes
  if [ -n "$(git status --porcelain)" ]; then
    echo "Error: You have uncommitted changes. Please commit or stash them first."
    exit 1
  fi
  
  # Pull latest changes from nexus
  git checkout nexus || { echo "Failed to switch to nexus branch"; exit 1; }
  git pull origin nexus || { echo "Failed to pull latest changes from nexus"; exit 1; }
  
  # Switch back to original branch
  git checkout $CURRENT_BRANCH || { echo "Failed to switch back to $CURRENT_BRANCH"; exit 1; }
  
  # Merge changes from nexus
  git merge nexus || {
    echo "Merge conflict detected. Please resolve conflicts manually."
    echo "After resolving conflicts, run:"
    echo "  git add <resolved-files>"
    echo "  git commit -m \"Merge nexus into $CURRENT_BRANCH\""
    exit 1
  }
  
  echo "Successfully merged changes from nexus to $CURRENT_BRANCH"
  
else
  echo "Error: Unknown option $1"
  show_usage
  exit 1
fi 