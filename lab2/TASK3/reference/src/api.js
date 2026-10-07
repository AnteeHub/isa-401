/* Classic script: local file:// and HTTP. No package installation. */
(function(root){'use strict';
function create(data){
 const ids=data.lanes.map(l=>l.id),N=data.times.length,dt=data.sampleIntervalSeconds;
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 function time(t){if(!Number.isFinite(Number(t)))throw new TypeError('Time must be finite seconds.');return clamp(Number(t),0,data.durationSeconds);}
 // Shape-preserving cubic Hermite: continuous motion, no overshoot between samples.
 function interp(arr,i,f,col){const j=Math.min(i+1,N-1),a=arr[i][col],b=arr[j][col],delta=b-a;
  if(i===j||delta===0)return a;
  const prev=i? a-arr[i-1][col]:delta,next=j<N-1?arr[j+1][col]-b:delta;
  const slope=(p,q)=>p*q<=0?0:2*p*q/(p+q);let m0=slope(prev,delta),m1=slope(delta,next);
  const f2=f*f,f3=f2*f;return (2*f3-3*f2+1)*a+(f3-2*f2+f)*m0+(-2*f3+3*f2)*b+(f3-f2)*m1;
 }
 function sample(t=0){t=time(t);const z=t/dt,i=Math.min(N-1,Math.floor(z+1e-8)),f=clamp(z-i,0,1);
  const athletes=data.lanes.map(l=>{const s=data.series[String(l.id)],d=interp(s,i,f,0),x=interp(s,i,f,1),y=l.centerline[0][1];
   return {id:l.id,laneId:l.id,name:l.name,country:l.country,lanePosition:{laneId:l.id,distanceM:d},distanceM:d,progress:d/data.poolLengthM,videoPoint:{x,y},sourceRank:s[Math.min(N-1,Math.round(z))][2],estimatedRank:null,region:l.region.map(p=>[...p]),centerline:l.centerline.map(p=>[...p]),status:'estimated'};
  });
  const ordered=[...athletes].sort((a,b)=>b.distanceM-a.distanceM||a.laneId-b.laneId);ordered.forEach((a,k)=>a.estimatedRank=k+1);
  return {time:t,videoTime:t+data.sourceStartSeconds,athletes,rankStatus:'rank_from_smoothed_estimated_distance'};
 }
 function lane(id){const l=data.lanes.find(l=>l.id===Number(id));if(!l)throw new RangeError('Unknown lane: '+id);return l;}
 function hitLane(x,y){if(x<0||x>1||y<0||y>1)return null;return data.lanes.find((l,i)=>y>=l.region[0][1]&&(y<l.region[2][1]||i===ids.length-1))?.id??null;}
 return Object.freeze({duration:data.durationSeconds,sourceStart:data.sourceStartSeconds,lanes:data.lanes,ids,sample,
  athlete:(id,t=0)=>{lane(id);return sample(t).athletes.find(a=>a.id===Number(id));},
  lane,hitLane,toVideoTime:t=>time(t)+data.sourceStartSeconds,
  fromVideoTime:t=>time(Number(t)-data.sourceStartSeconds),
  toPixels:(point,width,height)=>({x:point.x*width,y:point.y*height}),
  schemaVersion:data.schemaVersion});
}
root.SwimAPI=Object.freeze({create});
})(typeof window==='undefined'?globalThis:window);
