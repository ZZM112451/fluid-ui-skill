export const styles = ['Glass','Material 3','Minimal','Tech'];
export const intensities = ['Subtle','Balanced','Expressive'];
export function decide({requestedStyle,existingStyle,product,platform,intensity='Balanced',mode='Auto'}={}) {
  if (!intensities.includes(intensity) || !['Auto','Preset','Hybrid'].includes(mode)) throw Error('无效模式或强度');
  for (const style of [requestedStyle,existingStyle]) if (style && !styles.includes(style)) throw Error('未知风格；请保留项目自有设计并记录映射');
  const style=requestedStyle||existingStyle||(platform==='android'?'Material 3':'Minimal');
  return {style,intensity,mode,reason:requestedStyle?'用户指定':existingStyle?'保留现有设计系统':platform==='android'?'优先 Android 原生规范':product==='dashboard'?'高信息密度优先清晰与稳定':'默认以内容与操作为主'};
}
export function validateConfig(c) {
  if (!c || c.schemaVersion!==1) throw Error('配置 schemaVersion 不兼容；禁止静默重写');
  if (!/^1\.\d+\.\d+$/.test(c.skillVersion||'')) throw Error('Skill 主版本不兼容或未固定版本');
  if (!styles.includes(c.style)) throw Error('配置 style 无效');
  decide({requestedStyle:c.style,intensity:c.intensity,mode:c.mode});
  if(c.mode==='Hybrid' && (!c.hybrid?.base || !c.hybrid?.boundaries)) throw Error('Hybrid 需要 base 与 boundaries');
  return c;
}
export function createAsyncTask(onChange=()=>{}) {
  let state={status:'idle'}, generation=0, controller, disposed=false;
  const set=(next)=>{state=next;if(!disposed)onChange(state);};
  return {
    get state(){return state;},
    async run(operation){
      if(disposed)return;
      controller?.abort(); controller=new AbortController();const signal=controller.signal;const id=++generation;
      set({status:'loading'});
      try {const value=await operation(signal);if(id===generation&&!disposed&&!signal.aborted)set({status:'success',value});}
      catch(error){if(id===generation&&!disposed&&!signal.aborted)set({status:'error',error:String(error.message||error)});}
      return state;
    },
    cancel(){if(disposed)return;generation++;controller?.abort();set({status:'cancelled'});},
    reset(){if(disposed)return;generation++;controller?.abort();set({status:'idle'});},
    dispose(){disposed=true;generation++;controller?.abort();}
  };
}
