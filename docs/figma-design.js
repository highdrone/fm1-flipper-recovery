
await figma.loadFontAsync({family:"Atkinson Hyperlegible Mono",style:"Bold"});
await figma.loadFontAsync({family:"Atkinson Hyperlegible Mono",style:"Regular"});
const ids=[];
const C={bg:"#0B101B",card:"#141D2D",ink:"#F1F5F9",muted:"#A0B0C6",coral:"#FF7B58",cyan:"#55D9E9",lime:"#C2EA82",line:"#2C3B50"};
const color=h=>({r:parseInt(h.slice(1,3),16)/255,g:parseInt(h.slice(3,5),16)/255,b:parseInt(h.slice(5,7),16)/255});
const paint=h=>[{type:"SOLID",color:color(h)}];
function box(name,w,h,bg,vertical=true){let n=figma.createAutoLayout(vertical?"VERTICAL":"HORIZONTAL");ids.push(n.id);n.name=name;n.resize(w,h);n.primaryAxisSizingMode="FIXED";n.counterAxisSizingMode="FIXED";n.fills=paint(bg);n.clipsContent=true;return n;}
function label(parent,text,size,fill,bold=false,width=0){let n=figma.createText();ids.push(n.id);n.name=text;n.fontName={family:"Atkinson Hyperlegible Mono",style:bold?"Bold":"Regular"};n.fontSize=size;n.lineHeight={unit:"PERCENT",value:125};n.fills=paint(fill);n.characters=text;if(width){n.textAutoResize="HEIGHT";n.resize(width,n.height);}parent.appendChild(n);return n;}
function art(parent,kind,tint,w=240,h=120){
let body="";
if(kind==="flipper")body='<rect x="20" y="27" width="190" height="76" rx="23" fill="#F1F5F9"/><rect x="38" y="42" width="102" height="43" rx="6" fill="#A9C6A4"/><path d="M49 70L66 52L81 70L99 51L123 70" stroke="#234038" stroke-width="4" fill="none"/><path d="M173 48V80M157 64H189" stroke="#FF7B58" stroke-width="12"/><circle cx="202" cy="88" r="4" fill="#FF7B58"/>';
if(kind==="fm1")body='<rect x="28" y="12" width="184" height="108" rx="9" fill="#25344C" stroke="#55D9E9" stroke-width="2"/><rect x="43" y="26" width="54" height="48" rx="3" fill="#0B101B"/><path d="M48 53L57 43L67 61L78 38L91 53" stroke="#55D9E9" stroke-width="3" fill="none"/><circle cx="119" cy="38" r="10" fill="#FF7B58"/><circle cx="150" cy="38" r="10" fill="#55D9E9"/><circle cx="181" cy="38" r="10" fill="#C2EA82"/><path d="M43 86H197V107H43Z" fill="#F1F5F9"/><path d="M57 86V101M75 86V101M111 86V101M129 86V101M147 86V101M183 86V101" stroke="#0B101B" stroke-width="7"/>';
if(kind==="mac")body='<rect x="45" y="15" width="150" height="88" rx="9" fill="#25344C" stroke="#C2EA82" stroke-width="2"/><rect x="54" y="24" width="132" height="69" rx="3" fill="#0B101B"/><path d="M73 46L87 58L73 70M101 73H144" stroke="#C2EA82" stroke-width="5" fill="none"/><path d="M25 106H215L205 116H35Z" fill="#A0B0C6"/>';
if(kind==="arrow")body='<path d="M20 60H210M184 35L210 60L184 85" stroke="'+tint+'" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
let n=figma.createNodeFromSvg('<svg xmlns="http://www.w3.org/2000/svg" width="240" height="130" viewBox="0 0 240 130">'+body+'</svg>');n.name=kind+" illustration";n.resize(w,h);parent.appendChild(n);ids.push(n.id);return n;
}
const page=figma.currentPage;page.name="README graphics";
const hero=box("FM1 Recovery — README hero",1440,720,C.bg);hero.x=80;hero.y=80;hero.paddingLeft=72;hero.paddingRight=72;hero.paddingTop=52;hero.paddingBottom=44;hero.itemSpacing=20;
label(hero,"OPEN HARDWARE / RECOVERY TOOLS",18,C.cyan,true);
label(hero,"Bring your FM-1 back.",62,C.ink,true);
label(hero,"A Flipper Zero, one USB data cable, and a careful recovery path.",22,C.muted,false,1296);
const row=box("Three-stage recovery",1296,270,C.bg,false);row.itemSpacing=24;hero.appendChild(row);
for(const [num,title,kind,accent,desc] of [
["01","ENTER ROM","flipper",C.coral,"Flipper sends the boot key."],
["02","BACK UP","fm1",C.cyan,"Computer saves the full flash."],
["03","RESTORE","mac",C.lime,"Write and verify the firmware."]]){
 let card=box(num+" "+title,416,270,C.card);card.cornerRadius=18;card.paddingLeft=26;card.paddingTop=18;card.paddingRight=26;card.itemSpacing=8;row.appendChild(card);
 label(card,num+" / "+title,19,accent,true);art(card,kind,accent,240,125);label(card,desc,16,C.ink,false,364);
}
label(hero,"FLIPPER ENTERS RECOVERY.  YOUR COMPUTER BACKS UP AND FLASHES.",17,C.muted,true);
hero.exportSettings=[{format:"SVG",suffix:""}];
const diagram=box("FM1 Recovery — cable handoff",1440,530,C.bg);diagram.x=80;diagram.y=880;diagram.paddingLeft=64;diagram.paddingRight=64;diagram.paddingTop=40;diagram.itemSpacing=18;
label(diagram,"One cable. Two connections.",36,C.ink,true);
label(diagram,"Keep the FM-1 powered ON during the handoff.",22,C.coral,true);
const steps=box("Cable sequence",1312,310,C.bg,false);steps.itemSpacing=32;diagram.appendChild(steps);
for(const [num,title,desc,left,right,accent] of [
["A","FLIPPER → FM-1","Start with FM-1 OFF. Press OK, then power it ON.","flipper","fm1",C.coral],
["B","FM-1 → COMPUTER","At the handoff message, move the cable. Keep FM-1 ON.","fm1","mac",C.cyan]]){
 let card=box(num+" connection",640,310,C.card);card.cornerRadius=16;card.paddingLeft=24;card.paddingRight=24;card.paddingTop=18;card.itemSpacing=12;steps.appendChild(card);
 label(card,num+" / "+title,21,accent,true);
 let wire=box("Direct USB data connection",592,126,C.card,false);wire.itemSpacing=4;card.appendChild(wire);
 art(wire,left,accent,236,126);art(wire,"arrow",accent,110,126);art(wire,right,accent,236,126);
 label(card,desc,18,C.ink,false,592);
}
label(diagram,"Before step A: Flipper unplugged from power • GPIO OTG OFF • no-cable pin check H3 L0",16,C.muted,false,1312);
diagram.exportSettings=[{format:"SVG",suffix:""}];
figma.viewport.scrollAndZoomIntoView([hero,diagram]);
return {createdNodeIds:ids,pageId:page.id,heroId:hero.id,diagramId:diagram.id,bounds:[{w:hero.width,h:hero.height},{w:diagram.width,h:diagram.height}]};

