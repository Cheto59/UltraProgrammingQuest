import { jsPython } from "/node_modules/jspython-interpreter/dist/jspython-interpreter.esm.js";

class Problem {

    constructor(name,description){
        this.name = name
        this.description = description
    }

}

function loadProblem(problem){
    console.log(problem)
    var option = document.createElement('option')
    option.value = problem
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
    const console = document.getElementById("console")
    const script = monaco.editor.getModels()[0].getValue()
    const interpreter = jsPython()
    interpreter.evaluate(script).then(
        res => {console.value = res},
        err => {console.value = err})
    localStorage.setItem("lastScript",script)
}

function onAddProblem(){
    const name = document.getElementById("nameInput").value
    if(problems.find(problem => problem.name == name) == null){
        const description = document.getElementById("descriptionTextArea").value
        const problem = new Problem(name,description)
        problems.push(problem)
        // localStorage.setItem("problems",problems)
        loadProblem(problem)    
    }else alert("Ya existe un problema con el mismo nombre")
}


document.getElementById("runButton").addEventListener('click', onRun)
document.getElementById("addProblemButton").addEventListener('click',onAddProblem) 