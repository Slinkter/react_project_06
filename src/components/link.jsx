import { useEffect, useRef, useState } from "react";

export default function Link({ docId, , url, onDelete, onUpdate }) {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentUrl, setCurrentUrl] = useState(url);
  const [editTitle, setEditTitle] = useState(false);
  const [editUrl, setEditUrl] = useState(false);


  const titleRef = useRef(null)
  const urlRef = useRef(null)


  useEffect(()=>{

    if(titleRef.current){
        titleRef.current.focus()
    }


  },[editTitle])


  useEffect(()=>{

    if(urlRef.current){
        urlRef.current.focus()
    }
    

  },[editUrl])





  function handlEditTitle() {
    setEditTitle(true);
  }

  function handlEditUrl() {
    setEditUrl(true);
  }
  function handleChangeTitle(e) {
   setCurrentTitle(e.target.value)
  }

  function handlChangeUrl(e) {
    setCurrentUrl(e.target.value)
   }

   function handleBlurTitle(e) {
    setCurrentUrl(e.target.value)
   }

   function handleBlurUrl(e) {
    setCurrentUrl(e.target.value)
   }

  return (
    <div key={docId}>

    <div>
    <div>{editTitle ?  <input ref={titleRef} value={currentTitle} onChange={handleChangeTitle} onBlur={handleBlurTitle} />  : (<div> <button onClick={handlEditTitle} >Edit </button> {title}  </div> )}</div>
  </div>
  <div>
    <div>
    { editUrl ? <input ref={urlRef} value={currentUrl} onChange={handlChangeUrl} onBlur={handleBlurUrl} /> : <div>   <button onClick={handlEditUrl}> Edit</button> {url} </div>}
    </div>
  </div>
  <div>
    
    <button>Detele </button>
  </div>
     
    </div>
  );
}
