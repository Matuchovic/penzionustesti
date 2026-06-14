"use client";
import { useEffect, useState } from "react";





function LeafletMap() {
  useEffect(() => {
    if ((window as any)._leafletLoaded) return;
    (window as any)._leafletLoaded = true;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => {
      const L = (window as any).L;
      const map = L.map("leaflet-map", {
        center: [50.4982, 15.2350],
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
        dragging: true,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
      }).addTo(map);

      // Apply night filter on tiles after load
      map.on("tileload", () => {
        document.querySelectorAll(".leaflet-tile").forEach((t: any) => {
          t.style.filter = "brightness(0.45) saturate(0.3) hue-rotate(200deg)";
        });
      });
      setTimeout(() => {
        document.querySelectorAll(".leaflet-tile").forEach((t: any) => {
          t.style.filter = "brightness(0.45) saturate(0.3) hue-rotate(200deg)";
        });
      }, 1000);

      // Day toggle
      document.getElementById("btn-day")?.addEventListener("click", () => {
        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",{maxZoom:19}).addTo(map);
        setTimeout(()=>{document.querySelectorAll(".leaflet-tile").forEach((t:any)=>{t.style.filter="brightness(0.82) saturate(0.85)";});},500);
      });

      // Night toggle
      document.getElementById("btn-night")?.addEventListener("click", () => {
        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",{maxZoom:19}).addTo(map);
        setTimeout(()=>{document.querySelectorAll(".leaflet-tile").forEach((t:any)=>{t.style.filter="brightness(0.45) saturate(0.3) hue-rotate(200deg)";});},500);
      });

      // Main pin
      const pinHtml = `
        <div style="position:relative;display:flex;flex-direction:column;align-items:center">
          <div class="pin-pulse" style="position:relative;width:46px;height:46px;border-radius:50%;background:rgba(10,21,16,0.96);border:2px solid rgba(184,154,106,0.85);display:flex;align-items:center;justify-content:center;box-shadow:0 0 24px rgba(184,154,106,0.5),0 0 48px rgba(184,154,106,0.2)">
            <span style="font-size:20px">🏡</span>
          </div>
          <div style="margin-top:7px;background:rgba(6,12,8,0.94);border:1px solid rgba(184,154,106,0.35);padding:5px 12px;white-space:nowrap;backdrop-filter:blur(10px)">
            <div style="font-family:Cormorant Garamond,serif;font-style:italic;color:#F6F1E8;font-size:13px;text-align:center;line-height:1.2">Penzion U Štěstí</div>
            <div style="font-family:Inter,sans-serif;font-size:7px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(184,154,106,0.6);text-align:center;margin-top:2px">Dobšín · Český ráj</div>
          </div>
        </div>`;
      L.marker([50.4982,15.2350],{icon:L.divIcon({html:pinHtml,className:"",iconAnchor:[23,23],iconSize:[46,90]})}).addTo(map);

      // POI markers
      const pois = [
        {lat:50.520,lng:15.255,name:"🏰 Hrad Trosky",sub:"Symbol Českého ráje"},
        {lat:50.420,lng:15.258,name:"⛰ Prachovské skály",sub:"8 km od penzionu"},
        {lat:50.497,lng:15.062,name:"🏙 Jičín",sub:"Město pohádek"},
        {lat:50.589,lng:15.155,name:"🌊 Turnov",sub:"Centrum Českého ráje"},
      ];
      pois.forEach(p=>{
        const html=`<div style="background:rgba(6,12,8,0.9);border:1px solid rgba(184,154,106,0.25);padding:4px 10px;white-space:nowrap;backdrop-filter:blur(8px);cursor:pointer">
          <div style="font-family:Cormorant Garamond,serif;font-style:italic;color:rgba(184,154,106,0.9);font-size:11px">${p.name}</div>
          <div style="font-family:Inter,sans-serif;font-size:7px;letter-spacing:0.1em;color:rgba(239,231,218,0.35)">${p.sub}</div>
        </div>`;
        L.marker([p.lat,p.lng],{icon:L.divIcon({html,className:"",iconAnchor:[40,14]})}).addTo(map);
      });

      // Coords live
      setInterval(()=>{
        const c=map.getCenter();
        const el=document.getElementById("map-coords");
        if(el) el.textContent=`${c.lat.toFixed(4)}° N · ${c.lng.toFixed(4)}° E · 342 m n.m.`;
      },300);
    };
    document.head.appendChild(script);
  }, []);
  return null;
}

