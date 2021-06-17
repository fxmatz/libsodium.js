var Module=typeof Module!=="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides={};var key;for(key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}var arguments_=[];var thisProgram="./this.program";var quit_=function(status,toThrow){throw toThrow};var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof process.versions==="object"&&typeof process.versions.node==="string";ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;var nodeFS;var nodePath;if(ENVIRONMENT_IS_NODE){if(ENVIRONMENT_IS_WORKER){scriptDirectory=require("path").dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=function shell_read(filename,binary){var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString()}if(!nodeFS)nodeFS=require("fs");if(!nodePath)nodePath=require("path");filename=nodePath["normalize"](filename);return nodeFS["readFileSync"](filename,binary?null:"utf8")};readBinary=function readBinary(filename){var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/")}arguments_=process["argv"].slice(2);if(typeof module!=="undefined"){module["exports"]=Module}quit_=function(status){process["exit"](status)};Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_SHELL){if(typeof read!="undefined"){read_=function shell_read(f){var data=tryParseAsDataURI(f);if(data){return intArrayToString(data)}return read(f)}}readBinary=function readBinary(f){var data;data=tryParseAsDataURI(f);if(data){return data}if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){arguments_=scriptArgs}else if(typeof arguments!="undefined"){arguments_=arguments}if(typeof quit==="function"){quit_=function(status){quit(status)}}if(typeof print!=="undefined"){if(typeof console==="undefined")console={};console.log=print;console.warn=console.error=typeof printErr!=="undefined"?printErr:print}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!=="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=function(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){readBinary=function(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}}}readAsync=function(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=function(title){document.title=title}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);for(key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!=="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heap,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heap[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heap.subarray&&UTF8Decoder){return UTF8Decoder.decode(heap.subarray(idx,endPtr))}else{var str="";while(idx<endPtr){var u0=heap[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heap[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heap[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heap[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf)}var INITIAL_MEMORY=Module["INITIAL_MEMORY"]||16777216;var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what+="";err(what);ABORT=true;EXITSTATUS=1;what="abort("+what+"). Build with -s ASSERTIONS=1 for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,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OCEbLu0qxFr8bSxN37OVnRMNOFPeY6+LVHMKZaiydzy7Cmp25q7tRy7JwoE7NYIUhSxykmQD8Uyh6L+iATBCvEtmGqiRl/jQcItLwjC+VAajUWzHGFLv1hnoktEQqWVVJAaZ1iogcVeFNQ70uNG7MnCgahDI0NK4FsGkGVOrQVEIbDcemeuO30x3SCeoSJvhtbywNGNaycWzDBw5y4pB40qq2E5z42N3T8qcW6O4stbzby5o/LLvXe6Cj3RgLxdDb2OleHKr8KEUeMiE7DlkGggCx4woHmMj+v++kOm9gt7rbFCkFXnGsvej+b4rU3Lj8nhxxpxhJurOPifKB8LAIce4htEe6+DN1n3a6njRbu5/T331um8Xcqpn8AammMiixX1jCq4N+b4EmD8RG0ccEzULcRuEfQQj9XfbKJMkx0B7q8oyvL7JFQq+njxMDRCcxGcdQ7ZCPsu+1MVMKn5l/Jwpf1ns+tY6q2/LXxdYR0qMGURsgABBwBQLAggPAEHQFAtqAv8ABGQAIAAABP//BgABAAEAAQD//wH/Af//////Af8B/wH/Af8B/wH/Af8B//////8K/yAA//8D/wH/BP8eAAABBf//////YwAACGMA6AMCAAAA//////8AAAAB/wH//////////////wBByRULAQQAQdYVC0QB/wH//////wABIAAEAIAAAAj//wH/Af////////8B/wb/B/8I/wn//////7wCvAIBAP//AQABAP//AAD//////////wBBqhYLARQAQcoWCx7//wEACv///////////wH/Af8AAAAAAAAB/wH/Af8AQfoWC0gB/wAAAAAAAAH/Af8BAAAAAQAAAAH//////wAAAAAB////AAAAAP////////////8oAAr//////wEACv////8A//////////8AQaYYCxwB/wH///8BAAr/////////////////Cv//////AEHQGAtBEQAKABEREQAAAAAFAAAAAAAACQAAAAALAAAAAAAAAAARAA8KERERAwoHAAEACQsLAAAJBgsAAAsABhEAAAAREREAQaEZCyELAAAAAAAAAAARAAoKERERAAoAAAIACQsAAAAJAAsAAAsAQdsZCwEMAEHnGQsVDAAAAAAMAAAAAAkMAAAAAAAMAAAMAEGVGgsBDgBBoRoLFQ0AAAAEDQAAAAAJDgAAAAAADgAADgBBzxoLARAAQdsaCx4PAAAAAA8AAAAACRAAAAAAABAAABAAABIAAAASEhIAQZIbCw4SAAAAEhISAAAAAAAACQBBwxsLAQsAQc8bCxUKAAAAAAoAAAAACQsAAAAAAAsAAAsAQf0bCwEMAEGJHAsnDAAAAAAMAAAAAAkMAAAAAAAMAAAMAAAwMTIzNDU2Nzg5QUJDREVGAEGwHAvZAXRlc3RpbmcKAAAAAAAAAABUaGUgQ29uc2NpZW5jZSBvZiBhIEhhY2tlciBpcyBhIHNtYWxsIGVzc2F5IHdyaXR0ZW4gSmFudWFyeSA4LCAxOTg2IGJ5IGEgY29tcHV0ZXIgc2VjdXJpdHkgaGFja2VyIHdobyB3ZW50IGJ5IHRoZSBoYW5kbGUgb2YgVGhlIE1lbnRvciwgd2hvIGJlbG9uZ2VkIHRvIHRoZSAybmQgZ2VuZXJhdGlvbiBvZiBMZWdpb24gb2YgRG9vbS4AAAAAAAEAAAAAAAUAQZQeCwEBAEGsHgsOAgAAAAMAAAAoFAAAAAQAQcQeCwEBAEHTHgsFCv////8AQcQgCwJQGA==";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}else{throw"both async and sync fetching of the wasm failed"}}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch==="function"&&!isFileURI(wasmBinaryFile)){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary(wasmBinaryFile)})}else{if(readAsync){return new Promise(function(resolve,reject){readAsync(wasmBinaryFile,function(response){resolve(new Uint8Array(response))},reject)})}}}return Promise.resolve().then(function(){return getBinary(wasmBinaryFile)})}function createWasm(){var info={"a":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["g"];updateGlobalBufferAndViews(wasmMemory.buffer);wasmTable=Module["asm"]["j"];addOnInit(Module["asm"]["h"]);removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){var result=WebAssembly.instantiate(binary,info);return result}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming==="function"&&!isDataURI(wasmBinaryFile)&&!isFileURI(wasmBinaryFile)&&typeof fetch==="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiationResult,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(receiveInstantiationResult)})})}else{return instantiateArrayBuffer(receiveInstantiationResult)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync();return{}}var ASM_CONSTS={4220:function(){return Module.getRandomValue()},4256:function(){if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback(Module);continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){wasmTable.get(func)()}else{wasmTable.get(func)(callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}var runtimeKeepaliveCounter=0;function keepRuntimeAlive(){return noExitRuntime||runtimeKeepaliveCounter>0}function ___assert_fail(condition,filename,line,func){abort("Assertion failed: "+UTF8ToString(condition)+", at: "+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])}function _abort(){abort()}var readAsmConstArgsArray=[];function readAsmConstArgs(sigPtr,buf){readAsmConstArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){var double=ch<105;if(double&&buf&1)buf++;readAsmConstArgsArray.push(double?HEAPF64[buf++>>1]:HEAP32[buf]);++buf}return readAsmConstArgsArray}function _emscripten_asm_const_int(code,sigPtr,argbuf){var args=readAsmConstArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}function _emscripten_get_heap_max(){return 2147483648}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}var SYSCALLS={mappings:{},buffers:[null,[],[]],printChar:function(stream,curr){var buffer=SYSCALLS.buffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}},varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret},get64:function(low,high){return low}};function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];for(var j=0;j<len;j++){SYSCALLS.printChar(fd,HEAPU8[ptr+j])}num+=len}HEAP32[pnum>>2]=num;return 0}var ASSERTIONS=false;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){if(ASSERTIONS){assert(false,"Character code "+chr+" ("+String.fromCharCode(chr)+")  at offset "+i+" not in 0x00-0xFF.")}chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}var decodeBase64=typeof atob==="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE==="boolean"&&ENVIRONMENT_IS_NODE){var buf;try{buf=Buffer.from(s,"base64")}catch(_){buf=new Buffer(s,"base64")}return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var asmLibraryArg={"f":___assert_fail,"e":_abort,"b":_emscripten_asm_const_int,"d":_emscripten_get_heap_max,"c":_emscripten_memcpy_big,"a":_fd_write};var asm=createWasm();var ___wasm_call_ctors=Module["___wasm_call_ctors"]=function(){return(___wasm_call_ctors=Module["___wasm_call_ctors"]=Module["asm"]["h"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["i"]).apply(null,arguments)};var calledRun;function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}var calledMain=false;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(args){var entryFunction=Module["_main"];var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exit(ret,true)}catch(e){if(e instanceof ExitStatus){return}else if(e=="unwind"){return}else{var toLog=e;if(e&&typeof e==="object"&&e.stack){toLog=[e,e.stack]}err("exception thrown: "+toLog);quit_(1,e)}}finally{calledMain=true}}function run(args){args=args||arguments_;if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain(args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}Module["run"]=run;function exit(status,implicit){EXITSTATUS=status;if(implicit&&keepRuntimeAlive()&&status===0){return}if(keepRuntimeAlive()){}else{exitRuntime();if(Module["onExit"])Module["onExit"](status);ABORT=true}quit_(status,new ExitStatus(status))}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
