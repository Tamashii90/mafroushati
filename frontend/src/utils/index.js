export const fetcher = async (url, optionsObject) => {
  try {
    const res = await fetch(url, optionsObject).then(res => {
      if (res.status >= 500) throw new Error("Server error.");
      return res.json();
    });
    if (res.error) {
      const err = new Error(res.message);
      Error.prototype.body = res.body; // this body holds the mongoose errors
      throw err;
    }
    return res;
  } catch (err) {
    // If the promise rejects with TypeError that means we have network error
    throw err instanceof TypeError
      ? Error("Network error.")
      : Error(err.message);
  }
};
