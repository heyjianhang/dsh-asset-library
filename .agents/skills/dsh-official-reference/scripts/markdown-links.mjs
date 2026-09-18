// This checks the inline-link syntax used by this base, not arbitrary Markdown.
function proseLines(content) {
  let fence = null;
  return content.split(/\r?\n/).map((line, index) => {
    const marker = line.match(/^\s*(`{3,}|~{3,})(.*)$/);
    if (marker) {
      if (!fence) fence = marker[1];
      else if (marker[1][0] === fence[0] && marker[1].length >= fence.length && !marker[2].trim()) fence = null;
      return { text: '', line: index + 1 };
    }
    return { text: fence ? '' : line.replace(/(`+)[\s\S]*?\1/g, ''), line: index + 1 };
  });
}

export function markdownLinks(content) {
  return proseLines(content).flatMap(({ text, line }) => {
    const links = [...text.matchAll(/\[[^\]\n]*\]\(\s*(<[^>\n]+>|[^\s)]+)(?:\s+"[^"\n]*")?\s*\)/g)].map(match => match[1]);
    const reference = text.match(/^\s*\[[^\]\n]+\]:\s*(<[^>\n]+>|\S+)/);
    if (reference) links.push(reference[1]);
    for (const match of text.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) links.push(match[1]);
    return links.map(target => ({ target: target.replace(/^<|>$/g, ''), line }));
  });
}

