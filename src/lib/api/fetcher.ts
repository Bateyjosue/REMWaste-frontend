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
  const res = await fetch(`${import.meta.env.VITE_WASTE_URL}`)
  console.log({ res })
  if (!res.ok) {
    throw await getProblemErrorFromResponse(res)
  }

  return res.json()
}
