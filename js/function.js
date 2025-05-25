// here is created function 

// ! added time string

const getTimeString = (time) =>{
  const hour = parseInt(time / 3600);
  let reminingSecond = time % 3600;
  const minute = parseInt(reminingSecond / 60);
  reminingSecond = reminingSecond % 60;
  return` ${hour} hour ${minute} min ${reminingSecond} sec ago`;
}

// load category video by btn

const loadCategoriesVideo = (id) =>{
    // fetch the data from api
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then((res) => res.json())
  .then((data) => {
    // sob class k remove koro
    removeActiveClass();
    // sobai k add koro
    const activeBtn = document.getElementById(`${id}`);
    activeBtn.classList.add('active');
    // console.log(activeBtn);
    displayVideos(data.category)
  })
  .catch((err) => console.log(err))
}


// remove active class

const removeActiveClass = () =>{
  const buttons = document.getElementsByClassName('category-btn');
  for(let btn of buttons){
    btn.classList.remove('active');
  }
}

// load details

const loadDetails = async (videoId) =>{
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/aaac`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.video);
}

const displayDetails = (video) =>{
  const detailContainer = document.getElementById('modal-content');
  detailContainer.innerHTML = `
    <img src=${video.thumbnail} />
    <p>${video.description}</p>
  `;
  // way-1
  document.getElementById('showModalData').click();
  // way-2
  // document.getElementById('customModal').showModal();
}

// search evenet

document.getElementById("search-input").addEventListener("keyup",(e)=>{
  loadVideos(e.target.value);
})