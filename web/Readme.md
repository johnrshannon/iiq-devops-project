# React Demo Web UI

By default, this code is configured to access to the api on the localhost development port. This is configued in `web/todo-ui/public/config.js`, or in the root folder after build. You will need to change this URL to where it is hosted for your deployment. Please note, when you do not run the the api in decelopment mode it listens on port *5000*, though that may not be what the api in your solution responds to.

---
## Build for Development
```bash
cd todo-ui
npm i
npm start
```
You can access the developmet output on port **3000** of your local machine.  http://localhost:3000/

---
## Build for Deployment

```bash
cd todo-ui
npm i
npm run build
```

Static web files are placed in the **todo-ui/build** folder that can be hosted on the web server of your choice.