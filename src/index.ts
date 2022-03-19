/*
 * Package @donmahallem/conventional-commit-action
 * Source https://github.com/donmahallem/conventional-commit-action/
 */

import * as actionscore from '@actions/core';
import changelog from 'conventional-changelog-core';
import { Readable } from 'stream';

const releaseCountInput: string | undefined = actionscore.getInput('releaseCount', {
    required: false,
    trimWhitespace: true,
});
const skipUnstableInput: boolean =
    actionscore.getBooleanInput('skipUnstable', {
        required: false,
        trimWhitespace: true,
    }) || false;
/**
 * @param stream
 */
async function streamToString(stream: Readable): Promise<string> {
    return new Promise<string>((resolve: (val: string) => void, reject: (err: any) => void) => {
        const chunks: Buffer[] = [];
        stream.on('data', (chunk: Buffer): void => {
            chunks.push(chunk);
        });
        stream.on('error', (err: any): void => {
            reject(err);
        });
        stream.on('end', (): void => {
            resolve(Buffer.concat(chunks).toString('utf-8'));
        });
    });
}

/**
 *
 */
async function run(): Promise<void> {
    const data: string = await streamToString(
        changelog({
            releaseCount: releaseCountInput ? parseInt(releaseCountInput) : undefined,
            skipUnstable: skipUnstableInput,
        })
    );
    actionscore.setOutput('changelog', data);
}

void run().then((): void => {
    console.log('done');
});
