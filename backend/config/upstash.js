import { Client as WorkflowClient } from '@upstash/workflow';
import {QSTASK_URL, QSTASH_TOKEN} from './env.js';

export const workflowClient = new WorkflowClient({
    baseUrl : QSTASK_URL,
    token : QSTASH_TOKEN
})