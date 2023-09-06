document.onreadystatechange = () => {
     if (document.readyState === "complete") {
        menu=document.querySelector('#menu');
        menu.classList.remove('invisible');
      
     }
  };