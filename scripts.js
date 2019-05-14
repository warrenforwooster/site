function loadData() {
    var db = firebase.firestore();

    var policies = db.collection("policies");
    var mainDocument = db.collection("main").doc("6aLGOzyalCbBRxRdfpt5");

    mainDocument.get().then(function(doc) {
      if (doc.exists) {

        document.getElementById("about").innerHTML = doc.data().about;
        document.getElementById("aboutImageCaption").value = doc.data().aboutImageCaption;
        document.getElementById("volunteer").innerHTML = doc.data().volunteer;

      } else {
        console.log("No such document in Firestore!");
      }
    }).catch(function(error) {
      console.log("Error getting document: ", error);
    });

    policies.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc, i) {
      var span = document.getElementById("policies_span");
      var div = document.createElement("div");
      div.setAttribute("class", "form-group");

      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("class", "form-control");
      input.setAttribute("name", "policytitle" + i);
      input.setAttribute("id", "policytitle" + i);
      input.value = doc.data().title;
      div.appendChild(input);
      
      var ta = document.createElement("textarea");
      ta.setAttribute("class", "form-control");
      ta.setAttribute("name", "policybody" + i);
      ta.setAttribute("id", "policybody" + i);
      ta.value = doc.data().body;
      div.appendChild(ta);

      span.appendChild(div);
    });
    }).catch(function(error) {
      console.log("Error getting document: ", error);
    });
  }