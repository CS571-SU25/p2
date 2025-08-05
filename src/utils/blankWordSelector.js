export const selectBlankIndices = (words, minBlanks, maxBlanks, minSpacing) => {
    const shuffledIndices = [...Array(words.length).keys()].sort(() => Math.random() - 0.5);
    const targetBlankCount = Math.min(words.length, Math.floor(Math.random() * (maxBlanks - minBlanks + 1)) + minBlanks);

    const blankIndices = new Set();
    const forbidden = new Set();

    for (let i = 0; i < shuffledIndices.length && blankIndices.size < targetBlankCount; i++) {
        const idx = shuffledIndices[i];
        if (forbidden.has(idx)) continue;

        blankIndices.add(idx);

        for (let j = idx - minSpacing; j <= idx + minSpacing; j++) {
            forbidden.add(j);
        }
    }

    return blankIndices;
};