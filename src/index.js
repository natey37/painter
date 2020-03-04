   

    

document.addEventListener("DOMContentLoaded", function(){
 let selectedUser = null 
    on()
    
    function on() {
        document.getElementById("overlay").style.display = "block";
      }
      
      function off() {
        document.getElementById("overlay").style.display = "none";
      }

      
      document.addEventListener("submit", () => {
        event.preventDefault()
        console.log(loginForm)
        let name = loginForm.elements[0].value
        fetch("http://localhost:3000/users",{
            method: "POST", 
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify({
                  name: name
              })

        }).then(response => response.json())
        .then(response => {
            selectedUser = response
            off()
        })
      })

    const backgroundColor = document.getElementById("background-svg")
    backgroundColor.addEventListener("input", function(event){
        console.log(svg)
        svg.style.backgroundColor = backgroundColor.value
        console.log(svg.style.backgroundColor)
    })

    const fillElement = document.getElementById("fill-element-svg")

       fillElement.addEventListener("input", function(e){
           if(selectShape){
               selectedShape.setAttribute("fill", fillElement.value)
               selectedShape.dataset["color"] = fillElement.value
           }
       })
    
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
   const nameForm = document.getElementById("painting-name-form")
   const propertiesPannel = document.getElementsByClassName("properties-panel")
   const newPainting = document.getElementById("new-painting")
   const loginForm = document.getElementById("login")
   const canvasDiv = document.getElementById("item4")
   let paintings;
   let users; 
   let colors = ["red", "yellow", "orange", "pink", "turquoise", "cerulean", "purple", "aqua", "aquamarine", "colbalt", "blueviolet", "coral", "chartreuse", "crimson", "darkgreen", "darkmagenta", "darkslateblue", "deeppink", "forestgreen"]
   let randomColor1 = colors[Math.floor(Math.random() * colors.length)]
   let randomColor2 = colors[Math.floor(Math.random() * colors.length)]
   let randomColor3 = colors[Math.floor(Math.random() * colors.length)]
   let randomColor4 = colors[Math.floor(Math.random() * colors.length)]
   const item3 = document.getElementById("item3")
   const item5 = document.getElementById("item5")
   const item6 = document.getElementById("item6")


   
   
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
               selected = "Custom Circle"
               break;
           case "Custom Square":
               selected = "Custom Square"
               break;
           case "Custom Path":
               selected = "Custom Path"
               console.log(selected)
               break;
            case "Ellipse":
                selected = "Ellipse"
                break;
            case "Custom Triangle":
                selected = "Custom Triangle"
                break;
            case "Custom Ellipse":
                selected = "Custom Ellipse"
                break;
            case "Line":
                selected = "Line"
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
   
       if(selected === "Custom Circle" || selected === "Custom Square" || "Custom Ellipse"){
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
   

            buildPath(pathBuilder)
            
            if(pathBuilder.length > 6){
                pathBuilder.length = 0 
            }  
       }

       if (selected === "Custom Triangle"){
            let x = event.clientX - rect.left
            let y = event.clientY - rect.top
            pathBuilder.push([x,y])
            customTriangle(pathBuilder)
            
            if(pathBuilder.length > 2){
                pathBuilder.length = 0 
            }

        }

        if (selected === "Line"){
            let x = event.clientX - rect.left
            let y = event.clientY - rect.top
            pathBuilder.push([x,y])
            createLine(pathBuilder)
            
            if(pathBuilder.length > 1){
                pathBuilder.length = 0 
            }
        }
   })
   
   svg.addEventListener("drag", function (e) {
       console.log(e)
   })
   svg.addEventListener("mouseup", function (e) {
       
       if (selected === "Custom Circle" || selected === "Custom Square" || selected === "Custom Ellipse") {
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
   
           if (selected === "Custom Circle" ) {
               createCustomCircle(e, c)
           } else if (selected === "Custom Square") {
               console.log(c)
               createCustomSquare(e, c)
           } else if (selected === "Custom Ellipse"){
               createCustomEllipse(e, c)
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
           case "Custom Circle":
               //seperate events
               updateLayers()
               break;
           case "Custom Square":
               //seperate events
               updateLayers()
               break;
            case "Ellipse":
                createEllipse(e)
                break;
            case "Custom Ellipse":
                
            case "Custom Triangle":
                
            
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
       cir1.setAttribute("fill", fillElement.value);
       cir1.dataset["color"] = fillElement.value
   
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
           cir1.setAttribute("fill", fillElement.value);
           cir1.dataset["color"] = fillElement.value
   
           // attach it to the container
           svg1.appendChild(cir1);
   
           // attach container to document
           svg.appendChild(svg1);
       }
   
   
       function createCustomSquare(e, c) {
            console.log(c)
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
           cir1.setAttribute("fill", fillElement.value);
           cir1.dataset["color"] = fillElement.value
   
           // attach it to the container
           svg1.appendChild(cir1);
   
           // attach container to document
           svg.appendChild(svg1);


        
       }
       
       //create ellipse 
       function createEllipse(e) {

           console.log(e)
           //get mouse position
           let rect = svg.getBoundingClientRect();
           let x = event.clientX - rect.left - currentSize;
           let y = event.clientY - rect.top - currentSize;
           console.log(x)
           console.log(y)

            // create the svg element
            const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");

            // set width and height
           svg1.setAttribute("x", x);
           svg1.setAttribute("y", y);

             // create an ellipse
             const ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
             ellipse.setAttribute("cx", currentSize);
             ellipse.setAttribute("cy", currentSize / 2);

             ellipse.setAttribute("rx", currentSize);
             ellipse.setAttribute("ry", currentSize / 2)
             ellipse.setAttribute("fill", fillElement.value);
             ellipse.dataset["color"] = fillElement.value 


           // attach it to the container
           svg1.appendChild(ellipse);
   
           // attach container to document
           svg.appendChild(svg1);
       
       }
   
       










    //    //Custom Ellipse

       function createCustomEllipse(e, c) {

        console.log(e)
        //get mouse position
        let rect = svg.getBoundingClientRect();
        let x = event.clientX - rect.left - c;
        let y = event.clientY - rect.top - c;
        console.log(x)
        console.log(y)

         // create the svg element
         const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");

         // set width and height
        svg1.setAttribute("x", x);
        svg1.setAttribute("y", y);

          // create an ellipse
          const ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
          ellipse.setAttribute("cx", c);
          ellipse.setAttribute("cy", c / 2);

          ellipse.setAttribute("rx", c);
          ellipse.setAttribute("ry", c / 2)
          ellipse.setAttribute("fill", fillElement.value);
          ellipse.dataset["color"] = fillElement.value 


        // attach it to the container
        svg1.appendChild(ellipse);

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
           cir1.setAttribute("fill", fillElement.value);
           cir1.dataset["color"] = fillElement.value
           
   
   
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
       
       const removeButton = document.getElementById("remove")
       removeButton.addEventListener("click", function(e){
           console.log(e.target)
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
           path1.setAttribute("fill", fillElement.value);
           path1.setAttribute("stroke", "black");
           path1.dataset["color"] = "rgb(255, 0, 0)"
   
           // attach it to the container
           svg1.appendChild(path1);
   
           // attach container to document
           svg.appendChild(svg1);
           
           //clear array for next path
           
       }

       //Custrom triangle 

       function customTriangle(array){
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
        path1.setAttribute("fill", fillElement.value);
        path1.setAttribute("stroke", "black");
        path1.dataset["color"] = "rgb(255, 0, 0)"

        // attach it to the container
        svg1.appendChild(path1);

        // attach container to document
        svg.appendChild(svg1);
        
        //clear array for next path
        
    }
   
      //create line 
      function createLine(array){
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
        path1.setAttribute("fill", fillElement.value);
        path1.setAttribute("stroke", fillElement.value);
        path1.setAttribute("stroke-width", currentSize / 4)
        path1.dataset["color"] = "rgb(255, 0, 0)"

        // attach it to the container
        svg1.appendChild(path1);

        // attach container to document
        svg.appendChild(svg1);
        
        //clear array for next path
        
    }
       

    
       document.addEventListener("click", function(event){
           if(event.target.id === "save"){
               if(nameForm.children[2].value.length < 1){
                    alert("A Painting needs a name!")
               } else {
                console.log(svg)
                let svgBackgroundColor = svg.style.backgroundColor
                console.log(svg.style.backgroundColor)
                let paintingObj = 
                    {
                        name: nameForm.children[2].value,
                        svgInner: svg.innerHTML,
                        background_color: svgBackgroundColor,  
                        user_id: selectedUser.id
                    }
                fetch("http://localhost:3000/paintings", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(paintingObj)
                }).then(response => response.json())
                .then(painting => {
                    foundUser = selectedUser
                    paintingUL.innerHTML += `
                    <div id = "${painting.id}" class = "all-users-paintings">
                    <h6 id =${painting.id} class="svg-collection"> ${painting.name} - ${foundUser.name} </h6>
                    <svg id =${painting.id} style = "background-color:${painting.background_color}"> ${painting.svgInner} </svg>
                    </div>
                    `
                })
              }
           } else if(event.target.className === "svg-collection"){
            const selectedPaintingH = document.getElementById(event.target.id)
            renderPaintingRO(selectedPaintingH)
           } else if(event.target.id === "new-painting"){
            // item3.style.visibility = "visible"
            // item5.style.visibility = "visible"
            // item6.style.visibility = "visible" 
            // svg.innerHTML = ""
            location.reload()

           } else if(event.target.id === "my-paintings"){
                fetch(`http://localhost:3000/users/${selectedUser.id}`)
                .then(response => response.json())
                .then(response => {
                    let myPaintingsInnerHTML = response.map(painting => {
                        return `
                        <div class="grid-item" id="item4" data-id = ${painting.id}>
                            <h1 style="margin: 0; text-align: center;" id="name-on-my-paintings"> ${painting.name} - ${painting.created_at.split("T")[0]} </h1> 
                            <svg id="canvas-box" width="100%" height="100%" style= "background-color: ${painting.background_color}; border: solid;"> 
                                ${painting.svgInner}
                            </svg>
                            <button class="delete-button" id="${painting.id}"> Delete </button>
                        </div> 
                            `
                    })
                    canvasDiv.innerHTML = myPaintingsInnerHTML.join("")
                    removeToolBars()
                })
           } else if(event.target.className === "delete-button"){
               const allUserPaintings = Array.from(document.getElementsByClassName("all-users-paintings"))
               let foundPainting = allUserPaintings.find(painting => painting.id === event.target.id )
               console.log(foundPainting) 
               console.log("delete")
               fetch(`http://localhost:3000/paintings/${event.target.id}`, {
                   method: "DELETE"
               }).then(event.target.parentElement.remove(), foundPainting.remove())
           } else if(event.target.className === "favorite-button"){
                const allUserPaintings = Array.from(document.getElementsByClassName("all-users-paintings"))
                let foundPainting = allUserPaintings.find(painting => painting.id === event.target.id )
                let likesNum = parseInt(foundPainting.children[2].innerText.split(":")[1])
                likesNum++
               fetch("http://localhost:3000/favorites", {
                   method: "POST",
                   headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  body: JSON.stringify({
                      user_id: selectedUser.id,
                      painting_id: event.target.id
                  })
               }).then(response => response.json())
               .then(response => {
                foundPainting.children[2].innerText = `Likes: ${likesNum}`
               })
           }
       })

       //render paintings in the UL function 
       function paintingRender(response){
           let innerHTMLArr = response.map(painting => {
               let foundUser = users.find(user => user.id === painting.user_id)
               return `
               <div id = "${painting.id}" class = "all-users-paintings">
               <h6 id =${painting.id} class="svg-collection"> ${painting.name} - ${foundUser.name} </h6>
               <svg id =${painting.id} style = "background-color:${painting.background_color}"> ${painting.svgInner} </svg>
               <p> Likes: ${painting.favorites.length} </p>
               </div>
               `
           })
            paintingUL.innerHTML = innerHTMLArr.join("")
       }


       // fetches 
       fetch("http://localhost:3000/users")
       .then(response => response.json())
       .then(response => {
       console.log(response)
       users = response
       })
       fetch("http://localhost:3000/paintings")
        .then(response => response.json())
        .then(response => {
        console.log(response)
        paintings = response
        paintingRender(response)
        })
      

       
       // functions 
       function renderPaintingRO(selectedPaintingH){
            let allUserPaintings = Array.from(document.getElementsByClassName("all-users-paintings"))
            let myPainting = allUserPaintings.find(painting => painting.id == selectedPaintingH.id)
            canvasDiv.innerHTML =
                        `
                        <h1 style = "color: white"> ${myPainting.children[0].innerText} </h1>
                        <svg id="canvas-box" width="100%" height="100%" style= "background-color: ${myPainting.children[1].style.backgroundColor}"> 
                            ${myPainting.children[1].innerHTML}
                        </svg>
                        <button id= "${myPainting.id}" class= "favorite-button"> Favorite </button>
                        `

            removeToolBars()
               
       } 

       function removeToolBars(){
        item3.style.visibility = "hidden"
        item5.style.visibility = "hidden"
        item6.style.visibility = "hidden"      
       }

   }) //end of DOM content loaded