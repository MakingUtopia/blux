import LoadingPage from '../pages/loading'
import DefaultPage from '../pages/default'
import ContainedPage from '../pages/contained'
import BlogPage from '../pages/blog'


const defaultPageMap = new Map([
    ["loading", LoadingPage],
    ["default", DefaultPage],
    ["contained", ContainedPage],
    ["blog", BlogPage]
])
let customPageMap = new Map()
export function registerCustomPages(pageDescriptors) {
    const existingEntries = customPageMap.entries()
    customPageMap = new Map([
        ...existingEntries,
        ...pageDescriptors
    ])
}
export const getPageMap = () => new Map([
    ...defaultPageMap.entries(),
    ...customPageMap.entries()
])