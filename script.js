let questions=[]
let index=0

fetch("nisp.docx")
.then(res=>res.arrayBuffer())
.then(buffer=>{

mammoth.extractRawText({arrayBuffer:buffer})
.then(result=>{

parseQuestions(result.value)

show()

})

})

function parseQuestions(text){

let blocks=text.split(/\n\d+\n/)

blocks.forEach(b=>{

if(!b.includes("正确答案是")) return

let title=b.split("A、")[0].trim()

let A=b.match(/A、(.*)/)
let B=b.match(/B、(.*)/)
let C=b.match(/C、(.*)/)
let D=b.match(/D、(.*)/)

let ans=b.match(/正确答案是：([A-D])/)

if(!ans) return

questions.push({

question:title,

A:A?A[1]:"",
B:B?B[1]:"",
C:C?C[1]:"",
D:D?D[1]:"",

answer:ans[1]

})

})

}

function show(){

let q=questions[index]

let html=`

<h3>${index+1}. ${q.question}</h3>

<div class="option" onclick="check('A',this)">A、${q.A}</div>
<div class="option" onclick="check('B',this)">B、${q.B}</div>
<div class="option" onclick="check('C',this)">C、${q.C}</div>
<div class="option" onclick="check('D',this)">D、${q.D}</div>

`

document.getElementById("quiz").innerHTML=html

}

function check(ans,el){

let q=questions[index]

if(ans==q.answer){

el.classList.add("correct")

}else{

el.classList.add("wrong")

}

}

function next(){

index++

if(index>=questions.length){

alert("做完了")

return

}

show()

}
