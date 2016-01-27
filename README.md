
Direction Maps
===========
App prototype

## Quickstart

### Installation
- Install [Node.js](https://nodejs.org/en/download/releases/)
- Install gulp: `npm install -g gulp`
- Install [Cordova](https://cordova.apache.org/): `npm install -g cordova`
- Inside the project folder:
	- Install node dependencies: `npm install`
	- All app related code is inside the `/app` folder
	- You can write your JS in ES6 style, because Babel loader is used 

### Start Development Server
- Run `gulp` from terminal within the project folder
- Go to `localhost:3000` to display the app
- Supports hot reload

### Build on device (requires JAVA JDK and Android SDK! ANDROID_HOME and JAVA_HOME has to be set)
- Run `cordova platforms add android`
- Run `gulp run` for a production build
- Run `gulp run-dev` for a dev build


## Setting up [Sublime Text](http://www.sublimetext.com/3) for ESLint, JSCS and so on..

1. Install Package Control

	- Open the console using `Ctrl + Ö` or `View > Show Console`
	- Paste following code into the console

	```python
	import urllib.request,os,hashlib; h = '2915d1851351e5ee549c20394736b442' + '8bc59f460fa1548d1514676163dafc88'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
    ```

2. Install [SublimeLinter](http://www.sublimelinter.com/en/latest/index.html)

	- Open the Command Palette `ctrl+shift+p`
	- Type `install` and select `Package Control: Install Package` from the Command Palette
	- When the list of available packages appears, type `linter` and select `SublimeLinter`

3. Install [ESLint](http://eslint.org/)

	- Run `npm install -g eslint` from terminal
	- Run `npm install -g eslint babel-eslint` to add support for Babel code
	- Run `npm install -g eslint-plugin-react`
	- Restart Sublime Text
	- Within Sublime Text open the Command Palette `ctrl+shift+p`
	- Type `install` and select `Package Control: Install Package` from the Command Palette
	- Type `eslint` and install `SublimeLinter-contrib-eslint`
	- Restart Sublime Text
	- You can change linting rules in the `.eslintrc` file

4. Install [JSCS](http://jscs.info/)

	- Run `npm install jscs -g` from terminal
	- Restart Sublime Text
	- Within Sublime Text open the Command Palette `ctrl+shift+p`
	- Type `install` and select `Package Control: Install Package` from the Command Palette
	- Type `jscs` and install `SublimeLinter-jscs`
	- Restart Sublime Text
	- You can change styling rules in the `.jscsrc` file

5. Additional usefull stuff

	- [babel-sublime](https://github.com/babel/babel-sublime)
		- Language definitions for ES6+ JavaScript with React JSX syntax extensions
		- Find it as Babel through Package Control
		- To set it as the default syntax for a particular extension:
			- Open a file with that extension
			- Select `View -> Syntax -> Open all with current extension as... -> Babel -> JavaScript (Babel)`

	- [JSCSFormatter](https://github.com/TheSavior/SublimeJSCSFormatter)
		- Autoformats your javascript code according to the JSCS configuration files you already have
		- Install through Package Control
		- Use `Ctrl + Shift + H` to autoformat

	- [SideBarEnhancements](https://github.com/titoBouzout/SideBarEnhancements)
		- Provides enhancements to the operations on Sidebar of Files and Folders
		- Find it as SideBarEnhancements through Package Control
		
  - Snippets
  	- Let you create code faster, e.g. type `for` and hit `Enter` to create a for-loop skeleton
  	- Usefull snippets (install through Package Control):
  		- Babel Snippets
  		- JS Snippets
  		- ReactJS Snippets
  		- Javascript Snippets
  		- CSS Snippets
