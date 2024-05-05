import path from 'path';
let packagePath = path.dirname(new URL(import.meta.url).pathname) + "/../package.json";
import pkg from "../package.json"  with { type: "json" };

let version = pkg.version.split("v")[1].split(".")
let r = /^\+?[1-9][0-9]*$/;
import moment from 'moment';
import { exit } from 'process';
let dateValidation = moment().utcOffset(8).format(version[3], 'YYYYMMDDHHmmss', true);
if (version.length != 4 || !r.test(version[0]) || !r.test(version[1]) || !r.test(version[2]) || dateValidation == "Invalid date") {
    console.error(`bad version: ${pkg.version}`);
    exit(1);
}

let arg1 = process.argv.slice(2)[0];
let arg2 = process.argv.slice(2)[1];
if (arg1 == undefined) {
    console.log(pkg.version);
    exit(0);
}
else if (arg1 == "main") {
    let mainver = parseInt(version[0])
    if (arg2 == "minus") {
        if (mainver > 1)
            mainver--;
    }
    else {
        mainver++
    }
    version[0] = mainver.toString()
}
else if (arg1 == "sec") {
    let secver = parseInt(version[1])
    if (arg2 == "minus") {
        if (secver > 1)
            secver--;
    }
    else {
        secver++
    }
    version[1] = secver.toString()
} else if (arg1 == "build") {
    let buildver = parseInt(version[2])
    buildver++
    version[2] = buildver.toString()
    version[3] = moment().utcOffset(8).format('YYYYMMDDHHmmss')
}
pkg.version = `v${version[0]}.${version[1]}.${version[2]}.${version[3]}`;
console.log(`new version: ${pkg.version}`);
import fs from 'fs';
fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
let versionPath = path.dirname(new URL(import.meta.url).pathname) + "/../VERSION";
fs.writeFileSync(versionPath, pkg.version);