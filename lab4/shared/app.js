// Each feature gets its own root element and the same small scene API.
['A','B','C'].forEach(role=>{
  try { window['mount'+role](document.getElementById('controls-'+role),Ride); }
  catch (error) { document.getElementById('controls-'+role).textContent='Module '+role+' needs a fix. Ask your agent to check the browser error.'; console.error(error); }
});
