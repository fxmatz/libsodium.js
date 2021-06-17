var Module=typeof Module!=="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides={};var key;for(key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}var arguments_=[];var thisProgram="./this.program";var quit_=function(status,toThrow){throw toThrow};var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof process.versions==="object"&&typeof process.versions.node==="string";ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;var nodeFS;var nodePath;if(ENVIRONMENT_IS_NODE){if(ENVIRONMENT_IS_WORKER){scriptDirectory=require("path").dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=function shell_read(filename,binary){var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString()}if(!nodeFS)nodeFS=require("fs");if(!nodePath)nodePath=require("path");filename=nodePath["normalize"](filename);return nodeFS["readFileSync"](filename,binary?null:"utf8")};readBinary=function readBinary(filename){var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/")}arguments_=process["argv"].slice(2);if(typeof module!=="undefined"){module["exports"]=Module}quit_=function(status){process["exit"](status)};Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_SHELL){if(typeof read!="undefined"){read_=function shell_read(f){var data=tryParseAsDataURI(f);if(data){return intArrayToString(data)}return read(f)}}readBinary=function readBinary(f){var data;data=tryParseAsDataURI(f);if(data){return data}if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){arguments_=scriptArgs}else if(typeof arguments!="undefined"){arguments_=arguments}if(typeof quit==="function"){quit_=function(status){quit(status)}}if(typeof print!=="undefined"){if(typeof console==="undefined")console={};console.log=print;console.warn=console.error=typeof printErr!=="undefined"?printErr:print}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!=="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=function(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){readBinary=function(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}}}readAsync=function(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=function(title){document.title=title}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);for(key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!=="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heap,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heap[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heap.subarray&&UTF8Decoder){return UTF8Decoder.decode(heap.subarray(idx,endPtr))}else{var str="";while(idx<endPtr){var u0=heap[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heap[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heap[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heap[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf)}var INITIAL_MEMORY=Module["INITIAL_MEMORY"]||16777216;var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what+="";err(what);ABORT=true;EXITSTATUS=1;what="abort("+what+"). Build with -s ASSERTIONS=1 for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,AGFzbQEAAAABSgxgA39/fwF/YAF/AX9gAABgAn9/AX9gAn9/AGADf39/AGAEf39/fwF/YAF/AGAAAX9gBX9/f39/AGAGf3x/f39/AX9gA39+fwF+Ah8FAWEBYQAGAWEBYgAAAWEBYwAAAWEBZAAIAWEBZQACAxYVAwQJBQEGAAQFAgcHAQUDAQELAQADBAQBcAAEBQcBAYACgIACBgkBfwFBoKPAAgsHEQQBZgIAAWcADgFoABkBaQEACQkBAEEBCwMXGBYK/jUVBwAgACABdwsJACAAIAE2AAALbAEBfyMAQYACayIFJAAgBEGAwARxIAIgA0xyRQRAIAUgAUH/AXEgAiADayICQYACIAJBgAJJIgEbEA0gAUUEQANAIAAgBUGAAhAIIAJBgAJrIgJB/wFLDQALCyAAIAUgAhAICyAFQYACaiQACxcAIAAtAABBIHFFBEAgASACIAAQCxoLCwoAIABBMGtBCkkLoBQCEH8CfiMAQdAAayIGJAAgBkGACDYCTCAGQTdqIRMgBkE4aiEQA0ACQCAOQQBIDQBB/////wcgDmsgBEgEQEHAGkE9NgIAQX8hDgwBCyAEIA5qIQ4LIAYoAkwiByEEAkACQAJAAkACQAJAAkACQCAGAn8CQCAHLQAAIgUEQANAAkACQCAFQf8BcSIFRQRAIAQhBQwBCyAFQSVHDQEgBCEFA0AgBC0AAUElRw0BIAYgBEECaiIINgJMIAVBAWohBSAELQACIQsgCCEEIAtBJUYNAAsLIAUgB2shBCAABEAgACAHIAQQCAsgBA0NIAYoAkwsAAEQCSEFIAYoAkwhBCAFRQ0DIAQtAAJBJEcNAyAELAABQTBrIQ9BASERIARBA2oMBAsgBiAEQQFqIgg2AkwgBC0AASEFIAghBAwACwALIA4hDCAADQggEUUNAkEBIQQDQCADIARBAnRqKAIAIgAEQCACIARBA3RqIAAgARASQQEhDCAEQQFqIgRBCkcNAQwKCwtBASEMIARBCk8NCANAIAMgBEECdGooAgANCCAEQQFqIgRBCkcNAAsMCAtBfyEPIARBAWoLIgQ2AkxBACEIAkAgBCwAACINQSBrIgVBH0sNAEEBIAV0IgVBidEEcUUNAANAAkAgBiAEQQFqIgg2AkwgBCwAASINQSBrIgRBIE8NAEEBIAR0IgRBidEEcUUNACAEIAVyIQUgCCEEDAELCyAIIQQgBSEICwJAIA1BKkYEQCAGAn8CQCAELAABEAlFDQAgBigCTCIELQACQSRHDQAgBCwAAUECdCADakHAAWtBCjYCACAELAABQQN0IAJqQYADaygCACEKQQEhESAEQQNqDAELIBENCEEAIRFBACEKIAAEQCABIAEoAgAiBEEEajYCACAEKAIAIQoLIAYoAkxBAWoLIgQ2AkwgCkF/Sg0BQQAgCmshCiAIQYDAAHIhCAwBCyAGQcwAahARIgpBAEgNBiAGKAJMIQQLQX8hCQJAIAQtAABBLkcNACAELQABQSpGBEACQCAELAACEAlFDQAgBigCTCIELQADQSRHDQAgBCwAAkECdCADakHAAWtBCjYCACAELAACQQN0IAJqQYADaygCACEJIAYgBEEEaiIENgJMDAILIBENByAABH8gASABKAIAIgRBBGo2AgAgBCgCAAVBAAshCSAGIAYoAkxBAmoiBDYCTAwBCyAGIARBAWo2AkwgBkHMAGoQESEJIAYoAkwhBAtBACEFA0AgBSESQX8hDCAELAAAQcEAa0E5Sw0HIAYgBEEBaiINNgJMIAQsAAAhBSANIQQgBSASQTpsakHvC2otAAAiBUEBa0EISQ0ACyAFQRNGDQIgBUUNBiAPQQBOBEAgAyAPQQJ0aiAFNgIAIAYgAiAPQQN0aikDADcDQAwECyAADQELQQAhDAwFCyAGQUBrIAUgARASIAYoAkwhDQwCCyAPQX9KDQMLQQAhBCAARQ0ECyAIQf//e3EiCyAIIAhBgMAAcRshBUEAIQxBhwghDyAQIQgCQAJAAkACfwJAAkACQAJAAn8CQAJAAkACQAJAAkACQCANQQFrLAAAIgRBX3EgBCAEQQ9xQQNGGyAEIBIbIgRB2ABrDiEEEhISEhISEhIOEg8GDg4OEgYSEhISAgUDEhIJEgESEgQACwJAIARBwQBrDgcOEgsSDg4OAAsgBEHTAEYNCQwRCyAGKQNAIRRBhwgMBQtBACEEAkACQAJAAkACQAJAAkAgEkH/AXEOCAABAgMEFwUGFwsgBigCQCAONgIADBYLIAYoAkAgDjYCAAwVCyAGKAJAIA6sNwMADBQLIAYoAkAgDjsBAAwTCyAGKAJAIA46AAAMEgsgBigCQCAONgIADBELIAYoAkAgDqw3AwAMEAsgCUEIIAlBCEsbIQkgBUEIciEFQfgAIQQLIBAhByAEQSBxIQsgBikDQCIUUEUEQANAIAdBAWsiByAUp0EPcUGAEGotAAAgC3I6AAAgFEIPViENIBRCBIghFCANDQALCyAFQQhxRSAGKQNAUHINAyAEQQR2QYcIaiEPQQIhDAwDCyAQIQQgBikDQCIUUEUEQANAIARBAWsiBCAUp0EHcUEwcjoAACAUQgdWIQcgFEIDiCEUIAcNAAsLIAQhByAFQQhxRQ0CIAkgECAHayIEQQFqIAQgCUgbIQkMAgsgBikDQCIUQn9XBEAgBkIAIBR9IhQ3A0BBASEMQYcIDAELIAVBgBBxBEBBASEMQYgIDAELQYkIQYcIIAVBAXEiDBsLIQ8gECEEAkAgFEKAgICAEFQEQCAUIRUMAQsDQCAEQQFrIgQgFCAUQgqAIhVCCn59p0EwcjoAACAUQv////+fAVYhByAVIRQgBw0ACwsgFaciBwRAA0AgBEEBayIEIAcgB0EKbiILQQpsa0EwcjoAACAHQQlLIQ0gCyEHIA0NAAsLIAQhBwsgBUH//3txIAUgCUF/ShshBSAGKQNAIhRCAFIgCXJFBEBBACEJIBAhBwwKCyAJIBRQIBAgB2tqIgQgBCAJSBshCQwJCwJ/IAkiBEEARyEIAkACQAJAIAYoAkAiBUGhCCAFGyIHIgVBA3FFIARFcg0AA0AgBS0AAEUNAiAEQQFrIgRBAEchCCAFQQFqIgVBA3FFDQEgBA0ACwsgCEUNAQsCQCAFLQAARSAEQQRJcg0AA0AgBSgCACIIQX9zIAhBgYKECGtxQYCBgoR4cQ0BIAVBBGohBSAEQQRrIgRBA0sNAAsLIARFDQADQCAFIAUtAABFDQIaIAVBAWohBSAEQQFrIgQNAAsLQQALIgQgByAJaiAEGyEIIAshBSAEIAdrIAkgBBshCQwICyAJBEAgBigCQAwCC0EAIQQgAEEgIApBACAFEAcMAgsgBkEANgIMIAYgBikDQD4CCCAGIAZBCGo2AkBBfyEJIAZBCGoLIQhBACEEAkADQCAIKAIAIgdFDQEgBkEEaiAHEBMiB0EASCILIAcgCSAEa0tyRQRAIAhBBGohCCAJIAQgB2oiBEsNAQwCCwtBfyEMIAsNBQsgAEEgIAogBCAFEAcgBEUEQEEAIQQMAQtBACEIIAYoAkAhDQNAIA0oAgAiB0UNASAGQQRqIAcQEyIHIAhqIgggBEoNASAAIAZBBGogBxAIIA1BBGohDSAEIAhLDQALCyAAQSAgCiAEIAVBgMAAcxAHIAogBCAEIApIGyEEDAULIAAgBisDQCAKIAkgBSAEQQARCgAhBAwECyAGIAYpA0A8ADdBASEJIBMhByALIQUMAgtBfyEMCyAGQdAAaiQAIAwPCyAAQSAgDCAIIAdrIgsgCSAJIAtIGyIJaiIIIAogCCAKShsiBCAIIAUQByAAIA8gDBAIIABBMCAEIAggBUGAgARzEAcgAEEwIAkgC0EAEAcgACAHIAsQCCAAQSAgBCAIIAVBgMAAcxAHDAALAAuSBQEFfwJAIAEgAigCECIDBH8gAwVBACEDIAIQFA0BIAIoAhALIAIoAhQiBWtLBEAgAiAAIAEgAigCJBEAAA8LAn8gAiwAS0F/SgRAIAEhAwNAIAEgAyIERQ0CGiAAIARBAWsiA2otAABBCkcNAAsgAiAAIAQgAigCJBEAACIDIARJDQIgACAEaiEAIAIoAhQhBSABIARrDAELIAELIQYgBSEDAkAgBiIEQYAETwRAIAMgACAEEAIaDAELIAMgBGohBQJAIAAgA3NBA3FFBEACQCADQQNxRSAEQQFIcg0AA0AgAyAALQAAOgAAIABBAWohACADQQFqIgNBA3FFDQEgAyAFSQ0ACwsCQCAFQXxxIgRBwABJDQAgAyAEQUBqIgdLDQADQCADIAAoAgA2AgAgAyAAKAIENgIEIAMgACgCCDYCCCADIAAoAgw2AgwgAyAAKAIQNgIQIAMgACgCFDYCFCADIAAoAhg2AhggAyAAKAIcNgIcIAMgACgCIDYCICADIAAoAiQ2AiQgAyAAKAIoNgIoIAMgACgCLDYCLCADIAAoAjA2AjAgAyAAKAI0NgI0IAMgACgCODYCOCADIAAoAjw2AjwgAEFAayEAIANBQGsiAyAHTQ0ACwsgAyAETw0BA0AgAyAAKAIANgIAIABBBGohACADQQRqIgMgBEkNAAsMAQsgBUEESQ0AIAMgBUEEayIESw0AA0AgAyAALQAAOgAAIAMgAC0AAToAASADIAAtAAI6AAIgAyAALQADOgADIABBBGohACADQQRqIgMgBE0NAAsLIAMgBUkEQANAIAMgAC0AADoAACAAQQFqIQAgA0EBaiIDIAVHDQALCwsgAiACKAIUIAZqNgIUIAEhAwsgAwuAAQECfyMAQRBrIgIkACACIAE6AA8CQAJAIAAoAhAiAwR/IAMFIAAQFA0CIAAoAhALIAAoAhQiA00NACAALABLIAFB/wFxRg0AIAAgA0EBajYCFCADIAE6AAAMAQsgACACQQ9qQQEgACgCJBEAAEEBRw0AIAItAA8aCyACQRBqJAAL8AICAn8BfgJAIAJFDQAgACACaiIDQQFrIAE6AAAgACABOgAAIAJBA0kNACADQQJrIAE6AAAgACABOgABIANBA2sgAToAACAAIAE6AAIgAkEHSQ0AIANBBGsgAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgA2AgAgAyACIARrQXxxIgJqIgFBBGsgADYCACACQQlJDQAgAyAANgIIIAMgADYCBCABQQhrIAA2AgAgAUEMayAANgIAIAJBGUkNACADIAA2AhggAyAANgIUIAMgADYCECADIAA2AgwgAUEQayAANgIAIAFBFGsgADYCACABQRhrIAA2AgAgAUEcayAANgIAIAIgA0EEcUEYciIBayICQSBJDQAgAK1CgYCAgBB+IQUgASADaiEBA0AgASAFNwMYIAEgBTcDECABIAU3AwggASAFNwMAIAFBIGohASACQSBrIgJBH0sNAAsLCwMAAQuPAQECfwJAQagIKAIAIgEoAkxBAEgEQAJAIAEsAEsgAEH/AXFGDQAgASgCFCICIAEoAhBPDQAgASACQQFqNgIUIAIgADoAAAwCCyABIAAQDAwBCwJAAkAgASwASyAAQf8BcUYNACABKAIUIgIgASgCEE8NACABIAJBAWo2AhQgAiAAOgAADAELIAEgABAMCwsLEAAgAEIANwIAIABCADcCCAtQAQN/AkAgACgCACwAABAJRQRADAELA0AgACgCACICLAAAIQMgACACQQFqNgIAIAEgA2pBMGshASACLAABEAlFDQEgAUEKbCEBDAALAAsgAQu7AgACQCABQRRLDQACQAJAAkACQAJAAkACQAJAAkACQCABQQlrDgoAAQIDBAUGBwgJCgsgAiACKAIAIgFBBGo2AgAgACABKAIANgIADwsgAiACKAIAIgFBBGo2AgAgACABNAIANwMADwsgAiACKAIAIgFBBGo2AgAgACABNQIANwMADwsgAiAC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/wH/Af8B/wH/Af8B/wH//////wr/IAD//wP/Af8E/x4AAAEF//////9jAAAIYwDoAwIAAAD//////wAAAAH/Af//////////////AEGpCQsBBABBtgkLRAH/Af//////AAEgAAQAgAAACP//Af8B/////////wH/Bv8H/wj/Cf//////vAK8AgEA//8BAAEA//8AAP//////////AEGKCgsBFABBqgoLHv//AQAK////////////Af8B/wAAAAAAAAH/Af8B/wBB2goLSAH/AAAAAAAAAf8B/wEAAAABAAAAAf//////AAAAAAH///8AAAAA/////////////ygACv//////AQAK/////wD//////////wBBhgwLHAH/Af///wEACv////////////////8K//////8AQbAMC0ERAAoAERERAAAAAAUAAAAAAAAJAAAAAAsAAAAAAAAAABEADwoREREDCgcAAQAJCwsAAAkGCwAACwAGEQAAABEREQBBgQ0LIQsAAAAAAAAAABEACgoREREACgAAAgAJCwAAAAkACwAACwBBuw0LAQwAQccNCxUMAAAAAAwAAAAACQwAAAAAAAwAAAwAQfUNCwEOAEGBDgsVDQAAAAQNAAAAAAkOAAAAAAAOAAAOAEGvDgsBEABBuw4LHg8AAAAADwAAAAAJEAAAAAAAEAAAEAAAEgAAABISEgBB8g4LDhIAAAASEhIAAAAAAAAJAEGjDwsBCwBBrw8LFQoAAAAACgAAAAAJCwAAAAAACwAACwBB3Q8LAQwAQekPCycMAAAAAAwAAAAACQwAAAAAAAwAAAwAADAxMjM0NTY3ODlBQkNERUYAQZAQC0lpaW7pVbYrc81ivah1/HPWGydVZHPphdRizVEZeppGx2AJVJ6sZHTyBsTuCET2g4lleHBhbmQgMzItYnl0ZSBrAAABAAAAAAAFAEHkEAsBAQBB/BALDgIAAAADAAAAWA0AAAAEAEGUEQsBAQBBoxELBQr/////AEGUEwsCgBE=";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}else{throw"both async and sync fetching of the wasm failed"}}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch==="function"&&!isFileURI(wasmBinaryFile)){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary(wasmBinaryFile)})}else{if(readAsync){return new Promise(function(resolve,reject){readAsync(wasmBinaryFile,function(response){resolve(new Uint8Array(response))},reject)})}}}return Promise.resolve().then(function(){return getBinary(wasmBinaryFile)})}function createWasm(){var info={"a":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["f"];updateGlobalBufferAndViews(wasmMemory.buffer);wasmTable=Module["asm"]["i"];addOnInit(Module["asm"]["g"]);removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){var result=WebAssembly.instantiate(binary,info);return result}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming==="function"&&!isDataURI(wasmBinaryFile)&&!isFileURI(wasmBinaryFile)&&typeof fetch==="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiationResult,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(receiveInstantiationResult)})})}else{return instantiateArrayBuffer(receiveInstantiationResult)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync();return{}}var ASM_CONSTS={2508:function(){return Module.getRandomValue()},2544:function(){if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback(Module);continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){wasmTable.get(func)()}else{wasmTable.get(func)(callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}var runtimeKeepaliveCounter=0;function keepRuntimeAlive(){return noExitRuntime||runtimeKeepaliveCounter>0}function _abort(){abort()}var readAsmConstArgsArray=[];function readAsmConstArgs(sigPtr,buf){readAsmConstArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){var double=ch<105;if(double&&buf&1)buf++;readAsmConstArgsArray.push(double?HEAPF64[buf++>>1]:HEAP32[buf]);++buf}return readAsmConstArgsArray}function _emscripten_asm_const_int(code,sigPtr,argbuf){var args=readAsmConstArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}function _emscripten_get_heap_max(){return 2147483648}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}var SYSCALLS={mappings:{},buffers:[null,[],[]],printChar:function(stream,curr){var buffer=SYSCALLS.buffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}},varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret},get64:function(low,high){return low}};function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];for(var j=0;j<len;j++){SYSCALLS.printChar(fd,HEAPU8[ptr+j])}num+=len}HEAP32[pnum>>2]=num;return 0}var ASSERTIONS=false;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){if(ASSERTIONS){assert(false,"Character code "+chr+" ("+String.fromCharCode(chr)+")  at offset "+i+" not in 0x00-0xFF.")}chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}var decodeBase64=typeof atob==="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE==="boolean"&&ENVIRONMENT_IS_NODE){var buf;try{buf=Buffer.from(s,"base64")}catch(_){buf=new Buffer(s,"base64")}return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var asmLibraryArg={"e":_abort,"b":_emscripten_asm_const_int,"d":_emscripten_get_heap_max,"c":_emscripten_memcpy_big,"a":_fd_write};var asm=createWasm();var ___wasm_call_ctors=Module["___wasm_call_ctors"]=function(){return(___wasm_call_ctors=Module["___wasm_call_ctors"]=Module["asm"]["g"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["h"]).apply(null,arguments)};var calledRun;function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}var calledMain=false;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(args){var entryFunction=Module["_main"];var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exit(ret,true)}catch(e){if(e instanceof ExitStatus){return}else if(e=="unwind"){return}else{var toLog=e;if(e&&typeof e==="object"&&e.stack){toLog=[e,e.stack]}err("exception thrown: "+toLog);quit_(1,e)}}finally{calledMain=true}}function run(args){args=args||arguments_;if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain(args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}Module["run"]=run;function exit(status,implicit){EXITSTATUS=status;if(implicit&&keepRuntimeAlive()&&status===0){return}if(keepRuntimeAlive()){}else{exitRuntime();if(Module["onExit"])Module["onExit"](status);ABORT=true}quit_(status,new ExitStatus(status))}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
