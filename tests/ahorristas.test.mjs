import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {officialSaver,saverTopics,isValidSaverSurvey,canPublishObservatory} from '../src/lib/ahorristas.ts';

test('todos los enlaces de orientación son de dominio BCP HTTPS',()=>{
 for(const item of saverTopics) {
  const u=new URL(item.link);
  assert.equal(u.hostname,'www.bcp.gov.py');assert.equal(u.protocol,'https:');
 }
 for(const url of Object.values(officialSaver))assert.equal(new URL(url).hostname,'www.bcp.gov.py');
});
test('no se aceptan respuestas con campos libres ni información bancaria',()=>{
 assert.equal(isValidSaverSurvey({problem:'consulta',portal:'si',suspicious:'no'}),true);
 assert.equal(isValidSaverSurvey({problem:'consulta',portal:'si',suspicious:'no',cedula:'123'}),false);
 assert.equal(isValidSaverSurvey({problem:'consulta',portal:'si',suspicious:'no',saldo:9999999}),false);
 assert.equal(isValidSaverSurvey({problem:'cualquier texto',portal:'si',suspicious:'no'}),false);
});
test('observatorio exige revisión y volumen; nunca se divulgan segmentos pequeños',()=>{
 const base={published:true,reviewed_at:'2026-11-06',sample_size:29,methodology:'no probabilística',problems:{consulta:29}};
 assert.equal(canPublishObservatory(base),false);
 assert.equal(canPublishObservatory({...base,sample_size:40,problems:{consulta:25}}),false);
 assert.equal(canPublishObservatory({...base,sample_size:50,problems:{consulta:40}}),true);
 assert.equal(canPublishObservatory({...base,published:false,sample_size:50,problems:{consulta:40}}),false);
 assert.equal(canPublishObservatory({...base,sample_size:60,problems:{consulta:40,otra:20}}),false);
});
test('la instantánea pública de datos parte sin resultados',()=>{
 const d=JSON.parse(fs.readFileSync(new URL('../src/data/observatorio.json',import.meta.url),'utf8'));
 assert.equal(d.published,false);assert.equal(d.sample_size,0);
});