function MapCanvas() {
  useEffect(() => {
    const canvases = ["mc0","mc1","mc3"].map(id => document.getElementById(id) as HTMLCanvasElement);
    if(!canvases[0]) return;
    const wrap = canvases[0].parentElement!;
    const W = wrap.offsetWidth, H = wrap.offsetHeight;
    canvases.forEach(c => { if(c){c.width=W;c.height=H;} });
    const [c0,c1,c3] = canvases.map(c => c?.getContext("2d")!);
    const CX=W*0.48, CY=H*0.52;

    // Permutation
    const perm=new Uint8Array(512);const p=new Uint8Array(256);
    for(let i=0;i<256;i++)p[i]=i;
    for(let i=255;i>0;i--){const j=Math.floor(Math.random()*(i+1));[p[i],p[j]]=[p[j],p[i]];}
    for(let i=0;i<512;i++)perm[i]=p[i&255];
    const g3=[[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];
    const fade=(t:number)=>t*t*t*(t*(t*6-15)+10);
    const lerp=(a:number,b:number,t:number)=>a+t*(b-a);
    const dot2=(g:number[],x:number,y:number)=>g[0]*x+g[1]*y;
    function noise2(x:number,y:number){
      const X=Math.floor(x)&255,Y=Math.floor(y)&255;
      const xf=x-Math.floor(x),yf=y-Math.floor(y);
      const u=fade(xf),v=fade(yf);
      const a=perm[X]+Y,b=perm[X+1]+Y;
      return lerp(lerp(dot2(g3[perm[a]%8],xf,yf),dot2(g3[perm[b]%8],xf-1,yf),u),lerp(dot2(g3[perm[a+1]%8],xf,yf-1),dot2(g3[perm[b+1]%8],xf-1,yf-1),u),v);
    }
    function fbm(x:number,y:number,o:number){let v=0,amp=0.5,freq=1,max=0;for(let i=0;i<o;i++){v+=noise2(x*freq,y*freq)*amp;max+=amp;amp*=0.5;freq*=2;}return v/max;}

    // Terrain
    const bg=c0.createRadialGradient(CX,CY,0,CX,CY,W*0.8);
    bg.addColorStop(0,"#0d1f14");bg.addColorStop(0.5,"#081408");bg.addColorStop(1,"#040a05");
    c0.fillStyle=bg;c0.fillRect(0,0,W,H);
    const hexS=Math.max(20,W*0.04);
    const hexW=hexS*2,hexH=Math.sqrt(3)*hexS;
    c0.strokeStyle="rgba(184,154,106,0.04)";c0.lineWidth=0.5;
    for(let row=-2;row<H/hexH+2;row++){for(let col=-2;col<W/hexW+2;col++){
      const x=col*hexW*0.75+(row%2===0?0:hexW*0.375),y=row*hexH;
      c0.beginPath();for(let i=0;i<6;i++){const a=Math.PI/180*(60*i-30);c0.lineTo(x+hexS*Math.cos(a),y+hexS*Math.sin(a));}c0.closePath();c0.stroke();
    }}
    [{x:CX-140,y:CY-90,r:110,o:0.18},{x:CX+180,y:CY-110,r:95,o:0.14},{x:CX-220,y:CY+70,r:85,o:0.12},{x:CX+90,y:CY+100,r:100,o:0.15}].forEach(z=>{
      const g=c0.createRadialGradient(z.x,z.y,0,z.x,z.y,z.r);g.addColorStop(0,`rgba(20,55,20,${z.o})`);g.addColorStop(1,"rgba(0,0,0,0)");
      c0.beginPath();c0.arc(z.x,z.y,z.r,0,Math.PI*2);c0.fillStyle=g;c0.fill();
    });

    // Roads
    c1.beginPath();c1.moveTo(CX-300,CY+200);c1.bezierCurveTo(CX-160,CY+140,CX-40,CY+170,CX+100,CY+140);c1.bezierCurveTo(CX+200,CY+115,CX+280,CY+75,CX+340,CY+30);
    c1.strokeStyle="rgba(30,70,120,0.5)";c1.lineWidth=5;c1.shadowColor="rgba(40,100,180,0.3)";c1.shadowBlur=10;c1.stroke();c1.shadowBlur=0;

    const roads=[
      {pts:[[CX-380,CY-25],[CX-190,CY-12],[CX-70,CY+3],[CX+30,CY+12],[CX+160,CY+7],[CX+310,CY-8],[CX+400,CY-18]],w:4,col:"rgba(210,185,140,0.8)",name:"I-35",glow:true},
      {pts:[[CX+30,CY+12],[CX+18,CY+55],[CX,CY+130]],w:2.5,col:"rgba(190,165,120,0.6)"},
      {pts:[[CX-70,CY+3],[CX-90,CY-55],[CX-130,CY-160]],w:2,col:"rgba(180,155,110,0.5)"},
      {pts:[[CX+160,CY+7],[CX+185,CY+52],[CX+205,CY+95]],w:2,col:"rgba(175,150,105,0.45)"},
      {pts:[[CX-190,CY-12],[CX-215,CY-65],[CX-275,CY-160]],w:1.5,col:"rgba(165,142,100,0.4)"},
    ];
    roads.forEach(r=>{
      const draw=(ctx:CanvasRenderingContext2D,w:number,col:string)=>{
        ctx.beginPath();ctx.moveTo(r.pts[0][0],r.pts[0][1]);
        for(let i=1;i<r.pts.length;i++){
          if(i<r.pts.length-1){const mx=(r.pts[i][0]+r.pts[i+1][0])/2,my=(r.pts[i][1]+r.pts[i+1][1])/2;ctx.quadraticCurveTo(r.pts[i][0],r.pts[i][1],mx,my);}
          else ctx.lineTo(r.pts[i][0],r.pts[i][1]);
        }
        if(r.glow){ctx.shadowColor="rgba(210,185,140,0.3)";ctx.shadowBlur=6;}
        ctx.strokeStyle=col;ctx.lineWidth=w;ctx.lineCap="round";ctx.lineJoin="round";ctx.stroke();ctx.shadowBlur=0;
      };
      draw(c1,r.w+2.5,"rgba(0,0,0,0.5)");draw(c1,r.w,r.col);
      if(r.name){c1.font="600 9px Inter";c1.fillStyle="rgba(210,185,140,0.65)";c1.textAlign="center";c1.fillText(r.name,r.pts[2][0],r.pts[2][1]-8);}
    });
    [{x:CX-195,y:CY-14,n:"Jičín",r:7,g:false},{x:CX+210,y:CY-9,n:"Turnov",r:6,g:false},{x:CX+98,y:CY-75,n:"Trosky 🏰",r:5,g:true},{x:CX-118,y:CY-62,n:"Prachovské skály ⛰",r:4,g:true},{x:CX-60,y:CY-108,n:"Sobotka",r:4,g:false}].forEach(p=>{
      c1.beginPath();c1.arc(p.x,p.y,p.r,0,Math.PI*2);c1.fillStyle=p.g?"rgba(184,154,106,0.7)":"rgba(200,180,140,0.45)";
      if(p.g){c1.shadowColor="rgba(184,154,106,0.5)";c1.shadowBlur=8;}c1.fill();c1.shadowBlur=0;
      c1.font=p.g?"italic 10px Cormorant Garamond,serif":"300 9px Inter,sans-serif";
      c1.fillStyle=p.g?"rgba(184,154,106,0.8)":"rgba(200,180,150,0.5)";c1.textAlign="center";c1.fillText(p.n,p.x,p.y-p.r-5);
    });

    const cars=[
      {route:[[CX-380,CY-25],[CX-190,CY-12],[CX-70,CY+3],[CX+30,CY+12],[CX+160,CY+7],[CX+310,CY-8],[CX+400,CY-18]],t:0,sp:0.0006,col:"rgba(255,220,150,0.95)"},
      {route:[[CX-380,CY-25],[CX-190,CY-12],[CX-70,CY+3],[CX+30,CY+12],[CX+160,CY+7],[CX+310,CY-8],[CX+400,CY-18]],t:0.38,sp:0.0005,col:"rgba(200,230,255,0.7)"},
      {route:[[CX+400,CY-18],[CX+310,CY-8],[CX+160,CY+7],[CX+30,CY+12],[CX-70,CY+3],[CX-190,CY-12],[CX-380,CY-25]],t:0.2,sp:0.0007,col:"rgba(255,200,120,0.8)"},
    ];
    const getP=(pts:number[][],t:number)=>{t=((t%1)+1)%1;const s=Math.floor(t*(pts.length-1)),st=t*(pts.length-1)-s;if(s>=pts.length-1)return pts[pts.length-1];return[pts[s][0]+(pts[s+1][0]-pts[s][0])*st,pts[s][1]+(pts[s+1][1]-pts[s][1])*st];};
    const particles=Array.from({length:30},()=>{const a=Math.random()*Math.PI*2,d=15+Math.random()*200;return{x:CX+Math.cos(a)*d*1.5,y:CY+Math.sin(a)*d*0.75,s:0.5+Math.random()*1.5,sp:0.001+Math.random()*0.0015,o:Math.random()*Math.PI*2,dr:Math.random()*Math.PI*2};});

    let t2=0;let animId:number;
    function draw(){
      t2++;
      c3.clearRect(0,0,W,H);
      const sy=(t2*0.035)%H;
      const sg=c3.createLinearGradient(0,sy-30,0,sy+30);
      sg.addColorStop(0,"rgba(184,154,106,0)");sg.addColorStop(0.5,"rgba(184,154,106,0.05)");sg.addColorStop(1,"rgba(184,154,106,0)");
      c3.fillStyle=sg;c3.fillRect(0,Math.max(0,sy-30),W,60);
      particles.forEach(p=>{p.o+=p.sp;const a=Math.sin(p.o)*0.5+0.5;c3.beginPath();c3.arc(p.x+Math.sin(p.dr+t2*0.0008)*4,p.y+Math.cos(p.dr+t2*0.0006)*2.5,p.s,0,Math.PI*2);c3.fillStyle=`rgba(184,154,106,${a*0.28})`;c3.fill();});
      cars.forEach(car=>{
        car.t=(car.t+car.sp)%1;const [cx2,cy2]=getP(car.route,car.t);
        for(let i=1;i<=6;i++){const [tx,ty]=getP(car.route,((car.t-i*0.008)%1+1)%1);c3.beginPath();c3.arc(tx,ty,1.5,0,Math.PI*2);c3.fillStyle=car.col.replace(/[\d.]+\)$/,`${Math.max(0,0.15-i*0.02)})`);c3.fill();}
        c3.beginPath();c3.arc(cx2,cy2,2.5,0,Math.PI*2);c3.fillStyle=car.col;c3.shadowColor=car.col;c3.shadowBlur=10;c3.fill();c3.shadowBlur=0;
      });
      const pulse=Math.sin(t2*0.045)*0.4+0.6,pr=20+Math.sin(t2*0.045)*2;
      [pr+28,pr+18,pr+8].forEach((r,i)=>{c3.beginPath();c3.arc(CX,CY,r,0,Math.PI*2);c3.strokeStyle=`rgba(184,154,106,${[0.08,0.14,0.25][i]*pulse})`;c3.lineWidth=1;c3.stroke();});
      const pg=c3.createRadialGradient(CX-3,CY-3,0,CX,CY,pr);pg.addColorStop(0,"rgba(35,70,40,0.97)");pg.addColorStop(1,"rgba(8,20,14,0.97)");
      c3.beginPath();c3.arc(CX,CY,pr,0,Math.PI*2);c3.fillStyle=pg;c3.shadowColor=`rgba(184,154,106,${0.6*pulse})`;c3.shadowBlur=20;c3.fill();c3.shadowBlur=0;
      c3.beginPath();c3.arc(CX,CY,pr,0,Math.PI*2);c3.strokeStyle=`rgba(184,154,106,${0.8*pulse})`;c3.lineWidth=1.5;c3.stroke();
      c3.font="14px serif";c3.textAlign="center";c3.fillText("🏡",CX,CY+5);
      c3.fillStyle=`rgba(184,154,106,${0.9*pulse})`;c3.font="italic 11px Cormorant Garamond,serif";c3.fillText("Penzion U Štěstí",CX,CY-pr-16);
      c3.font="7px Inter,sans-serif";c3.fillStyle=`rgba(184,154,106,${0.5*pulse})`;c3.fillText("D O B Š Í N",CX,CY-pr-6);
      const pp=((t2*0.008)%1);const ppts=[[CX-360,CY-22],[CX-250,CY-16],[CX-140,CY-8],[CX-50,CY],[CX,CY]];
      if(pp>0){c3.beginPath();c3.moveTo(ppts[0][0],ppts[0][1]);const steps=Math.floor(pp*(ppts.length-1)*20);for(let i=1;i<ppts.length;i++){if(i<=pp*(ppts.length-1))c3.lineTo(ppts[i][0],ppts[i][1]);}c3.strokeStyle="rgba(184,154,106,0.35)";c3.lineWidth=1.5;c3.setLineDash([4,4]);c3.lineDashOffset=-t2*0.5;c3.stroke();c3.setLineDash([]);}
      c3.save();c3.translate(CX,CY);c3.rotate(t2*0.01);c3.beginPath();for(let i=0;i<6;i++){const a=Math.PI/3*i;c3.lineTo(Math.cos(a)*50,Math.sin(a)*50);}c3.closePath();c3.strokeStyle=`rgba(184,154,106,${0.07*pulse})`;c3.lineWidth=1;c3.stroke();c3.restore();
      c3.strokeStyle="rgba(184,154,106,0.4)";c3.lineWidth=1.5;
      [[10,10,"tl"],[W-10,10,"tr"],[10,H-10,"bl"],[W-10,H-10,"br"]].forEach(([x,y,pos])=>{
        const s=14;c3.beginPath();
        if(pos==="tl"){c3.moveTo(x as number,y as number+s);c3.lineTo(x as number,y as number);c3.lineTo(x as number+s,y as number);}
        else if(pos==="tr"){c3.moveTo(x as number-s,y as number);c3.lineTo(x as number,y as number);c3.lineTo(x as number,y as number+s);}
        else if(pos==="bl"){c3.moveTo(x as number,y as number-s);c3.lineTo(x as number,y as number);c3.lineTo(x as number+s,y as number);}
        else{c3.moveTo(x as number-s,y as number);c3.lineTo(x as number,y as number);c3.lineTo(x as number,y as number-s);}
        c3.stroke();
      });
      const el=document.getElementById("map-coords");
      if(el){const lat=(50.4982+Math.sin(t2*0.00008)*0.00006).toFixed(4);const lng=(15.2350+Math.cos(t2*0.00006)*0.00006).toFixed(4);el.textContent=`${lat}° N · ${lng}° E · 342 m n.m.`;}
      t2++;animId=requestAnimationFrame(draw);
    }
    draw();
    return ()=>cancelAnimationFrame(animId);
  },[]);
  return null;
}

