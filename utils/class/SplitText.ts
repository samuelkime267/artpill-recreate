export default class SplitText {
  // states
  element: HTMLElement;
  lines: HTMLElement[] = [];
  words: HTMLElement[] = [];
  chars: HTMLElement[] = [];
  options: {
    type: string; // string containing words,chars,lines
    scope?: Element;
    lineClass?: string;
    wordClass?: string;
    charClass?: string;
    wrapper?: "div" | "span";
  };
  initialState: string;
  textContent: string;

  constructor(
    element: string,
    options: {
      type: string;
      scope?: Element;
      lineClass?: string;
      wordClass?: string;
      charClass?: string;
      wrapper?: "div" | "span";
    }
  ) {
    const el = options?.scope
      ? options.scope.querySelector(element)
      : document.querySelector(element);

    if (!el) throw new Error("Element not found");
    if (!options?.type) throw new Error("Split type is required");

    this.element = el as HTMLElement;
    this.options = { ...options };
    this.initialState = this.element.innerHTML;
    this.textContent = this.element.textContent || "";

    this.split();
  }

  split() {
    const {
      type,
      lineClass = "",
      wordClass = "",
      charClass = "",
      wrapper = "span",
    } = this.options;

    const defaultClass = "inline-block relative";

    if (type.includes("lines")) {
      const wordsEl = this.textContent.split(" ").map((word) => {
        return `<span class="split-temp">${word} </span>`;
      });

      this.element.innerHTML = wordsEl.join("");

      // Detect lines based on top offset
      const wordSpans = Array.from(
        this.element.querySelectorAll(".split-temp")
      ) as HTMLElement[];
      let currentLineTop = wordSpans[0].offsetTop;
      let line: HTMLElement[] = [];
      const lines: string[] = [];

      wordSpans.forEach((wordSpan) => {
        if (wordSpan.offsetTop !== currentLineTop) {
          lines.push(line.map((span) => span.innerText).join(" "));
          line = [];
          currentLineTop = wordSpan.offsetTop;
        }

        line.push(wordSpan);
      });

      if (line.length) lines.push(line.map((span) => span.innerText).join(" "));

      // Apply the split-line spans
      this.element.innerHTML = lines
        .map(
          (lineText) =>
            `<${wrapper} class="split-line ${lineClass} ${defaultClass}">${lineText}</${wrapper}>`
        )
        .join("");

      this.lines = [
        ...this.element.querySelectorAll(".split-line"),
      ] as HTMLElement[];
    }

    if (type.includes("words")) {
      if (type.includes("lines")) {
        this.lines.forEach((span) => {
          const words = span.innerText.split(" ");
          const wordsArr: string[] = [];

          words.forEach((word) => {
            wordsArr.push(
              `<span class="split-word ${wordClass} ${defaultClass}">${word}</span>`
            );
            wordsArr.push(" ");
          });

          span.innerHTML = wordsArr.join("");

          span.querySelectorAll(".split-word").forEach((word) => {
            this.words.push(word as HTMLElement);
          });
        });
      } else {
        const words = this.textContent.split(" ");
        const wordsArr: string[] = [];

        words.forEach((word) => {
          wordsArr.push(
            `<span class="split-word ${wordClass} ${defaultClass}">${word.trim()}</span>`
          );
          wordsArr.push(" ");
        });

        this.element.innerHTML = wordsArr.join("");

        this.words = [
          ...this.element.querySelectorAll(".split-word"),
        ] as HTMLElement[];
      }
    }

    if (type.includes("chars")) {
      if (type.includes("words")) {
        this.words.forEach((word) => {
          const chars = word.innerText.split("");
          const charsArr: string[] = [];

          chars.forEach((char) => {
            if (char === " ") {
              charsArr.push(char);
              return;
            }
            charsArr.push(
              `<span class="split-char ${charClass} ${defaultClass}">${char}</span>`
            );
          });

          word.innerHTML = charsArr.join("");

          word.querySelectorAll(".split-char").forEach((char) => {
            this.chars.push(char as HTMLElement);
          });
        });

        return;
      } else if (type.includes("lines")) {
        this.lines.forEach((span) => {
          const chars = span.innerText.split("");
          const charsArr: string[] = [];

          chars.forEach((char) => {
            if (char === " ") {
              charsArr.push(char);
              return;
            }
            charsArr.push(
              `<span class="split-char ${charClass} ${defaultClass}">${char}</span>`
            );
          });

          span.innerHTML = charsArr.join("");

          span.querySelectorAll(".split-word").forEach((word) => {
            this.chars.push(word as HTMLElement);
          });
        });

        return;
      } else {
        const chars = this.textContent.split("");
        const charsArr: string[] = [];

        chars.forEach((char) => {
          if (char === " ") {
            charsArr.push(char);
            return;
          }
          charsArr.push(
            `<span class="split-char ${charClass} ${defaultClass}">${char}</span>`
          );
        });

        this.element.innerHTML = charsArr.join("");

        this.chars = [
          ...this.element.querySelectorAll(".split-char"),
        ] as HTMLElement[];
      }
    }
  }

  revert() {
    this.element.innerHTML = this.initialState;
  }
}
