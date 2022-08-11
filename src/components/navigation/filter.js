export const filterNavigation = (list = [], { hasChats, isFederating, isPrivate, currentUser }) => {
  return list.filter(({ criteria, anon, anonRoute }) => {
    const set = new Set(criteria || [])
    if (!isFederating && set.has('federating')) return false
    if (isPrivate && set.has('!private')) return false
    if (!currentUser && !(anon || anonRoute)) return false
    if ((!currentUser || !currentUser.locked) && set.has('lockedUser')) return false
    if (!hasChats && set.has('chats')) return false
    return true
  })
}
