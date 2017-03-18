import $ from './dom';

const notify = {
  ok(msg) {
    const feedback = $.id('feedback');
    feedback.innerHTML = msg;
    feedback.classList.remove('feedback-animation');
    feedback.classList.remove('feedback-ok');
    feedback.classList.remove('feedback-error');
    void feedback.offsetWidth; // reflow
    feedback.classList.add('feedback-animation');
    feedback.classList.add('feedback-ok');
  },

  error(msg) {
    const feedback = $.id('feedback');
    feedback.innerHTML = msg;
    feedback.classList.remove('feedback-animation');
    feedback.classList.remove('feedback-ok');
    feedback.classList.remove('feedback-error');
    void feedback.offsetWidth; // reflow
    feedback.classList.add('feedback-animation');
    feedback.classList.add('feedback-error');
  },
};

export default notify;
