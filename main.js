function updateTextHr() {
  document.querySelectorAll('.text-hr, .text-hr-content').forEach(function(el) {
    // Remove old span if present
    if (el.classList.contains('text-hr-content')) {
      // Replace span with a new hr for recalculation
      const hr = document.createElement('hr');
      hr.className = 'text-hr';
      el.replaceWith(hr);
    }
  });

  document.querySelectorAll('.text-hr').forEach(function(hr) {
    const span = document.createElement('span');
    span.className = 'text-hr-content';
    let text = ':3';
    // Estimate how many times to repeat based on width and font size
    const repeatCount = Math.ceil(hr.offsetWidth / 16.5);
    span.textContent = text.repeat(repeatCount);
    hr.replaceWith(span);
  });
}

window.addEventListener('DOMContentLoaded', updateTextHr);
window.addEventListener('resize', updateTextHr);