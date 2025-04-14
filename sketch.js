let radio;
let button;
let questions;
let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let resultText = '';
let resultColor = '';
let quizFinished = false;

function preload() {
  // 使用 p5.Table 讀取 CSV 檔案
  questions = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#dee2ff");

  // 建立選擇題
  radio = createRadio();
  radio.style('width', '600px');
  radio.style('font-size', '30px');

  // 建立按鈕
  button = createButton('提交');
  button.position(windowWidth / 2 - 50, windowHeight / 2+150); // 按鈕居中
  button.style('font-size', '30px');
  button.mousePressed(submitAnswer);

  displayQuestion();
}

function draw() {
  background("#dee2ff");

  // 顯示答對與答錯題數
  textAlign(LEFT);
  textSize(20);
  fill(0);
  text(`答對題數: ${correctAnswers}`, 10, 30);
  text(`答錯題數: ${incorrectAnswers}`, 10, 60);

  if (quizFinished) {
    // 測驗結束時顯示總結
    textAlign(CENTER);
    textSize(30);
    fill(0);
    text(
      `測驗結束！答對題數: ${correctAnswers}，答錯題數: ${incorrectAnswers}`,
      width / 2,
      height / 2 + 120
    );
  } else {
    // 顯示題目
    textAlign(CENTER); // 題目居中
    fill(0); // 題目顏色設置為黑色
    textSize(30);
    text(
      questions.getString(currentQuestionIndex, 'question'),
      width / 2,
      height / 2 - 60
    );

    // 顯示結果
    fill(resultColor);
    text(resultText, width / 2, height / 2 + 150);

    // 顯示名字，字體大小設置為20px
    fill(0);
    textSize(20);
    text("413730754 邱佳儀", 95, 90);
  }
}

function displayQuestion() {
  if (currentQuestionIndex < questions.getRowCount()) {
    // 清空上題的結果訊息
    resultText = '';
    resultColor = '';

    // 清空選項
    radio.html(''); // 清空 radio 的內容

    // 顯示新題目
    let question = questions.getRow(currentQuestionIndex);
    radio.option(question.getString('option1'));
    radio.option(question.getString('option2'));
    radio.option(question.getString('option3'));
    radio.option(question.getString('option4'));
    radio.position(width / 2 - 300, height / 2 - 10); // 選項居中
  } else {
    quizFinished = true;
  }
}

function submitAnswer() {
  let answer = radio.value(); // 獲取使用者選擇的答案
  let correctAnswer = questions.getString(currentQuestionIndex, 'correct'); // 獲取正確答案
  if (answer === correctAnswer) {
    resultText = '答對了 !'; // 顯示答對訊息
    resultColor = 'green'; // 設定文字顏色為綠色
    correctAnswers++; // 答對題數加一
  } else {
    resultText = '答誤了 !'; // 顯示答錯訊息
    resultColor = 'red'; // 設定文字顏色為紅色
    incorrectAnswers++; // 答錯題數加一
  }
  console.log('選擇的答案是: ' + answer); // 在主控台輸出選擇的答案
  currentQuestionIndex++; // 移動到下一題
  displayQuestion(); // 顯示下一題
}