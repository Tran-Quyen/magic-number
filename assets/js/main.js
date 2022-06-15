var $ = document.querySelector.bind(document);

// Thứ tự nhập
let turn = 1;
// Mảng chứa các số đã nhập
let numbers = [];
// Function tạo element
// element này sẽ được chèn vào trong <div class="magic-numbers"></div>
const createMagicNumber = (className, role, value) => {
  const node = document.createElement('div');
  node.className = className;
  node.innerHTML = `
  <span>${role}</span>
  <span>${value}</span>
  `;
  return node;
};
const magicNumbersNode = $('.magic-numbers');
const resultNode = $('.result');
const formNode = $('form');

// Lắng nghe sự kiện submit số
formNode.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = $('form input').value;
  // Tạo element của bạn
  const yourNode = createMagicNumber('number number-you', 'Bạn', value);
  // Reset ô input sau khi submit
  $('form input').value = '';
  // Nếu là lần đầu tiên thì chỉ cần chèn 1 node là node của bạn
  if (turn === 1) {
    // Tính nhanh kết quả
    // công thức phía dưới tương đương Number(value) + 19998
    result = Number('2' + value) - 2;
    resultNode.innerHTML = `
    <div class="result-overlay"></div>
    <span>Dự đoán: ${result}</span>
    `;
    resultNode.classList.add('active');
    magicNumbersNode.appendChild(yourNode);
    numbers.push(Number(value));
    turn++;
  } else {
    // Nếu là lần thứ 2 trở đi thì chèn 2 node vào
    // là node của bạn và node của mình
    const myNode = createMagicNumber('number number-me', 'Mình', 9999 - Number(value));
    magicNumbersNode.appendChild(yourNode);
    magicNumbersNode.appendChild(myNode);
    numbers.push(Number(value), 9999 - Number(value));
    turn += 2;
  }
  // Nếu là lượt cuối thì sẽ chèn thêm element tính tổng
  if (turn === 6) {
    const sumValue = numbers.reduce((current, result) => result + current);
    const sumNode = createMagicNumber('number number-sum', 'Tổng', sumValue);
    magicNumbersNode.appendChild(sumNode);
    // Ẩn cái ô input đi, không cho nhập nữa
    formNode.style.display = 'none';
  }
});

// Lắng nghe sự kiện nhấn button reset
$('.btn-reset').addEventListener('click', () => {
  magicNumbersNode.innerHTML = '';
  resultNode.innerHTML = '';
  resultNode.classList.remove('active');
  turn = 1;
  numbers = [];
  formNode.style = null;
});

// Lắng nghe sự kiện nhấn vào khu vực result.
// Chúng ta sẽ thực hiện làm mờ hoặc xóa làm mờ.
resultNode.addEventListener('click', () => {
  $('.result-overlay').classList.toggle('hide');
});

