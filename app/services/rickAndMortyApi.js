const API_URL_QUERY = "https://rickandmortyapi.com/api/character/?";

// it is a valid nameQuery if it is not empty and contains only letters with or without whitespaces
function validateNameQueryString(name) {
  const onlyLettersRegex = new RegExp(/^[A-Za-z\s]+$/);
  return name !== "" && onlyLettersRegex.test(name);
}

/**
 * Fetches a Rick and Morty character's image url.
 *
 * @param {string} name Rick and Morty character's name
 * @returns {Promise<string>}
 *
 * Returns an image url if sucessful. Otherwise, it will throw an error.
 */
export async function getCharacterImage(name) {
  try {
    const isValid = validateNameQueryString(name);
    if (isValid) {
      const nameQuery = "name=" + name.replace(" ", "+"); // replaces whitespaces between words with a "+"
      const resp = await fetch(API_URL_QUERY + nameQuery);
      const json = await resp.json();
      const results = json.results;
      if (results && results.length > 0) {
        // assumption: we only want exact matches.
        const filteredResults = results.filter(
          (result) => result.name.toLowerCase() === name.toLocaleLowerCase()
        );
        // if filteredResults still contains multiple results with the same name, then pick a random image
        if (filteredResults.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * filteredResults.length
          );
          return filteredResults[randomIndex].image;
        } else {
          throw new Error(
            `There are multiple Rick and Morty characters that contain the word:\n\n ${name}\n\n Please provide the full name.`
          );
        }
      } else {
        throw new Error("No Rick and Morty character found.");
      }
    } else {
      throw new Error("Please enter a valid name with letters and spaces.");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
