import * as request from 'request';
import { config } from './config';
import * as querystring from 'querystring';
import * as fileHelpers from './fileHelpers';
import { setInterval, clearInterval } from 'timers';

// Creates a person group and returns personGroupId
export function createPersonGroup(personGroupId: string): Promise<string> {
    const promise = new Promise<string>((resolve, reject) => {
        const requestOptions = getRequestOptions();
        requestOptions.headers['Content-Type'] = 'application/json';
        requestOptions.body = JSON.stringify({
            'name': personGroupId
        });

        request.put(
            config.face.endPoint + '/persongroups/' + personGroupId,
            requestOptions,
            (err, response, body) => {
                if (err) { reject(false); }
                else { resolve(personGroupId); }
            }
        )
    });
    return promise;
}

export function deletePersonGroup(personGroupId: string): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
        const requestOptions = getRequestOptions();
        requestOptions.headers['Content-Type'] = 'application/json';
        request.delete(
            config.face.endPoint + '/persongroups' + personGroupId,
            requestOptions,
            (err, response, body) => {
                if (err) { reject(false); }
                else { resolve(true); }
            }
        )
    });
    return promise;
}

export function trainPersonGroup(personGroupId: string): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
        const requestOptions = getRequestOptions();
        requestOptions.headers['Content-Type'] = 'application/json';
        request.post(
            config.face.endPoint + '/persongroups/' + personGroupId + '/train',
            requestOptions,
            (err, response, body) => {
                if (err) { reject(false); }
                else {
                    const interval = setInterval(() => {
                        request.get(
                            config.face.endPoint + '/persongroups/' + personGroupId + '/training',
                            requestOptions,
                            (err, response, body) => {
                                if (JSON.parse(body).status) {
                                    clearInterval(interval);
                                    resolve(true);
                                }
                                else {
                                    console.log('Not trained:');
                                    console.log(body);
                                }
                            }
                        )
                    }, 1000);
                }
            }
        );
    });
    return promise;
}

export function createPerson(personGroupId: string, personName: string): Promise<string> {
    const promise = new Promise<string>((resolve, reject) => {
        const requestOptions = getRequestOptions();
        requestOptions.headers['Content-Type'] = 'application/json';
        requestOptions.body = JSON.stringify({
            'name': personName
        });

        request.post(
            config.face.endPoint + '/persongroups/' + personGroupId + '/persons',
            requestOptions,
            (err, response, body) => {
                if (err) { reject(false); }
                else { resolve(body); }
            }
        )
    });
    return promise;
}

export function addPersonFace(
    personFile: string, personId: string,
    personGroupId: string): Promise<string> {
    personId = (<any>JSON.parse(personId)).personId;
    const promise = new Promise<string>((resolve, reject) => {
        const requestOptions = getRequestOptions();
        requestOptions.body = fileHelpers.readImage(personFile);

        const uri =
            config.face.endPoint + '/persongroups/' + personGroupId +
            '/persons/' + personId + '/persistedFaces';

        request.post(
            uri,
            requestOptions,
            (err, response, body) => {
                if (err) { reject(false); }
                else { resolve(body); }
            }
        );
    });
    return promise;
}

// returns faceID
export function detectFace(fileName: string): Promise<string> {
    const promise = new Promise<string>((resolve, reject) => {
        const requestOptions = getRequestOptions();
        requestOptions.body = fileHelpers.readImage(__dirname + "/" + fileName);
        const params = {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false"
        };

        const uri = config.face.endPoint + "/detect?" + querystring.stringify(params);
        request.post(
            uri,
            requestOptions,
            (err, response, body) => {
                resolve(JSON.parse(body)[0].faceId);
            }
        );
    });
    return promise;
}

export function identifyPerson(
    personGroupId: string,
    faceId: string
) {
    const promise = new Promise<string>((resolve, reject) => {
        const requestOptions = getRequestOptions();
        requestOptions.headers['Content-Type'] = 'application/json';
        requestOptions.body = JSON.stringify({
            'personGroupId': personGroupId,
            "faceIds": [
                faceId
            ],
            "maxNumOfCandidatesReturned": 1,
            "confidenceThreshold": 0.5
        });

        request.post(
            config.face.endPoint + '/identify',
            requestOptions,
            (err, response, body) => {
                if (err) { reject(false); }
                else { resolve(body); }
            }
        );
    });
    return promise;
}

function getRequestOptions(): request.CoreOptions {
    return {
        headers: {
            "Content-Type": "application/octet-stream",
            "Ocp-Apim-Subscription-Key": config.face.key1
        }
    };
}