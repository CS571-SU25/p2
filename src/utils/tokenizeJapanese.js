import TinySegmenter from 'tiny-segmenter';

const segmenter = new TinySegmenter();

export const tokenizeJapanese = (text) => {
    return segmenter.segment(text);
};
