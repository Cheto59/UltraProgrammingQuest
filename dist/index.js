import { jsPython } from "/node_modules/jspython-interpreter/dist/jspython-interpreter.esm.js";

function onRun(){
    var codeEditor = document.getElementById("codeEditor")
    var script = codeEditor.value
    const interpreter = jsPython()
    interpreter.evaluate(script)
}

var runButton = document.getElementById("runButton")
runButton.addEventListener('click', onRun)
