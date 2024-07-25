import path from 'path';
import fs from 'fs';
import pkg from "../package.json" with { type: "json" };
import moment from 'moment';
import { exit } from 'process';

// 处理路径，以适应不同的操作系统
function fixPathForOS(pathname) {
  return process.platform === "win32" ? pathname.substring(1) : pathname;
}

// 获取正确的路径
let packagePath = path.join(path.dirname(fixPathForOS(new URL(import.meta.url).pathname)), "../package.json");
let versionPath = path.join(path.dirname(fixPathForOS(new URL(import.meta.url).pathname)), "../VERSION");

let version = pkg.version.split("v")[1].split(".");
let r = /^\+?[1-9][0-9]*$/;
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

fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
fs.writeFileSync(versionPath, pkg.version);