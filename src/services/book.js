// Get user-specific books from local storage
export const getUserBooks = (userId) => {
  const userBooks = getUserBooksFromLocalStorage(userId)
  return userBooks
}

// Update a book in user-specific local storage by its id
export const updateUserBook = (userId, bookId, updatedBookData) => {
  delete updatedBookData.id
  const userBooks = getUserBooksFromLocalStorage(userId)

  // Find the index of the book with the given id
  const indexToUpdate = userBooks.findIndex((book) => book.id === bookId)

  if (indexToUpdate !== -1) {
    // Check if the updated title already exists
    const existingBookWithSameTitle = userBooks.some(
      (book, index) => index !== indexToUpdate && book.title === updatedBookData.title
    )
    if (existingBookWithSameTitle) {
      console.log('A book with the same title already exists. Update not allowed.')
      return
    }

    // Update the book data at the found index
    userBooks[indexToUpdate] = { ...userBooks[indexToUpdate], ...updatedBookData }
    setUserBooksInLocalStorage(userId, userBooks)
    console.log('Book updated successfully.')
  } else {
    console.log('Book not found for updating.')
  }
}

// Add a book to user-specific local storage, if the title doesn't exist
export const addUserBook = (userId, bookData) => {
  delete bookData.id
  const userBooks = getUserBooksFromLocalStorage(userId)

  // Check if a book with the same title already exists
  const existingBookWithSameTitle = userBooks.some((book) => book.title === bookData.title)
  if (existingBookWithSameTitle) {
    console.log('A book with the same title already exists.')
    return
  }

  bookData.id = generateAutoIncrementId(userBooks)
  userBooks.push(bookData)
  setUserBooksInLocalStorage(userId, userBooks)
}

// Helper function to get user-specific books from local storage
const getUserBooksFromLocalStorage = (userId) => {
  const userBooksKey = `userBooks_${userId}`
  const storedBooks = localStorage.getItem(userBooksKey)
  return storedBooks ? JSON.parse(storedBooks) : []
}

// Helper function to set user-specific books in local storage
const setUserBooksInLocalStorage = (userId, userBooks) => {
  const userBooksKey = `userBooks_${userId}`
  localStorage.setItem(userBooksKey, JSON.stringify(userBooks))
}

// Helper function to generate an auto-incremented book ID
const generateAutoIncrementId = (userBooks) => {
  const maxId = userBooks.reduce((max, book) => Math.max(max, book.id || 0), 0)
  return maxId + 1
}
// Get user book by Id
export const getUserBookById = (userId, bookId) => {
  const userBooks = getUserBooksFromLocalStorage(userId)
  const book = userBooks.find((book) => book.id == bookId)
  return book || null
}

// Delete a book from user-specific local storage by its id
export const deleteUserBook = (userId, bookId) => {
  const userBooks = getUserBooksFromLocalStorage(userId)
  const indexToDelete = userBooks.findIndex((book) => book.id === bookId)

  if (indexToDelete !== -1) {
    userBooks.splice(indexToDelete, 1)
    setUserBooksInLocalStorage(userId, userBooks)
    console.log('Book deleted successfully.')
  } else {
    console.log('Book not found for deleting.')
  }
}
