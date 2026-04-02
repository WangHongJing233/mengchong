// Run `npm install jimp --no-save` before executing this script
const { Jimp } = require('jimp');
const fs = require('fs');
const path = require('path');

const SIZE = 64;
const DIR = path.join(__dirname, 'src', 'assets', 'tabbar');

if (!fs.existsSync(DIR)) {
  fs.mkdirSync(DIR, { recursive: true });
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

function sdBox(p, b, r = 0) {
    const dx = Math.abs(p.x) - b.x + r;
    const dy = Math.abs(p.y) - b.y + r;
    return Math.sqrt(Math.max(dx, 0)**2 + Math.max(dy, 0)**2) + Math.min(Math.max(dx, dy), 0) - r;
}

function sdCircle(p, r) {
    return Math.sqrt(p.x**2 + p.y**2) - r;
}

function sdSegment(p, a, b) {
    const pa = { x: p.x - a.x, y: p.y - a.y };
    const ba = { x: b.x - a.x, y: b.y - a.y };
    const h = clamp((pa.x * ba.x + pa.y * ba.y) / (ba.x**2 + ba.y**2), 0.0, 1.0);
    return Math.sqrt((pa.x - ba.x * h)**2 + (pa.y - ba.y * h)**2);
}

function smin(a, b, k) {
    const h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return b * h + a * (1.0 - h) - k * h * (1.0 - h);
}

function getAlpha(d) {
    // d < 0 is inside, d > 0 is outside.
    // -1 to 1 maps to 1 to 0
    return 1.0 - smoothstep(-1.5, 1.5, d);
}

// Draw Home
function drawHomeSDF(p, isActive) {
    // A house: roof + base + door
    const roof1 = sdSegment(p, {x: 0, y: -16}, {x: -18, y: 0}) - 3;
    const roof2 = sdSegment(p, {x: 0, y: -16}, {x: 18, y: 0}) - 3;
    let roof = Math.min(roof1, roof2);
    
    // Base
    const base = sdBox({x: p.x, y: p.y - 1}, {x: 12, y: 11}, 2);
    
    // Door
    const door = sdBox({x: p.x, y: p.y + 6}, {x: 4, y: 6}, 1);
    
    let d = Math.min(roof, base);
    if (!isActive) {
        // Outline mode: take the absolute value of the SDF to make lines
        d = Math.abs(d) - 2;
        // Keep the door as a line too
        d = Math.min(d, Math.abs(door) - 1.5);
    } else {
        // Solid mode
        d = Math.max(d, -door);
    }
    
    return getAlpha(d);
}

// Draw Community
function drawCommunitySDF(p, isActive) {
    // Two people
    // Person 1 (Front)
    const h1 = sdCircle({x: p.x - 4, y: p.y - 8}, 6);
    const b1 = sdBox({x: p.x - 4, y: p.y + 8}, {x: 10, y: 6}, 4);
    let p1 = smin(h1, b1, 2.0); // Smooth union

    // Person 2 (Back)
    const h2 = sdCircle({x: p.x + 8, y: p.y - 12}, 4);
    const b2 = sdBox({x: p.x + 8, y: p.y + 4}, {x: 7, y: 5}, 3);
    let p2 = smin(h2, b2, 2.0);
    
    // Cut out p1 from p2 for depth
    p2 = Math.max(p2, -(p1 + 2));
    
    let d = Math.min(p1, p2);
    if (!isActive) {
        d = Math.abs(d) - 2;
    }
    
    return getAlpha(d);
}

// Draw Rank
function drawRankSDF(p, isActive) {
    // 3 bars like a podium or chart
    const bar1 = sdBox({x: p.x - 12, y: p.y + 4}, {x: 4, y: 8}, 1);
    const bar2 = sdBox({x: p.x, y: p.y - 4}, {x: 4, y: 16}, 1);
    const bar3 = sdBox({x: p.x + 12, y: p.y + 8}, {x: 4, y: 4}, 1);
    
    let d = Math.min(bar1, bar2, bar3);
    if (!isActive) {
        d = Math.abs(d) - 2;
    }
    return getAlpha(d);
}

// Draw Profile
function drawProfileSDF(p, isActive) {
    // Single person
    const head = sdCircle({x: p.x, y: p.y - 6}, 8);
    const body = sdBox({x: p.x, y: p.y + 12}, {x: 14, y: 8}, 5);
    
    let d = smin(head, body, 2.0);
    if (!isActive) {
        d = Math.abs(d) - 2;
    }
    return getAlpha(d);
}

function generateIcon(name, isActive, drawFn) {
  const img = new Jimp({ width: SIZE, height: SIZE, color: 0x00000000 });
  
  // Vibrant gradients
  // Active: Pink to Orange
  // Inactive: Dark Gray to Light Gray
  const color1 = isActive ? [255, 94, 142] : [140, 140, 140]; 
  const color2 = isActive ? [255, 154, 68] : [180, 180, 180];
  
  img.scan(0, 0, SIZE, SIZE, function (x, y, idx) {
    const t = (x + y) / (SIZE * 2);
    const r = color1[0] * (1 - t) + color2[0] * t;
    const g = color1[1] * (1 - t) + color2[1] * t;
    const b = color1[2] * (1 - t) + color2[2] * t;
    
    const p = { x: x - SIZE/2, y: y - SIZE/2 };
    const a = drawFn(p, isActive);
    
    this.bitmap.data[idx + 0] = Math.round(r);
    this.bitmap.data[idx + 1] = Math.round(g);
    this.bitmap.data[idx + 2] = Math.round(b);
    this.bitmap.data[idx + 3] = Math.round(a * 255);
  });

  const filename = path.join(DIR, `${name}${isActive ? '-active' : ''}.png`);
  img.write(filename);
  console.log(`Generated ${filename}`);
}

async function run() {
    generateIcon('home', false, drawHomeSDF);
    generateIcon('home', true, drawHomeSDF);
    
    generateIcon('community', false, drawCommunitySDF);
    generateIcon('community', true, drawCommunitySDF);
    
    generateIcon('rank', false, drawRankSDF);
    generateIcon('rank', true, drawRankSDF);
    
    generateIcon('profile', false, drawProfileSDF);
    generateIcon('profile', true, drawProfileSDF);
    
    console.log('All icons generated.');
}

run();
