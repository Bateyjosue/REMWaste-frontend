import { ProblemError, type Problem } from './ProblemError'

async function getProblemErrorFromResponse(res: Response) {
  const problem: Problem = await res.json()

  const error = new ProblemError(
    problem.title ?? 'An error occurred while fetching the data.'
  )
  error.type = problem.type
  error.title = problem.title
  error.detail = problem.detail
  error.status = problem.status

  return error
}

export async function fetcher() {
  const API_URL = 'https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft'
  
  const res = await fetch(API_URL)
  console.log({ res })
  
  if (!res.ok) {
    throw await getProblemErrorFromResponse(res)
  }

  return res.json()
}