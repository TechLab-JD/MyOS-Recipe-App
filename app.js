const root=document.getElementById('RecipeApp');
if(root){const $=id=>root.querySelector('#'+id),listEl=$('rb-list'),viewEl=$('rb-view');
  let data=[],sel=null;try{data=JSON.parse(localStorage.getItem('myos.recipes')||'[]');}catch(e){}
  function save(){try{localStorage.setItem('myos.recipes',JSON.stringify(data));}catch(e){}}
  function renderList(){const q=($('rb-search').value||'').toLowerCase();listEl.innerHTML='';
    data.filter(r=>r.title.toLowerCase().includes(q)).forEach(r=>{const li=document.createElement('div');li.className='rb-li'+(r===sel?' sel':'');li.textContent=r.title||'(untitled)';li.onclick=()=>{sel=r;view();renderList();};listEl.appendChild(li);});
    if(!data.length)listEl.innerHTML='<p style="opacity:.6">No recipes yet. Hit + New.</p>';}
  function view(){if(!sel){viewEl.innerHTML='<p style="opacity:.6">Pick a recipe, or add one.</p>';return;}
    viewEl.innerHTML='<h3></h3><h4>Ingredients</h4><pre class="ing"></pre><h4>Steps</h4><pre class="stp"></pre><div style="margin-top:12px"><button class="rb-edit">Edit</button><button class="rb-del">Delete</button></div>';
    viewEl.querySelector('h3').textContent=sel.title;viewEl.querySelector('.ing').textContent=sel.ing||'';viewEl.querySelector('.stp').textContent=sel.steps||'';
    viewEl.querySelector('.rb-edit').onclick=edit;viewEl.querySelector('.rb-del').onclick=()=>{data=data.filter(r=>r!==sel);sel=null;save();renderList();view();};}
  function edit(){viewEl.innerHTML='<input class="t" placeholder="Title"><h4>Ingredients</h4><textarea class="i" rows="6" placeholder="One per line"></textarea><h4>Steps</h4><textarea class="s" rows="8" placeholder="Numbered or freeform"></textarea><div><button class="rb-save">Save</button></div>';
    viewEl.querySelector('.t').value=sel.title||'';viewEl.querySelector('.i').value=sel.ing||'';viewEl.querySelector('.s').value=sel.steps||'';
    viewEl.querySelector('.rb-save').onclick=()=>{sel.title=viewEl.querySelector('.t').value.trim()||'Untitled';sel.ing=viewEl.querySelector('.i').value;sel.steps=viewEl.querySelector('.s').value;save();renderList();view();};}
  $('rb-add').onclick=()=>{sel={title:'',ing:'',steps:''};data.push(sel);edit();renderList();};
  $('rb-search').addEventListener('input',renderList);
  renderList();view();}
