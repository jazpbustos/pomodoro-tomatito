(function(root){const families=[{id:'focus',name:'Ratitos de foco',icon:'home',unit:'pomodoros'},{id:'cycles',name:'Ciclos completos',icon:'badge',unit:'ciclos'},{id:'tasks',name:'Listitas cuidadas',icon:'tasks',unit:'tareas'}];const goals={focus:[1,2,4,8,16,28,48,80,128,200,320,512],cycles:[1,2,4,7,12,20,32,45,60,90,135,200],tasks:[1,2,4,7,12,20,32,50,80,125,200,320]};function threshold(family,l){const arr=goals[family]||goals.focus;if(l<=arr.length)return arr[Math.max(0,l-1)];return Math.ceil(arr.at(-1)*1.6**(l-arr.length))}function level(count,family='focus'){let l=0;while(l<52&&count>=threshold(family,l+1))l++;return l}const next=(count,family='focus')=>threshold(family,level(count,family)+1);
const gifts=[{id:'clay',name:'Maceta terracota',slot:'pot',body:'#edb18c',rim:'#f7c9a5'},{id:'cream',name:'Mañana de crema',slot:'theme',color:'#f5ead2'},{id:'none',name:'Jardín despejadito',slot:'decor'},{id:'rose',name:'Maceta rosita',slot:'pot',family:'focus',need:1,body:'#dfa3a6',rim:'#f1c3c1'},{id:'mint',name:'Brisa de menta',slot:'theme',family:'focus',need:2,color:'#dceadc'},{id:'blue',name:'Maceta cielo',slot:'pot',family:'focus',need:3,body:'#a4bccb',rim:'#ccdae4'},{id:'lilac',name:'Maceta lila',slot:'pot',family:'tasks',need:2,body:'#b9a6cb',rim:'#ddcfe8'},{id:'sunset',name:'Tarde de durazno',slot:'theme',family:'cycles',need:2,color:'#efd5ce'},{id:'lavender',name:'Cielito lavanda',slot:'theme',family:'focus',need:4,color:'#e5deed'},{id:'butterfly',name:'Mariposita amiga',slot:'decor',family:'cycles',need:1},{id:'mushroom',name:'Honguito del jardín',slot:'decor',family:'tasks',need:1},{id:'stars',name:'Rincón de estrellitas',slot:'decor',family:'focus',need:5}];

gifts.push({id:'pet-none',name:'Sin mascota',slot:'pet'},{id:'house-none',name:'Sin casita',slot:'house'},
{id:'cat',name:'Gatito miel',slot:'pet',family:'cycles',need:1},{id:'bunny',name:'Conejito crema',slot:'pet',family:'tasks',need:2},{id:'dog',name:'Perrito canela',slot:'pet',family:'focus',need:3},{id:'frog',name:'Ranita del estanque',slot:'pet',family:'cycles',need:3},{id:'bird',name:'Pajarito limón',slot:'pet',family:'tasks',need:4},{id:'fox',name:'Zorrito durazno',slot:'pet',family:'focus',need:6},
{id:'cottage',name:'Casita de jardín',slot:'house',family:'cycles',need:2},{id:'mushroom-house',name:'Casita honguito',slot:'house',family:'tasks',need:3},{id:'greenhouse',name:'Invernadero',slot:'house',family:'focus',need:4},{id:'bee-house',name:'Casita de miel',slot:'house',family:'cycles',need:4},
{id:'bench',name:'Banquito de madera',slot:'decor',family:'tasks',need:2},{id:'watering-can',name:'Regaderita menta',slot:'decor',family:'focus',need:2},{id:'lantern',name:'Farolito cálido',slot:'decor',family:'cycles',need:3},{id:'flowers',name:'Flores del sendero',slot:'decor',family:'tasks',need:3});
gifts.push({id:'fairy-none',name:'Sin hadita',slot:'fairy'},
{id:'fairydew',name:'Hadita del rocío',slot:'fairy',family:'tasks',need:2},{id:'fairyrose',name:'Hadita de las flores',slot:'fairy',family:'cycles',need:2},{id:'fairymoon',name:'Hadita de la luna',slot:'fairy',family:'focus',need:5},
{id:'painted-mushrooms',name:'Maceta del bosque',slot:'pot',family:'tasks',need:1,body:'#c5bb9a',rim:'#e1d7b9',pattern:'mushrooms'},
{id:'painted-flowers',name:'Maceta florecitas',slot:'pot',family:'focus',need:2,body:'#d9aca8',rim:'#efcdba',pattern:'flowers'},
{id:'painted-moon',name:'Maceta lunita',slot:'pot',family:'cycles',need:2,body:'#afa7c7',rim:'#d7cde2',pattern:'moon'},
{id:'painted-stars',name:'Maceta estrellitas',slot:'pot',family:'focus',need:4,body:'#abc3c4',rim:'#d3e1d9',pattern:'stars'});
gifts.forEach(g=>{g.legacyFamily=g.family;g.legacyNeed=g.need});
const rebalance={lilac:['tasks',3],lavender:['focus',5],dog:['focus',4],frog:['cycles',5],bird:['tasks',6],fox:['focus',7],'mushroom-house':['tasks',5],greenhouse:['focus',6],'bee-house':['cycles',6],lantern:['cycles',5],flowers:['tasks',4],fairydew:['tasks',4],fairyrose:['cycles',4],fairymoon:['cycles',7],'painted-flowers':['focus',3],'painted-moon':['cycles',5],'painted-stars':['focus',5]};gifts.forEach(g=>{if(rebalance[g.id])[g.family,g.need]=rebalance[g.id]});
gifts.push({id:'fairystar',name:'Hadita de las estrellas',slot:'fairy',family:'cycles',need:9},{id:'fairy-castle',name:'Castillito encantado',slot:'house',family:'cycles',need:9},{id:'portal',name:'Portal del bosque',slot:'decor',family:'focus',need:10});
function legacyIds(counts){return gifts.filter(g=>g.legacyFamily&&counts[g.legacyFamily]>=2**(g.legacyNeed-1)).map(g=>g.id)}

const additions={
theme:[['forest','Bosque encantado','#a6c8af'],['pond','Estanque de nenúfares','#acd1cc'],['beach','Playita de caracoles','#f4dbb0'],['rainy','Lluvia de primavera','#b5c8da'],['snowy','Nieve de algodón','#dbe6ef'],['starry','Cielo estrellado','#747895'],['aurora','Aurora mágica','#88bfc0'],['dawn','Amanecer de hadas','#efc8b8']],
pet:[['hedgehog','Erizo del sendero'],['turtle','Tortuguita del estanque'],['owl','Buhito lunar'],['deer','Cervatillo del bosque'],['dragon','Dragoncito de aurora']],
house:[['treehouse','Casita del árbol'],['shell-house','Casita caracol'],['snow-house','Casita de nieve'],['moon-house','Casita de la luna'],['pond-house','Casita del estanque'],['aurora-house','Palacio de aurora']],
decor:[['shells','Caracolitos de playa'],['lilies','Nenúfares rosados'],['crystals','Cristales de aurora']],
fairy:[['fairyleaf','Hadita de las hojas'],['fairyrain','Hadita de la lluvia'],['fairysea','Hadita del mar'],['fairysnow','Hadita de la nieve'],['fairysunset','Hadita del atardecer'],['fairyforest','Hadita del bosque'],['fairyaurora','Hadita de la aurora']]
};
for(const [slot,items] of Object.entries(additions))for(const [id,name,color] of items)gifts.push({id,name,slot,color});
for(const [id,name,body,rim,pattern] of [['painted-sun','Maceta rayito de sol','#e6c17d','#f2dbac','sun'],['painted-sea','Maceta de coral','#a2c7cc','#d1e5df','shell'],['painted-snow','Maceta copitos','#c3d6e5','#edf0e7','snow'],['painted-aurora','Maceta aurora','#b3b9d5','#d9d0e4','aurora']])gifts.push({id,name,slot:'pot',body,rim,pattern});
const order={
pot:['clay','rose','blue','lilac','painted-flowers','painted-mushrooms','painted-sun','painted-sea','painted-moon','painted-stars','painted-snow','painted-aurora'],
theme:['cream','mint','sunset','lavender','forest','pond','beach','rainy','snowy','dawn','starry','aurora'],
decor:['none','watering-can','butterfly','mushroom','flowers','bench','shells','lilies','lantern','stars','crystals','portal'],
pet:['pet-none','cat','bunny','dog','bird','frog','hedgehog','turtle','fox','owl','deer','dragon'],
house:['house-none','cottage','bee-house','mushroom-house','greenhouse','treehouse','shell-house','pond-house','snow-house','moon-house','fairy-castle','aurora-house'],
fairy:['fairy-none','fairydew','fairyrose','fairyleaf','fairyrain','fairysea','fairysunset','fairyforest','fairysnow','fairymoon','fairystar','fairyaurora']};
const slots=Object.keys(order),ordered=[],ranks={focus:0,tasks:0,cycles:0},last={focus:0,tasks:0,cycles:0};
for(let tier=0;tier<12;tier++)for(let col=0;col<6;col++){
 const g=gifts.find(g=>g.id===order[slots[col]][tier]);
 if(tier){const family=['focus','tasks','cycles'][(col+tier)%3],rank=ranks[family]++,scale={focus:4,tasks:3,cycles:1}[family];const gate=Math.max(last[family]+1,Math.round(Math.exp(Math.log(60)*rank/21)));last[family]=gate;g.family=family;g.goal=gate*scale;g.need=level(g.goal,family);}else{delete g.family;delete g.need;}
 ordered.push(g);
}
function rewards(counts,owned=[]){return ordered.map(g=>({...g,pattern:g.pattern||({rose:'flowers',blue:'stars',lilac:'moon'}[g.id]),unlocked:!g.family||owned.includes(g.id)||(counts[g.family]||0)>=g.goal}))}
const api={families,level,next,threshold,rewards,legacyIds};if(typeof module!=='undefined')module.exports=api;else root.Progression=api;})(globalThis);
