class Problem {

    constructor(name,description,testCasesFile){
        this.name = name
        this.description = description
        this.testCases = this.setTestCases(testCasesFile)
    }

    //Aquí va la logica de lectura del archivo de texto plano
    //para convertir en testCases 
    setTestCases(testCasesFile){
        const fileReader = new FileReader()
        var testCases = []
        fileReader.addEventListener("load", (event) => {
            const text = event.target.result
            var testCasesTemp = text.split(" ")
            for(let i = 0; i<testCasesTemp.length;i+=2){
                let set = new Set()
                set.add(testCasesTemp[i])
                set.add(testCasesTemp[i+1]) 
                testCases.push(set)
            }
        })
        fileReader.readAsText(testCasesFile)
        return testCases
    }
}

function loadProblem(problem){
    var option = document.createElement('option')
    option.value = problem.description
    option.innerHTML = problem.name
    document.getElementById("problemSelect").appendChild(option)
}

var problems = []

require.config({ paths: { vs: '../node_modules/monaco-editor/min/vs' } });
require(['vs/editor/editor.main'], function () {
    var editor = monaco.editor.create(document.getElementById('codeEditor'), {
    value: [localStorage.getItem("lastScript")].join('\n'),
    language: 'python',
    theme: "vs-dark",
  });
});

// var localProblems = localStorage.getItem("problems")
// if( localProblems != null) problems = localProblems
// problems.forEach(problem => loadProblem(problem))
    

// function onRun(){
//     const console = document.getElementById("console")
//     const script = monaco.editor.getModels()[0].getValue()
//     const interpreter = jsPython()
//     interpreter.evaluate(script).then(
//         res => {console.value = res},
//         err => {console.value = err})
//     localStorage.setItem("lastScript",script)
// }

function onAddProblem(){
    const name = document.getElementById("nameInput").value
    const testCasesFile = document.getElementById("testCasesSelector").files[0]
    if( testCasesFile != null && testCasesFile.type == "text/plain"){
        if(problems.find(problem => problem.name == name) == null){
            const description = document.getElementById("descriptionTextArea").value
            const problem = new Problem(name,description,testCasesFile)
            console.log(problem)
            problems.push(problem)
            // localStorage.setItem("problems",problems)
            loadProblem(problem)
            alert("El problema fue credo correctamente")    
        }else alert("Ya existe un problema con el mismo nombre")
    }else alert("No has seleccionado un archivo o el tipo de archivo no es el indicado para los casos de prueba")     
}

// output functions are configurable.  This one just appends some text
// to a pre element.
function outf(text) { 
    var console = document.getElementById("console"); 
    console.value+= text; 
} 
function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

// Here's everything you need to run a python program in skulpt
// grab the code from your textarea
// get a reference to your pre element for output
// configure the output function
// call Sk.importMainWithBody()
function runit() { 
   var prog = monaco.editor.getModels()[0].getValue()
   const console = document.getElementById("console")
   if(console.value.trim() !== "") console.value+= "\n----------------------------------\n\n"  
   Sk.pre = "output";
   Sk.configure({output:outf, read:builtinRead}); 
   (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
   var myPromise = Sk.misceval.asyncToPromise(function() {
       return Sk.importMainWithBody("<stdin>", false, prog, true);
   });
   myPromise.then(function(mod) {
       console.log('success');
   },
       function(err) {
       console.log(err.toString());
   });
}

document.getElementById("runButton").addEventListener('click', runit)
document.getElementById("addProblemButton").addEventListener('click',onAddProblem)
document.getElementById("problemSelect").addEventListener('change', (event)=>{document.getElementById("problemTextArea").value = event.target.value})