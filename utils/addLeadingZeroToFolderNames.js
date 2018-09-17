const path = require("path");
const fs = require("fs");

const MIN_PROBLEM_NUMBER_LENGTH = 3;
const RELATIVE_PATH_TO_PROBLEMS = '../problems';

function renameFolders(dir) {
    function addLeadingZero(name) {
        while (name.length < MIN_PROBLEM_NUMBER_LENGTH) {
            name = '0' + name;
        }
        return name;
    }
    const records = fs.readdirSync(dir);

    for (const item of records) {
        const pathToFile = path.join(dir, item);
        const isDirectory = fs.statSync(pathToFile).isDirectory();
        let dotIndex = item.indexOf('.');
        if (!isDirectory || dotIndex >= MIN_PROBLEM_NUMBER_LENGTH) continue;
        let num = item.substring(0, dotIndex);
        let newName = item.replace(num, addLeadingZero(num));
        console.log(`Renaming folder "${item}" into folder "${newName}"`);
        fs.renameSync(path.join(dir, item), path.join(dir, newName));
    }
}

renameFolders(path.resolve(__dirname, RELATIVE_PATH_TO_PROBLEMS));
