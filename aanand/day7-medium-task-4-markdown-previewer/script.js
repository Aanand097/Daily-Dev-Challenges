const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

function renderMarkdown(text) {
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const lines = escaped.split('\n');
  const html = [];
  let inList = false;

  lines.forEach(line => {
    if (/^#{3}\s+/.test(line)) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push('<h3>' + line.replace(/^#{3}\s+/, '') + '</h3>');
    } else if (/^#{2}\s+/.test(line)) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push('<h2>' + line.replace(/^#{2}\s+/, '') + '</h2>');
    } else if (/^#\s+/.test(line)) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push('<h1>' + line.replace(/^#\s+/, '') + '</h1>');
    } else if (/^-\s+/.test(line)) {
      if (!inList) { html.push('<ul>'); inList = true; }
      html.push('<li>' + line.replace(/^-\s+/, '') + '</li>');
    } else if (/^```/.test(line)) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push('<pre><code>' + line.replace(/^```/, '') + '</code></pre>');
    } else if (line.trim() === '') {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push('');
    } else {
      if (inList) { html.push('</ul>'); inList = false; }
      let textLine = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
      html.push('<p>' + textLine + '</p>');
    }
  });

  if (inList) html.push('</ul>');
  return html.join('');
}

function updatePreview() {
  preview.innerHTML = renderMarkdown(editor.value);
}

editor.addEventListener('input', updatePreview);
updatePreview();
