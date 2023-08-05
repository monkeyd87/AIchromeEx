const image = document.querySelector('img')
let wiki

chrome.runtime.sendMessage({ action: "getData" }, (response) => {
    if(response){
        image.src = response.src
        wiki = response.data

    }

  });
  




const textArea = document.querySelector('textarea')

const button = document.querySelector('button')


const clickHandler = async()=>{
    const {value} =textArea
    
    if(value){
        let text = wiki
        let question = value
        try{
            const response = await fetch(`http://localhost:3030`,{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify({text,question})
            })
            const data = await response.json()
            
            alert(data.message)
        }catch(err){
            alert('error')
            console.log(err)
        }
    }
}


button.addEventListener('click',clickHandler)
