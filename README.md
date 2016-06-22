# addtopage

> a tiny resource injector


## What's it do?

This helps add content to a web page using one line of code when all you remember is the URI.  For example, if you want to add Moment.js to a page, you can just:

```javascript
addtopage('http://momentjs.com/downloads/moment.min.js')
```

But it doesn't just load JavaScript.  You can load images and stylesheets now, and lots more is planned.

```javascript
// add an image
addtopage('/path/to/an/image')

// add a stylesheet
addtopage('//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css')
```




## What's the point in using this?

It's original purpose was so I could inject stuff into a page without having to actually edit the page — anything I needed could be added from the browser console.
However, it can also be used to asynchronously load site assets using one line of code.

Even though this is currently a tiny, simple asset-loading library (if it can even be called a "library"), lots of awesome stuff is planned in the near future!
