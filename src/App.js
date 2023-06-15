import './App.css';
import {useState} from 'react';

const App = () => {

  const [count, setCount] = useState(0);

  const handleClick = event => {
    setCount(current => current + 1);
  };
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
};

function enableSaveButton() {
  const saveButton = document.querySelector('.save-button');
  saveButton.disabled = false;
}

const sectionList = document.querySelector('.section-list');
let draggedSection = null;

sectionList.addEventListener('dragstart', (event) => {
  draggedSection = event.target;
  event.target.classList.add('dragging');
});

sectionList.addEventListener('dragover', (event) => {
  event.preventDefault();
  const position = getDragAfterElementPosition(sectionList, event.clientY);
  const nextSection = position ? position.nextElementSibling : null;
  sectionList.insertBefore(draggedSection, nextSection);
});

sectionList.addEventListener('dragend', (event) => {
  event.target.classList.remove('dragging');
  enableSaveButton();
});

function getDragAfterElementPosition(container, y) {
  const draggableSections = [...container.querySelectorAll('.section-item:not(.dragging)')];
  return draggableSections.reduce(
    (closest, section) => {
      const box = section.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: section };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

const editButtons = document.querySelectorAll('.edit-button');

editButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const sectionHeader = button.closest('.section-item').querySelector('.section-header');
    const sectionName = sectionHeader.querySelector('.section-name');
    const newName = prompt('Enter a new name for the section:', sectionName.textContent);
    if (newName !== null) {
      sectionName.textContent = newName;
      enableSaveButton();
    }
  });
});

export default App;
