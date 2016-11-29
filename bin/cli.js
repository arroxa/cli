#! /usr/bin/env node
'use strict'

const fs = require('fs')
const exec = require('child_process').exec
const inquirer = require('inquirer')
const repositories = require('../lib/repositories.json')

inquirer.prompt({
  type: 'list',
  name: 'repo',
  message: 'Escolha um projeto:',
  choices: repositories
}).then(function (answers) {
  let repo = answers.repo.toLowerCase().replace(/\s/g, '-')

  if (!fs.existsSync(repo)) {
    console.log(`Arroxando...`)
    exec(`git clone https://github.com/arroxa/${repo}.git`, (err, stdout, stderr) => {
      if (!err) {
        console.log(`
     ...    ...... ......  ....  ..  ..    ...
    .. ..   ..  .. ..  .. ..  ..  ....    .. ..
   .......  .....  .....  ..  ..  ....   .......
  ..     .. ..  .. ..  ..  ....  ..  .. ..    . .
  ______________ código é poesia ________________
  `)
        process.exit(1)
      }
    })
  } else {
    console.log(`\n ❌  Ops! Parece que o ${repo} já existe em seu atual diretório!`)
    process.exit(1)
  }
})
