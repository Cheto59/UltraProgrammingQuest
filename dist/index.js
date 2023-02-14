
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
    

function onRun(){
    console.log(console.log.bind(console))
}

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

document.getElementById("runButton").addEventListener('click', onRun)
document.getElementById("addProblemButton").addEventListener('click',onAddProblem)
document.getElementById("problemSelect").addEventListener('change', (event)=>{document.getElementById("problemTextArea").value = event.target.value})