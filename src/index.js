
document.addEventListener("DOMContentLoaded", function(){

   const paintingUL = document.getElementById("paintings-ul") 
   const svg = document.getElementById("canvas-box")
   const smallBox = document.getElementById("small-box")
   let selected = "Square"
   let buttonGroup = document.getElementById("button-group")
   let color = "blue"
   const slider = document.getElementById("myRange");
   let size = document.getElementById("size-of-shape")
   let currentSize = 50
   let selectedShape = ""

   
   
   //properties panel variables
   let panelShape = document.getElementById("shape-selected")
   let panelWidth = document.getElementById("shape-width")
   let panelHeight = document.getElementById("shape-height")
   let panelColor = document.getElementById("shape-color")
   
   //handle which button is selected
   buttonGroup.addEventListener("click", function(e){
       console.log(buttonGroup)
       let buttonArray = Array.from(buttonGroup.children)
       console.log(buttonArray)
       console.log(e.target.classList.contains("button-selected"))
   
       if (e.target.classList.contains("button-selected")) {
           console.log("test")
       } else {
           console.log(buttonArray)
           buttonArray.forEach(button1 => {
               console.log(button1)
               button1.classList.remove("button-selected")
           })
       }
   
   })
   
   slider.addEventListener("change", function(e){
       if (selectedShape){
           console.log(selectedShape)
           size.innerText = slider.value
           currentSize = slider.value
           if (selectedShape.tagName === "rect"){
               selectedShape.setAttribute("width", currentSize);
               selectedShape.setAttribute("height", currentSize);
           } else if(selectedShape.tagName === "circle") {
   
               selectedShape.setAttribute("r", currentSize);
           }
           
           // selectedShape.setAttribute("width", currentSize);
       } else {
           size.innerText = slider.value
           currentSize = slider.value
       }
   })
   
   buttonGroup.addEventListener("click", function(e){
   
       switch (e.target.innerText) {
           case "Select":
               selected = "Select"
               break;
           case "Circle":
               selected = "Circle"
               break;
           case "Square":
               selected = "Square"
               break;
           case "Custom Circle":
               selected = "Triangle"
               break;
           case "Custom Square":
               selected = "Custom Square"
               break;
           case "Custom Path":
               selected = "Custom Path"
               console.log(selected)
               break;
           default:
           // code block
       }
   
   
   })
   
   
   // on drag event
   let firstClick = {}
   let lastClick = {}
   let pathBuilder = []
   svg.addEventListener("mousedown", function(e){
       let rect = svg.getBoundingClientRect();
       let x = event.clientX - rect.left - currentSize;
       let y = event.clientY - rect.top - currentSize;
   
       if(selected === "Triangle" || selected === "Custom Square"){
       firstClick = {
           x: x,
           y: y
       }
   }
       console.log(selected)
       if(selected === "Custom Path"){
           let x = event.clientX - rect.left
           let y = event.clientY - rect.top
   
           pathBuilder.push([x,y])
           console.log(pathBuilder)
   
           if (pathBuilder.length > 1){
   
               buildPath(pathBuilder)
           }
           //build path on the second click. 
   
   
   
   
       }
   })
   
   
   svg.addEventListener("drag", function (e) {
       console.log(e)
   })
   svg.addEventListener("mouseup", function (e) {
       
       if (selected === "Triangle" || selected === "Custom Square") {
       let rect = svg.getBoundingClientRect();
       let x = event.clientX - rect.left - currentSize;
       let y = event.clientY - rect.top - currentSize;
       lastClick = {
           x: x,
           y: y
       }
       
       let a = Math.abs(firstClick.x - lastClick.x);
       let b = Math.abs(firstClick.y - lastClick.y);
   
       let c = Math.sqrt(a * a + b * b);
   
           if (selected === "Triangle" ) {
               createCustomCircle(e, c)
           } else if (selected === "Custom Square") {
               createCustomSquare(e, c)
           }
   }
   })
   
   
   svg.addEventListener("click", function(e){
       
       switch (selected) {
           case "Select":
               selectShape(e)
               break;
           case "Circle":
               createCircle(e)
               updateLayers()
               break;
           case "Square":
               createSquare(e)
               updateLayers()
               break;
           case "Triangle":
               //seperate events
               updateLayers()
               break;
           case "Custom Square":
               //seperate events
               updateLayers()
               break;
           case "Custom Path":
               //seperate events
               
               break;
           default:
           // code block
       }
   
   })
   
   // while on the selector
   // on hover change the color of the shape to blue
   // then when select that item show it in the properties panel
   
   svg.addEventListener("mouseover", function(e){
       if (selected === "Select" && selectedShape === ""){
           e.target.setAttribute("fill", "blue");
   
       }
   })
       svg.addEventListener("mouseout", function (e) {
           if (selected === "Select" && selectedShape === "") {
               e.target.setAttribute("fill", e.target.dataset.color);
           }
       })
   
   
   function createCircle(e){
       
   
       //get mouse position
       let rect = svg.getBoundingClientRect();
       let x = event.clientX - rect.left - currentSize;
       let y = event.clientY - rect.top - currentSize;
   
   
       // create the svg element
       const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
   
       // set width and height
       svg1.setAttribute("x", x);
       svg1.setAttribute("y", y);
   
       // create a circle
       const cir1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
       cir1.setAttribute("cx", currentSize);
       cir1.setAttribute("cy", currentSize);
       cir1.setAttribute("r", currentSize);
       cir1.setAttribute("fill", "red");
       cir1.dataset["color"] = "rgb(255, 0, 0)"
   
       // attach it to the container
       svg1.appendChild(cir1);
   
       // attach container to document
       svg.appendChild(svg1);
   }
   
   
       function createSquare(e) {
   
           console.log("worked")
           //get mouse position
           let rect = svg.getBoundingClientRect();
           let x = event.clientX - rect.left - (currentSize * 1.5);
           let y = event.clientY - rect.top - (currentSize* 1.5);
   
   
           // create the svg element
           const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
   
           // set width and height
           svg1.setAttribute("x", x);
           svg1.setAttribute("y", y);
   
           // create a circle
           const cir1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
           cir1.setAttribute("x", currentSize);
           cir1.setAttribute("y", currentSize);
           cir1.setAttribute("width", currentSize);
           cir1.setAttribute("height", currentSize);
           cir1.setAttribute("fill", "red");
           cir1.dataset["color"] = "rgb(255, 0, 0)"
   
           // attach it to the container
           svg1.appendChild(cir1);
   
           // attach container to document
           svg.appendChild(svg1);
       }
   
   
       function createCustomSquare(e, c) {
   
           console.log("worked")
           //get mouse position
           let rect = svg.getBoundingClientRect();
           let x = event.clientX - rect.left - (c * 1.5);
           let y = event.clientY - rect.top - (c * 1.5);
   
   
           // create the svg element
           const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
   
           // set width and height
           svg1.setAttribute("x", x);
           svg1.setAttribute("y", y);
   
           // create a circle
           const cir1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
           cir1.setAttribute("x", c);
           cir1.setAttribute("y", c);
           cir1.setAttribute("width", c);
           cir1.setAttribute("height", c);
           cir1.setAttribute("fill", "red");
           cir1.dataset["color"] = "rgb(255, 0, 0)"
   
           // attach it to the container
           svg1.appendChild(cir1);
   
           // attach container to document
           svg.appendChild(svg1);
       }
   
   
       function createCustomCircle(e, c) {
   
           //get mouse position
           let rect = svg.getBoundingClientRect();
           let x = event.clientX - rect.left - c;
           let y = event.clientY - rect.top - c;
   
   
           // create the svg element
           const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
   
           // set width and height
           svg1.setAttribute("x", x);
           svg1.setAttribute("y", y);
   
           // create a circle
           const cir1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
           cir1.setAttribute("cx", c);
           cir1.setAttribute("cy", c);
           cir1.setAttribute("r", c);
           cir1.setAttribute("fill", "red");
           cir1.dataset["color"] = "rgb(255, 0, 0)"
           
   
   
           // attach it to the container
           svg1.appendChild(cir1);
   
           // attach container to document
           svg.appendChild(svg1);
       }
   
       function selectShape(e){
           
           console.log(e.target.tagName)
           if (e.target.tagName === "svg"){
               // need this to change back to the dataset color
               selectedShape.setAttribute("fill", selectedShape.dataset.color)
   
               selectedShape = ""
               panelShape.innerText = ""
               panelWidth.innerText = ""
               panelHeight.innerText = ""
               panelColor.innerText = ""
           } else if (selectedShape === ""){
               e.target.setAttribute("fill", "green")
               selectedShape = e.target
               console.dir(e.target)
               if(e.target.tagName === "circle"){
                   panelShape.innerText = e.target.tagName
                   panelWidth.innerText = e.target.cx.baseVal.value
                   panelHeight.innerText = e.target.cy.baseVal.value
                   panelColor.innerText = e.target.dataset.color
               } else if (e.target.tagName === "rect") {
                   panelShape.innerText = e.target.tagName
                   panelWidth.innerText = e.target.x.baseVal.value
                   panelHeight.innerText = e.target.y.baseVal.value
                   panelColor.innerText = e.target.dataset.color
               }
   
           }
       } 
   
       function selectShapeWithObject(obj) {
           obj = obj.children[0]
           console.log(obj.tagName)
           if (obj.tagName === "svg") {
               selectedShape.setAttribute("fill", "red")
               clearSelected()
           } else if (selectedShape === "") {
               obj.setAttribute("fill", "green")
               selectedShape = obj
               //console.dir(obj)
               if(obj.tagName === "circle"){
                   panelShape.innerText = obj.tagName
                   panelWidth.innerText = obj.cx.baseVal.value
                   panelHeight.innerText = obj.cy.baseVal.value
                   //panelColor.innerText = obj.attributes.fill.value
                   //console.dir(obj)
                   //console.dir(obj.dataset)
                   console.log(obj.dataset)
               } else if (obj.tagName === "rect"){
                   panelShape.innerText = obj.tagName
                   panelWidth.innerText = obj.x.baseVal.value
                   panelHeight.innerText = obj.y.baseVal.value
                   //panelColor.innerText = obj.attributes.fill.value
                   panelColor.innerText = obj.dataset.color
               }
   
           }
       } 
   
       const ul = document.getElementById("layers-list")
       function updateLayers(){
           let layers = Array.from(svg.children)
           ul.innerHTML = ""
           let i = 0;
           if (layers){
           layers.forEach(layer => {
               let newLi = document.createElement("li")
               layer.dataset["id"] = i
               newLi.innerText = layer.children[0].tagName
               newLi.dataset["id"] = i
               i++;
               ul.append(newLi)
           })
       }
       }
   
       ul.addEventListener("click", function(e){
           //selectShape(e.target) but need the shape that corresponds
           console.log(e.target.dataset.id)
           let svgs = Array.from(svg.children)
           svgs.forEach(svg => {
               if(svg.dataset.id == e.target.dataset.id){
                   selectShapeWithObject(svg)
               }
           })
       })
   
       function deselect(){
          let svgs =  Array.from(svg.children)
           svgs.forEach(svg => {
               
                   svg.children[0].setAttribute("fill", "red")
           })
           selectedShape = ""
       }
       
       const button = document.getElementsByTagName("BUTTON")[5]
       button.addEventListener("click", function(e){
           removeShape()
           clearSelected()
           updateLayers()
           
       })
   
       function removeShape(){
           selectedShape.remove()
       }

   
       function clearSelected(){
           selectedShape = ""
           panelShape.innerText = ""
           panelWidth.innerText = ""
           panelHeight.innerText = ""
           panelColor.innerText = ""
       }
       //change color function that takes two arguments, current object and new color.
   
   
   
       function buildPath(array){
           
           //initial M
           let M = `M ${array[0][0]} ${array[0][1]}`
   
           //final Z
           let Z = `Z`
           let newArray = array.map(x=>x)
           newArray.shift()
           let finalString = `${M}`
           console.log(newArray)
           newArray.forEach(n => {
               finalString = finalString + ` L ${n[0]} ${n[1]} `
               
           })
           //append Z to end
           finalString = finalString + `Z`
   
           //render shape here
           console.log(finalString)
   
           // create the svg element
           const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
   
           // set width and height
           svg1.setAttribute("x", 0);
           svg1.setAttribute("y", 0);
   
           // create a circle
           const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
           path1.setAttribute("d", finalString);
           path1.setAttribute("fill", "red");
           path1.setAttribute("stroke", "black");
           path1.dataset["color"] = "rgb(255, 0, 0)"
   
           // attach it to the container
           svg1.appendChild(path1);
   
           // attach container to document
           svg.appendChild(svg1);
           
       }
   
       let colorInput = document.getElementById("color-form")
       let colorR = document.getElementById("r")
       let colorG = document.getElementById("g")
       let colorB = document.getElementById("b")
       let colorBox = document.getElementById("color-box")
       let sliderR = document.getElementById("slider-r")
       let sliderG = document.getElementById("slider-g")
       let sliderB = document.getElementById("slider-b")
       //let sliders = document.getElementsByClassName("sliders")
   
       colorInput.addEventListener("change", function(e){
           
           if (e.target.className === "sliders"){
               colorR.value = sliderR.value
               colorG.value = sliderG.value
               colorB.value = sliderB.value
           }
   
           let newrgb = `rgb(${colorR.value}, ${colorG.value}, ${colorB.value})`
           if (selectedShape){
           selectedShape.setAttribute("fill", newrgb)
           selectedShape.dataset["color"] = newrgb
           }
           colorBox.style.backgroundColor = newrgb
           
       })

       // for the saving pictures to the DB 
       document.addEventListener("click", function(event){
           if(event.target.id === "save"){
               let name = "Add Name Field"
               let svgInner = `'${svg.innerHTML}'`
               console.log(svgInner)
               fetch("http://localhost:3000/paintings", {
                   method: 'POST',
                   headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  body: JSON.stringify({
                    name: name, 
                    svgInner: svgInner, 
                    user_id: 1
                  })
               })
           }
       })

       //render paintings in the UL function 
       function paintingRender(response){
           let innerHTMLArr = response.map(painting => {
               return `
               <h6> ${painting.name} - ${painting.user} </h6>
               <svg> ${painting.svgInner} </svg>
               `
           })
            paintingUL.innerHTML = innerHTMLArr.join("")
       }


       // fetches 
       fetch("http://localhost:3000/paintings")
           .then(response => response.json())
           .then(response => {
            console.log(response)
            paintingRender(response)
           })



   
   
   })