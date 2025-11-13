const KEY = "expense_tracker_v2";

export function loadLocal(){
  try{
    return JSON.parse(localStorage.getItem(KEY)) || [];
  }catch(e){
    return [];
  }
}

export function saveLocal(data){
  try{
    localStorage.setItem(KEY, JSON.stringify(data || []));
  }catch(e){}
}
