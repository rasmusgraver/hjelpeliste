import app from "./firebase.js"

import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"
// from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"

const db = getFirestore(app)
const dbName = "help"
const helpCollection = collection(db, dbName)

const todoButton = document.getElementById("todo-button")
todoButton.addEventListener("click", addItem)

async function addItem(event) {
  event.preventDefault()
  let textRef = document.getElementById("todo-input")
  if (textRef.value.length < 2) {
    alert("Vennligst skriv navnet ditt")
    // console.warn("Too short")
  } else {
    await setDoc(doc(helpCollection), {
      text: textRef.value,
      status: "active",
      time: Date.now(),
    })
    refreshItemList()
    //   .catch((error) => console.warn(error))
    textRef.value = ""
  }
}

// function addItem(event) {
//     event.preventDefault()
//     let textRef = document.getElementById("todo-input")
//     if (textRef.value.length < 2) {
//       alert("Vennligst skriv navnet ditt")
//       // console.warn("Too short")
//     } else {
//       setDoc(doc(helpCollection), {
//         text: textRef.value,
//         status: "active",
//         time: Date.now(),
//       })
//       .then((result) => refreshItemList())
//       .catch((error) => console.warn(error))
//       .finally( () =>   textRef.value = "" )
//     }
//   }

async function refreshItemList() {
  const q = query(helpCollection, orderBy("time"), limit(30))
  let items = []
  let querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    items.push({
      id: doc.id,
      ...doc.data(),
    })
  })
  generateItems(items)
}
/* 
function refreshItemList() {
  const q = query(helpCollection, orderBy("time"), limit(30))
  getDocs(q).then((querySnapshot) => {
    let items = []
    querySnapshot.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data(),
      })
    })
    generateItems(items)
  })
} */

function generateItems(items) {
  let itemsHTML = ""

  items.forEach((item) => {
    let text = item.text
    text = text.replace(">", "")
    text = text.replace("<", "")
    //  console.log(text)
    itemsHTML += `
        <div class="todo-item">
            <div class="check">
                <div data-id="${item.id}" class="check-mark ${
      item.status == "completed" ? "checked" : ""
    }">
                    <i class="fa fa-check"></i>
                </div>
            </div>
            <div class="todo-text ${
              item.status == "completed" ? "checked" : ""
            }">
                ${text}
            </div>
            <div class="trash">
                <div data-id="${item.id}" class="trash-mark">
                    <i class="fa fa-trash"></i>
                </div>
            </div>
        </div>
        `
  })

  document.querySelector(".todo-items").innerHTML = itemsHTML

  createEventListeners()
}

function createEventListeners() {
  let todoCheckMarks = document.querySelectorAll(".todo-item .check-mark")
  todoCheckMarks.forEach((checkMark) => {
    //console.log(checkMark);

    checkMark.addEventListener("click", function () {
      markCompleted(checkMark.dataset.id)
    })
  })

  let todoTrashMarks = document.querySelectorAll(".todo-item .trash-mark")

  todoTrashMarks.forEach((trashMark) => {
    //console.log(trashMark);

    trashMark.addEventListener("click", function () {
      deleteTask(trashMark.dataset.id)
    })
  })
}

function deleteTask(id) {
  deleteDoc(doc(db, dbName, id))
    .then(() => refreshItemList())
    .catch((error) => console.warn("Could not delete doc"))
}

function markCompleted(id) {
  updateDoc(doc(db, dbName, id), {
    status: "completed",
  })
    .then(() => refreshItemList())
    .catch((error) => console.warn("Could not delete doc"))
}

// Start with fetching the list of items and show them:
refreshItemList()
