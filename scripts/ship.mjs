// Commit everything and push to GitHub, which redeploys the site.
//   npm run ship                      → commit with a default message
//   npm run ship -- "your message"    → commit with your own message
import { execSync } from 'node:child_process';

const run = (cmd, opts = {}) => execSync(cmd, { stdio: 'inherit', ...opts });
const out = (cmd) => execSync(cmd, { encoding: 'utf8' }).trim();

const message = process.argv.slice(2).join(' ') || `Update site (${new Date().toISOString().slice(0, 16).replace('T', ' ')})`;

run('git add -A');
if (out('git status --porcelain')) {
  run(`git commit -m ${JSON.stringify(message)}`);
} else {
  console.log('Nothing new to commit.');
}
run('git pull --rebase --autostash origin main');
run('git push origin HEAD:main');
console.log('\nPushed. GitHub Pages redeploys in about two minutes.');
