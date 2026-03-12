#!/usr/bin/env node
/**
 * A-M1: JSON Schema + CI validacija.
 * Validates modules.json (required). Optionally promptLibrary.json and glossary.json.
 * Exit 0 = OK, 1 = validation failed (build should fail).
 */
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataDir = join(root, 'src', 'data');

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

function validateModules() {
  const schemaPath = join(__dirname, 'schemas', 'modules.schema.json');
  const schema = loadJson(schemaPath);
  const dataPath = join(dataDir, 'modules.json');
  const data = loadJson(dataPath);

  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    console.error('modules.json validation failed:\n');
    validate.errors.forEach((err) => {
      const path = err.instancePath || '/';
      console.error(`  ${path}: ${err.message}`);
      if (err.params?.allowedValues) console.error(`    (allowed: ${err.params.allowedValues.join(', ')})`);
    });
    return false;
  }
  console.log('modules.json: OK');
  return true;
}

function validateCoreModules() {
  const schemaPath = join(__dirname, 'schemas', 'modules.schema.json');
  const schema = loadJson(schemaPath);
  delete schema.$id;
  const dataPath = join(dataDir, 'modules-m1-m6.json');
  const data = loadJson(dataPath);

  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    console.error('modules-m1-m6.json validation failed:\n');
    validate.errors.forEach((err) => {
      const path = err.instancePath || '/';
      console.error(`  ${path}: ${err.message}`);
      if (err.params?.allowedValues) console.error(`    (allowed: ${err.params.allowedValues.join(', ')})`);
    });
    return false;
  }
  if (Array.isArray(data.modules) && data.modules.some((module) => module.id > 6)) {
    console.error('modules-m1-m6.json validation failed:\n');
    console.error('  /modules: contains module with id > 6');
    return false;
  }
  console.log('modules-m1-m6.json: OK');
  return true;
}

/**
 * Validate modules-en-m4-m6.json: same module/slide structure as modules.json (plan §6).
 * File has only { "modules": [ M4, M5, M6 ] } (no quiz).
 */
function validateModulesEnM46() {
  const schemaPath = join(__dirname, 'schemas', 'modules.schema.json');
  const fullSchema = loadJson(schemaPath);
  const enSchema = {
    ...fullSchema,
    required: ['modules'],
    properties: {
      ...fullSchema.properties,
      modules: { type: 'array', minItems: 3, maxItems: 3, items: { $ref: '#/$defs/module' } },
    },
  };
  delete enSchema.$id; // avoid Ajv "schema with key or id already exists" (validateModules already registered it)
  const dataPath = join(dataDir, 'modules-en-m4-m6.json');
  let data;
  try {
    data = JSON.parse(readFileSync(dataPath, 'utf8'));
  } catch (e) {
    console.error(`Failed to read ${dataPath}:`, e.message);
    return false;
  }
  const validate = ajv.compile(enSchema);
  const valid = validate(data);
  if (!valid) {
    console.error('modules-en-m4-m6.json validation failed:\n');
    validate.errors.forEach((err) => {
      const p = err.instancePath || '/';
      console.error(`  ${p}: ${err.message}`);
      if (err.params?.allowedValues) console.error(`    (allowed: ${err.params.allowedValues.join(', ')})`);
    });
    return false;
  }
  console.log('modules-en-m4-m6.json: OK');
  return true;
}

function validatePromptLibrary() {
  const schema = loadJson(join(__dirname, 'schemas', 'promptLibrary.schema.json'));
  const data = loadJson(join(dataDir, 'promptLibrary.json'));
  const validate = ajv.compile(schema);
  if (!validate(data)) {
    console.error('promptLibrary.json validation failed:\n');
    validate.errors.forEach((err) => console.error(`  ${err.instancePath || '/'}: ${err.message}`));
    return false;
  }
  console.log('promptLibrary.json: OK');
  return true;
}

