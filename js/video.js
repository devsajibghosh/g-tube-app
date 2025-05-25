// here is created api load and show data display

// ! load and show categories

// load categories
const loadCategories = () => {
  // fetch the data from api
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
  .then((res) => res.json())
  .then((data) => loadDisplayCategories(data.categories))
  .catch((err) => console.log(err))
}


let allVideos = []; // To store fetched videos
// Load and store videos
const loadVideos = (searchText = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
      allVideos = data.data || data.videos; // store globally
      displayVideos(allVideos); // show initially
    })
    .catch((err) => console.log(err));
};



// View parser: converts "1.1K" → 1100, "2.3M" → 2300000
function parseViews(viewStr) {
  if (!viewStr) return 0;
  viewStr = viewStr.toUpperCase();
  if (viewStr.endsWith("K")) {
    return parseFloat(viewStr) * 1000;
  } else if (viewStr.endsWith("M")) {
    return parseFloat(viewStr) * 1000000;
  }
  return parseFloat(viewStr);
}



// loadVideosIn-- display

const displayVideos = (videos) =>{
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";
  
  if(videos.length == 0){
    videoContainer.classList.remove("grid");
     videoContainer.innerHTML = `
     <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
     <img src="assets/images/Icon.png" />
     <p class="text-center text-red-500 font-bold text-lg">NO COTENT HERE</p>
     </div>
     `;
     return;
  }else{
    videoContainer.classList.add("grid");
  }


  videos.forEach(video =>{
    console.log(video);
    const card = document.createElement('div');
    card.classList = "card";
    card.innerHTML = `
    <figure class="h-[200px] relative">
    <img class="w-full h-full object-cover"
      src=${video.thumbnail} />
      ${
        video.others.posted_date?.length == 0 ? "" : `      <span class="absolute bg-black text-white right-2 bottom-2 px-2 rounded">${getTimeString(video.others.posted_date)}</span>`
      }
  </figure>
  <div class="px-0 py-2 flex gap-2">
      <div>
        <img class="w-10 h-10 object-cover rounded-full" src=${video.authors[0].profile_picture} />
      </div>
      <div>
      <h2 class="font-bold">${video.title}</h2>
      <div class="flex items-center gap-1">
      <p class="text-gray-400">${video.authors[0].profile_name}</p>
      ${
        video.authors[0].verified == true ? `        <img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"  />` : ""
      }
      </div>
      </div>
      </div>
      <div class="flex justify-between">
      <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">details</button></p>
      <p><span class="font-bold text-red-600">views:</span> ${video.others.views}</p>  
      </div>
  </div>
    `;
    videoContainer.append(card);

  });

  // sort the videos
  document.getElementById("sortByViewsBtn").addEventListener("click", () => {
  const sorted = [...allVideos].sort((a, b) => {
    const viewsA = parseViews(a.others?.views);
    const viewsB = parseViews(b.others?.views);
    return viewsB - viewsA; // Descending
  });

  displayVideos(sorted);
});

}







// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }





// load display categories btn
const loadDisplayCategories = (categories)=>{
  // category container 
  const categoryContainer = document.getElementById("category-container");

  categories.forEach( item => {
      // console.log(item);
      const buttonContainer = document.createElement("div");
      buttonContainer.innerHTML = `
        <button id="${item.category_id}" onclick="loadCategoriesVideo(${item.category_id})" class="btn category-btn">
        ${item.category}
        </button>
      `

      categoryContainer.append(buttonContainer);
  });

}



// call the funciton
loadCategories();
loadVideos();