const DICTIONARY_URL = '/dictionary.txt'; // Path to the dictionary.txt in the public folder

let cachedWords: string[] = []; // Cache the dictionary

// Load the dictionary.txt file and parse it into a list of valid words.
// This function will be replaced by the Merriam-Webster API in future updates.
export async function loadDictionary(): Promise<string[]> {
  // Caching logic ensures we don't reload the dictionary unnecessarily.
  if (cachedWords.length > 0) {
    // Return the cached dictionary if it has already been loaded
    return cachedWords; 
  }

  try {
    const response = await fetch(DICTIONARY_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch dictionary.txt');
    }
    const text = await response.text();
    cachedWords = text.split('\n').map(word => word.trim().toLowerCase());

    // Filter to include only 5-letter words containing alphabetic characters
    cachedWords = cachedWords.filter(word => word.length === 5 && /^[a-zA-Z]+$/.test(word));
    return cachedWords;
  } catch (error) {
    console.error('Error loading dictionary:', error);
    return [];
  }
}

// FUTURE: Replace this logic with Merriam-Webster API for dictionary validation.

// Function to get a random word from the dictionary
export async function getRandomWord(): Promise<string> {
  if (cachedWords.length === 0) {
    cachedWords = await loadDictionary();
  }

  if (cachedWords.length === 0) {
    throw new Error('No valid words found in dictionary');
  }

  const randomIndex = Math.floor(Math.random() * cachedWords.length);
  return cachedWords[randomIndex].toUpperCase();
}

// Function to check if a word is valid
export async function isValidWord(word: string): Promise<boolean> {
  if (!/^[a-zA-Z]{5}$/.test(word)) { // Ensure it's 5 letters and contains only alphabetic characters
    return false;
  }

  if (cachedWords.length === 0) {
    cachedWords = await loadDictionary();
  }

  return cachedWords.includes(word.toLowerCase());
}
