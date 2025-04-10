export function getRandomWords(arr, count) {
  let newCount = count;
  if (arr?.length < count) {
    newCount = arr?.length;
  }
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, newCount);
}


export const wordsInit = [
  { id: '1', word: '你好', pinyin: 'nǐ hǎo', meaning: 'xin chào' },
  { id: '2', word: '谢谢', pinyin: 'xièxie', meaning: 'cảm ơn' },
  { id: '3', word: '再见', pinyin: 'zàijiàn', meaning: 'tạm biệt' },
  { id: '4', word: '请', pinyin: 'qǐng', meaning: 'làm ơn' },
  { id: '5', word: '对不起', pinyin: 'duìbuqǐ', meaning: 'xin lỗi' },
  { id: '6', word: '没关系', pinyin: 'méiguānxi', meaning: 'không sao' },
];

export const NUM_RANDOM = 10;