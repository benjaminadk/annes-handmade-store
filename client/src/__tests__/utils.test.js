import { findAverage } from '../utils/findAverage'
import { formatFilename } from '../utils/formatFilename'

describe('Utility Function', () => {
  it('Find Average works correctly', () => {
    const average = findAverage([10, 10, 20, 40])
    expect(average).toEqual(20)
  })
  it('Format Filename works correctly', () => {
    const formatted = formatFilename('myImageFile.jpg', 'folder')
    expect(formatted).toEqual('folder/myimagefile')
  })
})
