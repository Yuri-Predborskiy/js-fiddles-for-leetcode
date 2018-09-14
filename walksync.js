const path = require("path");
const fs = require("fs");

/*

    TEMPLATE PROGRAM

 */

/**
 * List all files in a directory recursively in a synchronous fashion
 *
 * @param {String} dir
 * @returns {IterableIterator<String>}
 */
function *walkSync(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const pathToFile = path.join(dir, file);
        const isDirectory = fs.statSync(pathToFile).isDirectory();
        if (isDirectory) {
            // yield *walkSync(pathToFile);
            if (file.indexOf('.') < 3) {
                let num = file.substring(0, file.indexOf('.'));
                let newNum = num;
                while (newNum.length < 3) {
                    newNum = '0' + newNum;
                }
                let newName = file.replace(num, newNum);
                fs.renameSync(path.join(dir, file), path.join(dir, newName));
            }
        } else {
            // yield pathToFile;
        }
    }
}

const absolutePath = path.resolve(__dirname, 'src');

for (const file of walkSync(absolutePath)) {
    // do something with it
    if (path.extname(file) === '.js') {
        require(file); // execute script as a function
    }
    console.info(file);
}