(function () {
  function initBlogFaq() {
    var faq = document.getElementById("rank-math-faq");
    if (!faq) {
      return;
    }

    faq.querySelectorAll(".rank-math-list-item").forEach(function (item) {
      var question = item.querySelector(".rank-math-question");
      var answer = item.querySelector(".rank-math-answer");
      if (!question || !answer) {
        return;
      }

      var answerText = answer.textContent.replace(/\s+/g, " ").trim();
      if (
        !answerText &&
        /frequently asked questions/i.test(question.textContent)
      ) {
        item.classList.add("is-hidden");
        return;
      }

      question.setAttribute("role", "button");
      question.setAttribute("aria-expanded", "false");
      question.setAttribute("tabindex", "0");

      function toggleItem() {
        var isOpen = item.classList.contains("is-open");
        faq.querySelectorAll(".rank-math-list-item.is-open").forEach(function (openItem) {
          openItem.classList.remove("is-open");
          var openQuestion = openItem.querySelector(".rank-math-question");
          if (openQuestion) {
            openQuestion.setAttribute("aria-expanded", "false");
          }
        });
        if (!isOpen) {
          item.classList.add("is-open");
          question.setAttribute("aria-expanded", "true");
        }
      }

      question.addEventListener("click", toggleItem);
      question.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleItem();
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBlogFaq);
  } else {
    initBlogFaq();
  }
})();
