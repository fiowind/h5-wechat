## 仿微信蹦蹦蹦跳出聊天界面
<br />
<image  width="150" align="center" src="https://github.com/fiowind/h5-wechat/blob/master/app/images/6.pic.jpg" >
## Installation

Install all dependencies. 

```
$ npm install
```


## Development

Builds the application and starts a webserver with livereload. By default the webserver starts at port 1337.
You can define a port with `$ gulp --port 3333`.

```
$ npm start
```

## Build

Builds a minified version of the application in the dist folder.

```
$ gulp build --type production
```

## Testing

We use [jest](http://facebook.github.io/jest/) to test our application.<br />
You can run the tests that are defined under [app/scripts/\_\_tests__](./app/scripts/__tests__) with

```
$ npm test

```
###Requirements
* node
* npm
* gulp