function CloudCanvas() {
  useEffect(() => {
    const canvas = document.getElementById("cloud-canvas") as HTMLCanvasElement;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const isMob = parent.offsetWidth < 768;
    const scale = isMob ? 0.55 : 0.32;
    const W = Math.floor(parent.offsetWidth * scale);
    const H = Math.floor(parent.offsetHeight * scale);
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;
    const imgData = ctx.createImageData(W, H);
    const data = imgData.data;

    // Permutation table
    const perm = new Uint8Array(512);
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

    const grad3 = [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];
    const fade = (t: number) => t*t*t*(t*(t*6-15)+10);
    const lerp = (a: number, b: number, t: number) => a+t*(b-a);
    const dot2 = (g: number[], x: number, y: number) => g[0]*x+g[1]*y;

    function noise2(x: number, y: number): number {
      const X=Math.floor(x)&255, Y=Math.floor(y)&255;
      const xf=x-Math.floor(x), yf=y-Math.floor(y);
      const u=fade(xf), v=fade(yf);
      const a=perm[X]+Y, b=perm[X+1]+Y;
      return lerp(
        lerp(dot2(grad3[perm[a]%8],xf,yf),dot2(grad3[perm[b]%8],xf-1,yf),u),
        lerp(dot2(grad3[perm[a+1]%8],xf,yf-1),dot2(grad3[perm[b+1]%8],xf-1,yf-1),u),
        v
      );
    }

    function fbm(x: number, y: number, oct: number): number {
      let v=0,amp=0.5,freq=1,max=0;
      for(let i=0;i<oct;i++){v+=noise2(x*freq,y*freq)*amp;max+=amp;amp*=0.5;freq*=2;}
      return v/max;
    }

    let t = 0;
    let animId: number;

    function draw() {
      const speed = t * 0.00012;
      for (let y = 0; y < H; y++) {
        const yy = y/H;
        const vm1 = Math.pow(Math.max(0,1-Math.abs(yy-0.3)*2.8),0.5);
        const vm2 = Math.pow(Math.max(0,1-Math.abs(yy-0.62)*3.2),0.5);
        const vm = Math.max(vm1, vm2*0.75);
        for (let x = 0; x < W; x++) {
          const xx = x/W;
          const nx = xx*2.8+speed;
          const ny = yy*1.8+speed*0.3;
          const wx = fbm(nx+1.7,ny+9.2,3)*0.7;
          const wy = fbm(nx+8.3,ny+2.8,3)*0.7;
          let n = fbm(nx+wx,ny+wy,5);
          let d = Math.max(0,(n-0.12)/(0.65-0.12));
          d = Math.pow(d,1.3)*vm;
          d = Math.min(1,d*1.9);
          const i4 = (y*W+x)*4;
          data[i4]   = 210+d*45;
          data[i4+1] = 218+d*37;
          data[i4+2] = 205+d*40;
          data[i4+3] = Math.floor(d*220);
        }
      }
      ctx.putImageData(imgData,0,0);
      t += 16;
      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, []);
  return null;
}

















function LoadingScreen({onDone}: {onDone: ()=>void}) {
  useEffect(() => {
    const c = document.getElementById("lc-canvas") as HTMLCanvasElement;
    if(!c) return;
    c.width = window.innerWidth;
    c.height = window.innerHeight;

    const W = c.width, H = c.height;
    let t = 0;
    let animId: number;

    const stars = Array.from({length:120}, () => ({
      x: Math.random()*W, y: Math.random()*H*0.65,
      r: 0.2+Math.random()*1.1, tw: Math.random()*Math.PI*2, sp: 0.015+Math.random()*0.025
    }));

    const flocks = [
      Array.from({length:10}, (_,i) => ({x:-25-i*32, y:H*0.22+i*7+Math.sin(i)*12, sp:1.0+Math.random()*0.5, ph:i*0.45, sz:0.6+Math.random()*0.2})),
      Array.from({length:7},  (_,i) => ({x:-80-i*38, y:H*0.30+i*6, sp:0.7+Math.random()*0.3, ph:i*0.6+1.2, sz:0.45+Math.random()*0.15})),
      Array.from({length:5},  (_,i) => ({x:-50-i*45, y:H*0.18+i*8, sp:1.2+Math.random()*0.4, ph:i*0.55+2.1, sz:0.35+Math.random()*0.1})),
    ];

    function drawBird(x:number,y:number,s:number,wt:number,a:number){
      ctx2d.beginPath();
      ctx2d.moveTo(x,y);ctx2d.quadraticCurveTo(x-s*9,y-Math.sin(wt)*s*4.5,x-s*18,y);
      ctx2d.moveTo(x,y);ctx2d.quadraticCurveTo(x+s*9,y-Math.sin(wt+0.22)*s*4,x+s*18,y);
      ctx2d.strokeStyle=`rgba(${Math.floor(8+a*7)},${Math.floor(18+a*12)},${Math.floor(10+a*8)},${0.6+a*0.3})`;
      ctx2d.lineWidth=0.9;ctx2d.stroke();
    }

    let lastTime=0;
    function draw(ts:number=0){
      const delta=Math.min(ts-lastTime,50);
      lastTime=ts;
      t+=delta>0?delta/12:1;
      const night = Math.max(0, 1-t/160);
      const dawn  = Math.min(1, Math.max(0,(t-45)/130));
      const full  = Math.min(1, Math.max(0,(t-150)/50));

      // Sky gradient night→dawn
      const g = ctx.createLinearGradient(0,0,0,H);
      g.addColorStop(0,   `rgb(${Math.floor(2+dawn*25)},${Math.floor(5+dawn*28)},${Math.floor(18+dawn*12)})`);
      g.addColorStop(0.35,`rgb(${Math.floor(5+dawn*35)},${Math.floor(12+dawn*35)},${Math.floor(22+dawn*10)})`);
      g.addColorStop(0.7, `rgb(${Math.floor(8+dawn*45)},${Math.floor(18+dawn*40)},${Math.floor(15+dawn*8)})`);
      g.addColorStop(1,   `rgb(3,8,4)`);
      ctx.fillStyle=g;ctx.fillRect(0,0,W,H);

      // Stars fading out
      if(night>0.05){
        stars.forEach(s=>{
          s.tw+=s.sp;
          const a=night*(0.25+Math.sin(s.tw)*0.18);
          ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
          ctx.fillStyle=`rgba(220,215,205,${Math.max(0,a)})`;ctx.fill();
        });
      }

      // Moon fading
      if(night>0.2){
        const mx=W*0.25, my=H*0.15;
        const mg=ctx.createRadialGradient(mx,my,0,mx,my,30);
        mg.addColorStop(0,`rgba(230,220,200,${night*0.5})`);
        mg.addColorStop(0.4,`rgba(200,190,170,${night*0.15})`);
        mg.addColorStop(1,'rgba(200,190,170,0)');
        ctx.fillStyle=mg;ctx.fillRect(0,0,W,H);
        ctx.beginPath();ctx.arc(mx,my,night*12,0,Math.PI*2);
        ctx.fillStyle=`rgba(235,228,210,${night*0.55})`;ctx.fill();
      }

      // Dawn sun glow
      if(dawn>0){
        const sx=W*0.58, sy=H*(0.28-dawn*0.06);
        const sg=ctx.createRadialGradient(sx,sy,0,sx,sy,H*0.55);
        sg.addColorStop(0,`rgba(255,185,80,${dawn*0.22})`);
        sg.addColorStop(0.25,`rgba(255,140,50,${dawn*0.09})`);
        sg.addColorStop(0.6,`rgba(220,100,30,${dawn*0.04})`);
        sg.addColorStop(1,'rgba(220,80,20,0)');
        ctx.fillStyle=sg;ctx.fillRect(0,0,W,H);
        if(dawn>0.4){
          const sa=(dawn-0.4)/0.6;
          ctx.beginPath();ctx.arc(sx,sy,sa*14,0,Math.PI*2);
          ctx.fillStyle=`rgba(255,215,130,${sa*0.55})`;ctx.fill();
          const halo=ctx.createRadialGradient(sx,sy,sa*14,sx,sy,sa*35);
          halo.addColorStop(0,`rgba(255,200,100,${sa*0.2})`);
          halo.addColorStop(1,'rgba(255,200,100,0)');
          ctx.fillStyle=halo;ctx.fillRect(0,0,W,H);
        }
      }

      // Fog layers
      for(let i=0;i<4;i++){
        const fy=H*(0.5+i*0.08);
        const fc=Math.floor(160+dawn*30);
        const fo=0.04+dawn*0.04+Math.sin(t*0.013+i)*0.015;
        const fg=ctx.createLinearGradient(0,fy-20,0,fy+30);
        fg.addColorStop(0,`rgba(${fc},${fc+8},${fc-4},0)`);
        fg.addColorStop(0.5,`rgba(${fc},${fc+8},${fc-4},${fo})`);
        fg.addColorStop(1,`rgba(${fc},${fc+8},${fc-4},0)`);
        ctx.fillStyle=fg;
        ctx.beginPath();
        for(let x=0;x<=W;x+=5){const y=fy+Math.sin(x*0.012+t*0.015+i*1.4)*9;x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);}
        ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();
      }

      // Forest silhouette layers
      ([
        [0.97,0.010,0.12,'rgba(3,9,4,1)'],
        [0.88,0.016,0.15,'rgba(4,11,5,0.95)'],
        [0.79,0.024,0.17,'rgba(5,13,6,0.88)'],
        [0.71,0.033,0.16,'rgba(7,16,8,0.78)']
      ] as [number,number,number,string][]).forEach(([yf,fr,amp,col])=>{
        ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(0,H);
        for(let x=0;x<=W;x+=4){const y=H*yf-Math.abs(Math.sin(x*fr))*H*amp-Math.abs(Math.sin(x*fr*1.8+0.4))*H*amp*0.4;ctx.lineTo(x,y);}
        ctx.lineTo(W,H);ctx.closePath();ctx.fill();
      });

      // Birds
      if(t>60){
        const ba=Math.min(1,(t-120)/60);
        flocks.forEach((flock,fi)=>{
          flock.forEach(b=>{
            b.x+=b.sp;
            if(b.x<W+50)drawBird(b.x,b.y+Math.sin(t*0.042+b.ph)*2.5,b.sz,t*0.14+b.ph,ba);
          });
        });
      }

      // Logo fade in
      const logoEl = document.getElementById("lc-logo");
      if(logoEl){
        if(t>110) logoEl.style.opacity = String(Math.min(1,(t-110)/25));
      }

      // Done — fade out whole screen
      // Progress bar
      const barEl = document.getElementById("lc-bar");
      const pctEl = document.getElementById("lc-pct");
      const prog = Math.min(100, Math.floor((t/200)*100));
      if(barEl) barEl.style.width = prog+"%";
      if(pctEl) pctEl.textContent = prog+"%";

      if(full>0.98){
        const el = document.getElementById("lc-wrap");
        if(el && el.style.opacity !== "0"){
          el.style.transition="opacity 0.5s ease";
          el.style.opacity="0";
          setTimeout(onDone, 500);
        }
      }

      animId = requestAnimationFrame(draw);
    }
    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div id="lc-wrap" style={{position:"fixed" as const,top:0,left:0,right:0,bottom:0,width:"100vw",height:"100vh",zIndex:9999,opacity:1,overflow:"hidden"}}>
      <canvas id="lc-canvas" style={{position:"absolute" as const,top:0,left:0,display:"block"}}/>
      <div id="lc-logo" style={{position:"absolute" as const,top:0,left:0,right:0,bottom:0,display:"flex",flexDirection:"column" as const,alignItems:"center",justifyContent:"center",opacity:0,zIndex:2,textAlign:"center" as const,padding:"0 2rem",WebkitBackfaceVisibility:"hidden"} as React.CSSProperties}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.5rem,6vw,4rem)",fontWeight:300,color:"#F6F1E8",lineHeight:0.88,letterSpacing:"0.02em",textShadow:"0 4px 30px rgba(0,0,0,0.5)"}}>PENZION</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.5rem,6vw,4rem)",fontStyle:"italic",color:"#B89A6A",lineHeight:0.88,textShadow:"0 4px 30px rgba(0,0,0,0.4)"}}>U Štěstí</div>
        <div style={{width:55,height:1,background:"linear-gradient(90deg,transparent,rgba(184,154,106,0.7),transparent)",margin:"1.2rem auto 0.8rem"}}/>
        <div style={{fontFamily:"'Inter',sans-serif",fontSize:"0.42rem",letterSpacing:"0.4em",textTransform:"uppercase" as const,color:"rgba(184,154,106,0.5)",marginBottom:"2rem"}}>Český ráj · Dobšín</div>
        <div style={{width:120,height:1,background:"rgba(255,255,255,0.06)",position:"relative" as const,overflow:"hidden",borderRadius:999}}>
          <div id="lc-bar" style={{position:"absolute" as const,left:0,top:0,height:"100%",width:"0%",background:"linear-gradient(90deg,transparent,rgba(184,154,106,0.9),rgba(220,195,150,1))",transition:"width 0.1s linear"}}/>
        </div>
        <div id="lc-pct" style={{fontFamily:"'Inter',sans-serif",fontSize:"0.38rem",letterSpacing:"0.15em",color:"rgba(184,154,106,0.3)",marginTop:6}}>0%</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeRoom, setActiveRoom] = useState(0);
  const [activeDest, setActiveDest] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rooms = [
    "/images/room1.jpg","/images/room2.jpg","/images/bathroom.jpg",
    "/images/dining.jpg","/images/bar.jpg"
  ];

  const destinations = [
    { name: "Prachovské skály", desc: "Jedinečné skalní město v srdci Českého ráje. Labyrint pískovcových věží obklopený hustými lesy.", img: "/images/hero.jpg" },
    { name: "Hrad Trosky", desc: "Symbol Českého ráje. Dva čedičové sloupy s věžemi Baby a Panny tyčící se nad krajinou.", img: "/images/exterior.jpg" },
    { name: "Hrubá Skála", desc: "Impozantní skalní labyrint s výhledem na celý Český ráj a renesančním zámkem.", img: "/images/pool.jpg" },
    { name: "Valdštejn", desc: "Nejstarší hrad v Českém ráji obklopený romantickými skalními soutěskami.", img: "/images/garden.jpg" },
    { name: "Malá Skála", desc: "Malebné údolí řeky Jizery lemované pískovcovými skalami a hustými lesy.", img: "/images/firepit.jpg" },
  ];

  const S: Record<string, React.CSSProperties> = {
    nav: { position:"fixed", top:0, left:0, right:0, zIndex:1000, display:"flex", alignItems:"center", justifyContent:"space-between", padding: scrolled ? "0.75rem 2.5rem" : "1.1rem 2.5rem", background: scrolled ? "rgba(5,15,8,0.85)" : "rgba(5,15,8,0.45)", backdropFilter:"blur(30px)", WebkitBackdropFilter:"blur(30px)", borderBottom:"1px solid rgba(184,154,106,0.12)", boxShadow: scrolled ? "0 0 40px rgba(184,154,106,0.08),0 8px 40px rgba(0,0,0,0.5)" : "0 2px 30px rgba(0,0,0,0.3)", transition:"all 0.5s ease" },
    logoWrap: { display:"flex", alignItems:"center", gap:"0.75rem" },
    logoText: { fontFamily:"'Cormorant Garamond',serif", fontSize:"0.95rem", fontWeight:500, letterSpacing:"0.08em", color:"#0F241D", lineHeight:1.2 },
    logoSub: { display:"block", fontSize:"0.65rem", letterSpacing:"0.15em", color:"#B89A6A", textTransform:"uppercase" as const },
    navLinks: { display:"flex", gap:"2.5rem", listStyle:"none" },
    navLink: { fontSize:"0.6rem", letterSpacing:"0.13em", textTransform:"uppercase" as const, color:"rgba(246,241,232,0.55)", fontWeight:400, transition:"color 0.3s", padding:"0 1rem" },
    btnPrimary: { background:"#0F241D", color:"#F6F1E8", padding:"0.65rem 1.6rem", fontSize:"0.72rem", letterSpacing:"0.14em", textTransform:"uppercase" as const, fontWeight:500, border:"none", cursor:"pointer", fontFamily:"'Inter',sans-serif" },
    hero: { position:"relative" as const, height:"100vh", minHeight:700, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", background:"#0a1a14" },
    heroBg: { position:"absolute" as const, inset:0, backgroundImage:"url('/images/hero.jpg')", backgroundSize:"cover", backgroundPosition:"center", opacity:0.8 },
    heroOverlay: { position:"absolute" as const, inset:0, background:"linear-gradient(180deg,rgba(10,25,18,0.3) 0%,rgba(10,25,18,0.1) 40%,rgba(10,25,18,0.65) 100%)" },
    heroContent: { position:"relative" as const, zIndex:2, textAlign:"center" as const, padding:"0 2rem" },
    heroTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(4.5rem,10vw,9rem)", fontWeight:300, color:"#F6F1E8", lineHeight:0.9, letterSpacing:"-0.02em" },
    heroTitleItalic: { display:"block", fontStyle:"italic", color:"#EFE7DA" },
    heroSubtitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.1rem,2vw,1.5rem)", color:"rgba(239,231,218,0.85)", letterSpacing:"0.08em", margin:"1.5rem 0 2.5rem", fontStyle:"italic", fontWeight:300 },
    btnOutline: { background:"transparent", color:"#F6F1E8", border:"1px solid rgba(246,241,232,0.6)", padding:"0.75rem 2rem", fontSize:"0.72rem", letterSpacing:"0.14em", textTransform:"uppercase" as const, cursor:"pointer", fontFamily:"'Inter',sans-serif" },
    scrollIndicator: { position:"absolute" as const, bottom:"2.5rem", left:"50%", transform:"translateX(-50%)", color:"rgba(239,231,218,0.6)", fontSize:"0.6rem", letterSpacing:"0.2em", textTransform:"uppercase" as const, display:"flex", flexDirection:"column" as const, alignItems:"center", gap:"0.75rem" },
    scrollLine: { width:1, height:50, background:"linear-gradient(180deg,rgba(239,231,218,0.6),transparent)" },
    editorial: { background:"#F6F1E8", padding:"8rem 6rem", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6rem", alignItems:"center" } as React.CSSProperties,
    eyebrow: { fontSize:"0.62rem", letterSpacing:"0.25em", textTransform:"uppercase" as const, color:"#B89A6A", marginBottom:"2rem" },
    sectionTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.8rem,4.5vw,4.5rem)", fontWeight:400, lineHeight:1.05, color:"#0F241D", marginBottom:"1.5rem" },
    divider: { width:60, height:1, background:"#B89A6A", margin:"0 0 2rem" },
    bodyText: { fontSize:"1rem", lineHeight:1.9, color:"#4a4a4a", fontWeight:300, maxWidth:440 },
    polaroid: { background:"#fff", padding:"1.2rem 1.2rem 3.5rem", boxShadow:"4px 4px 30px rgba(0,0,0,0.12)", transform:"rotate(2deg)", maxWidth:380, margin:"0 auto", position:"relative" as const },
    polaroidImg: { width:"100%", height:300, objectFit:"cover" as const },
    polaroidCaption: { textAlign:"center" as const, fontFamily:"'Cormorant Garamond',serif", fontSize:"1.1rem", color:"#888", marginTop:"1rem", fontStyle:"italic" },
    stamp: { position:"absolute" as const, bottom:-20, right:-20, width:100, height:100, borderRadius:"50%", border:"2px solid #0F241D", background:"#F6F1E8", display:"flex", flexDirection:"column" as const, alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond',serif", textAlign:"center" as const, color:"#0F241D", transform:"rotate(-10deg)" },
    rooms: { display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:"85vh" } as React.CSSProperties,
    roomsLeft: { position:"relative" as const, overflow:"hidden", minHeight:500 },
    roomsImg: { position:"absolute" as const, inset:0, width:"100%", height:"100%", objectFit:"cover" as const, transition:"opacity 0.6s ease" },
    roomNav: { position:"absolute" as const, top:"50%", transform:"translateY(-50%)", display:"flex", justifyContent:"space-between", width:"100%", padding:"0 1rem", pointerEvents:"none" as const },
    roomBtn: { width:44, height:44, border:"1px solid rgba(246,241,232,0.5)", background:"rgba(246,241,232,0.15)", backdropFilter:"blur(8px)", color:"#F6F1E8", fontSize:"1.2rem", cursor:"pointer", pointerEvents:"all" as const },
    roomsRight: { background:"#EFE7DA", padding:"5rem 4rem", display:"flex", flexDirection:"column" as const, justifyContent:"center", position:"relative" as const },
    features: { display:"flex", flexWrap:"wrap" as const, gap:"0.75rem", margin:"2rem 0" },
    featureTag: { padding:"0.5rem 1rem", border:"1px solid rgba(184,154,106,0.3)", fontSize:"0.75rem", letterSpacing:"0.06em", color:"#0F241D", background:"rgba(255,255,255,0.5)" },
    ceskyRaj: { background:"#0F241D", padding:"7rem 6rem", display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:"5rem", alignItems:"start", position:"relative", overflow:"hidden" } as React.CSSProperties,
    ceskyList: { listStyle:"none", borderTop:"1px solid rgba(215,195,164,0.15)" },
    ceskyItem: { display:"flex", alignItems:"center", gap:"1rem", padding:"1.2rem 0", borderBottom:"1px solid rgba(215,195,164,0.15)", cursor:"pointer", transition:"all 0.3s" },
    destCard: { background:"#fff", boxShadow:"0 20px 60px rgba(0,0,0,0.4)", overflow:"hidden" },
    destImg: { width:"100%", height:300, objectFit:"cover" as const, display:"block" },
    destInfo: { padding:"2rem" },
    destName: { fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:500, color:"#0F241D", marginBottom:"0.5rem" },
    destDesc: { fontSize:"0.875rem", color:"#666", lineHeight:1.7, marginBottom:"1.5rem" },
    destLink: { fontSize:"0.7rem", letterSpacing:"0.15em", textTransform:"uppercase" as const, color:"#B89A6A", fontWeight:500 },
    gallery: { background:"#F6F1E8", padding:"7rem 4rem" },
    galleryHeader: { display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"3.5rem" },
    galleryTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.5rem,4vw,4rem)", fontWeight:400, color:"#0F241D" },
    galleryGrid: { display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:"0.5rem" },
    quoteSection: { position:"relative" as const, minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" },
    quoteBg: { position:"absolute" as const, inset:0, backgroundImage:"url('/images/hero.jpg')", backgroundSize:"cover", backgroundPosition:"center 60%", filter:"brightness(0.4)" },
    quoteOverlay: { position:"absolute" as const, inset:0, background:"rgba(10,25,18,0.5)" },
    quoteContent: { position:"relative" as const, zIndex:2, textAlign:"center" as const, padding:"0 4rem" },
    quoteText: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,4.5vw,4rem)", fontWeight:300, color:"#F6F1E8", lineHeight:1.25, fontStyle:"italic" },
    quoteLine: { width:60, height:1, background:"#B89A6A", margin:"2.5rem auto 0" },
    reservation: { background:"#EFE7DA", padding:"7rem 6rem" } as React.CSSProperties,
    resTitle: { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,3vw,3rem)", fontWeight:400, color:"#0F241D", marginBottom:"1rem" },
    resSub: { fontSize:"0.9rem", color:"#666", lineHeight:1.7, maxWidth:420, marginBottom:"3rem" },
    resForm: { background:"#fff", padding:"2.5rem", boxShadow:"0 8px 60px rgba(15,36,29,0.08)", border:"1px solid rgba(184,154,106,0.1)", display:"grid", gridTemplateColumns:"1fr 1fr 1fr auto", gap:"2rem", alignItems:"end" } as React.CSSProperties,
    formGroup: { display:"flex", flexDirection:"column" as const, gap:"0.5rem" },
    formLabel: { fontSize:"0.62rem", letterSpacing:"0.2em", textTransform:"uppercase" as const, color:"#0F241D", fontWeight:500 },
    formInput: { border:"none", borderBottom:"1.5px solid rgba(184,154,106,0.4)", background:"transparent", padding:"0.75rem 0", fontSize:"0.9rem", outline:"none", fontFamily:"'Inter',sans-serif" },
    btnReserve: { background:"#0F241D", color:"#F6F1E8", border:"none", padding:"0.9rem 2rem", fontSize:"0.72rem", letterSpacing:"0.14em", textTransform:"uppercase" as const, cursor:"pointer", whiteSpace:"nowrap" as const, fontFamily:"'Inter',sans-serif" },
    footer: { background:"#0F241D", color:"#F6F1E8", padding:"5rem 6rem 3rem", position:"relative" } as React.CSSProperties,
    footerGrid: { display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr 1fr", gap:"4rem", marginBottom:"4rem", borderBottom:"1px solid rgba(215,195,164,0.12)", paddingBottom:"4rem" } as React.CSSProperties,
    footerLogoName: { fontFamily:"'Cormorant Garamond',serif", fontSize:"1.5rem", color:"#F6F1E8", marginBottom:"0.25rem" },
    footerLogoSub: { fontSize:"0.65rem", letterSpacing:"0.15em", color:"#B89A6A", textTransform:"uppercase" as const, marginBottom:"1.5rem" },
    footerDesc: { fontSize:"0.85rem", color:"rgba(239,231,218,0.45)", lineHeight:1.8 },
    footerHeading: { fontSize:"0.62rem", letterSpacing:"0.2em", textTransform:"uppercase" as const, color:"#B89A6A", marginBottom:"1.5rem", fontWeight:500 },
    footerLink: { fontSize:"0.85rem", color:"rgba(239,231,218,0.45)", display:"block", marginBottom:"0.8rem" },
    footerBottom: { display:"flex", justifyContent:"space-between", fontSize:"0.75rem", color:"rgba(239,231,218,0.25)" },
    socialRow: { display:"flex", gap:"0.75rem", marginTop:"1.5rem" },
    socialBtn: { width:36, height:36, border:"1px solid rgba(215,195,164,0.2)", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(239,231,218,0.4)", fontSize:"0.75rem", cursor:"pointer" },
  };

  return (
    <>
      {loading && <LoadingScreen onDone={()=>setLoading(false)}/>}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; overflow-x: hidden; }
        body { font-family: 'Inter', sans-serif; background: #F6F1E8; overflow-x: hidden; }
        img { display: block; max-width: 100%; }
        a { text-decoration: none; color: inherit; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
        .hero-title { animation: fadeInUp 1.4s ease 0.3s both; }
        .hero-sub { animation: fadeInUp 1.2s ease 0.7s both; }
        .hero-cta { animation: fadeInUp 1s ease 1s both; }
        .scroll-line { animation: pulse 2s ease infinite; }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes ken-burns{0%{transform:scale(1) translate(0,0)}25%{transform:scale(1.08) translate(-1%,0.5%)}50%{transform:scale(1.12) translate(0.5%,-0.5%)}75%{transform:scale(1.08) translate(-0.5%,1%)}100%{transform:scale(1) translate(0,0)}}
        .hero-bg-zoom{animation:ken-burns 20s ease-in-out infinite;transform-origin:center center;will-change:transform}

        @keyframes expand-line{to{width:90px}}
        @keyframes fade-up{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
        .logo-top{animation:fade-up 0.8s ease 0s both}
        .logo-main{animation:fade-up 0.8s ease 0.15s both}
        .logo-line{width:0;height:1px;background:linear-gradient(90deg,transparent,#B89A6A,transparent);animation:expand-line 1.8s ease 0.3s forwards}
        .logo-sub-txt{animation:fade-up 0.8s ease 0.3s both}
        @keyframes liq1{0%,100%{width:28px}50%{width:22px}}
        @keyframes liq2{0%,100%{width:20px}50%{width:14px;transform:translateX(4px)}}
        @keyframes liq3{0%,100%{width:28px}50%{width:24px}}
        .liq-l{height:2px;background:#e8dcc8;border-radius:2px;transition:width 0.45s cubic-bezier(0.4,0,0.2,1),transform 0.45s cubic-bezier(0.4,0,0.2,1),background 0.3s,box-shadow 0.3s,opacity 0.3s}
        .liq-l1{animation:liq1 3s ease-in-out infinite}
        .liq-l2{animation:liq2 3s ease-in-out infinite 0.5s}
        .liq-l3{animation:liq3 3s ease-in-out infinite 1s}
        .liq-open1{animation:none!important;width:24px!important;transform:rotate(45deg) translate(5px,6px)!important;background:#B89A6A!important;box-shadow:0 0 12px rgba(184,154,106,0.9),0 0 28px rgba(184,154,106,0.4)!important}
        .liq-open2{animation:none!important;width:0!important;opacity:0!important}
        .liq-open3{animation:none!important;width:24px!important;transform:rotate(-45deg) translate(5px,-6px)!important;background:#B89A6A!important;box-shadow:0 0 12px rgba(184,154,106,0.9),0 0 28px rgba(184,154,106,0.4)!important}
        @keyframes glow-travel{0%{left:-80px;opacity:0}8%{opacity:1}92%{opacity:1}100%{left:calc(100% + 80px);opacity:0}}
        @keyframes glow-travel-glow{0%{left:-120px;opacity:0}8%{opacity:1}92%{opacity:0.7}100%{left:calc(100% + 120px);opacity:0}}
        .nav-glow-line{position:absolute;bottom:0;left:0;right:0;height:1px;background:rgba(184,154,106,0.07)}
        .nav-glow-dot{position:absolute;bottom:-1px;height:3px;width:70px;background:linear-gradient(90deg,transparent,rgba(184,154,106,0.95),rgba(220,195,150,1),rgba(184,154,106,0.95),transparent);border-radius:999px;animation:glow-travel 5s cubic-bezier(0.4,0,0.2,1) infinite;box-shadow:0 0 10px rgba(184,154,106,0.6)}
        .nav-glow-halo{position:absolute;bottom:-6px;width:120px;height:12px;background:radial-gradient(ellipse,rgba(184,154,106,0.18),transparent 70%);border-radius:50%;animation:glow-travel-glow 5s cubic-bezier(0.4,0,0.2,1) infinite}
        .nav-glow-dot2{position:absolute;bottom:-1px;height:2px;width:40px;background:linear-gradient(90deg,transparent,rgba(184,154,106,0.5),transparent);border-radius:999px;animation:glow-travel 5s cubic-bezier(0.4,0,0.2,1) 2.5s infinite}
        .nav-links-desktop { display: flex; }
        .nav-cta-desktop { display: block; }
        .hamburger { display: none; }
        .mobile-menu { display: none; }
        .mobile-menu.open { display: flex; }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta-desktop { display: none !important; }
          .hamburger { display: flex !important; }
          .editorial-grid { grid-template-columns: 1fr !important; padding: 4rem 1.5rem !important; gap: 3rem !important; }
          .rooms-grid { grid-template-columns: 1fr !important; }
          .rooms-right-pad { padding: 3rem 1.5rem !important; }
          .cesky-grid { grid-template-columns: 1fr !important; padding: 4rem 1.5rem !important; gap: 2rem !important; }
          .gallery-grid-mobile { grid-template-columns: 1fr 1fr !important; }
          .gallery-item-tall { grid-row: span 1 !important; height: 200px !important; }
          .gallery-item-short { height: 200px !important; }
          .res-form-grid { grid-template-columns: 1fr !important; padding: 1.5rem !important; }
          .footer-grid-mobile { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; padding: 3rem 1.5rem 2rem !important; }
          .quote-pad { padding: 0 1.5rem !important; }
          .reservation-pad { padding: 4rem 1.5rem !important; }
          .polaroid-wrap { transform: rotate(0deg) !important; max-width: 100% !important; }
          .hero-title-mobile { font-size: clamp(3rem,14vw,5rem) !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={S.nav}>
        <div className="nav-glow-line"/>
        <div className="nav-glow-dot"/>
        <div className="nav-glow-halo"/>
        <div className="nav-glow-dot2"/>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.1rem",cursor:"pointer"}}>
          <div className="logo-top" style={{fontFamily:"'Inter',sans-serif",fontSize:"0.42rem",letterSpacing:"0.45em",textTransform:"uppercase" as const,color:"rgba(184,154,106,0.6)",fontWeight:300}}>Penzion</div>
          <div className="logo-main" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.5rem",fontWeight:300,color:"#F6F1E8",letterSpacing:"0.04em",lineHeight:1}}>U <em style={{fontStyle:"italic",color:"#B89A6A"}}>Štěstí</em></div>
          <div className="logo-line"></div>
          <div className="logo-sub-txt" style={{fontFamily:"'Inter',sans-serif",fontSize:"0.38rem",letterSpacing:"0.38em",textTransform:"uppercase" as const,color:"rgba(184,154,106,0.45)",fontWeight:300}}>Český ráj</div>
        </div>
        <ul className="nav-links-desktop" style={S.navLinks}>
          {["Pokoje","O penzionu","Český ráj","Galerie","Kontakt"].map(item => (
            <li key={item}><a href={`#${item.toLowerCase().replace(" ","-")}`} style={S.navLink}>{item}</a></li>
          ))}
        </ul>
        <button className="nav-cta-desktop" style={{background:"linear-gradient(135deg,rgba(184,154,106,0.2),rgba(184,154,106,0.08))",border:"1px solid rgba(184,154,106,0.3)",padding:"0.55rem 1.4rem",fontSize:"0.6rem",letterSpacing:"0.14em",textTransform:"uppercase" as const,color:"#C9AA7A",cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>Rezervovat pobyt</button>
        <button className="hamburger liq-btn" onClick={()=>setMenuOpen(!menuOpen)} style={{background:"none",border:"none",cursor:"pointer",flexDirection:"column" as const,gap:"5px",padding:"8px",display:"flex",alignItems:"flex-start"}}>
          <span className={menuOpen?"liq-l liq-l1 liq-open1":"liq-l liq-l1"} style={{display:"block"}}/>
          <span className={menuOpen?"liq-l liq-l2 liq-open2":"liq-l liq-l2"} style={{display:"block"}}/>
          <span className={menuOpen?"liq-l liq-l3 liq-open3":"liq-l liq-l3"} style={{display:"block"}}/>
        </button>
      </nav>
      {menuOpen && (
        <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:999,background:"rgba(5,15,8,0.97)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",display:"flex",flexDirection:"column" as const,alignItems:"center",justifyContent:"center"}}>
          <button onClick={()=>setMenuOpen(false)} style={{position:"absolute",top:"1.5rem",right:"1.5rem",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column" as const,gap:"6px",padding:"8px"}}>
            <span style={{width:26,height:2,background:"#F6F1E8",display:"block",transform:"rotate(45deg) translate(0,8px)"}}/>
            <span style={{width:26,height:2,background:"#F6F1E8",display:"block",opacity:0}}/>
            <span style={{width:26,height:2,background:"#F6F1E8",display:"block",transform:"rotate(-45deg) translate(0,-8px)"}}/>
          </button>
          <div style={{fontFamily:"'Inter',sans-serif",fontSize:"0.5rem",letterSpacing:"0.3em",textTransform:"uppercase" as const,color:"rgba(184,154,106,0.4)",marginBottom:"3rem"}}>Menu</div>
          {["Pokoje","O penzionu","Český ráj","Galerie","Kontakt"].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(" ","-")}`} onClick={()=>setMenuOpen(false)}
              style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2.8rem",fontWeight:300,color:"#F6F1E8",letterSpacing:"0.06em",padding:"0.7rem 0",borderBottom:"1px solid rgba(184,154,106,0.1)",width:"70%",textAlign:"center" as const}}>
              {item}
            </a>
          ))}
          <button onClick={()=>setMenuOpen(false)} style={{marginTop:"3rem",background:"linear-gradient(135deg,rgba(184,154,106,0.2),rgba(184,154,106,0.08))",border:"1px solid rgba(184,154,106,0.4)",padding:"0.9rem 3rem",fontSize:"0.65rem",letterSpacing:"0.15em",textTransform:"uppercase" as const,color:"#C9AA7A",cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>Rezervovat pobyt</button>
        </div>
      )}
      {/* HERO */}
      <section style={S.hero}>
        <div className="hero-bg-zoom" style={S.heroBg}/>
        <div style={S.heroOverlay}/>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0.45) 100%)",zIndex:1,pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:0,left:0,right:0,height:"35%",background:"linear-gradient(180deg,rgba(0,0,0,0.3) 0%,transparent 100%)",zIndex:1,pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:"40%",background:"linear-gradient(0deg,rgba(0,0,0,0.45) 0%,rgba(0,0,0,0.2) 50%,transparent 100%)",zIndex:1,pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:0,bottom:0,left:0,width:"18%",background:"linear-gradient(90deg,rgba(0,0,0,0.25) 0%,transparent 100%)",zIndex:1,pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:0,bottom:0,right:0,width:"18%",background:"linear-gradient(270deg,rgba(0,0,0,0.25) 0%,transparent 100%)",zIndex:1,pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:0,left:0,right:0,height:"35%",background:"linear-gradient(180deg,rgba(0,0,0,0.35) 0%,transparent 100%)",zIndex:1,pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:"40%",background:"linear-gradient(0deg,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.25) 50%,transparent 100%)",zIndex:1,pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:0,bottom:0,left:0,width:"20%",background:"linear-gradient(90deg,rgba(0,0,0,0.3) 0%,transparent 100%)",zIndex:1,pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:0,bottom:0,right:0,width:"20%",background:"linear-gradient(270deg,rgba(0,0,0,0.3) 0%,transparent 100%)",zIndex:1,pointerEvents:"none"}}/>
        <canvas id="cloud-canvas" style={{position:"absolute",inset:0,width:"100%",height:"100%",zIndex:2,mixBlendMode:"screen",opacity:0.85,imageRendering:"auto"} as React.CSSProperties}/>
        <div style={S.heroContent}>
          <h1 className="hero-title hero-title-mobile" style={S.heroTitle}>
            PENZION<span style={S.heroTitleItalic}>U ŠTĚSTÍ</span>
          </h1>
          <p className="hero-sub" style={S.heroSubtitle}>Váš domov v srdci Českého ráje</p>
          <div className="hero-cta">
            <button style={S.btnOutline}>REZERVOVAT POBYT</button>
          </div>
        </div>
        <div style={S.scrollIndicator}>
          <div className="scroll-line" style={S.scrollLine}/>
          SCROLLUJTE DOLŮ
        </div>
      </section>
      <CloudCanvas/>
      {/* EDITORIAL */}
      <section id="o-penzionu" className="editorial-grid" style={S.editorial}>
        <div>
          <p style={S.eyebrow}>Náš příběh</p>
          <h2 style={S.sectionTitle}>
            Objevte místo,<br/>kde čas plyne<br/><em style={{color:"#B89A6A"}}>pomaleji.</em>
          </h2>
          <div style={S.divider}/>
          <p style={S.bodyText}>
            Penzion U Štěstí je klidné místo obklopené přírodou Českého ráje. Nacházíme se uprostřed luk a lesů, daleko od shonu velkoměsta. Ideální pro odpočinek, romantické víkendy i aktivní dovolenou.<br/><br/>
            Vítejte v místě, kde ráno začíná zpěvem ptáků a večer dozní v klidu hvězdné oblohy.
          </p>
        </div>
        <div style={{position:"relative",display:"flex",justifyContent:"center"}}>
          <div style={S.polaroid}>
            <img src="/images/exterior.jpg" alt="Penzion" style={S.polaroidImg}/>
            <p style={S.polaroidCaption}>U Štěstí, Český ráj</p>
          </div>
          <div style={S.stamp}>
            <span style={{fontSize:"0.5rem",letterSpacing:"0.12em",textTransform:"uppercase" as const}}>Český ráj</span>
            <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",lineHeight:1}}>✦</span>
            <span style={{fontSize:"0.45rem",letterSpacing:"0.1em",textTransform:"uppercase" as const}}>U Štěstí</span>
          </div>
        </div>
      </section>

      {/* ROOMS */}
      <section id="pokoje" className="rooms-grid" style={S.rooms}>
        <div style={S.roomsLeft}>
          <img key={activeRoom} src={rooms[activeRoom]} alt="Pokoj" style={S.roomsImg}/>
          <div style={S.roomNav}>
            <button style={S.roomBtn} onClick={()=>setActiveRoom((activeRoom-1+rooms.length)%rooms.length)}>←</button>
            <button style={S.roomBtn} onClick={()=>setActiveRoom((activeRoom+1)%rooms.length)}>→</button>
          </div>
        </div>
        <div className="rooms-right-pad" style={S.roomsRight}>
          <p style={S.eyebrow}>Naše pokoje</p>
          <h2 style={{...S.sectionTitle,fontSize:"clamp(2.2rem,3.5vw,3.5rem)"}}>Pohodlí s výhledem<br/>do přírody</h2>
          <p style={{...S.bodyText,marginBottom:"1rem"}}>Nabízíme útulné pokoje a apartmány zařízené v přírodním stylu. Každý z nich má své kouzlo a výhled, který pohladí duši.</p>
          <div style={S.features}>
            {["Wi-Fi zdarma","Snídaně","Parkování","Výhled do přírody","Relax & odpočinek","Bazén"].map(f=>(
              <span key={f} style={S.featureTag}>{f}</span>
            ))}
          </div>
          <button style={S.btnPrimary}>ZOBRAZIT POKOJE</button>
        </div>
      </section>

      {/* ČESKÝ RÁJ */}
      <section id="český-ráj" className="cesky-grid" style={S.ceskyRaj}>
        <div>
          <p style={{...S.eyebrow,color:"#B89A6A"}}>Český ráj</p>
          <h2 style={{...S.sectionTitle,color:"#F6F1E8",marginBottom:"3rem"}}>Co můžete<br/>zažít</h2>
          <ul style={S.ceskyList}>
            {destinations.map((d,i)=>(
              <li key={d.name} style={{...S.ceskyItem,color:activeDest===i?"#F6F1E8":"rgba(239,231,218,0.4)"}} onClick={()=>setActiveDest(i)}>
                <span style={{width:8,height:8,borderRadius:"50%",border:"1px solid #D7C3A4",background:activeDest===i?"#B89A6A":"transparent",flexShrink:0,display:"inline-block"}}/>
                <span style={{fontSize:"0.9rem",letterSpacing:"0.03em",fontWeight:activeDest===i?500:400}}>{d.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={S.destCard}>
          <img src={destinations[activeDest].img} alt={destinations[activeDest].name} style={S.destImg}/>
          <div style={S.destInfo}>
            <h3 style={S.destName}>{destinations[activeDest].name}</h3>
            <p style={S.destDesc}>{destinations[activeDest].desc}</p>
            <span style={S.destLink}>ZJISTIT VÍCE →</span>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="galerie" style={{background:"#F6F1E8",padding:isMobile?"4rem 0":"6rem 0",overflow:"hidden"}}>
        <div style={{textAlign:"center" as const,marginBottom:"3rem",padding:"0 2rem"}}>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.5rem,4vw,4rem)",fontWeight:400,color:"#0F241D",marginBottom:"0.5rem"}}>Galerie</h2>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",color:"#B89A6A",fontSize:"1.1rem"}}>Okolí, které si zamilujete.</p>
          <div style={{width:40,height:1,background:"linear-gradient(90deg,transparent,#B89A6A,transparent)",margin:"0.75rem auto 0"}}/>
        </div>
        <div style={{position:"relative" as const,width:"100%",overflow:"hidden"}}>
          <div style={{position:"absolute" as const,left:0,top:0,bottom:0,width:isMobile?"60px":"160px",background:"linear-gradient(90deg,#F6F1E8 0%,rgba(246,241,232,0.95) 50%,transparent 100%)",zIndex:10,pointerEvents:"none" as const}}/>
          <div style={{position:"absolute" as const,right:0,top:0,bottom:0,width:isMobile?"60px":"160px",background:"linear-gradient(270deg,#F6F1E8 0%,rgba(246,241,232,0.95) 50%,transparent 100%)",zIndex:10,pointerEvents:"none" as const}}/>
          <style>{`
            @keyframes scroll-gallery{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
            .g-track{display:flex;gap:1.2rem;padding:1rem 0 1.5rem;animation:scroll-gallery 35s linear infinite;width:max-content}
            .g-track:hover{animation-play-state:paused}
            .g-card{border-radius:16px;overflow:hidden;flex-shrink:0;position:relative;cursor:pointer;transition:transform 0.4s cubic-bezier(0.4,0,0.2,1)}
            .g-card:hover{transform:scale(1.04) translateY(-5px)}
            .g-card img{width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease;display:block}
            .g-card:hover img{transform:scale(1.08)}
            .g-overlay{position:absolute;inset:0;border-radius:16px;background:linear-gradient(180deg,transparent 50%,rgba(10,20,12,0.6) 100%);opacity:0;transition:opacity 0.4s}
            .g-card:hover .g-overlay{opacity:1}
            .g-label{position:absolute;bottom:0;left:0;right:0;padding:0.8rem 1rem;transform:translateY(8px);opacity:0;transition:all 0.4s;font-family:'Cormorant Garamond',serif;font-style:italic;color:#F6F1E8;font-size:0.9rem}
            .g-card:hover .g-label{transform:translateY(0);opacity:1}
          `}</style>
          <div className="g-track">
            {[
              {src:"/images/hero.jpg",label:"Prachovské skály",w:300,h:200},
              {src:"/images/pool.jpg",label:"Bazén",w:260,h:200},
              {src:"/images/garden.jpg",label:"Zahrada",w:230,h:200},
              {src:"/images/room1.jpg",label:"Pokoj",w:280,h:200},
              {src:"/images/firepit.jpg",label:"Večerní ohniště",w:250,h:200},
              {src:"/images/exterior.jpg",label:"Penzion",w:300,h:200},
              {src:"/images/nature.jpg",label:"Příroda",w:260,h:200},
              {src:"/images/dining.jpg",label:"Jídelna",w:240,h:200},
              {src:"/images/bar.jpg",label:"Bar",w:220,h:200},
              {src:"/images/path.jpg",label:"Zahradní cesta",w:260,h:200},
              {src:"/images/hero.jpg",label:"Prachovské skály",w:300,h:200},
              {src:"/images/pool.jpg",label:"Bazén",w:260,h:200},
              {src:"/images/garden.jpg",label:"Zahrada",w:230,h:200},
              {src:"/images/room1.jpg",label:"Pokoj",w:280,h:200},
              {src:"/images/firepit.jpg",label:"Večerní ohniště",w:250,h:200},
              {src:"/images/exterior.jpg",label:"Penzion",w:300,h:200},
              {src:"/images/nature.jpg",label:"Příroda",w:260,h:200},
              {src:"/images/dining.jpg",label:"Jídelna",w:240,h:200},
              {src:"/images/bar.jpg",label:"Bar",w:220,h:200},
              {src:"/images/path.jpg",label:"Zahradní cesta",w:260,h:200},
            ].map((img,i)=>(
              <div key={i} className="g-card" style={{width:img.w,height:img.h}}>
                <img src={img.src} alt={img.label}/>
                <div className="g-overlay"/>
                <div className="g-label">{img.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{textAlign:"center" as const,marginTop:"1.5rem",fontFamily:"'Inter',sans-serif",fontSize:"0.55rem",letterSpacing:"0.2em",color:"rgba(15,36,29,0.3)",textTransform:"uppercase" as const}}>Najeďte myší pro pozastavení</div>
      </section>
      {/* QUOTE */}
      <section style={S.quoteSection}>
        <div style={S.quoteBg}/>
        <div style={S.quoteOverlay}/>
        <div className="quote-pad" style={S.quoteContent}>
          <blockquote style={S.quoteText}>„Nejkrásnější vzpomínky<br/>nevznikají ve spěchu."</blockquote>
          <div style={S.quoteLine}/>
        </div>
      </section>

      {/* RESERVATION */}
      <section id="rezervace" className="reservation-pad" style={S.reservation}>
        <h2 style={S.resTitle}>Rezervujte<br/>svůj pobyt</h2>
        <p style={S.resSub}>Těšíme se na vaši návštěvu v srdci Českého ráje. Vyberte termín a my se postaráme o zbytek.</p>
        <div className="res-form-grid" style={S.resForm}>
          <div style={S.formGroup}>
            <label style={S.formLabel}>Příjezd</label>
            <input type="date" defaultValue="2024-06-20" style={S.formInput}/>
          </div>
          <div style={S.formGroup}>
            <label style={S.formLabel}>Odjezd</label>
            <input type="date" defaultValue="2024-06-22" style={S.formInput}/>
          </div>
          <div style={S.formGroup}>
            <label style={S.formLabel}>Počet hostů</label>
            <select style={S.formInput}>
              <option>1 dospělý</option>
              <option>2 dospělí</option>
              <option>3 dospělí</option>
              <option>4 dospělí</option>
            </select>
          </div>
          <button style={S.btnReserve}>OVĚŘIT DOSTUPNOST</button>
        </div>
      </section>

      {/* MAP */}
      <section style={{background:"#0a1510",padding:"4rem 0 0",overflow:"hidden"}}>
        <div style={{textAlign:"center" as const,padding:"0 2rem 2rem"}}>
          <p style={{fontSize:"0.46rem",letterSpacing:"0.4em",textTransform:"uppercase" as const,color:"rgba(184,154,106,0.55)",marginBottom:"0.7rem",fontFamily:"'Inter',sans-serif"}}>Jak nás najdete</p>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2rem,3.5vw,2.8rem)",fontWeight:300,color:"#F6F1E8",marginBottom:"0.3rem"}}>Dobšín, <em style={{fontStyle:"italic",color:"#B89A6A"}}>Český ráj</em></h2>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",color:"rgba(239,231,218,0.35)",fontSize:"0.85rem"}}>Rovensko pod Troskami · 512 63</p>
          <div style={{width:50,height:1,background:"linear-gradient(90deg,transparent,rgba(184,154,106,0.6),transparent)",margin:"0.7rem auto 0"}}/>
        </div>
        <style>{`
          .leaflet-container{background:#060c08!important}
          .leaflet-tile{filter:brightness(0.85) saturate(0.9)}
          .leaflet-control-zoom,.leaflet-control-attribution{display:none!important}
          .map-night .leaflet-tile{filter:brightness(0.5) saturate(0.4) hue-rotate(180deg) invert(0.05)}
          .map-day .leaflet-tile{filter:brightness(0.85) saturate(0.8)}
          @keyframes pin-ring{0%{transform:scale(1);opacity:0.6}100%{transform:scale(2.5);opacity:0}}
          .pin-pulse::after{content:'';position:absolute;inset:-8px;border-radius:50%;border:1px solid rgba(184,154,106,0.6);animation:pin-ring 2s ease-out infinite}
          .pin-pulse::before{content:'';position:absolute;inset:-4px;border-radius:50%;border:1px solid rgba(184,154,106,0.4);animation:pin-ring 2s ease-out 0.5s infinite}
          .toggle-btn{background:rgba(6,12,8,0.9);border:1px solid rgba(184,154,106,0.3);color:#F6F1E8;padding:6px 14px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;cursor:pointer;font-family:'Inter',sans-serif;backdrop-filter:blur(12px);transition:all 0.3s;display:flex;align-items:center;gap:6px}
          .toggle-btn:hover{border-color:rgba(184,154,106,0.6);background:rgba(15,36,29,0.9)}
          .toggle-btn.active{background:rgba(184,154,106,0.15);border-color:rgba(184,154,106,0.6)}
        `}</style>
        <div style={{position:"relative" as const,width:"100%",height:isMobile?340:500}}>
          <div id="leaflet-map" style={{width:"100%",height:"100%"}}/>
          <div style={{position:"absolute" as const,top:0,left:0,right:0,height:90,background:"linear-gradient(180deg,#0a1510,transparent)",zIndex:500,pointerEvents:"none" as const}}/>
          <div style={{position:"absolute" as const,bottom:0,left:0,right:0,height:90,background:"linear-gradient(0deg,#0a1510,transparent)",zIndex:500,pointerEvents:"none" as const}}/>
          <div style={{position:"absolute" as const,top:0,left:0,bottom:0,width:80,background:"linear-gradient(90deg,#0a1510,transparent)",zIndex:500,pointerEvents:"none" as const}}/>
          <div style={{position:"absolute" as const,top:0,right:0,bottom:0,width:80,background:"linear-gradient(270deg,#0a1510,transparent)",zIndex:500,pointerEvents:"none" as const}}/>
          <div style={{position:"absolute" as const,top:16,left:"50%",transform:"translateX(-50%)",zIndex:600,display:"flex",gap:4}}>
            <button id="btn-night" className="toggle-btn active" onClick={()=>{
              const m=document.getElementById('leaflet-map');
              if(m){m.className='map-night';(window as any)._mapNight=true;}
              const tiles=document.querySelectorAll('.leaflet-tile');
              tiles.forEach((t:any)=>{t.style.filter='brightness(0.45) saturate(0.3) hue-rotate(200deg)';});
              document.getElementById('btn-night')?.classList.add('active');
              document.getElementById('btn-day')?.classList.remove('active');
            }}>🌙 Noc</button>
            <button id="btn-day" className="toggle-btn" onClick={()=>{
              const tiles=document.querySelectorAll('.leaflet-tile');
              tiles.forEach((t:any)=>{t.style.filter='brightness(0.88) saturate(0.85)';});
              document.getElementById('btn-day')?.classList.add('active');
              document.getElementById('btn-night')?.classList.remove('active');
            }}>☀️ Den</button>
          </div>
          <div style={{position:"absolute" as const,right:isMobile?10:100,top:60,zIndex:600,display:"flex",flexDirection:"column" as const,gap:6,pointerEvents:"none" as const}}>
            <div style={{background:"rgba(6,12,8,0.9)",border:"1px solid rgba(184,154,106,0.2)",padding:"6px 12px",backdropFilter:"blur(12px)"}}>
              <div style={{fontSize:7,letterSpacing:"0.15em",textTransform:"uppercase" as const,color:"rgba(184,154,106,0.45)",fontFamily:"'Inter',sans-serif",marginBottom:4}}>Vzdálenosti</div>
              {[["Praha","88 km"],["Prachovské skály","8 km"],["Hrad Trosky","12 km"],["Turnov","18 km"]].map(([n,v])=>(
                <div key={n} style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                  <span style={{fontSize:7,color:"rgba(184,154,106,0.5)",whiteSpace:"nowrap" as const,fontFamily:"'Inter',sans-serif"}}>{n}</span>
                  <div style={{flex:1,height:1,background:"linear-gradient(90deg,rgba(184,154,106,0.3),transparent)",minWidth:20}}/>
                  <span style={{fontSize:7,color:"rgba(239,231,218,0.7)",whiteSpace:"nowrap" as const,fontFamily:"'Inter',sans-serif"}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{position:"absolute" as const,left:isMobile?10:100,bottom:16,zIndex:600,background:"rgba(6,12,8,0.85)",border:"1px solid rgba(184,154,106,0.15)",padding:"4px 10px",pointerEvents:"none" as const}}>
            <div id="map-coords" style={{fontSize:7,letterSpacing:"0.12em",color:"rgba(184,154,106,0.4)",fontFamily:"'Inter',sans-serif"}}>50.4982° N · 15.2350° E · 342 m n.m.</div>
          </div>
          {["tl","tr","bl","br"].map(c=>(
            <div key={c} style={{position:"absolute" as const,width:14,height:14,zIndex:600,pointerEvents:"none" as const,borderColor:"rgba(184,154,106,0.35)",borderStyle:"solid",borderWidth:c==="tl"?"1.5px 0 0 1.5px":c==="tr"?"1.5px 1.5px 0 0":c==="bl"?"0 0 1.5px 1.5px":"0 1.5px 1.5px 0",top:c.includes("t")?10:undefined,bottom:c.includes("b")?10:undefined,left:c.includes("l")?10:undefined,right:c.includes("r")?10:undefined}}/>
          ))}
        </div>
        <LeafletMap/>
      </section>
      {/* FOOTER */}
      <footer id="kontakt" style={{background:"#0F241D",color:"#F6F1E8",position:"relative" as const,overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:"1px",background:"linear-gradient(90deg,transparent,rgba(184,154,106,0.4),transparent)"}}/>
        <div style={{padding: isMobile ? "3rem 1.5rem 2rem" : "5rem 6rem 3rem"}}>
          {isMobile ? (
            <div style={{display:"flex",flexDirection:"column" as const,gap:"2.5rem"}}>
              <div style={{textAlign:"center" as const}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",fontWeight:300,color:"#F6F1E8",letterSpacing:"0.1em"}}>PENZION</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",fontStyle:"italic",fontWeight:300,color:"#B89A6A",letterSpacing:"0.06em",marginTop:"-0.2rem"}}>U Štěstí</div>
                <div style={{width:60,height:1,background:"linear-gradient(90deg,transparent,#B89A6A,transparent)",margin:"1rem auto"}}/>
                <div style={{fontSize:"0.5rem",letterSpacing:"0.3em",textTransform:"uppercase" as const,color:"rgba(184,154,106,0.5)"}}>Český ráj · Rovensko pod Troskami</div>
                <div style={{display:"flex",justifyContent:"center",gap:"0.75rem",marginTop:"1.5rem"}}>
                  {["f","ig","in"].map(s=>(
                    <div key={s} style={{width:38,height:38,border:"1px solid rgba(184,154,106,0.25)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(239,231,218,0.4)",fontSize:"0.7rem",cursor:"pointer"}}>{s}</div>
                  ))}
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2rem"}}>
                <div>
                  <p style={{fontSize:"0.55rem",letterSpacing:"0.2em",textTransform:"uppercase" as const,color:"#B89A6A",marginBottom:"1.2rem",fontWeight:500}}>Kontakt</p>
                  <p style={{fontSize:"0.85rem",color:"rgba(239,231,218,0.5)",marginBottom:"0.6rem",lineHeight:1.6}}>+420 123 456 789</p>
                  <p style={{fontSize:"0.85rem",color:"rgba(239,231,218,0.5)",marginBottom:"0.6rem",lineHeight:1.6}}>info@penzionustesti.cz</p>
                  <p style={{fontSize:"0.8rem",color:"rgba(239,231,218,0.4)",lineHeight:1.6}}>Rovensko pod Troskami 123, 512 63</p>
                </div>
                <div>
                  <p style={{fontSize:"0.55rem",letterSpacing:"0.2em",textTransform:"uppercase" as const,color:"#B89A6A",marginBottom:"1.2rem",fontWeight:500}}>Menu</p>
                  {["Pokoje","O penzionu","Český ráj","Galerie","Kontakt","Rezervace"].map(l=>(
                    <a key={l} href="#" style={{fontSize:"0.85rem",color:"rgba(239,231,218,0.45)",display:"block",marginBottom:"0.6rem",letterSpacing:"0.02em"}}>{l}</a>
                  ))}
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"0.4rem",borderRadius:"4px",overflow:"hidden"}}>
                {["/images/hero.jpg","/images/pool.jpg","/images/room1.jpg","/images/garden.jpg"].map(src=>(
                  <div key={src} style={{height:70,overflow:"hidden"}}>
                    <img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover" as const,opacity:0.55}}/>
                  </div>
                ))}
              </div>
              <div style={{borderTop:"1px solid rgba(215,195,164,0.1)",paddingTop:"1.5rem",display:"flex",flexDirection:"column" as const,alignItems:"center",gap:"0.5rem",textAlign:"center" as const}}>
                <span style={{fontSize:"0.72rem",color:"rgba(239,231,218,0.2)"}}>© 2026 Penzion U Štěstí. Všechna práva vyhrazena.</span>
              </div>
            </div>
          ) : (
            <>
              <div style={{display:"grid",gridTemplateColumns:"1.8fr 1fr 1fr 1fr",gap:"4rem",marginBottom:"4rem",borderBottom:"1px solid rgba(215,195,164,0.1)",paddingBottom:"4rem"}}>
                <div>
                  <div style={{marginBottom:"1.5rem"}}>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontWeight:300,color:"#F6F1E8",letterSpacing:"0.1em",lineHeight:1}}>PENZION</div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontStyle:"italic",fontWeight:300,color:"#B89A6A",letterSpacing:"0.06em",lineHeight:1}}>U Štěstí</div>
                    <div style={{width:50,height:1,background:"linear-gradient(90deg,transparent,#B89A6A,transparent)",margin:"0.8rem 0"}}/>
                    <div style={{fontSize:"0.48rem",letterSpacing:"0.25em",textTransform:"uppercase" as const,color:"rgba(184,154,106,0.4)"}}>Český ráj</div>
                  </div>
                  <p style={{fontSize:"0.85rem",color:"rgba(239,231,218,0.4)",lineHeight:1.9,maxWidth:280}}>Klidné místo obklopené přírodou Českého ráje. Rovensko pod Troskami — ideální destinace pro odpočinek a dobrodružství.</p>
                  <div style={{display:"flex",gap:"0.75rem",marginTop:"1.5rem"}}>
                    {["f","ig","in"].map(s=>(
                      <div key={s} style={{width:38,height:38,border:"1px solid rgba(184,154,106,0.2)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(239,231,218,0.35)",fontSize:"0.7rem",cursor:"pointer",transition:"all 0.3s"}}>{s}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <p style={{fontSize:"0.55rem",letterSpacing:"0.22em",textTransform:"uppercase" as const,color:"#B89A6A",marginBottom:"1.5rem",fontWeight:500}}>Kontakt</p>
                  <p style={{fontSize:"0.85rem",color:"rgba(239,231,218,0.45)",marginBottom:"0.8rem"}}>+420 123 456 789</p>
                  <p style={{fontSize:"0.85rem",color:"rgba(239,231,218,0.45)",marginBottom:"0.8rem"}}>info@penzionustesti.cz</p>
                  <p style={{fontSize:"0.82rem",color:"rgba(239,231,218,0.3)",lineHeight:1.6}}>Rovensko pod Troskami 123<br/>512 63</p>
                </div>
                <div>
                  <p style={{fontSize:"0.55rem",letterSpacing:"0.22em",textTransform:"uppercase" as const,color:"#B89A6A",marginBottom:"1.5rem",fontWeight:500}}>Rychlé odkazy</p>
                  {["Pokoje","O penzionu","Český ráj","Galerie","Kontakt","Rezervace"].map(l=>(
                    <a key={l} href="#" style={{fontSize:"0.85rem",color:"rgba(239,231,218,0.4)",display:"block",marginBottom:"0.75rem",transition:"color 0.2s"}}>{l}</a>
                  ))}
                </div>
                <div>
                  <p style={{fontSize:"0.55rem",letterSpacing:"0.22em",textTransform:"uppercase" as const,color:"#B89A6A",marginBottom:"1.5rem",fontWeight:500}}>Sledujte nás</p>
                  <p style={{fontSize:"0.75rem",color:"rgba(239,231,218,0.3)",marginBottom:"1rem",letterSpacing:"0.05em"}}>#PenzionUStesti</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.4rem"}}>
                    {["/images/hero.jpg","/images/pool.jpg","/images/room1.jpg","/images/garden.jpg"].map(src=>(
                      <div key={src} style={{height:65,overflow:"hidden",borderRadius:"2px"}}>
                        <img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover" as const,opacity:0.5}}/>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"0.72rem",color:"rgba(239,231,218,0.2)"}}>
                <span>© 2026 Penzion U Štěstí. Všechna práva vyhrazena.</span>
                <span>Rovensko pod Troskami · Český ráj</span>
              </div>
            </>
          )}
        </div>
      </footer>
    </>
  );
}
