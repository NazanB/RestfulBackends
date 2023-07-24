"use strict";

const contactList = document.querySelector(".contact-list");

let contacts = [];

function getContacts() {
  fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=8")
    .then((response) => response.json())
    .then((contactData) => {
      //console.log(contactData);
      contacts = contactData;
      renderContacts(contactData);
    });
}

getContacts();

function oneContact() {
  fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=1")
    .then((response) => response.json())
    .then((contactData) => {
      contacts.push(contactData[0]);
      renderContacts();
    });
}

function generateId() {
  return Math.floor(Math.random() * 100);
}

function renderContacts() {
  contactList.innerHTML = "";
  contacts.forEach((contact) => {
    const id = generateId();

    const contactEl = document.createElement("article");
    contactEl.classList.add("articleContainer");
    contactEl.dataset.id = id;
    contact.id = id;

    const imageEl = document.createElement("img");
    imageEl.classList.add("imgBox");
    imageEl.src = contact.picture;

    const headingElement = document.createElement("h2");
    headingElement.innerText =
      contact.name.title + " " + contact.name.first + " " + contact.name.last;

    const infoParagraph = document.createElement("p");
    infoParagraph.classList.add("infoP");
    infoParagraph.innerText = contact.title;

    const connectionsParagaph = document.createElement("p");
    connectionsParagaph.classList.add("connectP");
    connectionsParagaph.innerText =
      contact.mutualConnections + " mutual connections";

    const connectButton = document.createElement("button");
    connectButton.classList.add("connectBtn");
    connectButton.innerText = "Connect";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("XBtn");
    deleteButton.innerText = "X";

    deleteButton.addEventListener("click", (event) => {
      const article = event.target.parentElement;
      const id = parseInt(article.dataset.id);

      for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        if (contact.id === id) {
          contacts.splice(i, 1);
          break;
        }
      }
      article.remove();
      oneContact();
    });

    contactEl.append(
      imageEl,
      headingElement,
      infoParagraph,
      connectionsParagaph,
      connectButton,
      deleteButton
    );
    contactList.append(contactEl);
  });
}
