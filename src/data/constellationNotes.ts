export interface ConstellationNote {
  blurb: string;
  role: string | null;
}

/** Short atlas copy for /chart — pairs with CONSTELLATIONS ids. */
export const CONSTELLATION_NOTES: Record<string, ConstellationNote> = {
  orion: {
    blurb: "冬夜最醒目的猎人。腰带三星几乎人人能认；站点里它对应硬件与可验证的原型。",
    role: "创造 · 硬件"
  },
  cassiopeia: {
    blurb: "北天的 W / M，绕极常年可见。这里借它标记 AI 探索：可用的方法，而不是空话。",
    role: "创造 · AI"
  },
  "ursa-major": {
    blurb: "北斗七星是文章区 SIGNAL 点亮的原型——勺口指向北极，信号指向最近书写。",
    role: "文章 · 北斗"
  },
  cygnus: {
    blurb: "北十字横过银河。天鹅展翼，对应软件构建：清晰体验与开源坐标。",
    role: "创造 · 软件"
  },
  lyra: {
    blurb: "织女星所在的小琴。夏夜与牵牛遥望，提醒工作也有节奏与留白。",
    role: null
  },
  scorpius: {
    blurb: "心宿二发红，蝎尾勾向南天。形状长而戏剧，适合作为「换一颗」里的强剪影。",
    role: null
  },
  leo: {
    blurb: "春夜的镰刀与狮身。亮星不多，轮廓却稳，像一次把复杂收成一条线的设计。",
    role: null
  },
  crux: {
    blurb: "南十字——关于页的水印坐标。北半球少见，却标出「你从哪里出发」。",
    role: "关于 · 原点"
  },
  pegasus: {
    blurb: "飞马大方四星，秋季导航的门槛。大而空，留给想象去补翅膀。",
    role: null
  },
  taurus: {
    blurb: "毕宿五与昴星团。金牛低头，像把材料压进可交付的形状。",
    role: null
  },
  corona: {
    blurb: "北冕的半圈金冠。站点里它落在产品设计：手感、节奏与工具链。",
    role: "创造 · 设计"
  },
  aquila: {
    blurb: "牵牛星所在的天鹰。与天琴隔河相对，是夏夜最熟的一对坐标。",
    role: null
  },
  gemini: {
    blurb: "北河二与北河三并立。双子提醒并行：硬件与软件、试验与交付。",
    role: null
  },
  "canis-major": {
    blurb: "天狼——全天最亮的恒星。大犬跟在猎人脚边，像紧贴主线的那一束光。",
    role: null
  },
  delphinus: {
    blurb: "小菱形海豚，紧凑可爱。小星座也能把天空读成一句短句。",
    role: null
  },
  bootes: {
    blurb: "大角星橙黄醒目，牧夫像把北斗的勺柄延长。指向清晰，适合收束一晚。",
    role: null
  }
};
