#!/usr/bin/env node
/**
 * Validates modules-journey-m7.json against modules-journey.schema.json.
 * Exit 0 = OK, 1 = validation failed.
 */
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataPath = join(root, 'src', 'data', 'modules-journey-m7.json');
const schemaPath = join(__dirname, 'schemas', 'modules-journey.schema.json');

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

function loadJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (e) {
    console.error(`Failed to read ${path}:`, e.message);
    process.exit(1);
  }
}

const schema = loadJson(schemaPath);
const data = loadJson(dataPath);
const validate = ajv.compile(schema);
const valid = validate(data);

if (!valid) {
  console.error('modules-journey-m7.json validation failed:\n');
  validate.errors.forEach((err) => {
    const path = err.instancePath || '/';
    console.error(`  ${path}: ${err.message}`);
  });
  process.exit(1);
}

console.log('modules-journey-m7.json: OK');
