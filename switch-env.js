/**
 * Script to switch between Nexus and KPR environments
 * Usage: node switch-env.js [nexus|kpr]
 */

const fs = require('fs');
const path = require('path');

// Get environment from command line argument
const env = process.argv[2]?.toLowerCase();

if (!env || (env !== 'nexus' && env !== 'kpr')) {
  console.error('Please specify either "nexus" or "kpr" as an argument');
  console.log('Usage: node switch-env.js [nexus|kpr]');
  process.exit(1);
}

// Define file paths
const sourceEnvFile = path.join(process.cwd(), `.env.${env}`);
const targetEnvFile = path.join(process.cwd(), '.env.local');

// Check if source env file exists
if (!fs.existsSync(sourceEnvFile)) {
  console.error(`Source environment file ${sourceEnvFile} does not exist`);
  process.exit(1);
}

// Copy the env file
try {
  fs.copyFileSync(sourceEnvFile, targetEnvFile);
  console.log(`Successfully switched to ${env.toUpperCase()} environment`);
  console.log(`Copied ${sourceEnvFile} to ${targetEnvFile}`);
} catch (error) {
  console.error(`Error switching environments: ${error.message}`);
  process.exit(1);
}

console.log(`\nTo start the development server with ${env.toUpperCase()} configuration, run:`);
console.log('npm run dev');

// Add script to package.json if it doesn't exist
try {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = require(packageJsonPath);
  
  if (!packageJson.scripts['use:nexus'] || !packageJson.scripts['use:kpr']) {
    packageJson.scripts['use:nexus'] = 'node switch-env.js nexus';
    packageJson.scripts['use:kpr'] = 'node switch-env.js kpr';
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('\nAdded convenience scripts to package.json:');
    console.log('- npm run use:nexus');
    console.log('- npm run use:kpr');
  }
} catch (error) {
  console.warn(`Could not update package.json: ${error.message}`);
} 