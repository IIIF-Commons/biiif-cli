# biiif-cli 👷✨📃

```
npm i biiif-cli -g
```

```
biiif folder -u http://example.com/folder
```

Uses [biiif](https://github.com/edsilv/biiif)

## Options

### `-u`

The url location of your published collection. All of the IIIF `id` properties are generated using this as the base url.

### `-s`

Scaffolds the following files (if they don't already exist):
- `.gitignore` - ignores the `node_modules` folder
- `.nojekyll` - disables jekyll to allow folder names starting with an underscore to be served on github pages
- `_headers` - adds an `Access-Control-Allow-Origin: *` header for netlify.com
- `index.html` - includes a file explorer to navigate and share the contents of your IIIF collection
- `README.md` - includes a link to index.html

It also creates the folder specified in the `folder` argument. 