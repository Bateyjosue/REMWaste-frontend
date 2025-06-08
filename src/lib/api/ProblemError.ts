export interface Problem {
  type?: string
  title?: string
  detail?: string
  instance?: string
  status?: number
}

export class ProblemError extends Error implements Problem {
  type?: string
  title?: string
  detail?: string
  instance?: string
  status?: number

  constructor(message: string) {
    super(message)
    this.name = 'ProblemError'
  }
}
