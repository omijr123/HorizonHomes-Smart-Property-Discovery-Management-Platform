// We'll store listings in localStorage for demo

let listings = JSON.parse(localStorage.getItem("properties")) || [];

const form = document.getElementById("add-property-form");
const listingsContainer = document.getElementById("listings-container");

function renderListings() {
  listingsContainer.innerHTML = "";
  if(listings.length === 0) {
    listingsContainer.innerHTML = "<p>No listings available.</p>";
    return;
  }
  listings.forEach((prop, index) => {
    const div = document.createElement("div");
    div.style.border = "1px solid #ccc";
    div.style.padding = "10px";
    div.style.marginBottom = "10px";
    div.style.borderRadius = "5px";
    div.innerHTML = `
      <strong>${prop.title}</strong> (${prop.type}) - $${prop.price.toLocaleString()}<br />
      Location: ${prop.location}<br />
      <button data-index="${index}" class="delete-btn" style="margin-top:5px; background:#cc0000; color:white; border:none; padding:5px; border-radius:5px; cursor:pointer;">Delete</button>
    `;
    listingsContainer.appendChild(div);
  });
}

function saveListings() {
  localStorage.setItem("properties", JSON.stringify(listings));
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const newProp = {
    id: Date.now(),
    title: document.getElementById("prop-title").value,
    type: document.getElementById("prop-type").value,
    location: document.getElementById("prop-location").value,
    price: Number(document.getElementById("prop-price").value),
    description: document.getElementById("prop-description").value,
    image: document.getElementById("prop-image").value,
    mapLink: document.getElementById("prop-maplink").value,
  };
  listings.push(newProp);
  saveListings();
  renderListings();
  form.reset();
  alert("Property added successfully!");
});

// Delete listing
listingsContainer.addEventListener("click", e => {
  if(e.target.classList.contains("delete-btn")) {
    const index = e.target.getAttribute("data-index");
    listings.splice(index, 1);
    saveListings();
    renderListings();
  }
});

renderListings();
