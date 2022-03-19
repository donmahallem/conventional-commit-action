/*
 * Package @donmahallem/conventional-commit-action
 * Source https://github.com/donmahallem/conventional-commit-action/
 */

import * as actionscore from '@actions/core';
import changelog from 'conventional-changelog-core';
import { streamToString } from './stream-to-string';

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
