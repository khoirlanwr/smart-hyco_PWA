
// enable offline data
db.enablePersistence()
  .catch(function(err) {
    if (err.code == 'failed-precondition') {
      // probably multible tabs open at once
      console.log('persistance failed');
    } else if (err.code == 'unimplemented') {
      // lack of browser support for the feature
      console.log('persistance not available');
    }
  });


// real-time listener
db.collection('hycomate-1').orderBy("waktu", 'desc').limit(4).onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
        console.log("added");    
        renderRecipe(change.doc.data(), change.doc.id);
        renderHumidity(change.doc.data(), change.doc.id);
        renderTemperature(change.doc.data(), change.doc.id);
    }
    // if(change.type === 'removed') {
    //   // remove the document data from the web page
    //     removeRecipe(change.doc.id);
    // }
  });
});

db.collection('hycomate-1').orderBy('waktu', 'desc').limit(3).get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    console.log("viewed");
    // renderCafe(doc);
  })
})


// Adding new data
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
  evt.preventDefault();

  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value

  };

  db.collection('hycomate-1').add(recipe)
    .catch(err => console.log(err));
      
  form.title.value = '';
  form.ingredients.value = '';

});


// Delete recipe
const recipeContainer = document.querySelector('.recipes');
recipeContainer.addEventListener('click', evt => {
  console.log(evt);
  if (evt.target.tagName === 'I') {
    const id = evt.target.getAttribute('data-id');
    db.collection('recipes').doc(id).delete();
  }
});