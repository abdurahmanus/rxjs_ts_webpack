# Getting started with reactive programming using rxjs

## Configuration and Setup

1. Create package.json
    ``` 
    npm init
    ```

2. Install rxjs
    ```
    npm i rxjs --save
    ```

3. Install webpack, typescript, etc..
    ```
    npm i webpack webpack-dev-server typescript typings ts-loader -D
    ```

4. Setup es6 typings
    ```
    node_modules/.bin/typings install dt~es6-shim --global --save
    ```

5. Create file tsconfig.json
    ```json
    {
        "compilerOptions": {
            "target": "es5",
            "module": "commonjs",
            "sourceMap": true
        }
    }
    ```

6. create file webpack.config.js
    ```javascript
    module.exports = {
        entry: "./main",
        output: { filename: "app.js" },
        module: {
            loaders: [
                {
                    test: /.ts$/,
                    loader: "ts-loader"
                }
            ]
        },
        resolve: {
            extensions: [".ts", ".js"]
        }
    }
    ```

7. add this lines into the scripts section of package.json
    ```json
    "start": "webpack-dev-server --watch --inline",
    "postinstall": "typings install"
    ```