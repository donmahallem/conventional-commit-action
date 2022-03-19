/*
 * Package @donmahallem/conventional-commit-action
 * Source https://github.com/donmahallem/conventional-commit-action/
 */

import { Readable } from 'stream';

/**
 * @param {Readable} stream stream to convert into a string
 */
export async function streamToString(stream: Readable): Promise<string> {
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
