<img src="./docs/4.png">

<h1 align="center">time task tracker</h1>

<div align="center">
	<a href="https://github.com/karlosos/time-task-tracker#what-is-it-%EF%B8%8F">About</a>
  <span> • </span>
    	<a href="https://github.com/karlosos/time-task-tracker#application-">Application</a>
  <span> • </span>
       	<a href="https://github.com/karlosos/time-task-tracker#contribute-">Contribute</a>
  <span> • </span>
        <a href="https://github.com/karlosos/time-task-tracker#features-">Features</a>
  <p></p>
</div>

<div align="center">
 
[![App](https://img.shields.io/badge/live_app-time_task_tracker-blueviolet.svg?style=flat-square&logo=googlechrome&color=a8dcec&logoColor=white)](https://time-task-tracker.netlify.app/)
<!-- [![Super Linter](https://img.shields.io/github/workflow/status/NvChad/NvChad/Super-Linter/main?style=flat-square&logo=github&label=Build&color=8DBBE9)]() -->
<!-- <a href="https://github.com/NvChad/NvChad/blob/main/LICENSE"
        ><img
            src="https://img.shields.io/github/license/NvChad/NvChad?style=flat-square&logo=GNU&label=License&color=df967f"
            alt="License"
    /> -->
[![React](https://img.shields.io/badge/code-react-blueviolet.svg?style=flat-square&logo=react&color=a8dcec&logoColor=white)](#)
[![Typescript](https://img.shields.io/badge/language-typescript-blueviolet.svg?style=flat-square&logo=typescript&color=a8dcec&logoColor=white)](#)
[![TailwindCss](https://img.shields.io/badge/styling-tailwindcss-blueviolet.svg?style=flat-square&logo=tailwindcss&color=a8dcec&logoColor=white)]()
[![Prettier](https://img.shields.io/badge/formatting-prettier-blueviolet.svg?style=flat-square&logo=prettier&color=a8dcec&logoColor=white)]()
[![Netlify](https://img.shields.io/badge/deployed_on-netlify-blueviolet.svg?style=flat-square&logo=netlify&color=a8dcec&logoColor=white)]()
  </div>

## What is it? 📽️

- _time task tracker_ is webapp for tracking time without server synchronization
- all the data is stored in the local storage - no problems with synchronization
- automatically makes transforms jira ids to urls
- each time entry has checkbox for flagging the task already logged in jira

## Application 🔗

You can check the app [here](https://time-task-tracker.netlify.app/).

## Contribute 🧑‍💻

**My env**:

- node version 16.14.0 (working on 18.X too)
- npm version 8.3.1

**Developing the app**:

- clone app and run `npm install`
- start the app with `npm start`
- on macos I had to fix husky permissions (pre push checks)

```
chmod ug+x .husky/*
chmod ug+x .git/hooks/*
```

- test with `npm test`
- format code with prettier with `npm run format`
- lint code with `npm run lint`

## Features ✨

- tracking time
- editing existing time entry (changing text, start time and stop time)
- removing entries
- marking entries as logged in jira
