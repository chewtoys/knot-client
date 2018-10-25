import { getToken } from '~/utils/auth'

export default function({ isServer, req, redirect }) {
  if (isServer && !req) return
  const token = getToken(req)
  if (!token) {
    return redirect('/auth/login')
  }
}
