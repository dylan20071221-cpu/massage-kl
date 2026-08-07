#!/usr/bin/env node
/**
 * 🦀 重建 data.js：把 Downloads/data-5.js 的 32 技师转成网站静态数据
 * 照片：从 ~/Downloads 复制到 images/，URL 替换为本地相对路径
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';


const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC = process.env.HOME + '/Downloads/data-5.js';
const IMG_DIR = join(ROOT, 'images');
const OUT = join(ROOT, 'js', 'data.js');

// 1. 读取并解析 data-5.js（用 Function 求值，避免手写解析器）
const raw = readFileSync(SRC, 'utf8');
const getVal = (code, name) => {
  const fn = new Function(code + `; return ${name};`);
  return fn();
};
const SITE_CONFIG = getVal(raw, 'SITE_CONFIG');
const technicians = getVal(raw, 'technicians');
console.log(`✅ 读取 ${technicians.length} 位技师`);

// 2. 处理照片
mkdirSync(IMG_DIR, { recursive: true });
let copied = 0, missing = [], usedMissing = {};

function localFileName(url) {
  const fname = decodeURIComponent(url.split('/').pop());
  return fname;
}

function findLocal(fname) {
  // 直接找
  if (existsSync(join(process.env.HOME, 'Downloads', fname))) {
    return join(process.env.HOME, 'Downloads', fname);
  }
  // 去掉 (1) 后缀再找
  const stripped = fname.replace(/\s*\(\d+\)(?=\.\w+$)/, '');
  if (stripped !== fname && existsSync(join(process.env.HOME, 'Downloads', stripped))) {
    return join(process.env.HOME, 'Downloads', stripped);
  }
  return null;
}

for (const t of technicians) {
  const newPhotos = [];
  for (const url of (t.photos || [])) {
    const fname = localFileName(url);
    const local = findLocal(fname);
    if (local) {
      // 复制到 images/，空格替换为下划线
      const safeName = fname.replace(/ /g, '_');
      const dest = join(IMG_DIR, safeName);
      if (!existsSync(dest)) {
        copyFileSync(local, dest);
        copied++;
      }
      newPhotos.push('images/' + safeName);
    } else {
      missing.push({ tech: t.name, fname });
      // 保留原 URL（万一以后 storage 恢复）
      newPhotos.push(url);
    }
  }
  t.photos = newPhotos;
}

console.log(`📸 复制照片: ${copied} 张`);
console.log(`⚠️ 缺失照片: ${missing.length} 张`);
for (const m of missing) console.log(`   - ${m.tech}: ${m.fname}`);

// 3. 生成新 data.js（保留原文件的加载/订阅逻辑，只替换静态数据部分）
const oldData = readFileSync(join(ROOT, 'js', 'data.js'), 'utf8');
// 找到 "// ===== 运行时变量 =====" 的位置，静态数据部分到此为止
const runtimeMarker = '// ===== 运行时变量 =====';
const idx = oldData.indexOf(runtimeMarker);
if (idx < 0) {
  console.error('❌ 找不到运行时变量标记');
  process.exit(1);
}

const staticPart = `/**
 * 🦀 按按摩 - 技师数据
 * 支持静态数据 + Supabase 动态加载
 * Supabase 加载失败时自动 fallback 到本地数据
 */

// ===== 默认静态数据（32位技师，2026-07-25 后台导出） =====
const SITE_CONFIG_STATIC = ${JSON.stringify(SITE_CONFIG, null, 2)};

const techniciansStatic = ${JSON.stringify(technicians, null, 2)};

`;

const runtimePart = oldData.slice(idx);
writeFileSync(OUT, staticPart + runtimePart, 'utf8');
console.log(`✅ 已生成 js/data.js（${technicians.length} 技师，${copied} 张本地照片）`);
