const board_id = "board";
const board_cellSize = 35;
const board_countElements = Math.floor(window.innerWidth / board_cellSize) - 2;
const ascii_letters = "abcdefghijklmnopqrstuvwxyz".split("");

class ChessBoard {
  cellSize = null;
  cell_CountElementsWidth = null;
  cell_CountElementsHeight = null;
  alphabet = null;

  $src = {
    board: null,
    side: {
      letterTop: null,
      letterBottom: null,
      numLeft: null,
      numRight: null,
    },
    middleArea: null,
    gamingZone: null,
  };

  init(board_id = "board", alphabet = "", cellSize = 20) {
    this.alphabet = alphabet;
    this.$src.board = document.querySelector(`#${board_id}`);
    this.cellSize = cellSize;
    document.documentElement.style.setProperty(
      "--font-size",
      `${this.cellSize / 2}px`
    );
    document.documentElement.style.setProperty(
      "--cell-size",
      `${this.cellSize}px`
    );
    document.documentElement.style.setProperty(
      "--board-size",
      `${this.cellSize * this.cellCNT + this.cellSize * 2}px`
    );
    this.createStructure();
  }

  createStructure() {
    this.cell_CountElementsWidth =
      Math.floor(window.innerWidth / this.cellSize) - 2;
    this.cell_CountElementsHeight =
      Math.floor(window.innerHeight / this.cellSize) - 2;
    this.$src.middleArea = document.createElement("div");
    this.$src.middleArea.classList.add("middleArea");

    this.$src.middleArea.append(
      (this.$src.side.letterTop = document.createElement("div"))
    );
    this.$src.side.letterTop.classList.add("side");

    this.$src.middleArea.append(
      (this.$src.gamingZone = document.createElement("div"))
    );
    this.$src.gamingZone.classList.add("gamingZone");

    this.$src.middleArea.append(
      (this.$src.side.letterBottom = document.createElement("div"))
    );
    this.$src.side.letterBottom.classList.add("side");

    this.$src.board.append(
      (this.$src.side.numLeft = document.createElement("div"))
    );
    this.$src.side.numLeft.classList.add("side");

    this.$src.board.append(this.$src.middleArea);

    this.$src.board.append(
      (this.$src.side.numRight = document.createElement("div"))
    );
    this.$src.side.numRight.classList.add("side");

    this.drawNums(this.$src.side.numLeft);
    this.drawNums(this.$src.side.numRight);
    this.drawLetters(this.$src.side.letterTop);
    this.drawLetters(this.$src.side.letterBottom);
    this.drawCells();
  }

  drawLetters(div) {
    for (let index = 0; index < this.cell_CountElementsWidth; index++) {
      const letter = document.createElement("div");
      letter.classList.add("cell");

      if (index < this.alphabet.length) {
        letter.textContent = this.alphabet[index];
      } else {
        const firstLetterIndex = Math.floor(
          (index - this.alphabet.length) / this.alphabet.length
        );
        const secondLetterIndex =
          (index - this.alphabet.length) % this.alphabet.length;
        const thirdLetterIndex = Math.floor(
          (index - this.alphabet.length) / this.alphabet.length ** 2
        );

        let textContent = "";
        if (thirdLetterIndex > 0) {
          textContent += this.alphabet[thirdLetterIndex - 1];
        }
        textContent +=
          this.alphabet[firstLetterIndex] + this.alphabet[secondLetterIndex];
        letter.textContent = textContent;
      }

      div.append(letter);
    }
  }

  drawNums(div) {
    for (let index = 0; index < this.cell_CountElementsHeight; index++) {
      const num = document.createElement("div");
      num.classList.add("cell");
      num.textContent = `${this.cell_CountElementsHeight - index}`;
      div.append(num);
    }
  }
  drawCells() {
    for (
      let rowIndex = 0;
      rowIndex < this.cell_CountElementsHeight;
      rowIndex++
    ) {
      const row = document.createElement("div");
      row.classList.add("row");
      for (
        let cell_index = 0;
        cell_index < this.cell_CountElementsWidth;
        cell_index++
      ) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        row.append(cell);
      }
      this.$src.gamingZone.append(row);
    }
  }
  updateSize(size) {
    this.cellSize = size;
    document.documentElement.style.setProperty(
      "--font-size",
      `${this.cellSize / 2}px`
    );
    document.documentElement.style.setProperty(
      "--cell-size",
      `${this.cellSize}px`
    );
    document.documentElement.style.setProperty(
      "--board-size",
      `${this.cellSize * this.cellCNT + this.cellSize * 2}px`
    );
    this.updateScale()
  }
  updateScale() {
    Array.from(board.$src.board.children).forEach((element) => {
      element.remove();
    });
    this.createStructure();
  }
}

const windowWidth = Math.sqrt(window.innerWidth);
const board = new ChessBoard();
board.init(board_id, ascii_letters, board_cellSize);

window.addEventListener("resize", function () {
  board.updateScale();
});
