const fs = require('fs');
const path = require('path');

// Read the seed data file
const seedDataPath = path.join(__dirname, '../src/data/seed-data.ts');
let content = fs.readFileSync(seedDataPath, 'utf8');

// Function to convert old timer mode to new timer configuration
function convertTimerConfig(timerMode, durationSec, rounds) {
  switch (timerMode) {
    case 'none':
      return {
        timerType: 'none',
        timerConfig: undefined
      };
    
    case 'emom':
      return {
        timerType: 'interval',
        timerConfig: {
          intervalSec: 60,
          rounds: rounds || 6,
          exercisesPerInterval: 1
        }
      };
    
    case 'e2mom':
      return {
        timerType: 'interval',
        timerConfig: {
          intervalSec: 120,
          rounds: rounds || 6,
          exercisesPerInterval: 2
        }
      };
    
    case 'e4mom':
      return {
        timerType: 'interval',
        timerConfig: {
          intervalSec: 240,
          rounds: rounds || 3,
          exercisesPerInterval: 2
        }
      };
    
    case 'n90':
      return {
        timerType: 'interval',
        timerConfig: {
          intervalSec: 90,
          rounds: rounds || 5,
          exercisesPerInterval: 1
        }
      };
    
    case 'fixed_rest':
      return {
        timerType: 'work_rest',
        timerConfig: {
          workSec: 0,
          restSec: durationSec || 60,
          rounds: 1
        }
      };
    
    case 'timed_circuit':
      return {
        timerType: 'circuit',
        timerConfig: {
          stations: [
            { name: 'Exercise', durationSec: durationSec || 180 }
          ],
          rounds: rounds || 1,
          transitionSec: 0
        }
      };
    
    default:
      return {
        timerType: 'none',
        timerConfig: undefined
      };
  }
}

// Parse blocks and update them
const blockRegex = /{\s*"type":\s*"[^"]+",\s*"timerMode":\s*"([^"]+)"(?:,\s*"durationSec":\s*(\d+))?(?:,\s*"rounds":\s*(\d+))?/g;

let match;
const replacements = [];

while ((match = blockRegex.exec(content)) !== null) {
  const timerMode = match[1];
  const durationSec = match[2] ? parseInt(match[2]) : undefined;
  const rounds = match[3] ? parseInt(match[3]) : undefined;
  
  const newConfig = convertTimerConfig(timerMode, durationSec, rounds);
  
  replacements.push({
    start: match.index,
    end: match.index + match[0].length,
    original: match[0],
    timerMode,
    durationSec,
    rounds,
    newConfig
  });
}

// Apply replacements in reverse order to maintain string positions
for (let i = replacements.length - 1; i >= 0; i--) {
  const r = replacements[i];
  
  // Build the replacement string
  let replacement = `{
          "type": "${r.original.match(/"type":\s*"([^"]+)"/)[1]}",
          "timerType": "${r.newConfig.timerType}"`;
  
  if (r.newConfig.timerConfig) {
    replacement += `,
          "timerConfig": ${JSON.stringify(r.newConfig.timerConfig, null, 2).split('\n').map((line, idx) => idx === 0 ? line : '          ' + line).join('\n')}`;
  }
  
  // Find the full block to preserve other fields
  const blockStart = content.lastIndexOf('{', r.start);
  const blockEnd = content.indexOf('}', r.end);
  const fullBlock = content.substring(blockStart, blockEnd + 1);
  
  // Extract other fields (notes, exercises)
  const notesMatch = fullBlock.match(/"notes":\s*"([^"]*)"/);
  const exercisesStart = fullBlock.indexOf('"exercises"');
  
  if (notesMatch) {
    replacement += `,
          "notes": "${notesMatch[1]}"`;
  }
  
  if (exercisesStart > -1) {
    const exercisesContent = fullBlock.substring(exercisesStart);
    replacement += `,
          ${exercisesContent}`;
  } else {
    replacement += '\n        }';
  }
  
  content = content.substring(0, blockStart) + replacement + content.substring(blockEnd + 1);
}

// Write the updated content back
fs.writeFileSync(seedDataPath, content, 'utf8');
console.log('Seed data migration complete!');