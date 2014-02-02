# Angular EPG

> Electronic Programme Guide built in Angular.

## Dev Dependencies
node.js
npm
git
Ruby
Compass
Grunt CLI


## To Get Up and Running
Install Grunt CLI using the Node Package Manager
```bash
sudo npm install -g grunt-cli
```

navigate to the Fang directory and install dependencies
```bash
npm install
```


## Tasks
You now have multiple tasks available to you from the command line

```bash
grunt cleanCompile
```
This task will;
- Destroy all compiled CSS and JS files
- Recompile SASS into CSS
- Create JS files of all coffee test files (readability for the coffee illiterate)


```bash
grunt test
```
This task will;
- Destroy all compiled CSS and JS files
- Recompile SASS into CSS
- Create JS files of all coffee test files
- Run Karma tests


```bash
grunt start
```
This task will;
- Destroy all compiled CSS and JS files
- Recompile SASS into CSS
- Create JS files of all coffee test files
- Start Connect server serving the app on port 3501
This task can also be run using the default grunt task for this project
```bash
grunt
```