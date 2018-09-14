const path = require("path");
const fs = require("fs");

const MIN_PROBLEM_NUMBER_LENGTH = 3;
const RELATIVE_PATH_TO_PROBLEMS = 'src';

/**
 * List all files in a directory recursively in a synchronous fashion
 *
 * @param {String} dir
 * @returns {IterableIterator<String>}
 */
function *renameFolders(dir) {
    function addLeadingZero(name) {
        while (name.length < MIN_PROBLEM_NUMBER_LENGTH) {
            name = '0' + name;
        }
        return name;
    }
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const pathToFile = path.join(dir, file);
        const isDirectory = fs.statSync(pathToFile).isDirectory();
        let dotIndex = file.indexOf('.');
        if (!isDirectory || dotIndex < MIN_PROBLEM_NUMBER_LENGTH) continue;
        let num = file.substring(0, dotIndex);
        let newName = file.replace(num, addLeadingZero(num));
        fs.renameSync(path.join(dir, file), path.join(dir, newName));
    }
}

try {
    renameFolders(path.resolve(__dirname, RELATIVE_PATH_TO_PROBLEMS));
} catch(e) {
    console.error(e);
}
