export const getPath = () => {
  let pathname = window.frames['iframous'] && window.frames['iframous'].contentWindow.location.pathname
  if (pathname.indexOf('/groups/') === 0) {
    pathname = pathname.replace('/groups/', '/')
  }
  return pathname.substring(1)
}

export const getPagePath = (index = 0) => {
  try {
    const $_IFRAME_WINDOW = window.frames['iframous'] && window.frames['iframous'].contentWindow
    return $_IFRAME_WINDOW && $_IFRAME_WINDOW.$('body').data('page').split(':')[index]
  } catch (error) {
    console.error(error)
  }
}

export const getUserAvatarFromIframe = () => {
  const $_IFRAME_WINDOW = window.frames['iframous'] && window.frames['iframous'].contentWindow
  if ($_IFRAME_WINDOW) {
    return $_IFRAME_WINDOW.gon.current_user_avatar_url
  }
}

export const isInGroupsPage = () => getPagePath() === 'groups'

export const isInProjectPage = () => getPagePath() === 'projects'

export const getProjectSlug = () => {
  const $_IFRAME_WINDOW = window.frames['iframous'] && window.frames['iframous'].contentWindow
  if (isInProjectPage()) {
    return $_IFRAME_WINDOW && $_IFRAME_WINDOW.$('body').data('project')
  }
  return null
}

export const getProjectFullPath = () => {
  if (isInProjectPage()) {
    const path = getPath()
    const projectSlug = getProjectSlug()
    return path.substring(0, path.search(projectSlug) + projectSlug.length)
  }
  return null
}

export const getGroupSlug = () => {
  const $_IFRAME_WINDOW = window.frames['iframous'] && window.frames['iframous'].contentWindow
  if (isInGroupsPage()) {
    return $_IFRAME_WINDOW && $_IFRAME_WINDOW.$('body').data('group')
  }
  return null
}

export const getGroupFullPath = () => {
  if (isInGroupsPage()) {
    const path = getPath()
    const groupSlug = getGroupSlug()
    return path.substring(0, path.search(groupSlug) + groupSlug.length)
  }
  return null
}

export default {
  getPagePath,
  isInGroupsPage,
  isInProjectPage,
  getGroupSlug,
  getGroupFullPath,
  getProjectSlug,
  getProjectFullPath,
}
