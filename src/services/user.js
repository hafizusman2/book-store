// store token
export const storeUserInfo = (userData) => {
  localStorage.setItem('userData_firebase', JSON.stringify(userData))
}

// Get token from local storage
export const getUserInfo = () => {
  const userData = localStorage.getItem('userData_firebase')
  return userData ? JSON.parse(userData) : null
}

// Remove token from local storage
export const removeUserInfo = () => {
  localStorage.removeItem('userData_firebase')
}
