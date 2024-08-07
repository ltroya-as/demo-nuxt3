import { join } from 'path'

export class PathUtil {
  static pathState(fileName = 'userStorageState.json') {
    return join(__dirname, '..', 'store', fileName)
  }

  static pathInterceptorData(filename) {
    return join(__dirname, '..', 'store', filename)
  }

  static pathFixture(filename = 'userinfo.json') {
    return join(__dirname, '..', 'fixtures', filename)
  }
}
