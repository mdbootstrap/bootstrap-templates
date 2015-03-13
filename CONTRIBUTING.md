#How to contribute

##1. Fork the repo
Make sure to fork the repo into your github account in order to work on your changes.

##2. Install dependencies
First in order to install [grunt](http://gruntjs.com/) and the required depdencies run
```
npm install
```
Then, to install the [bower](http://bower.io/) depencies run 
```
grunt bower
```

##3. Develop you patch
You can now develop your patch (preferably on a feature branch). Make sure to
also create tests for new features that you added.

##4. Test and build
Once you are done with your change make sure that all the tests are still passing and create a minified build by running 
```
grunt build
```

##5. Create Pull Request
Go back to your github page and create a pull request. Your changes will be reviewed and hopefully merged.

Thank you!
