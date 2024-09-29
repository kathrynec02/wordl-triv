import { getRandomWord, isValidWord } from '../services/dictionaryApi';

export class WordleDictionary {
  private cachedWords: Set<string> = new Set();

  async getRandomWord(): Promise<string> {
    const word = await getRandomWord();
    this.cachedWords.add(word);
    return word;
  }

  async containsWord(word: string): Promise<boolean> {
    if (this.cachedWords.has(word.toUpperCase())) {
      return true;
    }
    const isValid = await isValidWord(word);
    if (isValid) {
      this.cachedWords.add(word.toUpperCase());
    }
    return isValid;
  }

  getDictionarySize(): number {
    return this.cachedWords.size;
  }
}
