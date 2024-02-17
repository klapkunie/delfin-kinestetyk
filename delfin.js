const images = document.querySelectorAll('.image');
const options = document.querySelectorAll('.option');
const result = document.getElementById('result');

let correctMatches = 0;

options.forEach(option => {
    option.addEventListener('dragstart', dragStart);
});

images.forEach(image => {
    image.addEventListener('dragstart', dragStart);
});

options.forEach(option => {
    option.addEventListener('dragover', dragOver);
    option.addEventListener('drop', drop);
});

images.forEach(image => {
    image.addEventListener('dragover', dragOver);
    image.addEventListener('drop', drop);
});

function dragStart(e) {
    e.dataTransfer.setData('text', e.target.dataset.word);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const draggedWord = e.dataTransfer.getData('text');
    const correctWord = e.target.dataset.word;

    if (draggedWord === correctWord) {
        e.target.appendChild(document.querySelector(`[data-word="${draggedWord}"]`));
        correctMatches++;
        if (correctMatches === 3) {
            result.textContent = 'Correct';
        } else {
            result.textContent = '';
        }

        // Move the text directly below the matched image in the center
        const image = e.target.querySelector('.image');
        const text = e.target.querySelector(`.option[data-word="${draggedWord}"]`);
        text.style.position = 'absolute';
        text.style.top = `${image.offsetTop + image.offsetHeight}px`;
        text.style.left = `${image.offsetLeft + (image.offsetWidth - text.offsetWidth) / 2}px`;
    } else {
        result.textContent = 'Try again';
    }
}
