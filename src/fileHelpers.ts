import * as fs from 'fs';
import { Buffer } from 'buffer';

export function getFriends(dirName: string): Array<string> {
    const fullDirName = __dirname + '/' + dirName;
    let toReturn: Array<string> = [];
    let results = fs.readdirSync(fullDirName);
    results.forEach(result => {
        if (fs.statSync(fullDirName + '/' + result).isDirectory()) {
            toReturn.push(result);
        }
    });
    return toReturn;
}

export function getFriendPictures(friendName: string): Array<string> {
    let toReturn: Array<string> = [];
    const fullDirName = __dirname + '/Data/' + friendName;
    let results = fs.readdirSync(fullDirName);
    results.forEach(result => {
        if (result.endsWith('jpg')) {
            toReturn.push(result);
        }
    });    
    return toReturn;
}

export function readImage(filePath: string) {
    const fileData = fs.readFileSync(filePath).toString("hex");
    const result = [];
    for (let i = 0; i < fileData.length; i += 2) {
        result.push(parseInt(fileData[i] + "" + fileData[i + 1], 16))
    }
    return new Buffer(result);
}