function validateGlossary() {
  const schema = loadJson(join(__dirname, 'schemas', 'glossary.schema.json'));
  const data = loadJson(join(dataDir, 'glossary.json'));
  const validate = ajv.compile(schema);
  if (!validate(data)) {
    console.error('glossary.json validation failed:\n');
    validate.errors.forEach((err) => console.error(`  ${err.instancePath || '/'}: ${err.message}`));
    return false;
  }
  console.log('glossary.json: OK');
  return true;
}

function validateCoreGlossary() {
  const schema = loadJson(join(__dirname, 'schemas', 'glossary.schema.json'));
  const data = loadJson(join(dataDir, 'glossary-m1-m6.json'));
  const validate = ajv.compile(schema);
  if (!validate(data)) {
    console.error('glossary-m1-m6.json validation failed:\n');
    validate.errors.forEach((err) => console.error(`  ${err.instancePath || '/'}: ${err.message}`));
    return false;
  }
  if (Array.isArray(data.terms) && data.terms.some((term) => term.moduleId > 6)) {
    console.error('glossary-m1-m6.json validation failed:\n');
    console.error('  /terms: contains term with moduleId > 6');
    return false;
  }
  console.log('glossary-m1-m6.json: OK');
  return true;
}

function validateTools() {
  const schema = loadJson(join(__dirname, 'schemas', 'tools.schema.json'));
  const data = loadJson(join(dataDir, 'tools.json'));
  const validate = ajv.compile(schema);
  if (!validate(data)) {
    console.error('tools.json validation failed:\n');
    validate.errors.forEach((err) => console.error(`  ${err.instancePath || '/'}: ${err.message}`));
    return false;
  }
  console.log('tools.json: OK');
  return true;
}

function validateCoreTools() {
  const schema = loadJson(join(__dirname, 'schemas', 'tools.schema.json'));
  const files = ['tools-m1-m6.json', 'tools-en-m1-m6.json'];

  for (const file of files) {
    const data = loadJson(join(dataDir, file));
    const validate = ajv.compile(schema);
    if (!validate(data)) {
      console.error(`${file} validation failed:\n`);
      validate.errors.forEach((err) => console.error(`  ${err.instancePath || '/'}: ${err.message}`));
      return false;
    }
    if (Array.isArray(data.tools) && data.tools.some((tool) => tool.moduleId > 6)) {
      console.error(`${file} validation failed:\n`);
      console.error('  /tools: contains tool with moduleId > 6');
      return false;
    }
    console.log(`${file}: OK`);
  }
  return true;
}

function validateIntroPiePdfContent() {
  const schema = loadJson(join(__dirname, 'schemas', 'introPiePdfContent.schema.json'));
  const validate = ajv.compile(schema);
  for (const file of ['introPiePdfContent.json', 'introPiePdfContent-en.json']) {
    const data = loadJson(join(dataDir, file));
    if (!validate(data)) {
      console.error(`${file} validation failed:\n`);
      validate.errors.forEach((err) => console.error(`  ${err.instancePath || '/'}: ${err.message}`));
      return false;
    }
    console.log(`${file}: OK`);
  }
  return true;
}

function validateCertificateContent() {
  const schema = loadJson(join(__dirname, 'schemas', 'certificateContent.schema.json'));
  const validate = ajv.compile(schema);
  for (const file of ['certificateContent.json', 'certificateContent-en.json']) {
    const data = loadJson(join(dataDir, file));
    if (!validate(data)) {
      console.error(`${file} validation failed:\n`);
      validate.errors.forEach((err) => console.error(`  ${err.instancePath || '/'}: ${err.message}`));
      return false;
    }
    console.log(`${file}: OK`);
  }
  return true;
}

function main() {
  let ok = validateModules()
    && validateCoreModules()
    && validateModulesEnM46()
    && validatePromptLibrary()
    && validateGlossary()
    && validateCoreGlossary()
    && validateTools()
    && validateCoreTools()
    && validateIntroPiePdfContent()
    && validateCertificateContent();
  if (!ok) process.exit(1);
  console.log('Schema validation passed.');
}

main();
