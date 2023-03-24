#!/usr/bin/env node

const { execSync } = require('child_process')

const runCmd = cmd => {
  try {
    execSync(`${cmd}`, { stdio: 'inherit' })
  } catch (e) {
    console.error(`Failed to execute ${cmd}`, e)

    return false
  }

  return true
}

const repoName = process.argv[2] ?? 'react-app'
const gitCheckoutCmd = `git clone --depth 1 https://github.com/BeerCodeIndustry/react-starter ${repoName}`
const installDepsCmd = `cd ${repoName} && yarn install`
const removeRemoteCmd = `cd ${repoName} && git remote remove origin && git filter-branch -- --all && git update-ref -d HEAD`

console.log(`Cloning the repository with name ${repoName}`)
const checkoutOut = runCmd(gitCheckoutCmd)
if (!checkoutOut) process.exit(-1)

console.log(`Installing dependencies for ${repoName}`)
const installedDeps = runCmd(installDepsCmd)
if (!installedDeps) process.exit(-1)

console.log(`Remove remote`)
const removedRemote = runCmd(removeRemoteCmd)
if (!removedRemote) process.exit(-1)

console.log(
  'Congratulations! You are ready. Follow the following commands to start',
)
console.log(`cd ${repoName} && yarn start`)
